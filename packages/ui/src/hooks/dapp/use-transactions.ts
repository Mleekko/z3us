import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

import { useGatewayClient } from './use-gateway-client'
import { useNetworkId } from './use-network-id'

export const useTransactionStatus = (intent_hash_hex: string) => {
	const networkId = useNetworkId()
	const { state, transaction } = useGatewayClient()!

	return useQuery({
		queryKey: ['useTransactionStatus', networkId, intent_hash_hex],
		queryFn: () =>
			transaction.innerClient.transactionStatus({
				transactionStatusRequest: { intent_hash_hex },
			}),
		enabled: !!state && !!intent_hash_hex,
	})
}

export const useTransaction = (intent_hash_hex: string) => {
	const networkId = useNetworkId()
	const { state, transaction } = useGatewayClient()!

	return useQuery({
		queryKey: ['useTransaction', networkId, intent_hash_hex],
		queryFn: () =>
			transaction.innerClient.transactionCommittedDetails({
				transactionCommittedDetailsRequest: { intent_hash_hex },
			}),
		enabled: !!state && !!intent_hash_hex,
	})
}

export const useTransactions = (addresses: string[]) => {
	const networkId = useNetworkId()
	const { stream } = useGatewayClient()!

	const data = useInfiniteQuery({
		queryKey: ['useTransactions', networkId, ...addresses],
		queryFn: ({ pageParam }) =>
			stream.innerClient.streamTransactions({
				streamTransactionsRequest: { cursor: pageParam, affected_global_entities_filter: addresses },
			}),
		getNextPageParam: lastPage => lastPage.next_cursor,
		getPreviousPageParam: firstPage => firstPage.previous_cursor,
		enabled: !!stream,
	})

	return data
}
