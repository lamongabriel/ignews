import Head from 'next/head'

import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'

import { Header } from '../../../components/Header'

import styles from './styles.module.scss'
import { createClient } from '../../../../prismicio'
import { RichText } from 'prismic-dom'

interface PostProps {
	post: {
		slug: string
		title: string
		content: string
		updatedAt: string
	}
}


export default function Post ({ post }: PostProps) {
	return (
		<>
			<Head>
				<title>{`${post.title} | ig.news`}</title>
			</Head>
			<Header />
			<article className={styles.container}>
				<h1>{post.title}</h1>
				<time>{post.updatedAt}</time>
				<div dangerouslySetInnerHTML={{
					__html: post.content
				}} />
			</article>
		</>
	)
}

export const getServerSideProps:GetServerSideProps = async ({ req, params }) => {

	try {

		const session = await getSession({ req })
		if(!session?.activeSubscription){
			return {
				redirect: {
					destination: '/',
					permanent: false
				}
			}
		}

		const { slug } = params as { slug: string }

		const client = createClient()
		const response = await client.getByUID('post', slug)

		const post = {
			slug,
			title: RichText.asText(response.data.title),
			content: RichText.asHtml(response.data.content),
			updatedAt: new Date(response.last_publication_date).toLocaleDateString('en-US', {
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			})
		}

		return {
			props: {
				post
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
