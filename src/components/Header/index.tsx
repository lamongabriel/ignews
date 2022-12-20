import Image from 'next/image'

import { SignInButton } from '../SignInButton'

import styles from './styles.module.scss'

import logo from '../../assets/logo.svg'
import { ActiveLink } from '../ActiveLink'

export function Header () {

	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent + ' container'}>
				<Image src={logo} alt="ig.news logo"/>

				<nav>
					<ActiveLink activeClassName={styles.active} href='/'>
						Home
					</ActiveLink>
					<ActiveLink activeClassName={styles.active} href='/posts'>
						Posts
					</ActiveLink>
				</nav>

				<SignInButton />
			</div>
		</header>
	)
}
