import clsx, { type ClassValue } from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { ChevronRightIcon } from 'ui/src/components/icons'
import { Link } from 'ui/src/components/router-link'

import * as styles from './styles.css'

interface IListProps {
	className?: ClassValue
	children?: React.ReactNode | React.ReactElement[]
}

export const List: React.FC<IListProps> = props => {
	const { className, children } = props

	return (
		<Box component="ul" className={clsx(styles.listWrapper, className)}>
			{children}
		</Box>
	)
}

interface IListItemProps {
	className?: ClassValue
	onClick?: () => void
	children?: React.ReactNode | React.ReactElement[]
	href?: string
	iconLeft?: React.ReactNode
	iconRight?: React.ReactNode
}

export const ListItem: React.FC<IListItemProps> = props => {
	const { className, onClick, children, href, iconLeft, iconRight = <ChevronRightIcon /> } = props
	const hasLink = !!href

	const getChildren = () => (
		<Box className={styles.listItemInnerWrapper}>
			{iconLeft && <Box className={styles.listIconWrapper}>{iconLeft}</Box>}
			<Box className={styles.listTextWrapper}>{children}</Box>
			{iconRight && <Box className={styles.listIconWrapper}>{iconRight}</Box>}
		</Box>
	)

	return hasLink ? (
		<Link href={href} className={clsx(styles.listItemWrapper, styles.listItemLink, className)} underline="never">
			{getChildren()}
		</Link>
	) : (
		<Box
			onClick={onClick}
			role="button"
			component="li"
			className={clsx(styles.listItemWrapper, !!onClick && styles.listItemLink, className)}
		>
			{getChildren()}
		</Box>
	)
}