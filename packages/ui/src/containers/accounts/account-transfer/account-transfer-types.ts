import type { z } from 'zod'

import { type TZodValidationGeneric } from 'ui/src/utils/get-zod-error'

import type { transferFormSchema } from './account-transfer-constants'

export interface ISend {
	to: string
	tokens: IToken[]
}

export interface IToken {
	name: string
	symbol: string
	address: string
	amount: number
}

export type TTransferSchema = z.infer<typeof transferFormSchema>

export type TZodValidation = TZodValidationGeneric<TTransferSchema>

export interface IAccountTransferImmer {
	transaction: TTransferSchema
	slides: [number, number]
	isMessageUiVisible: boolean
	isSubmittingReview: boolean
	initValidation: boolean
	validation: TZodValidation
}
