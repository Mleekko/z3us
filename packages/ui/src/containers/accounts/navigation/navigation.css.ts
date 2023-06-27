import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { vars } from 'ui/src/components/system/theme.css'

export const navigationWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'center',
		borderBottom: 1,
		borderBottomStyle: 'solid',
		borderColor: {
			lightMode: 'bleached_silk600',
			darkMode: 'lead500',
		},
		paddingX: {
			mobile: 'large',
			desktop: 'xxlarge',
		},
	}),
	{},
])

export const navigationContainer = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
	}),
	{
		height: '70px',
	},
])

export const navigationMenu = style([
	sprinkles({
		flexGrow: 1,
		gap: 'medium',
		paddingLeft: 'large',
		display: {
			mobile: 'none',
			desktop: 'flex',
		},
	}),
	{},
])

export const navigationMenuTabletWrapper = style([
	sprinkles({
		flexGrow: 1,
		paddingLeft: 'medium',
		display: {
			mobile: 'none',
			tablet: 'flex',
			desktop: 'none',
		},
	}),
	{},
])

export const navigationMenuActiveLine = style([
	sprinkles({
		position: 'absolute',
		inset: 0,
		pointerEvents: 'none',
		borderRadius: 'xlarge',
		background: {
			lightMode: 'white',
			darkMode: 'backgroundSecondary',
		},
	}),
	{
		height: '100%',
		width: '100%',
	},
])

export const copiedAnimationWrapper = style([
	sprinkles({
		display: 'flex',
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
	}),
	{
		height: '24px',
		width: '24px',
	},
])

export const accountsHomeMobileHeader = style([
	sprinkles({
		position: 'absolute',
		top: 0,
		left: 0,
		width: 'full',
		pointerEvents: 'none',
		display: 'flex',
		justifyContent: 'flex-end',
		transition: 'fast',
	}),
	{
		height: '48px',
	},
])

export const accountsHomeMobileHeaderShadow = style([
	sprinkles({
		background: 'backgroundPrimary',
		boxShadow: 'shadowScrollTop',
	}),
	{},
])

export const accountsHomeMobileHeaderWalletWrapper = style([
	sprinkles({
		pointerEvents: 'auto',
		display: 'flex',
		alignItems: 'center',
		paddingX: 'small',
	}),
	{
		height: '48px',
		width: '100%',
	},
])

export const navigationMobileWrapper = style([
	sprinkles({
		display: 'flex',
		borderTop: 1,
		zIndex: 1,
		borderTopStyle: 'solid',
		width: 'full',
		borderColor: 'borderDivider',
	}),
	{
		height: '48px',
	},
])

export const navigationMenuLinkMobile = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		paddingX: 'medium',
		justifyContent: 'center',
		position: 'relative',
		textDecoration: 'none',
		transition: 'fast',
		boxShadow: {
			focusVisible: 'btnSecondaryShadowFocus',
		},
		background: {
			lightMode: 'backgroundSecondary',
			darkMode: 'backgroundSecondary',
		},
	}),
	{
		outline: 0,
		width: '25%',
		flexBasis: '25%',
		selectors: {
			'&:focus-visible': {
				position: 'relative',
				zIndex: 1,
			},
			[`.${darkMode} &:hover`]: {
				background: vars.color.lead400,
			},
		},
	},
])

export const navigationMenuLinkMobileCircle = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 'full',
		transition: 'fast',
	}),
	{
		width: '32px',
		height: '32px',
	},
])

export const navigationMenuLinkMobileCircleSelect = style([
	sprinkles({
		color: 'white',
		background: 'purple400',
	}),
	{},
])

globalStyle(`${navigationMenuLinkMobile}:hover ${navigationMenuLinkMobileCircle}`, {
	background: vars.color.lead300,
	color: vars.color.white,
})

globalStyle(`${navigationMenuLinkMobile}:hover ${navigationMenuLinkMobileCircleSelect}`, {
	color: vars.color.white,
	background: vars.color.purple400,
})

globalStyle(`.${darkMode} ${navigationMenuLinkMobile}:hover ${navigationMenuLinkMobileCircle}`, {
	color: vars.color.white,
	background: vars.color.lead300,
})

globalStyle(`.${darkMode} ${navigationMenuLinkMobile}:hover ${navigationMenuLinkMobileCircleSelect}`, {
	color: vars.color.white,
	background: vars.color.purple400,
})
