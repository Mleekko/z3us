/* eslint-disable @typescript-eslint/no-unused-vars */
import clsx from 'clsx'
import React, { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { ResourceImageIcon } from 'ui/src/components/resource-image-icon'
import { Link } from 'ui/src/components/router-link'
import * as skeletonStyles from 'ui/src/components/styles/skeleton-loading.css'
import { Table } from 'ui/src/components/table'
import { TransactionIcon } from 'ui/src/components/transaction-icon'
import { Text } from 'ui/src/components/typography'
import { useAccountParams } from 'ui/src/hooks/use-account-params'

import * as styles from './assets-table.css'

export const hash = () => Math.random().toString(36).substring(7)

interface ICellProps {
	value?: any
	row?: any
}

export const CellC: React.FC<ICellProps> = props => {
	const {
		value,
		row: { original },
	} = props

	const { id, address } = original

	return (
		<Box key={id} display="flex">
			<Text size="small" color="strong" truncate>
				{value}
			</Text>
		</Box>
	)
}

interface IAddressNameCellProps {
	value?: any
	row?: any
}

export const AddressNameCell: React.FC<IAddressNameCellProps> = props => {
	const {
		value,
		row: { original },
	} = props

	const { id, address } = original
	const resourceAddress = '78374384783748374'

	return (
		<Box key={id} display="flex" alignItems="center" gap="medium">
			<ResourceImageIcon size="large" address={resourceAddress} />
			<Text capitalizeFirstLetter size="small" color="strong" truncate weight="medium">
				{value} - lorem Nulla dolore veniam reprehenderit laborum cupidatat officia elit anim enim. Sint sit incididunt
				cupidatat esse laboris elit anim incididunt. Esse culpa officia enim non irure labore ut minim. Anim dolore duis
				quis sit ex ad aliqua eu adipisicing proident nisi voluptate. Quis deserunt id laboris proident amet aliquip.
			</Text>
		</Box>
	)
}

interface IAccountTableProps {
	scrollableNode?: HTMLElement
}

// eslint-disable-next-line arrow-body-style
const generateRandomString = () => {
	return Math.floor(Math.random() * Date.now()).toString(36)
}

export const AssetsTable: React.FC<IAccountTableProps> = props => {
	const { pathname } = useLocation()
	const navigate = useNavigate()
	const { scrollableNode } = props
	const { account, assetType, asset } = useAccountParams()
	const [items, setItems] = useState<any>([])

	useEffect(() => {
		setItems(
			Array.from({ length: 500 }).map((_, i, a) => {
				const randomStr = generateRandomString()
				return {
					id: randomStr,
					token: `${account} - ${randomStr}`,
					portfolio: '65%',
					price: '$1.83',
					balance: `99`,
				}
			}),
		)
	}, [account])

	const columns = useMemo(
		() => [
			{
				Header: 'Token',
				accessor: 'token',
				width: '50%',
				Cell: AddressNameCell,
			},
			{
				Header: 'Portfolio',
				accessor: 'portfolio',
				width: 'auto',
				Cell: CellC,
			},
			{
				Header: 'Balance',
				accessor: 'balance',
				width: 'auto',
				Cell: CellC,
			},
			{
				Header: 'Price',
				accessor: 'price',
				width: 'auto',
				Cell: CellC,
			},
		],
		[account, assetType, asset],
	)

	const handleRowSelected = (row: any) => {
		const { original } = row

		navigate(`/accounts/${account}/${original.id}`)
	}

	return (
		<Box className={styles.assetsTableWrapper}>
			{/* <Table
				styleVariant="primary"
				sizeVariant="large"
				scrollableNode={scrollableNode ?? undefined}
				data={items}
				columns={columns}
				onRowSelected={handleRowSelected}
			/> */}
			{Array.from({ length: 20 }, (_, i) => (
				<Text size="xlarge" key={i}>
					Lorum ipsumIn convallis vel neque facilisis est mi in varius gravida eget convallis convallis ut velit lacus,
					eros faucibus odio. Varius dui porttitor eu ac egestas in tempus nisi suscipit fusce urna. Vitae semper velit
					facilisis nunc, suspendisse vivamus duis vestibulum ullamcorper dui lectus sapien tempus sit eu dapibus arcu
					pellentesque.
				</Text>
			))}
		</Box>
	)
}
