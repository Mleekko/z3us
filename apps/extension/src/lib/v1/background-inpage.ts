import { Runtime } from 'webextension-polyfill'
import { store as useStore } from '@src/store'
import { Message, PublicKey } from '@radixdlt/crypto'
import { BrowserService } from '@src/services/browser'
import { VaultService } from '@src/services/vault'
import { RadixService } from '@src/services/radix'
import {
	HAS_WALLET,
	IS_CONNECTED,
	CONNECT,
	DISCONNECT,
	ACCOUNTS,
	BALANCES,
	STAKES,
	UNSTAKES,
	ENCRYPT,
	DESCRYPT,
	SEND_TRANSACTION,
} from '../actions'

const responseOK = { code: 200 }
const responseBadRequest = { code: 400, error: 'Bad request' }
const responseUnauthorized = { code: 401, error: 'Unauthorized' }

export default function NewV1BackgroundInpageActions(
	browser: BrowserService,
	vault: VaultService,
	actionsToConfirm: { [key: string]: Runtime.Port },
	sendInpageMessage: (port: Runtime.Port, id: string, request: any, response: any) => void,
) {
	async function isApprovedWebsite(port: Runtime.Port, id: string, payload: any): Promise<boolean> {
		const tab = await browser.getCurrentTab()
		const url = new URL(tab.url)

		const state = useStore.getState()
		const { approvedWebsites } = state

		if (!(url.host in approvedWebsites)) {
			sendInpageMessage(port, id, payload, responseUnauthorized)
			return false
		}
		return true
	}

	async function hasWallet(port: Runtime.Port, id: string, payload: any) {
		const has = await vault.has()
		sendInpageMessage(port, id, payload, has)
	}

	async function isConnected(port: Runtime.Port, id: string, payload: any) {
		const tab = await browser.getCurrentTab()
		const url = new URL(tab.url)

		const state = useStore.getState()
		const { approvedWebsites } = state

		sendInpageMessage(port, id, payload, url.host in approvedWebsites)
	}

	async function connect(port: Runtime.Port, id: string, payload: any) {
		const tab = await browser.getCurrentTab()
		const url = new URL(tab.url)

		const state = useStore.getState()
		const { approvedWebsites, selectedAccountIndex, publicAddresses } = state

		if (url.host in approvedWebsites) {
			if (publicAddresses.length > 0) {
				sendInpageMessage(port, id, payload, publicAddresses[selectedAccountIndex])
				return
			}
		}

		actionsToConfirm[id] = port
		state.addPendingActionAction(id, { host: url.host, request: payload })
		await browser.showPopup(`/notification/connect/${id}`)
	}

	async function disconnect(port: Runtime.Port, id: string, payload: any) {
		const tab = await browser.getCurrentTab()
		const url = new URL(tab.url)

		const state = useStore.getState()
		const { declineWebsiteAction } = state

		declineWebsiteAction(url.host)
		sendInpageMessage(port, id, payload, responseOK)
	}

	async function addresses(port: Runtime.Port, id: string, payload: any) {
		const allowed = await isApprovedWebsite(port, id, payload)
		if (!allowed) {
			return
		}

		const state = useStore.getState()
		const { publicAddresses } = state

		sendInpageMessage(port, id, payload, publicAddresses)
	}

	async function encrypt(port: Runtime.Port, id: string, payload: any) {
		const allowed = await isApprovedWebsite(port, id, payload)
		if (!allowed) {
			return
		}

		const tab = await browser.getCurrentTab()
		const url = new URL(tab.url)

		const state = useStore.getState()

		actionsToConfirm[id] = port
		state.addPendingActionAction(id, { host: url.host, request: payload })
		await browser.showPopup(`/notification/encrypt/${id}`)
	}

	async function decrypt(port: Runtime.Port, id: string, payload: any) {
		const allowed = await isApprovedWebsite(port, id, payload)
		if (!allowed) {
			return
		}

		const { input, publicKey } = payload

		const publicKeyBuffer = Buffer.from(publicKey, 'hex')
		const publicKeyResult = PublicKey.fromBuffer(publicKeyBuffer)
		if (!publicKeyResult.isOk()) {
			sendInpageMessage(port, id, payload, responseBadRequest)
			return
		}

		const messageBuffer = Buffer.from(input, 'hex')
		const encryptedMessageResult = Message.fromBuffer(messageBuffer)
		if (!encryptedMessageResult.isOk()) {
			sendInpageMessage(port, id, payload, input)
			return
		}

		const encryptedMessage = encryptedMessageResult.value
		if (encryptedMessage.kind !== 'ENCRYPTED') {
			sendInpageMessage(port, id, payload, encryptedMessage.plaintext)
			return
		}

		const tab = await browser.getCurrentTab()
		const url = new URL(tab.url)

		const state = useStore.getState()

		actionsToConfirm[id] = port
		state.addPendingActionAction(id, { host: url.host, request: payload })
		await browser.showPopup(`/notification/decrypt/${id}`)
	}

	async function transaction(port: Runtime.Port, id: string, payload: any) {
		const allowed = await isApprovedWebsite(port, id, payload)
		if (!allowed) {
			return
		}

		const tab = await browser.getCurrentTab()
		const url = new URL(tab.url)

		const state = useStore.getState()

		actionsToConfirm[id] = port
		state.addPendingActionAction(id, { host: url.host, request: payload })
		await browser.showPopup(`/notification/transaction/${id}`)
	}

	async function balances(port: Runtime.Port, id: string, payload: any) {
		const allowed = await isApprovedWebsite(port, id, payload)
		if (!allowed) {
			return
		}

		const state = useStore.getState()
		const { networks, selectedNetworkIndex, selectedAccountIndex, publicAddresses } = state

		const network = networks[selectedNetworkIndex]
		const address = publicAddresses[selectedAccountIndex]

		const service = new RadixService(network.url)

		try {
			const response = await service.tokenBalancesForAddress(address)
			sendInpageMessage(port, id, payload, response)
		} catch (error: any) {
			sendInpageMessage(port, id, payload, { code: 500, error: error?.message || error })
		}
	}

	async function stakes(port: Runtime.Port, id: string, payload: any) {
		const allowed = await isApprovedWebsite(port, id, payload)
		if (!allowed) {
			return
		}

		const state = useStore.getState()
		const { networks, selectedNetworkIndex, selectedAccountIndex, publicAddresses } = state

		const network = networks[selectedNetworkIndex]
		const address = publicAddresses[selectedAccountIndex]

		const service = new RadixService(network.url)

		try {
			const response = await service.stakesForAddress(address)
			sendInpageMessage(port, id, payload, response)
		} catch (error: any) {
			sendInpageMessage(port, id, payload, { code: 500, error: error?.message || error })
		}
	}

	async function unstakes(port: Runtime.Port, id: string, payload: any) {
		const allowed = await isApprovedWebsite(port, id, payload)
		if (!allowed) {
			return
		}

		const state = useStore.getState()
		const { networks, selectedNetworkIndex, selectedAccountIndex, publicAddresses } = state

		const network = networks[selectedNetworkIndex]
		const address = publicAddresses[selectedAccountIndex]

		const service = new RadixService(network.url)

		try {
			const response = await service.unstakesForAddress(address)
			sendInpageMessage(port, id, payload, response)
		} catch (error: any) {
			sendInpageMessage(port, id, payload, { code: 500, error: error?.message || error })
		}
	}

	return {
		[HAS_WALLET]: hasWallet,
		[IS_CONNECTED]: isConnected,
		[CONNECT]: connect,
		[DISCONNECT]: disconnect,
		[ACCOUNTS]: addresses,
		[BALANCES]: balances,
		[STAKES]: stakes,
		[UNSTAKES]: unstakes,
		[DESCRYPT]: decrypt,
		[ENCRYPT]: encrypt,
		[SEND_TRANSACTION]: transaction,
	}
}