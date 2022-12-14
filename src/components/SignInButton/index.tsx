import { signIn, signOut, useSession } from 'next-auth/react'

import styles from './styles.module.scss'

import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

export function SignInButton() {

	const {status, data} = useSession()

	return status === 'authenticated' ? (
		<button
			className={styles.signInButton}
			type="button"
			onClick={() => signOut()}
		>
			<FaGithub size={24} color='#04D361' />
			{data.user?.name}
			<FiX color='#737380' size={20} />
		</button>
	) : (
		<button
			className={styles.signInButton}
			type="button"
			onClick={() => signIn('github')}
		>
			<FaGithub size={24} color='#eba417' />
			Sign in with GitHub
		</button>
	)
}
