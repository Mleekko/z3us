import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'

export const interactionWrapper = style([
	sprinkles({
		position: 'relative',
		height: 'vh100',
		width: 'vw100',
		// padding: {
		// 	mobile: 'large',
		// },
		background: 'backgroundSecondary',
	}),
	{},
	// responsiveStyle({
	// 	mobile: { height: '48px' },
	// 	tablet: { height: '64px' },
	// }),
])

export const interactionScrollWrapper = style([
	sprinkles({
		height: 'full',
		width: 'full',
	}),
	{},
])

export const interactionInnerWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		height: 'full',
		padding: {
			mobile: 'large',
			tablet: 'xlarge',
		},
	}),
	{
		minHeight: '100vh',
	},
])

export const interactionCancelledWrapper = style([
	sprinkles({
		position: 'relative',
		paddingTop: 'large',
		display: 'flex',
		flexDirection: 'column',
		gap: 'small',
		flexGrow: 1,
		justifyContent: 'space-between',
	}),
	{},
])

export const interactionCancelledButtonWrapper = style([
	sprinkles({
		borderTop: 1,
		borderStyle: 'solid',
		borderColor: 'borderDivider',
		paddingTop: 'large',
	}),
	{},
])

export const interactionCloseButtonWrapper = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		right: 0,
		marginTop: 'medium',
		marginRight: 'medium',
	}),
	{},
])
