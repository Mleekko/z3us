import { useStore } from '@src/store'
import { useQuery, useQueries, useInfiniteQuery } from 'react-query'
import { RadixService } from '@src/services/radix'
import BigNumber from 'bignumber.js'
import { decryptTransaction } from '@src/services/radix/transactions'
import { Action, Transaction } from '@src/services/types'

export const useGatewayInfo = () => {
	const network = useStore(state => state.networks[state.selectedNetworkIndex])
	const service = new RadixService(network.url)

	return useQuery(['useGatewayInfo', network.id], async () => service.gateway())
}

export const useNativeToken = () => {
	const network = useStore(state => state.networks[state.selectedNetworkIndex])
	const service = new RadixService(network.url)

	return useQuery(['useNativeToken', network.id], async () => service.nativeToken(network.id))
}

export const useTokenInfo = (rri: string) => {
	const network = useStore(state => state.networks[state.selectedNetworkIndex])
	const service = new RadixService(network.url)

	return useQuery(['useTokenInfo', network.id, rri], async () => service.tokenInfo(rri), {
		enabled: !!rri,
	})
}

export const useTokenInfos = (rris: Array<string>) => {
	const network = useStore(state => state.networks[state.selectedNetworkIndex])
	const service = new RadixService(network.url)

	const queries = rris.map(rri => ({
		queryKey: ['useTokenInfo', network.id, rri],
		queryFn: async () => {
			try {
				const token = await service.tokenInfo(rri)
				return token
			} catch (err: any) {
				return null
			}
		},
	}))
	return useQueries(queries)
}

export const useTokenBalances = () => {
	const { account, network } = useStore(state => ({
		account: state.account,
		network: state.networks[state.selectedNetworkIndex],
	}))
	const address = account?.address.toString()

	const service = new RadixService(network.url)

	return useQuery(['useTokenBalances', address], async () => service.tokenBalancesForAddress(address), {
		staleTime: 5 * 1000,
		refetchInterval: 5 * 1000,
		enabled: !!address,
	})
}

export const useAllAccountsTokenBalances = (): Array<{
	rri: string
	amount: BigNumber
}> => {
	const { addresses, network } = useStore(state => ({
		addresses: state.publicAddresses,
		network: state.networks[state.selectedNetworkIndex],
	}))
	const service = new RadixService(network.url)

	const queries = addresses.map(address => ({
		queryKey: ['useTokenBalances', address],
		queryFn: async () => {
			try {
				return await service.tokenBalancesForAddress(address)
			} catch (err: any) {
				return null
			}
		},
	}))

	const rawBalances = useQueries(queries)?.filter(({ data }) => !!data) || []

	const balanceMap = rawBalances.reduce((container, { data }) => {
		const balances = data ? data.account_balances.liquid_balances : []
		balances.forEach(balance => {
			if (!container[balance.rri]) {
				container[balance.rri] = { rri: balance.rri, amount: new BigNumber(balance.amount).shiftedBy(-18) }
			} else {
				container[balance.rri].amount = container[balance.rri].amount.plus(new BigNumber(balance.amount).shiftedBy(-18))
			}
		})

		return container
	}, {})

	return Object.values(balanceMap)
}

export const useStakedPositions = () => {
	const { account, network } = useStore(state => ({
		account: state.account,
		network: state.networks[state.selectedNetworkIndex],
	}))
	const service = new RadixService(network.url)
	const address = account?.address.toString()

	return useQuery(['useStakedPositions', address], async () => service.stakesForAddress(address), {
		enabled: !!address,
	})
}

export const useUnstakePositions = () => {
	const { account, network } = useStore(state => ({
		account: state.account,
		network: state.networks[state.selectedNetworkIndex],
	}))
	const service = new RadixService(network.url)
	const address = account?.address.toString()

	return useQuery(['useUnstakePositions', address], async () => service.unstakesForAddress(address), {
		enabled: !!address,
	})
}

export const useTotalDelegatedStake = () => {
	const network = useStore(state => state.networks[state.selectedNetworkIndex])
	const service = new RadixService(network.url)

	return useQuery(['useTotalDelegatedStake', network.id], async () => {
		const validators = await service.validators(network.id)
		if (validators.length === 0) {
			return undefined
		}
		let total = new BigNumber(0)
		for (let i = 0; i < validators.length; i += 1) {
			const vtotal = validators[i].totalDelegatedStake
			if (vtotal) {
				total = BigNumber.sum(total, new BigNumber(vtotal).shiftedBy(-18))
			}
		}
		return total
	})
}

export const useValidators = () => {
	const network = useStore(state => state.networks[state.selectedNetworkIndex])
	const service = new RadixService(network.url)

	return useQuery(['useValidators', network.id], async () => service.validators(network.id))
}

export const useLookupValidator = (validatorAddress: string) => {
	const network = useStore(state => state.networks[state.selectedNetworkIndex])
	const service = new RadixService(network.url)

	return useQuery(['useLookupValidator', validatorAddress], async () => service.lookupValidator(validatorAddress), {
		enabled: !!validatorAddress,
	})
}

export const useTransactionStatus = (txID: string) => {
	const network = useStore(state => state.networks[state.selectedNetworkIndex])
	const service = new RadixService(network.url)

	return useQuery(['useTransactionStatus', network.id, txID], async () => service.transactionStatus(network.id, txID), {
		enabled: !!txID,
	})
}

export const useTransactionHistory = (size = 30) => {
	const maxLimit = 30
	size = Math.min(size, maxLimit)

	const { account, network } = useStore(state => ({
		account: state.account,
		network: state.networks[state.selectedNetworkIndex],
	}))
	const service = new RadixService(network.url)
	const address = account?.address.toString()

	return useInfiniteQuery(
		['useTransactionHistory', address],
		async ({ pageParam }) => {
			const { cursor, transactions } = await service.transactionHistory(address, size, pageParam)
			return {
				cursor,
				transactions: transactions.flatMap(tx => {
					tx.actions = tx.actions.filter(a => a.from_account === address || a.to_account === address)
					return tx.actions.length > 0 ? [tx] : []
				}),
			}
		},
		{
			getNextPageParam: lastPage => lastPage.cursor,
			enabled: !!address,
		},
	)
}

export const useDecryptTransaction = (tx: Transaction, activity?: Action) => {
	const { account } = useStore(state => ({
		account: state.account,
	}))
	const address = account?.address.toString()

	return useQuery(
		['useDecryptTransaction', address, tx.id],
		async () => {
			if (address === activity.from_account) {
				return decryptTransaction(account, activity.to_account, tx.message)
			}
			return decryptTransaction(account, activity.from_account, tx.message)
		},
		{
			enabled: !!activity && !!account,
		},
	)
}