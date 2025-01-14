import { lazy } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { useModals } from 'ui/src/hooks/use-modals'
import { generateId } from 'ui/src/utils/generate-id'

const Modal = lazy(() => import('@src/components/modals/select-accounts-modal'))

const messages = defineMessages({
	rejected: {
		id: '6myWzr',
		defaultMessage: 'Accounts select declined',
	},
})

export const useSelectAccountsModal = () => {
	const intl = useIntl()
	const { addModal, removeModal } = useModals()

	const selectAccounts = (required: number, exactly: boolean) =>
		new Promise<string[]>((resolve, reject) => {
			const id = generateId()
			const handleConfirm = (addresses: string[]) => {
				resolve(addresses)
				removeModal(id)
			}
			const handleCancel = () => {
				reject(intl.formatMessage(messages.rejected))
				removeModal(id)
			}
			addModal(
				id,
				<Modal key={id} required={required} exactly={exactly} onConfirm={handleConfirm} onCancel={handleCancel} />,
			)
		})

	return selectAccounts
}
