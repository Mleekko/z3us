import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const indexAssetsOuterWrapper = style([
	sprinkles({
		position: 'relative',
		paddingBottom: {
			mobile: 'large',
			desktop: 'xlarge',
		},
	}),
	{},
])

export const indexAssetsWrapper = style([
	sprinkles({
		position: 'relative',
		marginX: {
			mobile: 'large',
			desktop: 'xlarge',
		},
	}),
	{},
])

export const indexAssetsTitleWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		gap: {
			mobile: 'large',
			desktop: 'large',
		},
		paddingBottom: {
			mobile: 'small',
			desktop: 'small',
		},
		paddingTop: {
			mobile: 'small',
			desktop: 'large',
		},
		paddingX: {
			mobile: 'large',
			desktop: 'xlarge',
		},
	}),
	{},
])

export const indexAssetWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{
		height: '86px',
	},
])

export const indexAssetLinkRowLoadingGrid = style([
	sprinkles({
		position: 'relative',
		width: 'full',
		display: 'grid',
	}),
	{
		gap: '1rem',
		gridTemplateColumns: '1fr 304px',
	},

	responsiveStyle({
		tablet: {
			gap: '1rem',
			gridTemplateColumns: '1fr 5px',
		},
		desktop: {
			gap: '1rem',
			gridTemplateColumns: '1fr 304px',
		},
	}),
])

export const indexAssetLinkRowLoading = style([
	sprinkles({
		color: 'borderDivider',
		transition: 'fast',
		display: 'flex',
		alignItems: 'center',
		width: 'full',
	}),
	{
		boxShadow: '0 -1px 0 0',
		height: '86px',
	},
])

export const indexAssetLinkRowLoadingAssetCircles = style([
	sprinkles({
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginRight: 'xlarge',
		display: {
			tablet: 'none',
			desktop: 'flex',
		},
	}),
	{},
])

export const indexAssetLinkRow = style([
	sprinkles({
		width: 'full',
		color: 'borderDivider',
		transition: 'fast',
		display: 'block',
	}),
	{
		boxShadow: '0 -1px 0 0',
		'::before': {
			content: '""',
			position: 'absolute',
			transition: vars.transition.fast,
			top: 0,
			opacity: 0,
			bottom: 0,
			left: `calc(${vars.spacing.medium} * -1)`,
			right: `calc(${vars.spacing.medium} * -1)`,
			pointerEvents: 'none',
			boxShadow: vars.color.shadowActivePanel,
			color: vars.color.borderDivider,
			borderRadius: vars.border.radius.medium,
			background: vars.color.bai_pearl200,
		},
		selectors: {
			[`.${darkMode} &::before`]: {
				background: vars.color.lead400,
			},
		},
	},
])

export const indexAssetLinkRowHover = style([
	sprinkles({}),
	{
		boxShadow: 'none',
		'::before': {
			opacity: 1,
		},
	},
])

export const indexAssetLinkRowInner = style([
	sprinkles({
		position: 'relative',
		flexGrow: 1,
		width: 'full',
	}),
	{
		paddingTop: '24px',
		paddingBottom: '24px',
	},
])

export const textMaxWidthWrapper = style([
	{
		maxWidth: 'calc(100% - 260px)',
	},
	responsiveStyle({
		tablet: { maxWidth: 'calc(100% - 40px)' },
		desktop: { maxWidth: 'calc(100% - 260px)' },
	}),
])

globalStyle(`.${darkMode} ${indexAssetLinkRow} > a:hover`, {
	background: vars.color.wax500,
})

globalStyle(`${indexAssetWrapper}:first-child > div > div > a`, {
	boxShadow: 'none',
})

globalStyle(`${indexAssetWrapper}:first-child > div`, {
	boxShadow: 'none',
})

export const indexAssetRowOverlay = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		right: 0,
		height: 'full',
		alignItems: 'center',
		pointerEvents: 'none',
		display: {
			mobile: 'none',
			desktop: 'flex',
		},
	}),
	{},
])

export const indexAssetCircle = style([
	sprinkles({
		position: 'relative',
		borderRadius: 'full',
		pointerEvents: 'auto',
	}),
	{
		marginLeft: '-9px',
	},
])

export const indexAssetCircleAvatar = style([
	sprinkles({
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 'full',
		userSelect: 'none',
	}),
	{},
])

export const recentActivityWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])
