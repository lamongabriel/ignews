import Link from 'next/link'
import Image from 'next/image'

import { SignInButton } from '../SignInButton'
import { ActiveLink } from '../ActiveLink'

import { FaBars } from 'react-icons/fa'

import styles from './styles.module.scss'

import logo from '../../assets/logo.svg'
import { useEffect, useState } from 'react'

export function Header () {

	const [menuOpen, setMenuOpen] = useState(false)

	function toggleMobMenu () {
		setMenuOpen(prev => !prev)
	}

	useEffect(() => {
		if(menuOpen){
			document.body.style.overflow = 'hidden'
			return
		}
		document.body.style.overflow = 'auto'
	}, [menuOpen])

	return (
		<header className={styles.headerContainer}>
			<div className={styles.headerContent}>

				<Link href='/'>
					<Image src={logo} alt="ig.news logo"/>
				</Link>

				<button className={styles.menuButton} onClick={toggleMobMenu}>
					<FaBars size={22} color="#e1e1e6" />
				</button>

				<nav className={menuOpen ? styles.navOpen : ''}>
					<ActiveLink activeClassName={styles.active} href='/'>
								Home
					</ActiveLink>
					<ActiveLink activeClassName={styles.active} href='/posts'>
								Posts
					</ActiveLink>
					<SignInButton />
				</nav>

			</div>
		</header>
	)
}
