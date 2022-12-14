import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

import styles from './styles.module.scss'

export function SignInButton() {

	const isUserLogged = true

	return isUserLogged ? (
		<button
			className={styles.signInButton}
			type="button"
		>
			<FaGithub size={24} color='#04D361' />
			lamongabriel
			<FiX color='#737380' size={20} />
		</button>
	) : (
		<button
			className={styles.signInButton}
			type="button"
		>
			<FaGithub size={24} color='#eba417' />
			Sign in with GitHub
		</button>
	)
}
