import { enableMapSet } from 'immer'
import React from 'react'
import * as ReactDOM from 'react-dom/client'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { HashRouter } from 'react-router-dom'

import I18Provider from 'ui/src/components/i18n'
import 'ui/src/components/system/global.css'
import { RdtProvider } from 'ui/src/context/rdt-provider'
import { NoneSharedStoreProvider } from 'ui/src/context/state-provider'
import newQueryClient from 'ui/src/services/react-query'

import { config } from '@src/config'

import App from './app'

const queryClient = newQueryClient(window.localStorage)

const container: HTMLElement | null = document.getElementById('root')

enableMapSet()

ReactDOM.createRoot(container).render(
	<React.StrictMode>
		<I18Provider>
			<QueryClientProvider client={queryClient}>
				<RdtProvider>
					<NoneSharedStoreProvider>
						<HashRouter>
							<App />
							{config.isDevlopmentMode && <ReactQueryDevtools initialIsOpen={false} />}
						</HashRouter>
					</NoneSharedStoreProvider>
				</RdtProvider>
			</QueryClientProvider>
		</I18Provider>
	</React.StrictMode>,
)
