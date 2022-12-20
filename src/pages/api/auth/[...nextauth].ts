import { query as q } from 'faunadb'

import NextAuth, { AuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import { fauna } from '../../../services/fauna'

export const authOptions: AuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
			profile(profile) {
				return {
					id: profile.id.toString(),
					image: profile.avatar_url,
					name: profile.login,
					email: profile.email
				}
			},
		}),
	],
	callbacks: {
		async session({ session }) {

			if(!session?.user?.email) return session

			try {
				const userActiveSubscription = await fauna.query(
					q.Get(
						q.Intersection([
							q.Match(
								q.Index('subscription_by_user_ref'),
								q.Select(
									'ref',
									q.Get(
										q.Match(
											q.Index('user_by_email'),
											q.Casefold(session.user.email)
										)
									)
								)
							),
							q.Match(
								q.Index('subscription_by_status'),
								'active'
							)
						])
					)
				)

				return {
					...session,
					activeSubscription: userActiveSubscription
				}

			} catch (error){
				return session
			}
		},
		async signIn({ user }) {
			const { email } = user

			try {

				if(!email) return false

				await fauna.query(
					q.If(
						q.Not(
							q.Exists(
								q.Match(
									q.Index('user_by_email'),
									q.Casefold(email)
								)
							)
						),
						q.Create(
							q.Collection('users'),
							{
								data: { email }
							}
						),
						q.Get(
							q.Match(
								q.Index('user_by_email'),
								q.Casefold(email)
							)
						)
					)
				)
				return true
			} catch {
				return false
			}
		},
	}
}

export default NextAuth(authOptions)
