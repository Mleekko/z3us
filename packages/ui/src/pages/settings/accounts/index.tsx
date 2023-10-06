import React, { useEffect, useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'

import { AccountCards } from 'ui/src/components/account-cards'
import { AccountDropdown } from 'ui/src/components/account-dropdown'
import { Avatar } from 'ui/src/components/avatar'
import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { Text } from 'ui/src/components/typography'
import { CARD_COLORS, CARD_IMAGES } from 'ui/src/constants/account'
import { useNetworkId } from 'ui/src/hooks/dapp/use-network-id'
import { useWalletAccounts } from 'ui/src/hooks/use-accounts'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import type { AddressBookEntry } from 'ui/src/store/types'

import { SettingsBlock } from '../components/settings-block'
import { SettingsTitle } from '../components/settings-title'
import { SettingsWrapper } from '../components/settings-wrapper'
import * as accountsStyles from './styles.css'

const messages = defineMessages({
	title: {
		id: 'settings.accounts.title',
		defaultMessage: 'Accounts',
	},
	subtitle: {
		id: 'settings.accounts.subtitle',
		defaultMessage: `Customize your Radix account's look and feel. Personalize your experience by choosing a unique background image and color scheme that suits your style`,
	},
	account_title: {
		id: 'settings.accounts.account.title',
		defaultMessage: 'Account',
	},
	account_subtitle: {
		id: 'settings.accounts.account.subtitle',
		defaultMessage:
			'Select account from the dropdown menu, and adjust color scheme and background image for the account card',
	},
	account_color: {
		id: 'settings.accounts.account.color',
		defaultMessage: 'Account color',
	},
	account_image: {
		id: 'settings.accounts.account.image',
		defaultMessage: 'Account image',
	},
})

const Accounts: React.FC = () => {
	const intl = useIntl()
	const networkId = useNetworkId()
	const accounts = useWalletAccounts()
	const accountsAsArray = Object.values(accounts)
	const [selectedAccount, setSelectedAccount] = useState<AddressBookEntry | undefined>()
	const { setAddressBookEntry } = useNoneSharedStore(state => ({
		setAddressBookEntry: state.setAddressBookEntryAction,
	}))

	useEffect(() => {
		if (selectedAccount) return
		if (accountsAsArray.length > 0) {
			setSelectedAccount(accountsAsArray[0])
		}
	}, [accounts])

	const handleSelectAccount = (address: string) => {
		setSelectedAccount(accountsAsArray.find(a => a.address === address))
	}

	const handleSelectColor = (value: string) => {
		if (!selectedAccount) return
		const entry = { ...selectedAccount, cardColor: value }
		setAddressBookEntry(networkId, selectedAccount.address, entry)
		setSelectedAccount(entry)
	}

	const handleSelectCard = (value: string) => {
		if (!selectedAccount) return
		const entry = { ...selectedAccount, cardImage: value }
		setAddressBookEntry(networkId, selectedAccount.address, entry)
		setSelectedAccount(entry)
	}

	return (
		<SettingsWrapper>
			<SettingsTitle
				backLink="/settings"
				title={intl.formatMessage(messages.title)}
				subTitle={intl.formatMessage(messages.subtitle)}
			/>
			<SettingsBlock
				isBottomBorderVisible={false}
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							{intl.formatMessage(messages.account_title)}
						</Text>
						<Text size="small">{intl.formatMessage(messages.account_subtitle)}</Text>
					</>
				}
				rightCol={
					<Box display="flex" flexDirection="column" gap="xlarge">
						<AccountDropdown
							account={selectedAccount?.address}
							knownAddresses={accounts}
							onUpdateAccount={handleSelectAccount}
							accounts={accountsAsArray.map(account => ({ id: account.address, title: account.name }))}
							styleVariant="tertiary"
						/>
						<Box className={accountsStyles.accountsCardWrapper}>
							<AccountCards
								accounts={accountsAsArray}
								selectedCardIndex={accountsAsArray.findIndex(a => a.address === selectedAccount?.address)}
								isCardShadowVisible={false}
							/>
						</Box>
						<Box display="flex" flexDirection="column" gap="small">
							<Text size="small" weight="medium" color="strong">
								{intl.formatMessage(messages.account_color)}
							</Text>
							<Box display="flex" gap="small" flexWrap="wrap" flexGrow={0} flexShrink={0}>
								{CARD_COLORS.map(a => (
									<Button
										key={a}
										active={a === selectedAccount?.cardColor}
										rounded
										styleVariant="avatar"
										sizeVariant="small"
										iconOnly
										onClick={() => handleSelectColor(a)}
									>
										<Box width="full" height="full" borderRadius="full" style={{ background: a }} />
									</Button>
								))}
							</Box>
						</Box>
						<Box display="flex" flexDirection="column" gap="small">
							<Text size="small" weight="medium" color="strong">
								{intl.formatMessage(messages.account_image)}
							</Text>
							<Box display="flex" gap="small" flexWrap="wrap" flexGrow={0} flexShrink={0}>
								{CARD_IMAGES.map(a => (
									<Button
										key={a}
										active={a === selectedAccount?.cardImage}
										styleVariant="avatar"
										sizeVariant="medium"
										iconOnly
										onClick={() => handleSelectCard(a)}
									>
										<Avatar
											styleVariant="square"
											sizeVariant="medium"
											src={`/images/account-images/${a}`}
											alt="img"
											fallback="df"
										/>
									</Button>
								))}
							</Box>
						</Box>
					</Box>
				}
			/>
		</SettingsWrapper>
	)
}

export default Accounts