import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const landingWrapper = style([
	sprinkles({
		display: 'block',
	}),
	{
		gap: '1em',
	},
])
