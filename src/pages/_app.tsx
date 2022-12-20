import Link from 'next/link'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'

import { PrismicProvider } from '@prismicio/react'
import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '../../prismicio'

import '../styles/global.scss'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>

			<PrismicProvider internalLinkComponent={(props) => <Link {...props} />}>

				<PrismicPreview repositoryName={repositoryName}>
					<Component {...pageProps} />
				</PrismicPreview>

			</PrismicProvider>

		</SessionProvider>
	)
}
