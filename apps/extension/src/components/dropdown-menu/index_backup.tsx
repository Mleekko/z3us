import React from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { HamburgerMenuIcon, DotFilledIcon, CheckIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { cva, type VariantProps } from 'class-variance-authority'

import './dropdown-menu.css'

const cvaDropDMenu = cva(['z3-c-dropdown-menu'], {
	variants: {
		intent: {
			primary: ['z3-c-dropdown-menu--primary'],
		},
		size: {
			medium: ['z3-c-dropdown-menu--medium'],
		},
	},
	compoundVariants: [{ intent: 'primary', size: 'medium', className: 'uppercase' }],
	defaultVariants: {
		intent: 'primary',
		size: 'medium',
	},
})

interface IProps {
	trigger: React.ReactNode
	onMenuChange: (value: any) => void
}

export interface DropDMenuProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof cvaDropDMenu>,
		IProps {}

const DropDMenu: React.FC<DropDMenuProps> = props => {
	const { onMenuChange, trigger, className, intent, size} = props

	const handleValueChange = (account: string) => {}

	return (
		<div className={cvaDropDMenu({ intent, size, className })}>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild>
					<button type="button" aria-label="TODO">
						<HamburgerMenuIcon />
					</button>
				</DropdownMenu.Trigger>

				<DropdownMenu.Portal>
					<DropdownMenu.Content className="z3-c-dropdown-menu__content">
						<DropdownMenu.Item className="z3-c-dropdown-menu__item">
							New Window 
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Portal>
			</DropdownMenu.Root>
		</div>
	)
}

DropDMenu.defaultProps = {
	triggerType: undefined,
}

export default DropDMenu
