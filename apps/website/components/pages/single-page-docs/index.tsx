import React from 'react'
import { Container, Grid } from '@nextui-org/react'
import { Box, Flex } from 'ui/src/components/atoms'
import { Header } from 'components/header'
import { Footer } from 'components/footer'

interface IProps {
	children: React.ReactNode
}

export const SinglePageDocs: React.FC<IProps> = ({ children }: IProps) => (
	<Flex direction="column" css={{ minHeight: '100vh' }}>
		<Header />
		<Box
			css={{
				position: 'relative',
				flex: '1',
			}}
		>
			<Container gap={0}>
				<Grid.Container gap={0} justify="center">
					<Grid xs={8}>
						<Box css={{ width: '100%', pb: '100px' }}>{children}</Box>
					</Grid>
				</Grid.Container>
			</Container>
		</Box>
		<Footer />
	</Flex>
)