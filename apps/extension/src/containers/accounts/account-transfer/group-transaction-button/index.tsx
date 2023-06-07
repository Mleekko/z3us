/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'

import { Box } from 'ui/src/components-v2/box'
import { Button } from 'ui/src/components-v2/button'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'ui/src/components-v2/popover'
import { Text } from 'ui/src/components-v2/typography'
import { InformationIcon, PlusIcon } from 'ui/src/components/icons'

interface IGroupTransactionButtonProps {
	isGroupUiVisible: boolean
	onGroupTransaction: () => void
	onAddGroup: () => void
}

export const GroupTransactionButton: React.FC<IGroupTransactionButtonProps> = props => {
	const { isGroupUiVisible, onAddGroup, onGroupTransaction } = props

	const handleClick = () => {
		if (isGroupUiVisible) {
			onAddGroup()
		}

		onGroupTransaction()
	}

	return (
		<Box display="flex" width="full" flexDirection="column">
			<Box display="flex" paddingBottom="small" gap="xsmall">
				<Box paddingTop="xxsmall">
					<Text color="strong" weight="strong" size="large">
						Group transaction
					</Text>
				</Box>
				<PopoverRoot>
					<PopoverTrigger asChild>
						<Box>
							<Button styleVariant="ghost" sizeVariant="xsmall" iconOnly aria-label="TODO">
								<InformationIcon />
							</Button>
						</Box>
					</PopoverTrigger>
					<PopoverPortal>
						<PopoverContent align="start" sideOffset={2} style={{ maxWidth: '300px' }}>
							<Box padding="medium" display="flex" flexDirection="column" gap="small">
								<Text color="strong">Group transaction</Text>
								<Text>
									If you wish to send multiple tokens to an address, or send tokens to multiple addresses
									<br />
									<br />
									Sed ac tempor ex arcu suscipit vel nulla convallis suspendisse mi magna, vivamus aliquet pellentesque
									pellentesque facilisis amet et neque ligula aliquet, porttitor vestibulum tortor lectus iaculis lacus.
									Tempor consectetur dui in quisque faucibus hac morbi faucibus magnis posuere odio.
								</Text>
							</Box>
						</PopoverContent>
					</PopoverPortal>
				</PopoverRoot>
			</Box>
			<Box>
				<Button
					styleVariant="tertiary"
					sizeVariant="xlarge"
					fullWidth
					onClick={handleClick}
					leftIcon={
						<Box marginLeft="small">
							<PlusIcon />
						</Box>
					}
				>
					Add group
				</Button>
			</Box>
		</Box>
	)
}
