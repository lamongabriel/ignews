import { GetServerSideProps } from 'next'
import Head from 'next/head'

import { createClient } from '../../../prismicio'
import { RichText } from 'prismic-dom'

import styles from './styles.module.scss'
import Link from 'next/link'
import { Layout } from '../../components/Layout'

interface Post {
	slug: string
	title: string
	exercpt: string
	updatedAt: string
}

interface PostsProps {
	posts: Post[]
}

export default function Posts ({ posts }: PostsProps) {
	return (
		<>
			<Head>
				<title>Posts | ig.news</title>
			</Head>
			<Layout>
				<div className={styles.posts}>
					{
						posts.map(post => (
							<Link href={`/posts/${post.slug}`} key={post.slug}>
								<time>{post.updatedAt}</time>
								<strong>{post.title}</strong>
								<p>{post.exercpt}</p>
							</Link>
						))
					}
				</div>
			</Layout>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {
	const client = createClient()
	const response = await client.getAllByType('post')

	const posts = response.map(post => {
		return {
			slug: post.uid,
			title: RichText.asText(post.data.title),
			// @ts-expect-error Prismic typing bug
			exercpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
			updatedAt: new Date(post.last_publication_date).toLocaleDateString('en-US', {
				day: '2-digit',
				month: 'long',
				year: 'numeric'
			})
		}
	})

	return {
		props: {
			posts
		}
	}
}
