/* eslint-disable @typescript-eslint/no-unused-vars */
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const assetHomeCellLinksWrapper = style([
	sprinkles({
		position: 'relative',
	}),
	{},
])

export const assetHomeCellLinksContentWrapper = style([
	sprinkles({
		position: 'relative',
		color: 'colorNeutral',
		display: 'flex',
		alignItems: 'center',
		transition: 'fast',
		gap: {
			mobile: 'medium',
		},
	}),
	{
		height: '48px',
	},
])

export const assetHomeCellLinksLoadingWrapper = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		pointerEvents: 'none',
		transition: 'fast',
		display: 'flex',
		gap: 'medium',
		alignItems: 'center',
		opacity: 0,
	}),
	{},
])

export const assetHomeCellLinksIconsWrapper = style([
	sprinkles({
		display: 'flex',
		marginLeft: 'small',
		marginRight: 'small',
	}),
	{},
])

globalStyle(`${assetHomeCellLinksIconsWrapper} > a:nth-child(1)`, {
	marginLeft: '0px',
})

globalStyle(`${assetHomeCellLinksIconsWrapper} > a`, {
	position: 'relative',
	marginLeft: '-10px',
})

globalStyle(`${assetHomeCellLinksIconsWrapper} > a:hover`, {
	zIndex: '1',
})
