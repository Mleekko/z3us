/* eslint-disable react/no-unstable-nested-components */
import { assignInlineVars } from '@vanilla-extract/dynamic'
import clsx, { type ClassValue } from 'clsx'
import React, { useEffect, useMemo, useState } from 'react'
import { useRowSelect, useSortBy, useTable } from 'react-table'
import useMeasure from 'react-use-measure'
import { type TableComponents, TableVirtuoso } from 'react-virtuoso'

import { Box } from '../box'
import { ChevronDown2Icon, ChevronUp2Icon, LoadingBarsIcon } from '../icons'
import * as styles from './table.css'

interface ITableProps {
	columns: Array<{
		Header: React.ReactNode | React.FC
		Cell?: React.ReactNode | React.FC
		accessor: string
		width: string
		className?: string
	}>
	data: Array<object>
	scrollableNode?: HTMLElement
	className?: ClassValue
	sizeVariant?: 'medium' | 'large'
	styleVariant?: 'primary' | 'secondary'
	loading?: boolean
	// Will adjust the THEAD sticky position and ensure shadow on sticky THEAD when scrolled
	stickyShadowTop?: boolean
	loadMore?: boolean
	overscan?: number
	isScrolledTop?: boolean
	selectedRowIds?: { [key: number]: boolean }
	sort?: { id: string; desc: boolean }
	onEndReached?: () => void
	// TODO: should this just be ID?? and not the whole row??
	onRowSelected?: (row: any) => void
}

export const Table: React.FC<ITableProps> = props => {
	const {
		scrollableNode,
		isScrolledTop,
		className,
		sizeVariant = 'medium',
		styleVariant = 'primary',
		data,
		columns,
		selectedRowIds = {},
		loading = false,
		loadMore = false,
		stickyShadowTop = false,
		overscan = 100,
		sort,
		onEndReached = () => {},
		onRowSelected = () => {},
	} = props

	const [measureRef, { top: tableTop }] = useMeasure()

	const initialSort = useMemo(() => {
		if (sort || !columns?.length) return sort
		return [{ id: columns[0].accessor, desc: true }]
	}, [sort])

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, toggleAllRowsSelected } = useTable(
		{
			columns,
			data,
			initialState: {
				sortBy: initialSort,
				selectedRowIds,
			},
		},
		useSortBy,
		useRowSelect,
	)

	const handleDeselectAllRows = () => {
		toggleAllRowsSelected(false)
	}

	const handleEndReached = () => {
		onEndReached()
	}

	const memoizedComponents = useMemo(
		() => ({
			Table: ({ style, ...tableProps }) => (
				<table
					{...getTableProps()}
					{...tableProps}
					className={styles.tableRecipe({
						sizeVariant,
						styleVariant,
					})}
					style={{ ...style }}
				/>
			),
			TableBody: React.forwardRef((tableBodyProps, ref) => (
				<tbody {...getTableBodyProps()} {...tableBodyProps} ref={ref} />
			)),
			TableRow: tableRowProps => {
				// eslint-disable-next-line react/destructuring-assignment
				const index = tableRowProps['data-index']
				const row = rows[index]
				const rowSelectedProps = row?.getToggleRowSelectedProps ? row?.getToggleRowSelectedProps() : null
				return (
					<tr
						onClick={e => {
							handleDeselectAllRows()
							onRowSelected(row)
							if (rowSelectedProps) rowSelectedProps.onChange(e)
						}}
						className={clsx(
							styles.tableTrRecipe({
								sizeVariant,
								styleVariant,
								isRowSelectable: !!onRowSelected,
							}),
							!loading && rowSelectedProps?.checked && 'tr-selected',
						)}
						{...tableRowProps}
						{...(row?.getRowProps ? row?.getRowProps() : {})}
					/>
				)
			},
			TableFoot: React.forwardRef((tableBodyProps, ref) => (
				<tfoot
					className={clsx(styles.tFootWrapper, loadMore && styles.tFootWrapperVisible)}
					{...getTableBodyProps()}
					{...tableBodyProps}
					ref={ref}
				/>
			)),
		}),
		[data, columns, loading, loadMore],
	)

	return (
		<Box
			ref={measureRef}
			className={clsx(styles.tableWrapper, className)}
			style={assignInlineVars({ [styles.stickyTop]: `${tableTop - scrollableNode.getBoundingClientRect().top}px` })}
		>
			<TableVirtuoso
				className={clsx(
					styles.tableRootWrapper,
					loading && styles.tableLoadingWrapper,
					stickyShadowTop && styles.tableRootTopStickyPosition,
					!loading && stickyShadowTop && !isScrolledTop && styles.accountTheadShadow,
				)}
				overscan={{ main: overscan, reverse: overscan }}
				totalCount={rows.length}
				customScrollParent={scrollableNode}
				components={memoizedComponents as TableComponents}
				endReached={handleEndReached}
				fixedHeaderContent={() =>
					headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map(column => (
								<th
									className={clsx(
										styles.tableThRecipe({
											sizeVariant,
											styleVariant,
											loading,
										}),
										column.className,
									)}
									{...column.getHeaderProps(column.getSortByToggleProps())}
									style={{
										width: column.width,
									}}
								>
									<Box position="relative" component="span" display="inline-flex" alignItems="center" gap="xsmall">
										<Box component="span">{column.render('Header')}</Box>
										<Box component="span" className={styles.tableIconWrapper}>
											{/* eslint-disable-next-line no-nested-ternary */}
											{column.isSorted ? column.isSortedDesc ? <ChevronDown2Icon /> : <ChevronUp2Icon /> : ''}
										</Box>
									</Box>
								</th>
							))}
						</tr>
					))
				}
				fixedFooterContent={() =>
					headerGroups.map(headerGroup => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column, columnIndex) => (
								<th
									className={column.className}
									{...column.getHeaderProps(column.getSortByToggleProps())}
									style={{
										width: column.width,
									}}
								>
									{columnIndex === 0 ? (
										<Box color="colorNeutral" className={styles.footerLoadingIconWrapper}>
											<LoadingBarsIcon />
										</Box>
									) : (
										<Box className={styles.footerLoadingDefaultWrapper}>&nbsp;</Box>
									)}
								</th>
							))}
						</tr>
					))
				}
				itemContent={index => {
					const row = rows[index]
					prepareRow(row)
					return row.cells.map(cell => (
						<td
							className={clsx(
								styles.tableTdRecipe({
									sizeVariant,
									styleVariant,
								}),
								cell.column.className,
							)}
							{...cell.getCellProps()}
						>
							{cell.render('Cell')}
						</td>
					))
				}}
			/>
		</Box>
	)
}