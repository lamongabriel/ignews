import Image from 'next/image'

import styles from './styles.module.scss'

import logo from '../../assets/logo.svg'

export function Header () {
	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent}>
				<Image src={logo} alt="ig.news logo"/>

				<nav>
					<a href='' className={styles.active}>Home</a>
					<a href=''>Posts</a>
				</nav>
			</div>
		</header>
	)
}
