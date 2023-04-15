import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components-v2/system/sprinkles.css'

export const transactionIconWrapper = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'full',
		borderWidth: 'xsmall',
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		flexShrink: 0,
	}),
	{
		width: '38px',
		height: '38px',
	},
])

export const transactionIconMediumWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		width: '68px',
		height: '68px',
	},
])

export const transactionAvatarRootWrapper = style([
	sprinkles({
		borderRadius: 'full',
		width: 'full',
		height: 'full',
	}),
	{},
])

export const transactionAvatarWrapper = style([
	sprinkles({
		borderRadius: 'full',
		width: 'full',
		height: 'full',
	}),
	{},
])

export const transactionTypeWrapper = style([
	sprinkles({
		position: 'absolute',
		borderRadius: 'full',
		color: 'colorNeutral',
		background: 'backgroundPrimary',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderStyle: 'solid',
		borderWidth: 'xxsmall',
		borderColor: 'backgroundSecondary',
	}),
	{
		width: '20px',
		height: '20px',
		bottom: '-4px',
		right: '-4px',
	},
])

globalStyle(`${transactionTypeWrapper} svg`, {
	width: '12px',
	height: '12px',
})
