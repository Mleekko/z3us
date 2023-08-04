/* eslint-disable @typescript-eslint/no-unused-vars */
import { useAccountParam, useAssetParam, useIsActivity } from 'packages/ui/src/hooks/use-params'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { AssetActivityCell } from './asset-activity-cell'
import { AssetHomeCell } from './asset-home-cell'
import { AssetHomeCellLinks } from './asset-home-cell-links'
import { AssetNameCell } from './asset-name-cell'
import { AssetStatisticCell } from './asset-statistic-cell'
import * as styles from './assets-table.css'

const generateRandomString = () => Math.random().toString(36).substring(7)

const loadingItems = Array.from({ length: 4 }).map((_, i, a) => {
	const randomStr = generateRandomString()
	return {
		id: `${i}-${randomStr}`,
		token: `${i}-${randomStr}`,
		portfolio: '65%',
		price: '$1.83',
		balance: '99',
	}
})

type TAssetsTable = {
	items: any
	columns: any
	loading: boolean
	loadMore: boolean
	onRowSelected: (row: any) => void
	onEndReached: () => void
}

export const useAssetsTable = (): TAssetsTable => {
	const { assetType } = useParams()
	const navigate = useNavigate()
	const account = useAccountParam()
	const asset = useAssetParam()
	const isAccountActivityRoute = useIsActivity()

	const columnsAssets = useMemo(
		() => [
			{
				Header: 'Token',
				accessor: 'token',
				width: '50%',
				Cell: AssetNameCell,
			},
			{
				Header: 'Portfolio',
				accessor: 'portfolio',
				width: 'auto',
				Cell: AssetStatisticCell,
				className: styles.mobileHideTableCellWrapper,
			},
			{
				Header: 'Balance',
				accessor: 'balance',
				width: 'auto',
				Cell: AssetStatisticCell,
				className: styles.mobileHideTableCellWrapper,
			},
			{
				Header: 'Price',
				accessor: 'price',
				width: 'auto',
				Cell: AssetStatisticCell,
				className: styles.mobileHideTableCellWrapper,
			},
		],
		[],
	)

	const columnsHome = useMemo(
		() => [
			{
				Header: 'Asset',
				accessor: 'token',
				width: '50%',
				Cell: AssetHomeCell,
			},
			{
				Header: '',
				accessor: 'portfolio',
				width: 'auto',
				Cell: AssetHomeCellLinks,
				className: styles.mobileHideTableCellWrapper,
			},
		],
		[],
	)

	const columnsActivity = useMemo(
		() => [
			{
				Header: 'Activity',
				accessor: 'Activity',
				width: 'auto',
				Cell: AssetActivityCell,
			},
		],
		[],
	)

	const [items, setItems] = useState<any>(loadingItems)
	const [loading, setLoading] = useState<boolean>(true)
	const [loadMore, setLoadMore] = useState<boolean>(false)
	const [columns, setColumns] = useState<any>(columnsHome)

	// TODO: should probably pass just ID? not row??
	const handleRowSelected = (row: any) => {
		const { original } = row
		navigate(`/accounts${original.id ? `/${original.id}` : ''}?account=${account}`)
	}

	const handleEndReached = () => {
		setLoadMore(true)
		setTimeout(() => {
			const newItems = Array.from({ length: 50 }).map((_, i, a) => {
				const randomStr = generateRandomString()
				return {
					id: `${account} - ${randomStr}`,
					token: `${account} - ${randomStr}`,
					portfolio: '65%',
					price: '$1.83',
					balance: '99',
				}
			})
			setItems(prev => [...prev, ...newItems])
			setLoadMore(false)
		}, 2000)
	}

	useEffect(() => {
		setLoading(true)
		setTimeout(() => {
			const newItems = Array.from({ length: assetType ? 50 : 4 }).map((_, i, a) => {
				const randomStr = generateRandomString()
				return {
					id: randomStr,
					token: `${account} - ${randomStr}`,
					portfolio: '65%',
					price: '$1.83',
					balance: '99',
				}
			})
			setItems(newItems)
			setLoading(false)
		}, 2000)
	}, [])

	useEffect(() => {
		setLoading(true)
		setTimeout(() => {
			const newItems = Array.from({ length: assetType ? 50 : 4 }).map((_, i, a) => {
				const randomStr = generateRandomString()
				return {
					id: randomStr,
					token: `${account} - ${randomStr}`,
					portfolio: '65%',
					price: '$1.83',
					balance: '99',
				}
			})
			setItems(newItems)

			if (isAccountActivityRoute) {
				setColumns(columnsActivity)
			} else if (assetType) {
				setColumns(columnsAssets)
			} else {
				setColumns(columnsHome)
			}

			setLoading(false)
		}, 2000)
	}, [account, assetType, asset, isAccountActivityRoute])

	return {
		items,
		columns,
		loading,
		loadMore,
		onRowSelected: handleRowSelected,
		onEndReached: handleEndReached,
	}
}
