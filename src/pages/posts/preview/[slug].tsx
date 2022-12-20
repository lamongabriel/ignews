import Head from 'next/head'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { GetStaticPaths, GetStaticProps } from 'next'

import { Header } from '../../../components/Header'

import { createClient } from '../../../../prismicio'
import { RichText } from 'prismic-dom'

import styles from '../[slug]/styles.module.scss'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface PreviewProps {
	preview: {
		slug: string
		title: string
		content: string
		updatedAt: string
	}
}

export default function Preview ({ preview }: PreviewProps) {

	const { data } = useSession()
	const router = useRouter()

	useEffect(() => {
		if(data?.activeSubscription){
			router.push(`/posts/${preview.slug}`)
		}
	}, [data])

	return (
		<>
			<Head>
				<title>{`${preview.title} | ig.news`}</title>
			</Head>
			<Header />
			<article className={`${styles.container} ${styles.previewContainer}`}>
				<h1>{preview.title}</h1>
				<time>{preview.updatedAt}</time>
				<div dangerouslySetInnerHTML={{
					__html: preview.content
				}} />
				<Link href='/' className={styles.continueReading}>
					<button>
						Wanna continue reading? <span>Subscribe now</span> 🤗
					</button>
				</Link>
			</article>
		</>
	)
}

export const getStaticPaths:GetStaticPaths = async () => {
	return {
		paths: [],
		fallback: 'blocking'
	}
}

export const getStaticProps:GetStaticProps = async ({ params }) => {

	try {
		const { slug } = params as { slug: string }


		const client = createClient()
		const response = await client.getByUID('post', slug)

		const preview = {
			slug,
			title: RichText.asText(response.data.title),
			content: RichText.asHtml(response.data.content.slice(0, 3)),
			updatedAt: new Date(response.last_publication_date).toLocaleDateString('en-US', {
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			})
		}

		return {
			props: {
				preview
			}
		}
	} catch {
		return {
			redirect: {
				destination: '/404',
				permanent: true
			}
		}
	}
}
