import { lazy } from 'react'

const Layout = lazy(() => import('./components/layout'))
const Home = lazy(() => import('./home'))
const NewSeed = lazy(() => import('./seed/new'))
const NewSeedPhraseDisplay = lazy(() => import('./seed/new-phrase-display'))
const NewSeedPhraseEnter = lazy(() => import('./seed/new-phrase-enter'))
const NewSeedPhraseDone = lazy(() => import('./seed/new-phrase-done'))
const RestoreSeed = lazy(() => import('./seed/restore'))
const Options = lazy(() => import('./options'))
const NewRadix = lazy(() => import('./radix'))
const NewHW = lazy(() => import('./hardware-wallet'))
const RestoreExtendedKey = lazy(() => import('./extended-key/restore'))
const Remove = lazy(() => import('./remove'))

const route = {
	path: 'keystore',
	element: <Layout />,
	children: [
		{
			path: 'new',
			children: [
				{
					index: true,
					element: <Home />,
				},
				{
					path: 'options',
					element: <Options />,
				},
				{
					path: 'seed',
					element: <NewSeed />,
					// element: <NewSeedPhraseDisplay />,
					// element: <NewSeedPhraseEnter />,
					// element: <NewSeedPhraseDone />,
				},
				{
					path: 'radix',
					element: <NewRadix />,
				},
				{
					path: 'hardware-wallet',
					element: <NewHW />,
				},
			],
		},
		{
			path: 'restore',
			children: [
				{
					path: 'seed',
					element: <RestoreSeed />,
				},
				{
					path: 'extended-key',
					element: <RestoreExtendedKey />,
				},
			],
		},
		{
			path: 'remove',
			element: <Remove />,
		},
	],
}

export default route
