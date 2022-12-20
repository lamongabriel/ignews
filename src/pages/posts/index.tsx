import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'

import { Header } from '../../components/Header'

import { createClient } from '../../../prismicio'
import { RichText } from 'prismic-dom'

import styles from './styles.module.scss'

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
	console.log(posts)
	return (
		<>
			<Head>
				<title>Posts | ig.news</title>
			</Head>
			<main>

				<Header />

				<div className={styles.posts}>
					{
						posts.map(post => (
							<a key={post.slug}>
								<time>{post.updatedAt}</time>
								<strong>{post.title}</strong>
								<p>{post.exercpt}</p>
							</a>
						))
					}
				</div>
			</main>
		</>
	)
}

export const getStaticProps: GetStaticProps = async () => {
	const client = createClient()
	const response = await client.getAllByType('post')

	const posts = response.map(post => {
		return {
			slug: post.uid,
			title: RichText.asText(post.data.title),
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
