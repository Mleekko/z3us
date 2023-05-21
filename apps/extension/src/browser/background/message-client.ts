import { Message as RadixMessage } from '@radixdlt/connector-extension/src/chrome/messages/_types'
import browser, { Runtime } from 'webextension-polyfill'

import { PORT_NAME } from '@src/browser/messages/constants'
import { newMessage, newReply } from '@src/browser/messages/message'
import { Message, MessageAction, MessageHandlers, MessageSource, ResponseMessage } from '@src/browser/messages/types'

const popupURL = new URL(browser.runtime.getURL(''))

export type MessageClientType = ReturnType<typeof MessageClient>

export const MessageClient = (handlers: MessageHandlers) => {
	console.log(`Z3US: background message client initialized.`)
	const onPort = (port: Runtime.Port) => {
		if (!port) throw new Error('Invalid port')
		if (port.name !== PORT_NAME) return
		if (!port.sender?.url) throw new Error('Missing sender url')
		if (new URL(port.sender.url).hostname === popupURL.hostname) throw new Error('Invalid popup url')

		const timer = setTimeout(
			async () => {
				clearTimeout(timer)
				port.disconnect()
			},
			250e3,
			port,
		)

		const sendReplyToPopup = async (msg: Message | ResponseMessage, response: any) =>
			port.postMessage(newReply(msg, MessageSource.BACKGROUND, MessageSource.POPUP, response))

		const sendReplyToInpage = async (msg: Message | ResponseMessage, response: any) =>
			port.postMessage(newReply(msg, MessageSource.BACKGROUND, MessageSource.INPAGE, response))

		port.onMessage.addListener(async (message: Message) => {
			if (message.target !== MessageSource.BACKGROUND) {
				return
			}
			message.fromTabId = message.fromTabId || port.sender?.tab?.id

			const { action, source } = message

			switch (source) {
				case MessageSource.OFFSCREEN:
					throw new Error(`Invalid port message source ${source}`)
					break
				case MessageSource.INPAGE:
					if (new URL(port.sender.url).hostname === popupURL.hostname) {
						sendReplyToInpage(message, {
							code: 400,
							error: 'Invalid message source from popup',
						})
					} else {
						const handler = handlers[action]
						if (handler) {
							try {
								const response = await handler(message)
								sendReplyToInpage(message, response)
							} catch (error) {
								sendReplyToInpage(message, {
									code: 500,
									error: error?.message || error,
								})
							}
						} else {
							sendReplyToInpage(message, {
								code: 400,
								error: 'Bad request',
							})
						}
					}
					break
				case MessageSource.POPUP:
					if (new URL(port.sender.url).hostname !== popupURL.hostname) {
						sendReplyToPopup(message, {
							code: 403,
							error: 'Forbidden sender',
						})
					} else {
						const handler = handlers[action]
						if (handler) {
							try {
								const response = await handler(message)
								sendReplyToPopup(message, response)
							} catch (error) {
								sendReplyToPopup(message, {
									code: 500,
									error: error?.message || error,
								})
							}
						} else {
							sendReplyToPopup(message, {
								code: 400,
								error: 'Bad request',
							})
						}
					}
					break
				default:
					break
			}
		})

		port.onDisconnect.addListener(() => {
			if (port.error) {
				// eslint-disable-next-line no-console
				console.error(`Disconnected due to an error: ${port.error.message}`)
			}
		})
	}

	const onRadixMessage = async (payload: RadixMessage, fromTabId?: number) => {
		const handler = handlers[MessageAction.RADIX]
		if (!handler) {
			throw new Error('Missing radix message handler')
		}
		const message = newMessage(MessageAction.RADIX, MessageSource.INPAGE, MessageSource.BACKGROUND, payload, fromTabId)
		const response = await handler(message)
		return response?.payload
	}

	return { onPort, onRadixMessage }
}
