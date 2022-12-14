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
					<a href='' className={styles.active}>Home</a>
					<a href=''>Posts</a>
				</nav>

				<SignInButton />
			</div>
		</header>
	)
}
