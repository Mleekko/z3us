import type { EntityMetadataItem } from '@radixdlt/babylon-gateway-api-sdk'
import {
	MetadataBoolArrayValueTypeEnum,
	MetadataBoolValueTypeEnum,
	MetadataDecimalArrayValueTypeEnum,
	MetadataGlobalAddressArrayValueTypeEnum,
	MetadataI32ArrayValueTypeEnum,
	MetadataI64ArrayValueTypeEnum,
	MetadataInstantArrayValueTypeEnum,
	MetadataNonFungibleGlobalIdArrayValueTypeEnum,
	MetadataNonFungibleGlobalIdValueTypeEnum,
	MetadataNonFungibleLocalIdArrayValueTypeEnum,
	MetadataOriginArrayValueTypeEnum,
	MetadataPublicKeyArrayValueTypeEnum,
	MetadataPublicKeyHashArrayValueTypeEnum,
	MetadataPublicKeyHashValueTypeEnum,
	MetadataPublicKeyValueTypeEnum,
	MetadataStringArrayValueTypeEnum,
	MetadataU8ArrayValueTypeEnum,
	MetadataU32ArrayValueTypeEnum,
	MetadataU64ArrayValueTypeEnum,
	MetadataUrlArrayValueTypeEnum,
} from '@radixdlt/babylon-gateway-api-sdk'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Link, Text } from 'ui/src/components/typography'

import * as styles from './styles.css'

const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/

export const getMetadataValue = (value?: EntityMetadataItem): string => {
	const typed = value?.value?.typed
	switch (typed?.type) {
		case MetadataBoolValueTypeEnum.Bool:
			return String(typed.value)
		case MetadataU8ArrayValueTypeEnum.U8Array:
			return typed.value_hex
		case MetadataNonFungibleGlobalIdValueTypeEnum.NonFungibleGlobalId:
			return typed.non_fungible_id
		case MetadataPublicKeyValueTypeEnum.PublicKey:
			return `${typed.value.key_type}(${typed.value.key_hex})`
		case MetadataPublicKeyHashValueTypeEnum.PublicKeyHash:
			return `${typed.value.key_hash_type}(${typed.value.hash_hex})`
		case MetadataInstantArrayValueTypeEnum.InstantArray:
		case MetadataBoolArrayValueTypeEnum.BoolArray:
		case MetadataUrlArrayValueTypeEnum.UrlArray:
		case MetadataU64ArrayValueTypeEnum.U64Array:
		case MetadataDecimalArrayValueTypeEnum.DecimalArray:
		case MetadataGlobalAddressArrayValueTypeEnum.GlobalAddressArray:
		case MetadataI32ArrayValueTypeEnum.I32Array:
		case MetadataI64ArrayValueTypeEnum.I64Array:
		case MetadataNonFungibleGlobalIdArrayValueTypeEnum.NonFungibleGlobalIdArray:
		case MetadataNonFungibleLocalIdArrayValueTypeEnum.NonFungibleLocalIdArray:
		case MetadataOriginArrayValueTypeEnum.OriginArray:
		case MetadataStringArrayValueTypeEnum.StringArray:
		case MetadataU32ArrayValueTypeEnum.U32Array:
			return typed.values.join(', ')
		case MetadataPublicKeyArrayValueTypeEnum.PublicKeyArray:
			return typed.values.map(v => `${v.key_type}(${v.key_hex})`).join(', ')
		case MetadataPublicKeyHashArrayValueTypeEnum.PublicKeyHashArray:
			return typed.values.map(v => `${v.key_hash_type}(${v.hash_hex})`).join(', ')
		default:
			return typed?.value || ''
	}
}

interface IProps {
	value?: EntityMetadataItem
}

const MetadataValue: React.FC<IProps> = ({ value }) => {
	const metaValue = getMetadataValue(value)
	const isLinkValue = urlRegex.test(metaValue)

	return (
		<ToolTip message={metaValue}>
			<Box maxWidth="full">
				{isLinkValue ? (
					<Link target="_blank" href={metaValue} className={styles.metaDataLinkWrapper}>
						<Text size="xsmall" truncate>
							{metaValue}
						</Text>
					</Link>
				) : (
					<Text size="xsmall" truncate>
						{metaValue}
					</Text>
				)}
			</Box>
		</ToolTip>
	)
}

export default MetadataValue
