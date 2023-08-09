/* eslint-disable @typescript-eslint/no-unused-vars */
// import { responsiveStyle } from 'ui/src/components/system/theme-utils'
import { globalStyle, style } from '@vanilla-extract/css'

import { darkMode, sprinkles } from 'ui/src/components/system/sprinkles.css'
import { vars } from 'ui/src/components/system/theme.css'

export const activityWrapper = style([
	sprinkles({
		position: 'relative',
		background: 'backgroundSecondary',
		display: {
			mobile: 'none',
			tablet: 'flex',
		},
		flexDirection: 'column',
		borderBottomRightRadius: 'large',
		borderBottomLeftRadius: 'large',
		paddingBottom: 'medium',
	}),
	{
		width: '100%',
	},
	// responsiveStyle({
	// 	mobile: { width: '100%' },
	// 	tablet: { width: '33%' },
	// 	desktop: { width: '25%' },
	// }),
])

export const activityItem = style([
	sprinkles({
		position: 'relative',
		paddingX: 'large',
		transition: 'fast',
		// background: {
		// 	hover: 'backgroundPrimary',
		// },
	}),
])

export const activityItemOuter = style([
	sprinkles({
		position: 'relative',
	}),
	{
		height: '60px',
	},
])

export const activityItemExternalLinkWrapper = style([
	sprinkles({
		position: 'absolute',
		right: 0,
		top: 0,
		display: 'flex',
		alignItems: 'center',
		pointerEvents: 'none',
		opacity: 0,
	}),
	{
		height: '64px',
	},
])

export const activityItemExternalLinkWrapperActive = style([
	sprinkles({
		opacity: 1,
	}),
	{},
])

globalStyle(`${activityItemExternalLinkWrapperActive} > a`, {
	pointerEvents: 'auto',
})

export const activityItemInner = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		color: 'borderDivider',
		transition: 'fast',
		border: 0,
	}),
	{
		width: '100%',
		height: 'auto',
		boxShadow: '0 -1px 0 0',
		'::before': {
			content: '""',
			position: 'absolute',
			opacity: 0,
			transition: vars.transition.fast,
			top: 0,
			bottom: 0,
			left: `calc(${vars.spacing.medium} * -1)`,
			right: `calc(${vars.spacing.medium} * -1)`,
			pointerEvents: 'none',

			// TODO: fix needing to make these a string
			boxShadow: `${vars.color.shadowActivePanel}`,
			color: `${vars.color.borderDivider}`,
			borderRadius: vars.border.radius.medium,
			background: vars.color.bai_pearl200,
		},
		selectors: {
			[`.${darkMode} &::before`]: {
				background: vars.color.lead400,
			},
			'&:focus-visible': {
				outline: 'none',
			},
			'&:hover::before': {
				opacity: 1,
			},
		},
	},
])

// TODO: put a class on ListContainer to fix this
globalStyle(`${activityWrapper} > div > div > div > div:first-child ${activityItemInner}`, {
	boxShadow: 'none',
})

export const activityItemInnerBtn = style([
	sprinkles({
		display: 'flex',
		alignItems: 'center',
		position: 'relative',
		paddingTop: 'medium',
		paddingBottom: 'medium',
		width: 'full',
		gap: 'medium',
		cursor: 'pointer',
	}),
	{
		selectors: {
			'&:focus-visible': {
				outline: 'none',
			},
			'&:focus-visible::before': {
				outline: 'none',
				border: 'none',
			},
			'&:hover::before': {
				opacity: 1,
			},
		},
	},
])

export const activityItemTextWrapper = style([
	sprinkles({
		display: 'flex',
		flexDirection: 'column',
		flexGrow: 1,
	}),
	{
		// maxWidth: 'calc(100% - 82px)',
	},
])

export const activityItemInnerSelected = style([
	sprinkles({}),
	{
		boxShadow: 'none',
		'::before': {
			opacity: 1,
		},
	},
])

globalStyle(`${activityItemInnerSelected} ${activityItemTextWrapper}`, {
	maxWidth: 'calc(100% - 82px)',
})

export const activityItemInnerSelectedContent = style([
	sprinkles({
		width: 'full',
	}),
	{},
])

export const transactionDottedLine = style([
	sprinkles({
		flexGrow: 1,
	}),
	{
		borderTop: '1px dashed',
		borderColor: vars.color.wax300,
		height: '0px',
		marginTop: '10px',
		color: 'white',
	},
])

export const indicatorCircle = style([
	sprinkles({
		position: 'relative',
		color: 'colorStrong',
		background: 'backgroundPrimary',
		borderRadius: 'full',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		flexShrink: 0,
	}),
	{
		width: '36px',
		height: '36px',
	},
])
