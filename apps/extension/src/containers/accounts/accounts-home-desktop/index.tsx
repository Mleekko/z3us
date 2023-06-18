import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { Box } from 'ui/src/components/box'

import { AnimatedPage } from '@src/components/animated-page'
import { ScrollPanel } from '@src/components/scroll-panel'
import { routes } from '@src/constants'
import { AccountActivity } from '@src/containers/accounts/account-activity'
import { AccountActivitySearch } from '@src/containers/accounts/account-activity-search'
import { AccountAllChart } from '@src/containers/accounts/account-all-chart'
import { AccountAssetInfo } from '@src/containers/accounts/account-asset-info'
import { AccountCard } from '@src/containers/accounts/account-card'
import { AccountIndexAssets } from '@src/containers/accounts/account-index-assets'
import { AccountIndexHeader } from '@src/containers/accounts/account-index-header'
import { AccountsList } from '@src/containers/accounts/accounts-list'

import * as styles from './accounts-home-desktop.css'

export const AccountsHomeDesktop = () => {
	const location = useLocation()

	return (
		<Box className={styles.accountsWrapper}>
			<Box className={styles.accountsContainerWrapper}>
				<Box className={clsx(styles.panelWrapper)}>
					<ScrollPanel
						className={styles.leftPanel}
						renderPanel={(scrollableNode: HTMLElement | null) => (
							<Box position="relative">
								<AnimatePresence initial={false}>
									<Routes location={location} key={location.pathname}>
										{[routes.ACCOUNT].map(path => (
											<Route
												key="assetsHome" // to avoid full re-renders when these routes change
												path={path}
												element={
													<AnimatedPage>
														<AccountIndexHeader />
														<AccountIndexAssets scrollableNode={scrollableNode} />
													</AnimatedPage>
												}
											/>
										))}
										{[routes.ACCOUNT_ASSET_TYPE, routes.ACCOUNT_ASSET].map(path => (
											<Route
												key="assetsList" // to avoid full re-renders when these routes change
												path={path}
												element={
													<AnimatedPage>
														<AccountsList scrollableNode={scrollableNode} />
													</AnimatedPage>
												}
											/>
										))}
									</Routes>
								</AnimatePresence>
							</Box>
						)}
					/>
					<ScrollPanel
						className={styles.rightPanel}
						scrollTopOnRoute
						renderPanel={(scrollableNode: HTMLElement | null) => (
							<>
								<AccountAllChart />
								<AccountCard />
								<AccountAssetInfo />
								<AccountActivitySearch scrollableNode={scrollableNode} />
								<AccountActivity scrollableNode={scrollableNode} />
							</>
						)}
					/>
				</Box>
			</Box>
		</Box>
	)
}
