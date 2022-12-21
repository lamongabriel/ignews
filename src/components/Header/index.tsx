import Link from 'next/link'
import Image from 'next/image'

import { SignInButton } from '../SignInButton'
import { ActiveLink } from '../ActiveLink'

import styles from './styles.module.scss'

import logo from '../../assets/logo.svg'

export function Header () {

	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent + ' container'}>

				<Link href='/'>
					<Image src={logo} alt="ig.news logo"/>
				</Link>

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
