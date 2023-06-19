/* eslint-disable */
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { AnimatedPage } from 'ui/src/components/animated-page'
// TODO: refactor
import { routes } from 'ui/src/constants'
import { Accounts } from 'ui/src/containers/accounts'
import { useIsMobileWidth } from 'ui/src/hooks/use-is-mobile'

import * as styles from './app.css'
import TempNav from './components/nav'

if (APP_RADIX && chrome?.runtime?.id) {
	import('@src/browser/content-script').catch(console.error)
}

const Connect = React.lazy(() => import('./pages/connect'))
const NotFound = React.lazy(() => import('./pages/404'))
const Pairing = React.lazy(() => import('./pages/pairing'))

const App: React.FC = () => {
	const location = useLocation()
	const locationArr = location.pathname?.split('/') ?? []
	const isMobile = useIsMobileWidth()

	return (
		<div className={styles.container}>
			{/* TODO: TempNav will go, just to demonstrate route changes   */}
			<TempNav />
			<AnimatePresence initial={false}>
				<Routes location={location} key={locationArr[1]}>
					{['/', routes.ACCOUNTS].map(path => (
						<Route
							key="Accounts" // optional: avoid full re-renders on route changes
							path={path}
							element={<Navigate to={`${routes.ACCOUNTS}/all`} />}
						/>
					))}
					<Route
						path={`${routes.ACCOUNTS}/*`}
						element={
							<AnimatedPage>
								<div>
									<Accounts isMobile={isMobile} />
								</div>
							</AnimatedPage>
						}
					/>
					{APP_RADIX && <Route path={`${routes.PAIRING}/*`} element={<Pairing />} />}
					<Route path="/connect/*" element={<Connect />} />
					<Route
						path="/page2/*"
						element={
							<AnimatedPage>
								<Link to="../page1">Next page</Link>
							</AnimatedPage>
						}
					/>
					<Route
						path="*"
						element={
							<AnimatedPage>
								<NotFound />
							</AnimatedPage>
						}
					/>
				</Routes>
			</AnimatePresence>
		</div>
	)
}

export default App
