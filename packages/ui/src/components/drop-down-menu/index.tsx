import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import { motion } from 'framer-motion'
import React from 'react'

import { CSS, keyframes, sharedItemIndicatorStyles, sharedItemStyles, styled } from '../../theme'
import { Box } from '../atoms'

const animateIn = keyframes({
	from: { transform: 'translateY(4px)', opacity: 0 },
	to: { transform: 'translateY(0)', opacity: 1 },
})

const animateOut = keyframes({
	from: { transform: 'translateY(0)', opacity: 1 },
	to: { transform: 'translateY(4px)', opacity: 0 },
})

const StyledContent = styled(DropdownMenuPrimitive.Content, {
	minWidth: 226,
	br: '$2',
	padding: '5px',
	backgroundColor: '$bgPanel',
	border: '1px solid $borderPopup',
	boxShadow: '$popup',
	position: 'relative',
	boxSizing: 'border-box',

	'&::before': {
		content: `''`,
		position: 'absolute',
		top: '-7px',
		left: '14px',
		background: '$bgPanel',
		transform: 'rotate(45deg)',
		border: '1px solid $borderPopup',
		boxSizing: 'border-box',
		width: '12px',
		height: '12px',
		pointerEvents: 'none',
	},
	'&::after': {
		content: `''`,
		position: 'absolute',
		top: '-1px',
		left: '12px',
		background: '$bgPanel',
		boxSizing: 'border-box',
		width: '16px',
		height: '9px',
		pointerEvents: 'none',
	},
	'&[data-side="top"]': {
		'&::before': {
			top: 'unset',
			bottom: '-7px',
		},
		'&::after': {
			top: 'unset',
			bottom: '-1px',
		},
	},
	'&[data-align="end"]': {
		'&::before': {
			left: 'unset',
			right: '14px',
		},
		'&::after': {
			left: 'unset',
			right: '12px',
		},
	},
	'&[data-side="left"]': {
		'&::before': {
			display: 'none',
		},
		'&::after': {
			display: 'none',
		},
	},
	'&[data-side="right"]': {
		'&::before': {
			display: 'none',
		},
		'&::after': {
			display: 'none',
		},
	},

	// TODO: handle the no-motion preference
	'&[data-state="open"]': {
		animation: `${animateIn} 200ms ease`,
		animationFillMode: 'forwards',
	},
	'&[data-state="closed"]': {
		animation: `${animateOut} 200ms ease`,
		animationFillMode: 'forwards',
	},
})

const StyledSubMenuContent = styled(DropdownMenuPrimitive.SubContent, {
	minWidth: 100,
	br: '$2',
	padding: '5px',
	backgroundColor: '$bgPanel',
	border: '1px solid $borderPopup',
	boxShadow: '$popup',
	position: 'relative',
	boxSizing: 'border-box',
	zIndex: '$4',

	// TODO: handle the no-motion preference
	'&[data-state="open"]': {
		animation: `${animateIn} 200ms ease`,
		animationFillMode: 'forwards',
	},
	'&[data-state="closed"]': {
		animation: `${animateOut} 200ms ease`,
		animationFillMode: 'forwards',
	},
})

const StyledItem = styled(DropdownMenuPrimitive.Item, { ...sharedItemStyles })
const StyledCheckboxItem = styled(DropdownMenuPrimitive.CheckboxItem, {
	...sharedItemStyles,
})
const StyledRadioItem = styled(DropdownMenuPrimitive.RadioItem, {
	...sharedItemStyles,
})
const StyledSubTriggerItem = styled(DropdownMenuPrimitive.SubTrigger, {
	'&[data-state="open"]': {
		backgroundColor: '$bgPanelHover',
		color: '$txtActive',
	},
	...sharedItemStyles,
})

const StyledLabel = styled(DropdownMenuPrimitive.Label, {
	paddingLeft: 25,
	fontSize: 12,
	fontWeight: 700,
	color: '$txtDefault',
	lineHeight: '25px',
})

const StyledSeparator = styled(DropdownMenuPrimitive.Separator, {
	height: 1,
	backgroundColor: '$bgPanelHover',
	margin: 5,
})

const StyledItemIndicator = styled(DropdownMenuPrimitive.ItemIndicator, { ...sharedItemIndicatorStyles })

const StyledArrow = styled(DropdownMenuPrimitive.Arrow, {
	fill: '$bgPopup',
})

const RightSlot = styled('div', {
	marginleft: 'auto',
	paddingleft: 20,
	// ':focus > &': { color: 'white' },
	// '[data-disabled] &': { color: '#aaa' },
})

const StyledEllipsisWrapper = styled('div', {
	whiteSpace: 'nowrap',
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	pr: '10px',
})

const HamburgerSvg = ({ css }: CSS) => (
	<Box
		as="svg"
		width="15"
		height="15"
		viewBox="0 0 23 23"
		css={{
			...(css as any),
		}}
	>
		<motion.path
			fill="transparent"
			strokeWidth="1"
			strokeLinecap="round"
			d="M 2 2.5 L 20 2.5"
			variants={{
				closed: { d: 'M 2 2.5 L 20 2.5' },
				open: { d: 'M 3 16.5 L 17 2.5' },
			}}
		/>
		<motion.path
			fill="transparent"
			strokeWidth="1"
			strokeLinecap="round"
			d="M 2 9.423 L 20 9.423"
			opacity="1"
			variants={{
				closed: { opacity: 1 },
				open: { opacity: 0 },
			}}
			transition={{ duration: 0.1 }}
		/>
		<motion.path
			fill="transparent"
			strokeWidth="1"
			strokeLinecap="round"
			d="M 2 16.346 L 20 16.346"
			variants={{
				closed: { d: 'M 2 16.346 L 20 16.346' },
				open: { d: 'M 3 2.5 L 17 16.346' },
			}}
		/>
	</Box>
)

export const DropdownMenu = DropdownMenuPrimitive.Root
export const DropdownMenuPortal = DropdownMenuPrimitive.Portal
export const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger

export const DropdownMenuContent = StyledContent
export const DropdownMenuItem = StyledItem

export const DropdownMenuCheckboxItem = StyledCheckboxItem
export const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup
export const DropdownMenuRadioItem = StyledRadioItem
export const DropdownMenuItemIndicator = StyledItemIndicator

export const DropdownMenuSub = DropdownMenuPrimitive.Sub
export const DropdownMenuSubContent = StyledSubMenuContent
export const DropdownMenuSubTriggerItem = StyledSubTriggerItem

export const DropdownMenuLabel = StyledLabel
export const DropdownMenuSeparator = StyledSeparator
export const DropdownMenuArrow = StyledArrow
export const DropdownMenuRightSlot = RightSlot
export const DropdownMenuEllipsis = StyledEllipsisWrapper
export const DropdownMenuHamburgerIcon = HamburgerSvg
