/* eslint-disable no-console */
import { getNoneSharedStore } from 'packages/ui/src/services/state'
import { sharedStore } from 'packages/ui/src/store'
import { type Keystore, KeystoreType, type Keystore as NewKeystore } from 'packages/ui/src/store/types'
import type { Runtime } from 'webextension-polyfill'
import browser from 'webextension-polyfill'

const migrateOlympiaAddresses = async () => {
	const oldSharedStore = await browser.storage.local.get(['z3us-store-shared'])
	if (!oldSharedStore['z3us-store-shared']) return

	const oldSharedState = JSON.parse(oldSharedStore['z3us-store-shared']).state
	if (oldSharedState) return

	const newKeystores = await Promise.all(
		oldSharedState.keystores.map(async (keystore: Keystore) => {
			try {
				if (keystore.type !== KeystoreType.LOCAL) return null

				const oldNoneSharedStore = await browser.storage.local.get(`z3us-store-${keystore.id}`)
				if (!oldNoneSharedStore[`z3us-store-${keystore.id}`]) return null

				const oldNoneSharedState = JSON.parse(oldNoneSharedStore[`z3us-store-${keystore.id}`] || {}).state
				if (!oldNoneSharedState) return null

				const noneSharedStore = await getNoneSharedStore(keystore.id)
				const currentKeystoreState = noneSharedStore.getState()
				currentKeystoreState.olympiaAddresses = oldNoneSharedState?.publicAddresses || {}
				noneSharedStore.setState(currentKeystoreState)

				return {
					...keystore,
				} as NewKeystore
			} catch (error) {
				console.error(`migrateOlympiaAddresses: ${JSON.stringify(keystore)}: ${error}`)
			}
			return null
		}),
	)

	const currentState = sharedStore.getState()
	currentState.keystores = [...currentState.keystores, ...newKeystores.filter(keystore => !!keystore)]
	sharedStore.setState(currentState)

	await Promise.all(
		oldSharedState.keystores.map(async keystore => {
			try {
				// await browser.storage.local.remove(`z3us-store-${keystore.id}`)
			} catch (error) {
				console.error(`failed to remove none shared store for: ${JSON.stringify(keystore)}: ${error}`)
			}
		}),
	)

	try {
		// await browser.storage.local.remove('z3us-store-shared')
	} catch (error) {
		console.error(`failed to remove old shared store: ${error}`)
	}
}

export const handleInstall = async (details: Runtime.OnInstalledDetailsType) => {
	if (details.reason === 'update') {
		await migrateOlympiaAddresses()
	}

	browser.runtime.setUninstallURL('https://github.com/z3us-dapps/z3us/discussions/150')
}
