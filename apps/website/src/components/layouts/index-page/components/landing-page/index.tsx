import { ContentContainer } from '@/components/content-container'
import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

import { Box } from 'ui/src/components/box'
import { Check2Icon } from 'ui/src/components/icons'
import { Link, Text } from 'ui/src/components/typography'

import { DownloadButton } from '../download-button'
import { HeroTextSvg } from '../hero-text-svg'
import * as styles from './styles.css'

const GRID_DETAILS = {
	fast: {
		title: 'Self-custodial',
		subTitle: 'Your keys, your kingdom. Our self-custodial wallet lets you be the undisputed ruler.',
		bgImage: 'sweat-details-01.png',
		icon: 'sweat-details-svg-01.svg',
	},
	easy_ux: {
		title: 'Open source community orientated',
		subTitle: "Together, we're not just building a wallet, we're crafting the future.",
		bgImage: 'sweat-details-02.png',
		icon: 'sweat-details-svg-02.svg',
	},
	secure: {
		title: 'Hardware ledger support',
		subTitle: 'Sleep peacefully, knowing your digital treasure is shielded from the digital storm.',
		bgImage: 'sweat-details-03.png',
		icon: 'sweat-details-svg-03.svg',
	},
}

export const LandingPage: React.FC = () => (
	<Box className={styles.landingPageWrapper}>
		<Header />
		<Box className={styles.landingPageBodyWrapper}>
			<Box className={styles.landingPageDarkWrapper}>
				<ContentContainer>
					<Image
						priority
						src="/landing-page-2023/bg-left.png"
						width={786}
						height={1222}
						alt="angel left"
						className={styles.landingPageLargeImgFloatLeft}
					/>
					<Image
						priority
						src="/landing-page-2023/bg-right.png"
						width={710}
						height={474}
						alt="angel right"
						className={styles.landingPageLargeImgFloatRight}
					/>
					<Box className={styles.landingHeroTextWrapper}>
						<HeroTextSvg />
					</Box>
					<Box className={styles.landingCalloutFlexWrapper}>
						<Box className={styles.landingCalloutTextWrapper}>
							<Box>
								<Text size="xlarge" color="strong" weight="strong" className={styles.landingCalloutText}>
									Z3US wallet is your home on Radix. <br />
								</Text>
								<Text size="xlarge" color="strong" className={styles.landingCalloutText}>
									Manage accounts, send and receive tokens, manage multiple wallets and connect to DApps from Z3US, the
									premier browser wallet for{' '}
									<Link
										size="xlarge"
										color="strong"
										href="https://www.radixdlt.com/"
										className={styles.landingCalloutText}
									>
										Radix DLT
									</Link>
									.
								</Text>
							</Box>
							<Box>
								<DownloadButton />
							</Box>
						</Box>
					</Box>
					<Box>
						<Image
							priority
							src="/landing-page-2023/desktop-product.jpg"
							width={1160}
							height={784}
							alt="Z3US product desktop"
							className={clsx(styles.landingHeroCalloutImg, styles.landingPageHeroImage)}
						/>
					</Box>
				</ContentContainer>
			</Box>
			<Box className={clsx(styles.landingPageInvadersWrapper, styles.landingPageInvadersHeroWrapper)}>
				<Box className={styles.landingPageInvadersInnerWrapper}>
					<Image
						priority
						src="/landing-page-2023/purple-invaders-horizontal-bg.png"
						width={1440}
						height={244}
						alt="purple pattern"
					/>
				</Box>
			</Box>
			<Box className={clsx(styles.landingPagePurpleWrapper, styles.landingPageBelowFeatureWrapper)}>
				<ContentContainer>
					<Box className={styles.landingLeftHeroTextWrapper}>
						<Text
							component="h4"
							capitalize
							size="large"
							weight="stronger"
							color="strong"
							className={styles.landingTextOpacity50}
						>
							Seamless
						</Text>
						<Text size="xxxxlarge" color="strong" weight="stronger">
							Experience your radix wallet in a whole new way.
						</Text>
						<Text size="large" color="strong">
							Access your existing Radix wallets seamlessly alongside newly created Z3US wallets, simplifying asset
							consolidation and management. Say goodbye to platform hopping – Z3US keeps your crypto experience unified
							and seamless.
						</Text>
					</Box>
					<Box className={styles.landingHeroExperienceImageWrapper}>
						<Image
							priority
							src="/landing-page-2023/experience-hero-left.png"
							width={760}
							height={726}
							alt="Vanilla Extract logo"
							className={clsx(
								styles.landingHeroCalloutImg,
								styles.landingHeroCalloutRoundedImg,
								styles.landingHeroExperienceImageOne,
							)}
						/>
						<Image
							priority
							src="/landing-page-2023/experience-hero-right.png"
							width={360}
							height={926}
							alt="Vanilla Extract logo"
							className={clsx(
								styles.landingHeroCalloutImg,
								styles.landingHeroCalloutRoundedImg,
								styles.landingHeroExperienceImageTwo,
							)}
						/>
					</Box>
					<Box className={styles.landingLeftAllInTextWrapper}>
						<Box className={clsx(styles.landingLeftHeroTextWrapper)}>
							<Text
								component="h4"
								capitalize
								size="large"
								weight="stronger"
								color="strong"
								className={styles.landingTextOpacity50}
							>
								ALl-in-one
							</Text>
							<Text size="xxxxlarge" color="strong" weight="stronger">
								Send. Receive. Sign.
							</Text>
							<Text size="large" color="strong">
								Flawless essentials and powerful features. With the added functionality of group transactions and
								detailed asset and transaction insights.
							</Text>
						</Box>
					</Box>
					<Box className={styles.landingHeroSendReceiveStakeWrapper}>
						<Image
							priority
							src="/landing-page-2023/send-receive-stake-01.png"
							width={360}
							height={600}
							alt="Vanilla Extract logo"
							className={clsx(
								styles.landingHeroCalloutImg,
								styles.landingHeroCalloutRoundedLargeImg,
								styles.landingHeroSendReceiveStakeImg,
							)}
						/>
						<Image
							priority
							src="/landing-page-2023/send-receive-stake-02.png"
							width={360}
							height={529}
							alt="Vanilla Extract logo"
							className={clsx(
								styles.landingHeroCalloutImg,
								styles.landingHeroCalloutRoundedLargeImg,
								styles.landingHeroSendReceiveStakeImg,
								styles.landingHeroImgMobileHidden,
							)}
						/>
						<Image
							priority
							src="/landing-page-2023/send-receive-stake-03.png"
							width={360}
							height={600}
							alt="Vanilla Extract logo"
							className={clsx(
								styles.landingHeroCalloutImg,
								styles.landingHeroCalloutRoundedLargeImg,
								styles.landingHeroSendReceiveStakeImg,
								styles.landingHeroImgMobileHidden,
							)}
						/>
					</Box>
				</ContentContainer>
			</Box>
			<Box className={clsx(styles.landingPageInvadersWrapper, styles.landingPageInvadersFlipped)}>
				<Box className={styles.landingPageInvadersInnerWrapper}>
					<Image
						priority
						src="/landing-page-2023/purple-invaders-horizontal-bg.png"
						width={1440}
						height={244}
						alt="purple pattern"
					/>
				</Box>
			</Box>
			<Box className={styles.landingPageDarkWrapper}>
				<ContentContainer>
					{/* START: MAKE IT YOUR OWN */}
					<Box className={clsx(styles.landingFeaturePointBlockWrapper, styles.landingFeaturePointBlockBorder)}>
						<Box className={styles.landingFeaturePointBlock}>
							<Text component="h4" capitalize size="large" weight="stronger" className={styles.landingTextPurple}>
								Personalization
							</Text>
							<Text size="xxxxlarge" color="strong" weight="stronger">
								Make it your own
							</Text>
							<Text size="large">
								With Z3US&apos;s customization, every transaction becomes an expression of your identity. It&apos;s more
								than just a wallet &ndash; it&apos;s a canvas for your digital financial interactions.
							</Text>
							<Box component="ul">
								<Box component="li" color="colorNeutral">
									<Check2Icon />
									<Text>Unique colors and images for accounts</Text>
								</Box>
								<Box component="li" color="colorNeutral">
									<Check2Icon />
									<Text>Add personal account labels</Text>
								</Box>
								<Box component="li" color="colorNeutral">
									<Check2Icon />
									<Text>Save and export account settings (coming soon)</Text>
								</Box>
							</Box>
						</Box>
						<Box className={styles.landingFeaturePointImgBlock}>
							<Box className={clsx(styles.landingMakeItYourOwnAccountsColumn, styles.landingHeroImgMobileHidden)}>
								<Image
									priority
									src="/landing-page-2023/make-it-your-own-card-01.png"
									width={316}
									height={190}
									alt="Vanilla Extract logo"
									className={clsx(styles.landingHeroCalloutImg, styles.landingHeroCalloutRoundedImg)}
								/>
								<Image
									priority
									src="/landing-page-2023/make-it-your-own-card-02.png"
									width={316}
									height={190}
									alt="Vanilla Extract logo"
									className={clsx(styles.landingHeroCalloutImg, styles.landingHeroCalloutRoundedImg)}
								/>
								<Image
									priority
									src="/landing-page-2023/make-it-your-own-card-03.png"
									width={316}
									height={190}
									alt="Vanilla Extract logo"
									className={clsx(styles.landingHeroCalloutImg, styles.landingHeroCalloutRoundedImg)}
								/>
							</Box>
							<Image
								priority
								src="/landing-page-2023/make-it-your-own-01.png"
								width={360}
								height={600}
								alt="Vanilla Extract logo"
								className={clsx(
									styles.landingHeroCalloutImg,
									styles.landingMakeItYourOwnImgLarge,
									styles.landingFeaturePointImg,
									styles.landingHeroCalloutRoundedLargeImg,
								)}
							/>
						</Box>
					</Box>
					{/* END: MAKE IT YOUR OWN */}

					{/* START: ADDRESS BOOK */}
					<Box
						className={clsx(
							styles.landingFeaturePointBlockWrapper,
							styles.landingFeaturePointBlockBorder,
							styles.landingFeaturePointMobileReverse,
						)}
					>
						<Box className={styles.landingFeaturePointImgBlock}>
							<Image
								priority
								src="/landing-page-2023/address-book-01.png"
								width={360}
								height={600}
								alt="Vanilla Extract logo"
								className={clsx(
									styles.landingHeroCalloutImg,
									styles.landingHeroCalloutRoundedLargeImg,
									styles.landingAddressBookImgOneLarge,
								)}
							/>
							<Image
								priority
								src="/landing-page-2023/address-book-02.png"
								width={360}
								height={600}
								alt="Vanilla Extract logo"
								className={clsx(
									styles.landingHeroCalloutImg,
									styles.landingHeroCalloutRoundedLargeImg,
									styles.landingAddressBookImgTwoLarge,
									styles.landingHeroImgMobileHidden,
								)}
							/>
						</Box>
						<Box className={styles.landingFeaturePointBlock}>
							<Text
								component="h4"
								capitalize
								size="large"
								weight="stronger"
								color="strong"
								className={styles.landingTextPurple}
							>
								Address book
							</Text>
							<Text size="xxxxlarge" color="strong" weight="stronger">
								Make it easy
							</Text>
							<Text size="large" color="strong">
								With Z3US&apos;s customization, every transaction becomes an expression of your identity. It&apos;s more
								than just a wallet &ndash; it&apos;s a canvas for your digital financial interactions.
							</Text>
							<Box component="ul">
								<Box component="li" color="colorNeutral">
									<Check2Icon />
									<Text>Manage addresses for individual wallets</Text>
								</Box>
								<Box component="li" color="colorNeutral">
									<Check2Icon />
									<Text>Export address book (coming soon)</Text>
								</Box>
							</Box>
						</Box>
					</Box>
					{/* END: ADDRESS BOOK */}

					{/* START: UNVEILING NFT */}
					<Box className={clsx(styles.landingFeaturePointBlockWrapper, styles.landingFeaturePointBlockBorder)}>
						<Box className={styles.landingFeaturePointBlock}>
							<Text component="h4" capitalize size="large" weight="stronger" className={styles.landingTextPurple}>
								Immersive
							</Text>
							<Text size="xxxxlarge" color="strong" weight="stronger">
								Unveiling NFT excellence
							</Text>
							<Text size="large">
								Whether you&apos;re a collector or an investor, Z3US has the tools you need to immerse yourself in the
								captivating world of NFTs.
							</Text>
							<Box component="ul">
								<Box component="li" color="colorNeutral">
									<Check2Icon />
									<Text>View NFT&apos;s and asset ledger information</Text>
								</Box>
								<Box component="li" color="colorNeutral">
									<Check2Icon />
									<Text>Send and receive NFT assets</Text>
								</Box>
							</Box>
						</Box>
						<Box className={styles.landingFeaturePointImgBlock}>
							<Box className={styles.landingNftSmallWrapperLarge}>
								<Image
									priority
									src="/landing-page-2023/nft-small_01.png"
									width={238}
									height={238}
									alt="Radix nft item"
									className={clsx(
										styles.landingHeroCalloutImg,
										styles.landingHeroCalloutRoundedLargeImg,
										styles.landingNftSmallOne,
									)}
								/>
								<Image
									priority
									src="/landing-page-2023/nft-small_02.webp"
									width={122}
									height={122}
									alt="Radix nft item"
									className={clsx(
										styles.landingHeroCalloutImg,
										styles.landingHeroCalloutRoundedLargeImg,
										styles.landingNftSmallTwo,
									)}
								/>
								<Image
									priority
									src="/landing-page-2023/nft-small_03.png"
									width={98}
									height={98}
									alt="Radix nft item"
									className={clsx(
										styles.landingHeroCalloutImg,
										styles.landingHeroCalloutRoundedLargeImg,
										styles.landingNftSmallThree,
									)}
								/>
								<Image
									priority
									src="/landing-page-2023/nft-small_04.png"
									width={58}
									height={58}
									alt="Radix nft item"
									className={clsx(styles.landingHeroCalloutImg, styles.landingNftSmallFour)}
								/>
							</Box>
							<Image
								priority
								src="/landing-page-2023/nft-02.png"
								width={392}
								height={636}
								alt="Vanilla Extract logo"
								className={clsx(
									styles.landingHeroCalloutImg,
									styles.landingHeroCalloutRoundedLargeImg,
									styles.landingNftTwoLarge,
								)}
							/>
						</Box>
					</Box>
					{/* END: UNVEILING NFT */}

					{/* START: MULTI-WALLET */}
					<Box
						className={clsx(
							styles.landingFeaturePointBlockWrapper,
							styles.landingFeaturePointBlockBorder,
							styles.landingFeaturePointMobileReverse,
						)}
					>
						<Box className={styles.landingFeaturePointImgBlock}>
							<Image
								priority
								src="/landing-page-2023/multi-wallet-01.png"
								width={360}
								height={600}
								alt="multi wallet and pie chart"
								className={clsx(
									styles.landingHeroCalloutImg,
									styles.landingHeroCalloutRoundedLargeImg,
									styles.landingMultiWalletImgOneLarge,
								)}
							/>
							<Image
								priority
								src="/landing-page-2023/multi-wallet-02.png"
								width={360}
								height={516}
								alt="multi wallet"
								className={clsx(
									styles.landingHeroCalloutImg,
									styles.landingHeroCalloutRoundedLargeImg,
									styles.landingMultiWalletImgTwoLarge,
									styles.landingHeroImgMobileHidden,
								)}
							/>
						</Box>
						<Box className={styles.landingFeaturePointBlock}>
							<Text
								component="h4"
								capitalize
								size="large"
								weight="stronger"
								color="strong"
								className={styles.landingTextPurple}
							>
								Analytics
							</Text>
							<Text size="xxxxlarge" color="strong" weight="stronger">
								Multi-wallet and asset insights
							</Text>
							<Text size="large">
								Don&apos;t compromise clarity while managing multiple wallets. Z3US Analytics offers an intuitive
								platform for a comprehensive view of all your wallets, presented through dynamic dashboards and
								insightful reports.
							</Text>
						</Box>
					</Box>
					{/* END: MULTI-WALLET */}

					{/* START: SWEAT DETAILS GRID */}
					<Box className={clsx(styles.landingFeaturePointBlockWrapper, styles.landingFeaturePointBlockBorder)}>
						<Box className={styles.landingDetailsGridWrapper}>
							<Box className={styles.landingDetailsGridHeader}>
								<Text
									component="h4"
									capitalize
									size="large"
									weight="stronger"
									color="strong"
									className={styles.landingTextPurple}
								>
									Sweat the details
								</Text>
								<Text size="xxxxlarge" color="strong" weight="stronger">
									Secure. Simple. All-in-one.
								</Text>
							</Box>
							<Box className={styles.landingDetailsGridBoxWrapper}>
								{Object.entries(GRID_DETAILS).map(([key, { title, subTitle, bgImage, icon }]) => (
									<Box key={key}>
										<Box className={styles.landingDetailsGridBoxImageWrapper}>
											<Box
												className={styles.landingDetailsGridBoxImageBlock}
												style={{ backgroundImage: `url(/landing-page-2023/${bgImage})` }}
											/>
											<Box className={styles.landingDetailsGridCircleWrapper}>
												<Image priority src={`/landing-page-2023/${icon}`} width={48} height={48} alt={title} />
											</Box>
										</Box>
										<Box className={styles.landingDetailsGridTextWrapper}>
											<Text size="xlarge" weight="stronger" color="strong">
												{title}
											</Text>
											<Text size="medium">{subTitle}</Text>
										</Box>
									</Box>
								))}
							</Box>
						</Box>
					</Box>
					{/* END: SWEAT DETAILS GRID */}
				</ContentContainer>
			</Box>
			<Box className={styles.landingPageInvadersWrapper}>
				<Box className={styles.landingPageInvadersInnerWrapper}>
					<Image
						priority
						src="/landing-page-2023/purple-invaders-horizontal-bg.png"
						width={1440}
						height={244}
						alt="Vanilla Extract logo"
					/>
				</Box>
			</Box>
		</Box>
		<Box className={clsx(styles.landingPagePurpleWrapper, styles.landingPageFooterWrapper)}>
			<Footer textColor="strong" />
		</Box>
	</Box>
)