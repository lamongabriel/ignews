import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

export const authOptions = {
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
}

export default NextAuth(authOptions)
