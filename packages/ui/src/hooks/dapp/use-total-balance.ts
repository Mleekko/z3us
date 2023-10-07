import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { useResourceType } from 'ui/src/pages/accounts/hooks/use-resource-type'

export const useTotalBalance = () => {
	const intl = useIntl()
	const resourceType = useResourceType()

	const { currency } = useNoneSharedStore(state => ({
		currency: state.currency,
	}))

	const selectedAccounts = useSelectedAccounts()

	const {
		isLoading,
		totalValue,
		totalChange,
		fungibleValue,
		fungibleChange,
		nonFungibleValue,
		nonFungibleChange,
		liquidityPoolTokensValue,
		liquidityPoolTokensChange,
		poolUnitsValue,
		poolUnitsChange,
	} = useBalances(...selectedAccounts)

	const value = useMemo(() => {
		if (resourceType === 'nfts') return nonFungibleValue
		if (resourceType === 'tokens') return fungibleValue
		if (resourceType === 'lp-tokens') return liquidityPoolTokensValue
		if (resourceType === 'pool-units') return poolUnitsValue
		return totalValue
	}, [resourceType, totalValue, fungibleValue, nonFungibleValue])

	const change = useMemo(() => {
		if (resourceType === 'nfts') return nonFungibleChange
		if (resourceType === 'tokens') return fungibleChange
		if (resourceType === 'lp-tokens') return liquidityPoolTokensChange
		if (resourceType === 'pool-units') return poolUnitsChange
		return totalChange
	}, [resourceType, totalValue, fungibleValue, nonFungibleValue])

	return {
		isLoading,
		value,
		formattedValue: intl.formatNumber(value.toNumber(), { style: 'currency', currency }),
		formattedChange: intl.formatNumber(change.toNumber(), { style: 'percent', maximumFractionDigits: 2 }),
		change,
	}
}
