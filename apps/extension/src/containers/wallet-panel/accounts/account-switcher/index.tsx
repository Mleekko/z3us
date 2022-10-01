import React, { useRef, useState, useEffect } from 'react'
import { useAccountStore } from '@src/hooks/use-store'
import { PlusIcon } from 'ui/src/components/icons'
import { useEventListener } from 'usehooks-ts'
import { Box, Flex, MotionBox, Text } from 'ui/src/components/atoms'
import Button from 'ui/src/components/button'
import { HardwareWalletReconnect } from '@src/components/hardware-wallet-reconnect'
import { AccountSwitcherButtons } from './account-switcher-buttons'
import { AccountInfo } from './account-info'
import { AccountsTotal } from './accounts-total'

const SLIDER_WIDTH = 308
const SLIDER_HEIGHT = 169
const LEFT_OFFSET = 26 - SLIDER_WIDTH

export const AccountSwitcher = (): JSX.Element => {
	const { signingKey, addresses, activeSlideIndex, selectAccount, setActiveSlide } = useAccountStore(state => ({
		signingKey: state.signingKey,
		addresses: Object.values(state.publicAddresses).map(({ address }) => address),
		activeSlideIndex: state.activeSlideIndex,
		selectAccount: state.selectAccountAction,
		setActiveSlide: state.setActiveSlideIndexAction,
	}))

	const [xVal, setXVal] = useState<number>(LEFT_OFFSET + activeSlideIndex * -SLIDER_WIDTH)
	const [isAccountBtnsVisible, setIsAccountBtnsVisible] = useState<boolean>(
		activeSlideIndex > -1 && activeSlideIndex < addresses.length,
	)
	const containerRef = useRef(null)
	const containerWidth = containerRef.current?.offsetWidth

	useEffect(() => {
		setXVal(LEFT_OFFSET + activeSlideIndex * -SLIDER_WIDTH)
		setIsAccountBtnsVisible(activeSlideIndex > -1 && activeSlideIndex < addresses.length)
	}, [activeSlideIndex, addresses])

	const handleSlideClick = async (idx: number) => {
		await setActiveSlide(idx)
	}

	const handleAddAccount = async () => {
		await selectAccount(addresses.length)
	}

	useEventListener('keydown', e => {
		if (e.code === 'ArrowLeft' && activeSlideIndex > -1) {
			// @TOOD: bring this back when we can disable globally
			// we do not want the cards switching when users are are using left and right arrows when using the search token input
			//handleSlideClick(activeSlideIndex - 1)
		}
		if (e.code === 'ArrowRight' && activeSlideIndex < addresses.length) {
			// @TOOD: bring this back when we can disable globally
			// we do not want the cards switching when users are are using left and right arrows when using the search token input
			//handleSlideClick(activeSlideIndex + 1)
		}
	})

	return (
		<Flex
			ref={containerRef}
			direction="column"
			css={{ position: 'absolute', top: '0px', left: '0', right: '0', height: '279px' }}
		>
			<Box
				data-test-e2e="accounts-total-card"
				css={{ width: `${containerWidth}px`, height: `${SLIDER_HEIGHT}px`, position: 'relative', mt: '20px' }}
			>
				<MotionBox
					css={{ width: `${SLIDER_WIDTH * (addresses.length + 2)}px`, display: 'flex' }}
					animate={{ x: xVal }}
					initial={false}
					transition={{ duration: 0.3 }}
				>
					<Box
						css={{
							width: `${SLIDER_WIDTH}px`,
							height: `${SLIDER_HEIGHT}px`,
							px: '6px',
							py: '0',
							margin: 0,
							border: 'none',
						}}
						onClick={() => handleSlideClick(-1)}
					>
						<AccountsTotal />
					</Box>
					{addresses.map((address, idx) => (
						<Box
							onClick={() => handleSlideClick(idx)}
							key={address}
							css={{
								width: `${SLIDER_WIDTH}px`,
								height: `${SLIDER_HEIGHT}px`,
								px: '6px',
								py: '0',
								margin: 0,
								border: 'none',
							}}
						>
							<AccountInfo address={address} />
						</Box>
					))}
					<Box
						css={{
							width: `${SLIDER_WIDTH}px`,
							height: `${SLIDER_HEIGHT}px`,
							px: '6px',
							py: '0',
							margin: 0,
							border: 'none',
						}}
						onClick={() => handleSlideClick(addresses.length)}
					>
						<Flex
							align="center"
							justify="center"
							css={{ border: '1px dashed #a8a8a8', height: '100%', borderRadius: '14px' }}
						>
							<Box css={{ textAlign: 'center' }}>
								{signingKey && (
									<>
										<Button size="5" color="inverse" iconOnly circle onClick={handleAddAccount} css={{ mt: '5px' }}>
											<PlusIcon />
										</Button>
										<Text size="4" css={{ mt: '12px' }} medium>
											New account
										</Text>
									</>
								)}
								<Box css={{ p: '10px' }}>
									<HardwareWalletReconnect />
								</Box>
							</Box>
						</Flex>
					</Box>
				</MotionBox>
			</Box>
			<Box
				css={{
					opacity: isAccountBtnsVisible ? '1' : '0',
					pointerEvents: isAccountBtnsVisible ? 'all' : 'none',
					transition: '$default',
				}}
			>
				<AccountSwitcherButtons />
			</Box>
		</Flex>
	)
}
