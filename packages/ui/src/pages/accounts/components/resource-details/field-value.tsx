import React from 'react'

export const getDataValue = (field?: any) => {
	return field?.value ? field?.value || '' : field?.fields?.map(getDataValue).join(', ') || ''
}

interface IProps {
	field?: any
}

const FieldValue: React.FC<IProps> = ({ field }) => {
	return <>{getDataValue(field)}</>
}

export default FieldValue