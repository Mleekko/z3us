import { globalStyle, style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'
import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { vars } from 'ui/src/components/system/theme.css'

export const headerWrapper = style([
	sprinkles({
		borderBottom: 1,
		borderBottomStyle: 'solid',
		borderColor: 'lead800',
	}),
	{},
])

export const headerTextLinks = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		gap: 'large',
		paddingRight: 'large',
	}),
	{},
])

export const headerSocialLinks = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		gap: 'xsmall',
	}),
	{
		marginRight: '0px',
	},
])

// export const landingPageHeaderWrapper = style([
// 	sprinkles({
// 		position: 'relative',
// 		borderBottom: 1,
// 		borderBottomStyle: 'solid',
// 		borderColor: 'lead800',
// 	}),
// 	{},
// ])

// TODO: inner shadow border
export const headerWrapperBorderColor = style([
	sprinkles({
		borderColor: {
			lightMode: 'bleached_silk600',
			darkMode: 'lead500',
		},
	}),
	{},
])

export const headerInnerWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
	}),
	{},
	responsiveStyle({
		mobile: { height: '58px' },
		tablet: { height: '70px' },
	}),
])

export const landingLogoWrapper = style([
	sprinkles({
		display: 'flex',
	}),
	responsiveStyle({
		mobile: { width: '100px' },
		tablet: { width: 'auto' },
	}),
])

export const landingHeaderBrandWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
			desktop: 'flex',
		},
		alignItems: 'center',
	}),
	{},
])

export const headerMobileMenuWrapper = style([
	sprinkles({
		display: {
			mobile: 'flex',
			desktop: 'none',
		},
		alignItems: 'center',
	}),
	{},
])

export const connectButtonWrapper = style([
	sprinkles({
		display: 'flex',
		justifyContent: 'flex-end',
	}),
	{
		width: '140px',
	},
])

export const connectedMenuWrapper = style([
	sprinkles({
		display: 'flex',
		flexGrow: 1,
		paddingRight: 'small',
	}),
	{
		minHeight: '32px',
	},
])

export const connectedMenuVisibleWrapper = style([
	sprinkles({
		display: 'flex',
		gap: 'small',
		alignItems: 'center',
		width: 'full',
	}),
	{},
])

export const navigationCopyAddressWrapper = style([
	sprinkles({
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
	}),
	{},
])

export const landingPageHeaderInnerWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
	}),
	{},
	responsiveStyle({
		// mobile: { width: '100%' },
		tablet: { height: '72px' },
		// desktop: { width: '25%' },
	}),
])

export const landingHeaderZ3usLink = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		alignItems: 'center',
		gap: 'small',
	}),
	{},
])

export const landingPageHeaderMenuWrapper = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		flexGrow: 1,
	}),
	{},
])

globalStyle(`${landingHeaderZ3usLink} > div`, {
	transition: vars.transition.fastall,
})

globalStyle(`${landingHeaderZ3usLink}:hover > div:nth-child(1)`, {
	background: vars.color.blue_magenta400,
})

globalStyle(`${landingHeaderZ3usLink}:hover > div:nth-child(2) svg`, {
	fill: vars.color.blue_magenta400,
})
