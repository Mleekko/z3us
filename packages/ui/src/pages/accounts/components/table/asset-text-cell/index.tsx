import React from 'react'

import { Box } from 'ui/src/components/box'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

interface IProps {
	value?: string
}

export const AssetTextCell: React.FC<IProps> = props => {
	const { value } = props

	return (
		<Box className={styles.assetTextCellWrapper}>
			<ToolTip message={value}>
				<Box>
					<Text capitalizeFirstLetter size="small" truncate weight="medium">
						{value}
					</Text>
				</Box>
			</ToolTip>
		</Box>
	)
}
