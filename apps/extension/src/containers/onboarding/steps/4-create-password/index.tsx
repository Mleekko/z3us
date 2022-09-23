import React from 'react'
import { useSharedStore } from '@src/hooks/use-store'
import { useImmer } from 'use-immer'
import { useEventListener } from 'usehooks-ts'
import { onBoardingSteps } from '@src/store/onboarding'
import { PageWrapper, PageHeading, PageSubHeading } from '@src/components/layout'
import Button from 'ui/src/components/button'
import { Flex, Text, Box } from 'ui/src/components/atoms'
import Input from 'ui/src/components/input'
import InputFeedBack from 'ui/src/components/input/input-feedback'

interface ImmerT {
	password: string
	confirmPassword: string
	isButtonDisabled: boolean
	showError: boolean
	errorMessage: string
}

export const CreatePassword = (): JSX.Element => {
	const { setPassword, setOnboradingStep, isRestoreWorkflow } = useSharedStore(state => ({
		setPassword: state.setPasswordAction,
		setOnboradingStep: state.setOnboardingStepAction,
		isRestoreWorkflow: state.isRestoreWorkflow,
	}))

	const [state, setState] = useImmer<ImmerT>({
		password: '',
		confirmPassword: '',
		isButtonDisabled: true,
		showError: false,
		errorMessage: '',
	})

	const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		const password = event.currentTarget.value
		setState(draft => {
			draft.password = password
			draft.showError = false
			draft.errorMessage = ''
		})
	}

	const handleConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
		const confirmPassword = event.currentTarget.value
		setState(draft => {
			draft.confirmPassword = confirmPassword
			draft.showError = false
			draft.errorMessage = ''
			draft.isButtonDisabled = false
		})
	}

	const handleContinue = async () => {
		if (state.isButtonDisabled) return
		if (state.password === state.confirmPassword) {
			setPassword(state.confirmPassword)
			setOnboradingStep(onBoardingSteps.CREATE_WALLET)
		} else {
			setState(draft => {
				draft.showError = true
				draft.errorMessage = 'Passwords do not match!'
			})
		}
	}

	const handleFormSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault()
		await handleContinue()
	}

	useEventListener('keypress', async e => {
		if (e.code === 'Enter') {
			await handleContinue()
		}
	})

	return (
		<PageWrapper
			css={{
				flex: '1',
				position: 'relative',
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				flexBasis: '100%',
			}}
		>
			<form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
				<Box css={{ width: '100%' }}>
					<PageHeading>Create password</PageHeading>
					<PageSubHeading>
						You will use this password to unlock
						<br />
						your wallet.
					</PageSubHeading>
				</Box>
				<Box css={{ pt: '33px', flex: '1' }}>
					<Box css={{ width: '100%' }}>
						<Input
							data-test-e2e="wallet-confirm-password-one"
							type="password"
							size="2"
							placeholder="Enter password"
							onChange={handlePassword}
						/>
					</Box>
					<Box css={{ marginTop: '$3', width: '100%' }}>
						<Input
							data-test-e2e="wallet-confirm-password-two"
							type="password"
							size="2"
							placeholder="Confirm password"
							onChange={handleConfirmPassword}
						/>
					</Box>

					<InputFeedBack showFeedback={state.showError} animateHeight={31}>
						<Text color="red" medium>
							{state.errorMessage}
						</Text>
					</InputFeedBack>
				</Box>
				<Flex css={{ width: '100%' }}>
					<Button
						data-test-e2e="save-wallet-password-btn"
						fullWidth
						color="primary"
						size="6"
						type="submit"
						disabled={state.isButtonDisabled}
						css={{ flex: '1' }}
					>
						Save
					</Button>
				</Flex>
				<Flex justify="center" align="center" css={{ height: '48px', ta: 'center', mt: '$2', width: '100%' }}>
					<Text medium size="3" color="muted">
						{isRestoreWorkflow ? 'Step 3 of 4 ' : 'Step 2 of 3'}
					</Text>
				</Flex>
			</form>
		</PageWrapper>
	)
}
