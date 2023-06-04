/* eslint-disable @typescript-eslint/no-unused-vars */
import { keyframes, style } from '@vanilla-extract/css'

import { fadeIn, fadeOut,  sharedPopoverBgStyles } from '../dropdown-menu/dropdown-menu.css'
import type { Sprinkles} from '../system/sprinkles.css';
import { sprinkles } from '../system/sprinkles.css'
import { responsiveStyle } from '../system/theme-utils'

export const popoverContentWrapper = style([
	sprinkles({
		...(sharedPopoverBgStyles as Sprinkles),
	}),
	{
		overscrollBehavior: 'contain',
		padding: '0',
		margin: '0',
		minWidth: '70px',
		transformOrigin: 'var(--radix-dropdown-menu-content-transform-origin)',
		animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
		willChange: 'transform, opacity',
		animationDuration: '300ms',
		selectors: {
			'&:focus-visible': {
				outline: 'none',
			},
			'&[data-state="open"]': {
				animationName: fadeIn,
				animationFillMode: 'forwards',
			},
			'&[data-state="closed"]': {
				animationName: fadeOut,
				animationFillMode: 'forwards',
			},
		},
	},
])
