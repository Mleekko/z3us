import clsx from 'clsx'
import { useSearchParam } from 'packages/ui/src/hooks/use-params'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router-dom'

import { Box } from 'ui/src/components/box'
import { Button } from 'ui/src/components/button'
import { CopyAddressButton } from 'ui/src/components/copy-address-button'
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot } from 'ui/src/components/dialog'
import { Close2Icon } from 'ui/src/components/icons'
import type { FormElement } from 'ui/src/components/input'
import { Input } from 'ui/src/components/input'
import { ScrollArea } from 'ui/src/components/scroll-area'
import * as dialogStyles from 'ui/src/components/styles/dialog-styles.css'
import { ToolTip } from 'ui/src/components/tool-tip'
import { Text } from 'ui/src/components/typography'
import { capitalizeFirstLetter } from 'ui/src/utils/capitalize-first-letter'

import * as styles from './account-search.css'

const AccountSearch = () => {
	const { t } = useTranslation()
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const inputRef = useRef(null)
	const query = useSearchParam()

	const [isScrolled, setIsScrolled] = useState<boolean>(false)
	const [inputValue, setInputValue] = useState<string>('')

	// https://www.algolia.com/search/?query=hello&tab=&website%5Bquery%5D=hello
	// http://localhost:8003/#/accounts?asset=xrd&transactionId=1eaf53c4256c384d76ca72c0f18ef37a2e4441d4e6bae450e2b8507f42faa5b6

	const navigateBack = () => {
		// eslint-disable-next-line
		console.log('navigate')
		// navigate(`${pathname}${isActivityLink ? `?${ACCOUNT_PARAM_ACTIVITY}=true` : ''}`)
		navigate(pathname)
	}

	const handleScroll = (event: Event) => {
		const target = event.target as Element
		const { scrollTop } = target

		setIsScrolled(scrollTop > 0)
	}

	const handleOnChange = (event: React.ChangeEvent<FormElement>) => {
		const { value } = event.target

		setInputValue(value)
	}

	useEffect(() => {
		if (query) {
			setInputValue(query)
		}
		if (!query) {
			setIsScrolled(false)
		}

		inputRef?.current?.focus()
	}, [query])

	return (
		<DialogRoot open={!!query}>
			<DialogPortal>
				<DialogOverlay className={dialogStyles.dialogOverlay} />
				<DialogContent
					className={clsx(dialogStyles.dialogContent, styles.searchContent)}
					onEscapeKeyDown={navigateBack}
					onInteractOutside={navigateBack}
				>
					<ScrollArea isTopShadowVisible={false} onScroll={handleScroll}>
						<Box className={clsx(styles.searchHeaderWrapper, isScrolled && styles.searchHeaderWrapperShadow)}>
							<Box display="flex" width="full" alignItems="center" gap="medium">
								<Box flexGrow={1}>
									<Input
										ref={inputRef}
										value={inputValue}
										className={styles.searchElement}
										placeholder={capitalizeFirstLetter(`${t('global.search')}`)}
										onChange={handleOnChange}
									/>
								</Box>
								<Box flexShrink={0} display="flex" justifyContent="flex-end" gap="small">
									<ToolTip message="global.close">
										<Button styleVariant="ghost" sizeVariant="small" iconOnly onClick={navigateBack}>
											<Close2Icon />
										</Button>
									</ToolTip>
								</Box>
							</Box>
							<Box display="flex" width="full">
								<Box flexGrow={1}>
									<Text size="xsmall">Lorem Ipsum</Text>
								</Box>
							</Box>
						</Box>
						<Box className={styles.searchBodyScrollWrapper}>
							<Box className={styles.searchDetailsWrapper}>
								<Box display="flex" flexDirection="column" gap="medium" width="full">
									{/* message */}
									<Box position="relative" width="full">
										<Box display="flex" alignItems="center" gap="xsmall">
											<Text size="small" color="strong">
												Message (encrypted)
											</Text>
											<CopyAddressButton
												styleVariant="ghost"
												address="Copy message"
												iconOnly
												rounded={false}
												tickColor="colorStrong"
											/>
										</Box>
									</Box>
									<Box position="relative" width="full">
										<Text size="large">
											Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
											thes standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
											scrambled it to make a type specimen book. It has survived not only five centuries, but also the
											leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
											with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
											desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu
										</Text>
										<Text size="large">
											Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
											thes standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
											scrambled it to make a type specimen book. It has survived not only five centuries, but also the
											leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
											with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
											desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu
										</Text>
										<Text size="large">
											Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
											thes standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
											scrambled it to make a type specimen book. It has survived not only five centuries, but also the
											leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
											with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
											desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu
										</Text>
										<Text size="large">
											Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
											thes standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
											scrambled it to make a type specimen book. It has survived not only five centuries, but also the
											leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
											with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
											desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu
										</Text>
										<Text size="xsmall">
											Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
											thes standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
											scrambled it to make a type specimen book. It has survived not only five centuries, but also the
											leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s
											with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with
											desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu
										</Text>
									</Box>
								</Box>
							</Box>
						</Box>
					</ScrollArea>
				</DialogContent>
			</DialogPortal>
		</DialogRoot>
	)
}

export default AccountSearch
