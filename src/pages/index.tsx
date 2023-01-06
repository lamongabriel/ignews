import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import styles from './home.module.scss'

import womanImage from '../assets/woman.svg'
import { SubscribeButton } from '../components/SubscribeButton'
import { stripe } from '../services/stripe'
import { Layout } from '../components/Layout'

interface HomeProps {
	product: {
		priceId: string
		amount: number
	}
}

export default function Home({product}: HomeProps) {
	return(
		<>
			<Head>
				<title>Home | ig.news</title>
			</Head>
			<Layout>
				<div className={styles.home__content}>
					<section>
						<span>👏 Hey, welcome</span>

						<div>
							<h1>News about<br/>the <strong>React</strong> world</h1>
							<p>Get access to all the publications<br/>
								<span><strong>for {product.amount} month.</strong></span>
							</p>
						</div>

						<SubscribeButton />
					</section>

					<Image src={womanImage} alt='Drawing of a woman on a chair' />
				</div>

			</Layout>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const price = await stripe.prices.retrieve('price_1MEuw9KCTt7mnlisZ9qLNPl1')

	const product = {
		priceId: price.id,
		amount: new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'USD'
		}).format(price.unit_amount as number / 100)
	}

	return {
		props: {
			product
		},
		revalidate: 60 * 60 * 24 // 24 hours
	}
}
