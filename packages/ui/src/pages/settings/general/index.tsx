import { languages } from 'packages/ui/src/constants/i18n'
import { Theme } from 'packages/ui/src/types/types'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useMatches } from 'react-router-dom'
import { toast } from 'sonner'

import { Box } from 'ui/src/components/box'
import { SelectSimple } from 'ui/src/components/select'
import { Switch } from 'ui/src/components/switch'
import Translation from 'ui/src/components/translation'
import { Text } from 'ui/src/components/typography'
import { useSupportedCurrencies } from 'ui/src/hooks/queries/market'
import { useNoneSharedStore } from 'ui/src/hooks/use-store'
import { useTheme } from 'ui/src/hooks/use-theme'

import { SettingsBlock } from '../components/settings-block'
import { SettingsTitle } from '../components/settings-title'
import { SettingsWrapper } from '../components/settings-wrapper'

const General: React.FC = () => {
	const { t, i18n } = useTranslation()
	const { theme, setTheme } = useTheme()
	const matches = useMatches()
	const { data: currencies } = useSupportedCurrencies()

	const customSettings = matches
		.filter(match => Boolean((match.handle as any)?.custom))
		.map(match => (match.handle as any).custom)

	const { currency, setCurrency, unlockTimer, setWalletUnlockTimeoutInMinutes, notifications, toggleNotifications } =
		useNoneSharedStore(state => ({
			currency: state.currency,
			setCurrency: state.setCurrencyAction,
			unlockTimer: state.walletUnlockTimeoutInMinutes,
			setWalletUnlockTimeoutInMinutes: state.setWalletUnlockTimeoutInMinutesAction,
			notifications: state.pushNotificationsEnabled,
			toggleNotifications: state.setPushNotificationsEnabledAction,
		}))

	const handleChangeUnlockTime = (minute: string) => {
		setWalletUnlockTimeoutInMinutes(parseInt(minute, 10))
	}

	const handleToggleNotifications = () => {
		toggleNotifications(!notifications)
	}

	return (
		<SettingsWrapper>
			<SettingsTitle
				backLink="/settings"
				title={<Translation capitalizeFirstLetter text="settings.navigation.generalTitle" />}
				subTitle={<Translation capitalizeFirstLetter text="settings.navigation.generalSubTitle" />}
			/>
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							<Translation capitalizeFirstLetter text="settings.session.title" />
						</Text>
						<Text size="xsmall">
							<Translation capitalizeFirstLetter text="settings.session.willLockAfter" />{' '}
							<Box component="span">
								{unlockTimer}{' '}
								{unlockTimer === 1 ? (
									<Translation capitalizeFirstLetter text="global.minute" />
								) : (
									<Translation capitalizeFirstLetter text="global.minutes" />
								)}
								.
							</Box>
						</Text>
					</>
				}
				rightCol={
					<SelectSimple
						value={`${unlockTimer}`}
						onValueChange={handleChangeUnlockTime}
						data={[
							{ id: '1', title: t('settings.session.select.oneMinute') },
							{ id: '5', title: t('settings.session.select.fiveMinutes') },
							{ id: '30', title: t('settings.session.select.thirtyMinutes') },
							{ id: '60', title: t('settings.session.select.sixtyMinutes') },
						]}
					/>
				}
			/>
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							<Translation capitalizeFirstLetter text="settings.theme.title" />
						</Text>
						<Box>
							<Text size="xsmall">
								<Translation capitalizeFirstLetter text="settings.theme.subTitle" />
							</Text>
						</Box>
					</>
				}
				rightCol={
					<SelectSimple
						capitalizeFirstLetter
						value={theme}
						onValueChange={_theme => {
							toast(`Theme has been updated ${_theme}`, {
								description: 'Just here for testing toasts',
							})
							setTheme(_theme as any)
						}}
						data={[
							{ id: Theme.LIGHT, title: t('settings.theme.options.light') },
							{ id: Theme.DARK, title: t('settings.theme.options.dark') },
							{ id: Theme.SYSTEM, title: t('settings.theme.options.system') },
						]}
					/>
				}
			/>
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							<Translation capitalizeFirstLetter text="settings.currency.title" />
						</Text>
						<Box>
							<Text size="xsmall">
								<Translation capitalizeFirstLetter text="settings.currency.subTitle" />
							</Text>
						</Box>
					</>
				}
				rightCol={
					<SelectSimple
						value={currency.toLocaleLowerCase()}
						onValueChange={setCurrency}
						data={currencies?.map(curr => ({ id: curr, title: curr.toUpperCase() }))}
					/>
				}
			/>
			<SettingsBlock
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							<Translation capitalizeFirstLetter text="settings.language.title" />
						</Text>
						<Box>
							<Text size="xsmall">
								<Translation capitalizeFirstLetter text="settings.language.subTitle" />
							</Text>
						</Box>
					</>
				}
				rightCol={
					<SelectSimple
						value={i18n.language}
						onValueChange={i18n.changeLanguage}
						data={Object.entries(languages).map(([id, lang]) => ({ id, title: `${lang.flag} ${lang.name}` }))}
					/>
				}
			/>
			<SettingsBlock
				isBottomBorderVisible={false}
				leftCol={
					<>
						<Text size="large" weight="strong" color="strong">
							<Translation capitalizeFirstLetter text="settings.notifications.title" />
						</Text>
						<Box>
							<Text size="small">
								<Translation capitalizeFirstLetter text="settings.notifications.subTitle" />
							</Text>
						</Box>
					</>
				}
				rightCol={
					<Box display="flex" alignItems="center" gap="medium">
						<Box>
							<Switch defaultChecked={notifications} onCheckedChange={handleToggleNotifications} />
						</Box>
					</Box>
				}
			/>
			{customSettings}
		</SettingsWrapper>
	)
}

export default General
