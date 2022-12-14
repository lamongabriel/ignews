import Head from 'next/head'
import Image from 'next/image'

import { Header } from '../components/Header'

import styles from './home.module.scss'

import womanImage from '../assets/woman.svg'
import { SubscribeButton } from '../components/SubscribeButton'

export default function Home() {
	return(
		<>
			<Head>
				<title>Home | ig.news</title>
			</Head>
			<Header />
			<main className={styles.home__content + ' container'}>
				<section>
					<span>👏 Hey, welcome</span>

					<div>
						<h1>News about<br/>the <strong>React</strong> world</h1>
						<p>Get access to all the publications<br/>
							<span><strong>for $9.90 month.</strong></span>
						</p>
					</div>

					<SubscribeButton />
				</section>

				<Image src={womanImage} alt='Drawing of a woman on a chair' />
			</main>
		</>
	)
}
