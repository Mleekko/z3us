import React, { forwardRef } from 'react'

import { Box } from 'ui/src/components/box'
import { CheckCircleIcon } from 'ui/src/components/icons'
import { type IInputProps } from 'ui/src/components/input'
import { SearchableInput } from 'ui/src/components/searchable-input'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { useAddressBook } from 'ui/src/hooks/use-address-book'
import { getShortAddress } from 'ui/src/utils/string-utils'

import { FieldWrapper, type IProps as WrapperProps } from '../../field-wrapper'
import * as styles from './styles.css'

interface IAdapterProps extends Omit<IInputProps, 'onChange'> {
	toolTipMessageKnownAddress?: string
	isKnownAddressVisible?: boolean
	onChange?: (value: string) => void
}

export const SelectAdapter = forwardRef<HTMLInputElement, IAdapterProps>(
	({ onChange, value, toolTipMessageKnownAddress, isKnownAddressVisible = true, ...rest }, ref) => {
		const handleChange = (_value: string) => {
			onChange(_value)
		}

		const addressBook = useAddressBook()
		const allEntries = Object.values(addressBook).map(entry => ({
			id: entry.address,
			account: entry.address,
			alias: entry.name,
		}))

		const toName = addressBook[value]?.name || getShortAddress(`${value}`)

		return (
			<>
				{isKnownAddressVisible && (
					<Box className={styles.knownAddressWrapper}>
						{toName && <Text size="xxsmall">({toName})</Text>}
						{true && toolTipMessageKnownAddress && (
							<ToolTip message={toolTipMessageKnownAddress} side="top">
								<CheckCircleIcon />
							</ToolTip>
						)}
					</Box>
				)}
				<SearchableInput {...rest} value={`${value}`} ref={ref} onValueChange={handleChange} data={allEntries} />
			</>
		)
	},
)

interface IProps extends Omit<IAdapterProps, 'onChange' | 'value' | 'name' | 'label' | 'type'>, WrapperProps {}

export const AddressBookSelect = forwardRef<HTMLInputElement, IProps>((props, ref) => {
	const { validate, name, label, ...rest } = props

	return (
		<FieldWrapper name={name} label={label} validate={validate}>
			<SelectAdapter {...rest} ref={ref} />
		</FieldWrapper>
	)
})