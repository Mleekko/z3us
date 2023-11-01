import type { StateEntityDetailsResponsePackageDetails } from '@radixdlt/babylon-gateway-api-sdk'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { Box } from 'ui/src/components/box'
import { AccountsTransactionInfo } from 'ui/src/components/layout/account-transaction-info'
import { Text } from 'ui/src/components/typography'

const messages = defineMessages({
	title: {
		id: 'Lv0zJu',
		defaultMessage: 'Details',
	},
	vm_type: {
		id: '/+CdTX',
		defaultMessage: 'VM type',
	},
	royalty_vault_balance: {
		id: 'LdPPhL',
		defaultMessage: 'Royalty vault balance',
	},
	blueprints: {
		id: 'VzWTJu',
		defaultMessage: 'Blueprints',
	},
})

interface IProps {
	details: StateEntityDetailsResponsePackageDetails
}

const PackageDetails: React.FC<IProps> = ({ details }) => {
	const intl = useIntl()

	return (
		<Box display="flex" flexDirection="column">
			<Box paddingTop="xlarge">
				<Text size="large" weight="medium" color="strong">
					{intl.formatMessage(messages.title)}
				</Text>
			</Box>

			<AccountsTransactionInfo
				leftTitle={
					<Text size="xsmall" color="strong">
						{intl.formatMessage(messages.vm_type)}
					</Text>
				}
				rightData={<Text size="xsmall">{details.vm_type}</Text>}
			/>

			<AccountsTransactionInfo
				leftTitle={
					<Text size="xsmall" color="strong">
						{intl.formatMessage(messages.royalty_vault_balance)}
					</Text>
				}
				rightData={
					<Text size="xsmall">
						{intl.formatNumber(parseFloat(details.royalty_vault_balance) || 0, {
							style: 'decimal',
							maximumFractionDigits: 8,
						})}
					</Text>
				}
			/>

			<AccountsTransactionInfo
				leftTitle={
					<Text size="xsmall" color="strong">
						{intl.formatMessage(messages.blueprints)}
					</Text>
				}
				rightData={
					<Text size="xsmall">
						{intl.formatList(
							details.blueprints?.items.map(blueprint => blueprint.name),
							{ type: 'conjunction' },
						)}
					</Text>
				}
			/>
		</Box>
	)
}

export default PackageDetails
