import { LayoutGroup } from 'framer-motion'
import { t } from 'i18next'
import { PillNavigation } from 'packages/ui/src/components/pill-navigation'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { NavLink } from 'ui/src/components/router-link'

const Navigation: React.FC = () => (
	<nav>
		<Box component="ul">
			<LayoutGroup id="transfer-menu">
				{[
					{
						title: t('transfer.navigation.homeTitle'),
						href: '/transfer',
					},
					{
						title: t('transfer.navigation.deployTitle'),
						href: '/transfer/deploy',
					},
					{
						title: t('transfer.navigation.rawTitle'),
						href: '/transfer/raw',
					},
				].map(({ title, href }) => (
					<Box key={href} component="li">
						<NavLink to={href} underline="never" end>
							{({ isActive }) => <PillNavigation text={title} matchActiveFn={() => isActive} />}
						</NavLink>
					</Box>
				))}
			</LayoutGroup>
		</Box>
	</nav>
)

export default Navigation
