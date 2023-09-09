import React, { ReactNode, Suspense, lazy } from 'react'
import { Route } from 'wouter'

import { Box } from 'ui/src/components/atoms'

import { AnimatedSwitch } from '@src/components/router-animated-switch'
import { RouterScope } from '@src/components/router-scope'
import { useHashLocation } from '@src/hooks/use-hash-location'
import { useIsBabylon } from '@src/hooks/use-is-babylon'

const ExportAccount = lazy(() => import('./export-account'))
const TokenList = lazy(() => import('./token-list'))
const Token = lazy(() => import('./token'))
const SendToken = lazy(() => import('./send-token'))
const DepositToken = lazy(() => import('./deposit-token'))
const AccountActivity = lazy(() => import('./account-activity'))

const AcounteRoute = ({ children }: { children: ReactNode }) => <Suspense fallback="Loading...">{children}</Suspense>

const ExportRoute = () => (
	<AcounteRoute>
		<ExportAccount />
	</AcounteRoute>
)

const TokenListRoute = () => (
	<AcounteRoute>
		<TokenList />
	</AcounteRoute>
)

const TokenRoute = () => (
	<AcounteRoute>
		<Token />
	</AcounteRoute>
)
const SendTokenRoute = () => (
	<AcounteRoute>
		<SendToken />
	</AcounteRoute>
)
const DepositTokenRoute = () => (
	<AcounteRoute>
		<DepositToken />
	</AcounteRoute>
)
const AccountActivityRoute = () => (
	<AcounteRoute>
		<AccountActivity />
	</AcounteRoute>
)

export const Accounts: React.FC = () => {
	const isBabylon = useIsBabylon()

	return (
		<Box
			css={{
				position: 'absolute',
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'flex-end',
			}}
		>
			<RouterScope base="/wallet" hook={useHashLocation}>
				<AnimatedSwitch>
					<Route path="/account" component={isBabylon ? ExportRoute : TokenListRoute} />
					{!isBabylon && <Route path="/account/token/:rri" component={TokenRoute} />}
					{!isBabylon && <Route path="/account/send" component={SendTokenRoute} />}
					{!isBabylon && <Route path="/account/send/:rri" component={SendTokenRoute} />}
					{!isBabylon && <Route path="/account/deposit" component={DepositTokenRoute} />}
					{!isBabylon && <Route path="/account/deposit/:rri" component={DepositTokenRoute} />}
					{!isBabylon && <Route path="/account/activity" component={AccountActivityRoute} />}
				</AnimatedSwitch>
			</RouterScope>
		</Box>
	)
}

export default Accounts
