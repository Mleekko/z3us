import clsx from 'clsx'
import React from 'react'

import { Box } from 'ui/src/components/box'

import * as styles from './z3us-logo.css'

interface IZ3usLogoProps {
	className?: string
	isHoverMaskEnabled?: boolean
}

export const Z3usLogo: React.FC<IZ3usLogoProps> = props => {
	const { className, isHoverMaskEnabled = true } = props

	return (
		<Box className={clsx(styles.navigationLogoLink, className)}>
			{isHoverMaskEnabled && <Box className={styles.navigationLogoLinkScreen} />}
			<svg x="0px" y="0px" viewBox="0 0 24 24" className={styles.logoSvg}>
				<g>
					<path d="M0,12v12h12C5.4,24,0,18.6,0,12z" />
					<path d="M12,0H0v12C0,5.4,5.4,0,12,0z" />
					<path d="M12,24h12V12C24,18.6,18.6,24,12,24z" />
					<path d="M12,0c6.6,0,12,5.4,12,12V0H12z" />
					<path
						d="M12,1.2C6,1.2,1.2,6,1.2,12C1.2,18,6,22.8,12,22.8c6,0,10.8-4.8,10.8-10.8C22.8,6,18,1.2,12,1.2z M15.5,12.2l-9.9,6.2
			l8.3-2.9c0.2-0.1,0.3,0.1,0.3,0.2v2.3c0,0.2,0.2,0.3,0.3,0.2l6.7-2.3c-1.5,3.5-5.1,6-9.2,6c-4.9,0-8.9-3.5-9.8-8.1l5.6-3.8
			c0.2-0.1,0.4,0,0.4,0.2v1.3c0,0.2,0.2,0.3,0.4,0.2l9.9-6.2l-8.3,2.9C10,8.5,9.9,8.4,9.9,8.2V5.9c0-0.2-0.2-0.3-0.3-0.2L2.8,8
			C4.4,4.5,7.9,2,12,2c4.9,0,8.9,3.5,9.8,8.1l-5.6,3.8c-0.2,0.1-0.4,0-0.4-0.2v-1.3C15.9,12.2,15.7,12.1,15.5,12.2z"
					/>
				</g>
			</svg>
		</Box>
	)
}

interface IZ3usLogoTextProps {
	className?: string
}

export const Z3usLogoText: React.FC<IZ3usLogoTextProps> = props => {
	const { className } = props

	return (
		<Box className={clsx(styles.z3usBrandTextWrapper, className)}>
			<svg width="124" height="20" viewBox="0 0 124 20" className={styles.z3usBrandTextSvgWrapper}>
				<g>
					<path d="M100.8 0H124V4L122.937 2.93726C122.337 2.33714 121.523 2 120.674 2H103.2C101.433 2 99.9998 3.43269 99.9998 5.2C99.9998 6.96731 101.433 8.4 103.2 8.4H117.6C121.134 8.4 124 11.2654 124 14.8V15.2C124 17.851 121.851 20 119.2 20H95.9998V16L97.0626 17.0627C97.6627 17.6629 98.4766 18 99.3253 18H116.8C118.567 18 120 16.5673 120 14.8C120 13.0327 118.567 11.6 116.8 11.6H102.4C98.8652 11.6 95.9998 8.73462 95.9998 5.2V4.8C95.9998 2.14903 98.1488 0 100.8 0Z" />
					<path d="M87.9998 0H93.9998L92.9371 1.06274C92.337 1.66286 91.9998 2.47679 91.9998 3.32548V16.8C91.9998 18.5673 90.5671 20 88.7998 20H70.3998C66.8652 20 63.9998 17.1346 63.9998 13.6V3.32548C63.9998 2.47679 63.6627 1.66286 63.0626 1.06274L61.9998 0H69.9998L68.9371 1.06274C68.337 1.66286 67.9998 2.47679 67.9998 3.32548V14.8C67.9998 16.5673 69.4325 18 71.1998 18H88.3998C89.2835 18 89.9998 17.2837 89.9998 16.4V3.32548C89.9998 2.47679 89.6627 1.66286 89.0626 1.06274L87.9998 0Z" />
					<path d="M-0.000183105 4V0H27.9998L7.79982 18H24.6743C25.523 18 26.337 17.6629 26.9371 17.0627L27.9998 16V20H-0.000183105L19.4632 2H3.3253C2.47661 2 1.66268 2.33714 1.06256 2.93726L-0.000183105 4Z" />
					<path d="M31.9998 0H56.7998C58.5671 0 59.9998 1.43269 59.9998 3.2V13.6C59.9998 17.1346 57.1344 20 53.5998 20H31.9998V16L33.0626 17.0627C33.6627 17.6629 34.4766 18 35.3253 18H52.7998C54.5671 18 55.9998 16.5646 55.9998 14.7972V3.60142C55.9998 2.71777 55.2835 2 54.3998 2H51.9998H35.3253C34.4766 2 33.6627 2.33714 33.0626 2.93726L31.9998 4V0Z" />
					<path d="M40 11.9996V7.59961L41.24 8.34359C41.7373 8.64198 42.3064 8.79961 42.8863 8.79961H56V10.7996H42.8863C42.3064 10.7996 41.7373 10.9572 41.24 11.2556L40 11.9996Z" />
				</g>
			</svg>
		</Box>
	)
}
