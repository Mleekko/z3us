import { StateNonFungibleDetailsResponseItem } from '@radixdlt/babylon-gateway-api-sdk'
import React, { useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useNavigate, useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { EmptyState } from 'ui/src/components/empty-state'
import { useScroll } from 'ui/src/components/scroll-area-radix/use-scroll'
import { Table } from 'ui/src/components/table'
import { Text } from 'ui/src/components/typography'
import { useBalances } from 'ui/src/hooks/dapp/use-balances'
import { useNonFungibleIds, useNonFungiblesData } from 'ui/src/hooks/dapp/use-entity-nft'
import { useSelectedAccounts } from 'ui/src/hooks/use-accounts'
import { AssetNameCell } from 'ui/src/pages/accounts/components/table/asset-name-cell'
import type { ResourceBalance, ResourceBalanceType } from 'ui/src/types/types'

import * as styles from './styles.css'

const messages = defineMessages({
	collection: {
		id: 'nfts.collection',
		defaultMessage: 'Collection',
	},
	non_fungible_id: {
		id: 'nfts.non_fungible_id',
		defaultMessage: 'ID',
	},
	empty_title: {
		id: 'nfts.empty_title',
		defaultMessage: 'No results',
	},
	empty_subtitle: {
		id: 'nfts.empty_subtitle',
		defaultMessage: 'Could not find any NFTs in this account',
	},
	no_account_subtitle: {
		id: 'nfts.no_account_subtitle',
		defaultMessage: 'To see collection items select an account first',
	},
})

const NFTs: React.FC = () => {
	const intl = useIntl()
	const { scrollableNode, isScrolledTop } = useScroll()
	const navigate = useNavigate()
	const { accountId = '-', resourceId } = useParams()

	const selectedAccounts = useSelectedAccounts()
	const { nonFungibleBalances, isLoading } = useBalances(...selectedAccounts)

	const selectedToken = nonFungibleBalances.find(
		b => b.address === resourceId,
	) as ResourceBalance[ResourceBalanceType.NON_FUNGIBLE]

	const pages = useNonFungibleIds(accountId, selectedToken?.address, selectedToken?.vaults)
	const ids =
		pages
			?.filter(({ data }) => !!data)
			.map(({ data }) => data)
			?.flat() || []

	const { data = [] } = useNonFungiblesData(resourceId, ids)

	const handleRowSelected = (row: { original: StateNonFungibleDetailsResponseItem }) => {
		const { original } = row
		navigate(`/accounts/${accountId}/nfts/${resourceId}/${encodeURIComponent(original.non_fungible_id)}`)
	}

	const columns = useMemo(
		() => [
			{
				Header: intl.formatMessage(messages.collection),
				accessor: 'collection',
				width: 'auto',
				Cell: AssetNameCell,
			},
			{
				Header: intl.formatMessage(messages.non_fungible_id),
				accessor: 'non_fungible_id',
				width: 'auto',
			},
		],
		[],
	)

	if (accountId === '-') {
		return <Text>{intl.formatMessage(messages.no_account_subtitle)}</Text>
	}

	return (
		<Box className={styles.tableWrapper}>
			{nonFungibleBalances?.length === 0 ? (
				<Box display="flex" alignItems="center" justifyContent="center" width="full" paddingY="xxlarge">
					<EmptyState
						title={intl.formatMessage(messages.empty_title)}
						subTitle={intl.formatMessage(messages.empty_subtitle)}
					/>
				</Box>
			) : (
				<Table
					className={styles.tableMinHeightWrapper}
					styleVariant="primary"
					sizeVariant="large"
					scrollableNode={scrollableNode ?? undefined}
					data={data.map(data => ({ ...data, collection: resourceId }))}
					columns={columns}
					isScrolledTop={isScrolledTop}
					onRowSelected={handleRowSelected}
					loading={isLoading}
					// loadMore={loadMore}
					// onEndReached={onEndReached}
				/>
			)}
		</Box>
	)
}

export default NFTs
