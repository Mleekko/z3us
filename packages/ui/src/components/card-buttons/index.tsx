import clsx from 'clsx'
import React from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { QrCode2Icon, UpRight2Icon } from 'ui/src/components/icons'
import { QrPopOver } from 'ui/src/components/qr-popover'
import { Button } from 'ui/src/components/router-button'
import { ToolTip } from 'ui/src/components/tool-tip'

import * as styles from './styles.css'

interface IProps {
	className?: string
}

const messages = defineMessages({
	send: {
		id: '9WRlF4',
		defaultMessage: 'Send',
	},
	address: {
		id: 'hc47g1',
		defaultMessage: 'Address QR code',
	},
})

export const CardButtons: React.FC<IProps> = props => {
	const { className } = props
	const { accountId = '-', resourceId, nftId: rawNftId } = useParams()
	const intl = useIntl()

	const qrValue = resourceId || accountId || '-'

	const query = new URLSearchParams()
	if (accountId !== '-') query.set('accountId', accountId)
	if (resourceId) query.set('resourceId', resourceId)
	if (rawNftId) query.set('nftId', rawNftId)

	return (
		<Box className={clsx(styles.cardButtonsWrapper, className)}>
			<ToolTip message={intl.formatMessage(messages.send)}>
				<Button
					iconOnly
					rounded
					styleVariant="inverse"
					sizeVariant={{ mobile: 'medium', tablet: 'large' }}
					to={`/transfer?${query}`}
				>
					<UpRight2Icon />
				</Button>
			</ToolTip>
			{qrValue !== '-' && (
				<QrPopOver address={qrValue}>
					<ToolTip message={intl.formatMessage(messages.address)}>
						<Button iconOnly rounded styleVariant="inverse" sizeVariant={{ mobile: 'medium', tablet: 'large' }}>
							<QrCode2Icon />
						</Button>
					</ToolTip>
				</QrPopOver>
			)}
		</Box>
	)
}
