/* eslint-disable react/no-unstable-nested-components */
import clsx, { type ClassValue } from 'clsx'
import React, { useMemo } from 'react'
import { useRowSelect, useSortBy, useTable } from 'react-table'
import { type TableComponents, TableVirtuoso } from 'react-virtuoso'

import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import { Box } from '../box'
import { ChevronDown2Icon, ChevronUp2Icon, LoadingBarsIcon } from '../icons'
import * as styles from './table.css'

interface ITableProps {
	columns: Array<object>
	data: Array<object>
	scrollableNode?: HTMLElement
	className?: ClassValue
	sizeVariant?: 'medium' | 'large'
	styleVariant?: 'primary' | 'secondary'
	loading?: boolean
	loadMore?: boolean
	overscan?: number
	onEndReached?: () => void
	// TODO: type
	onRowSelected?: (row: any) => void
}

export const Table: React.FC<ITableProps> = props => {
	const {
		scrollableNode,
		className,
		sizeVariant = 'medium',
		styleVariant = 'primary',
		data,
		columns,
		loading = false,
		loadMore = false,
		overscan = 100,
		onEndReached = () => {},
		onRowSelected = () => {},
	} = props
	const isMobile = useIsMobileWidth()

	const initialSort = React.useMemo(() => [{ id: 'token', desc: true }], [])
	const initialSelectedRows = React.useMemo(
		() => ({
			2: true, // Select row with ID 2 by default
		}),
		[],
	)

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, toggleAllRowsSelected } = useTable(
		{
			columns,
			data,
			initialState: {
				sortBy: initialSort,
				selectedRowIds: initialSelectedRows,
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
								selected: rowSelectedProps?.checked,
							}),
							rowSelectedProps?.checked && 'tr-selected',
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
		<Box className={styles.tableWrapper}>
			{loading ? (
				<Box className={styles.tableLoadingWrapper}>
					{Array.from({ length: 4 }, (_, i) => (
						<Box key={i} height="xxxlarge">
							loading - {i} - right
						</Box>
					))}
				</Box>
			) : (
				<TableVirtuoso
					className={clsx(styles.tableRootWrapper, className)}
					overscan={overscan}
					totalCount={rows.length}
					customScrollParent={scrollableNode}
					components={memoizedComponents as TableComponents}
					endReached={handleEndReached}
					fixedFooterContent={() =>
						headerGroups.map(headerGroup => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column, columnIndex) => (
									<th
										className={clsx(column.className)}
										{...column.getHeaderProps(column.getSortByToggleProps())}
										style={{
											width: column.width,
										}}
									>
										{columnIndex === 0 ? (
											<Box className={styles.footerLoadingIconWrapper}>
												<LoadingBarsIcon />
											</Box>
										) : (
											<Box style={{ height: '30px' }}>&nbsp;</Box>
										)}
									</th>
								))}
							</tr>
						))
					}
					fixedHeaderContent={() =>
						!isMobile &&
						headerGroups.map(headerGroup => (
							<tr {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => (
									<th
										className={clsx(
											styles.tableThRecipe({
												sizeVariant,
												styleVariant,
											}),
											column.className,
										)}
										{...column.getHeaderProps(column.getSortByToggleProps())}
										style={{
											width: column.width,
										}}
									>
										<Box
											position="relative"
											component="span"
											display="inline-flex"
											alignItems="center"
											gap="xsmall"
											cursor="pointer"
										>
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
			)}
		</Box>
	)
}
