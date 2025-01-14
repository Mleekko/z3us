import React, { Suspense, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Outlet, useLocation } from 'react-router-dom'
import browser from 'webextension-polyfill'

import { FallbackLoading, FallbackRenderer } from 'ui/src/components/fallback-renderer'
import { Toasts } from 'ui/src/components/toasts'
import { useModals } from 'ui/src/hooks/use-modals'
import { useSharedStore } from 'ui/src/hooks/use-store'

import { openTabWithURL } from '@src/browser/tabs'
import { config } from '@src/config'
import { useIsUnlocked } from '@src/hooks/use-is-unlocked'
import { getTheme } from '@src/styles/theme'

import Unlock from './unlock'

const popupUrl = browser.runtime.getURL('')

const Layout: React.FC = () => {
	const { modals } = useModals()
	const location = useLocation()
	const { isUnlocked, isLoading, reload } = useIsUnlocked()

	const { keystoreId } = useSharedStore(state => ({
		keystoreId: state.selectedKeystoreId,
	}))

	useEffect(() => {
		const rootElement = document.getElementById('root')
		if (rootElement) {
			rootElement.classList.add('z3-extension-mounted')
		}
	}, [])

	useEffect(() => {
		if (isLoading || isUnlocked || location.pathname.startsWith('/keystore/new')) return
		if (!keystoreId) {
			getTheme().then(theme => {
				const newKeystoreUrl = `${popupUrl}${config.popup.dir}/${theme}.html#/keystore/new`
				openTabWithURL(newKeystoreUrl).then(() => window.close())
			})
		}
	}, [keystoreId, isLoading, isUnlocked, location.pathname])

	if (!location.pathname.startsWith('/keystore/new')) {
		if (isLoading || !keystoreId) return <FallbackLoading />
		if (!isUnlocked) return <Unlock onUnlock={reload} />
	}

	return (
		<>
			<Suspense fallback={<FallbackLoading />}>
				<ErrorBoundary fallbackRender={FallbackRenderer}>
					<Outlet />
				</ErrorBoundary>
			</Suspense>
			{Object.keys(modals).map(id => (
				<Suspense key={id} fallback={<FallbackLoading />}>
					<ErrorBoundary fallbackRender={FallbackRenderer}>{modals[id]}</ErrorBoundary>
				</Suspense>
			))}
			<Toasts />
		</>
	)
}

export default Layout
