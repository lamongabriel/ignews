import Link from 'next/link'
import Image from 'next/image'
import { SignInButton } from '../SignInButton'

import styles from './styles.module.scss'

import logo from '../../assets/logo.svg'

export function Header () {
	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent + ' container'}>
				<Image src={logo} alt="ig.news logo"/>

				<nav>
					<Link href='/' className={styles.active}>
						Home
					</Link>
					<Link href='/posts' prefetch>
						Posts
					</Link>
				</nav>

				<SignInButton />
			</div>
		</header>
	)
}
