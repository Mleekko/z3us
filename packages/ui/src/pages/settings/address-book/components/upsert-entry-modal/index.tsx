import { t } from 'i18next'
import React, { useEffect } from 'react'
import { toast } from 'sonner'
import { useImmer } from 'use-immer'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Dialog } from 'ui/src/components/dialog'
import { CheckCircleIcon } from 'ui/src/components/icons'
import { type FormElement, Input } from 'ui/src/components/input'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { ValidationErrorMessage } from 'ui/src/components/validation-error-message'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'

import type { TZodValidation } from './validation'
import { getError, validateAddressBookForm } from './validation'

const emptyEntry = {
	name: '',
	address: '',
	dateAdded: 0,
	dateUpdated: 0,
}

interface IProps {
	address?: string
	onClose: () => void
}

export interface IState {
	address: string
	name: string
	validation: TZodValidation
}

const UpsertAddressBookEntryModal: React.FC<IProps> = ({ address, onClose }) => {
	const networkId = useNetworkId()

	const { addressBook, setAddressBookEntry } = useNoneSharedStore(state => ({
		addressBook: state.addressBook[networkId] || {},
		setAddressBookEntry: state.setAddressBookEntryAction,
	}))

	const [state, setState] = useImmer<IState>({
		name: addressBook[address]?.name,
		address: addressBook[address]?.address,
		validation: undefined,
	})

	useEffect(() => {
		setState(draft => {
			draft.name = addressBook[address]?.name || ''
			draft.address = addressBook[address]?.address || ''
		})
	}, [address])

	const handleClose = () => {
		setState(draft => {
			draft.name = ''
			draft.address = ''
			draft.validation = undefined
		})

		onClose()
	}

	const handleConfirm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const editingAddress = addressBook[address] || emptyEntry
		const entry = {
			dateAdded: Date.now(),
			...editingAddress,
			dateUpdated: Date.now(),
			name: state.name,
			address: state.address,
		}

		const validation = validateAddressBookForm(entry)
		setState(draft => {
			draft.validation = validation
		})
		if (!validation.success) {
			return
		}

		setAddressBookEntry(networkId, state.address, entry)

		const toastMessage = addressBook[address]
			? t('settings.address_book.upsert_modal.updated_message')
			: t('settings.address_book.upsert_modal.created_message')

		setState(draft => {
			draft.name = ''
			draft.address = ''
			draft.validation = undefined
		})

		toast(toastMessage, {})
		onClose()
	}

	const handleChangeName = (e: React.ChangeEvent<FormElement>) => {
		setState(draft => {
			draft.name = e.currentTarget.value
		})
	}

	const handleChangeAddress = (e: React.ChangeEvent<FormElement>) => {
		setState(draft => {
			draft.address = e.currentTarget.value
		})
	}

	return (
		<Dialog open={address !== undefined} onClose={handleClose}>
			<Box component="form" padding="large" display="flex" flexDirection="column" gap="large" onSubmit={handleConfirm}>
				<Text size="xlarge" color="strong" weight="strong">
					<Translation capitalizeFirstLetter text="address_book.upsert_modal.title" />
				</Text>
				<Box display="flex" flexDirection="column" gap="xsmall">
					<Text size="xsmall">
						<Translation capitalizeFirstLetter text="address_book.upsert_modal.name.title" />
					</Text>
					<Box>
						<Input
							placeholder={t('address_book.upsert_modal.name.input_placeholder')}
							value={state.name}
							onChange={handleChangeName}
							styleVariant={getError(state.validation, ['name']).error ? 'primary-error' : 'primary'}
						/>
						<ValidationErrorMessage message={getError(state.validation, ['name']).message} />
					</Box>
				</Box>
				<Box display="flex" flexDirection="column" gap="xsmall">
					<Text size="xsmall">
						<Translation capitalizeFirstLetter text="address_book.upsert_modal.address.title" />
					</Text>
					<Box>
						<Input
							disabled={!!addressBook[address]?.address}
							placeholder={t('address_book.upsert_modal.address.input_placeholder')}
							value={state.address}
							styleVariant={getError(state.validation, ['address']).error ? 'primary-error' : 'primary'}
							onChange={handleChangeAddress}
							rightIcon={
								state.validation &&
								!getError(state.validation, ['address']).error && (
									<Box color="green500" display="flex">
										<CheckCircleIcon />
									</Box>
								)
							}
						/>
						<ValidationErrorMessage message={getError(state.validation, ['address']).message} />
					</Box>
				</Box>
				<Box display="flex" gap="small" justifyContent="flex-end">
					<Button sizeVariant="small" styleVariant="secondary" onClick={handleClose}>
						<Translation capitalizeFirstLetter text="global.cancel" />
					</Button>
					<Button sizeVariant="small" type="submit">
						<Translation capitalizeFirstLetter text="global.save" />
					</Button>
				</Box>
			</Box>
		</Dialog>
	)
}

export default UpsertAddressBookEntryModal
