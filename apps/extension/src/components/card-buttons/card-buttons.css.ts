import { style } from '@vanilla-extract/css'

import { sprinkles } from 'ui/src/components/system/sprinkles.css'

export const cardButtonsWrapper = style([
	sprinkles({
		position: 'relative',
		display: 'flex',
		gap: 'large',
	}),
	{},
])
