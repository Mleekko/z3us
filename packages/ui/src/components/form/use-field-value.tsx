import { useContext, useMemo } from 'react'

import { FormContext } from './context'

export const useFieldValue = (name: string) => {
	const { values, getFieldValue } = useContext(FormContext)
	return useMemo(() => getFieldValue(name), [name, values])
}
