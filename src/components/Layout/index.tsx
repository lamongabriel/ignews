import { ReactNode } from 'react'
import { Header } from '../Header'

import styles from './styles.module.scss'

interface LayoutProps {
	children: ReactNode
}

export function Layout ({children}: LayoutProps) {
	return (
		<>
			<Header />
			<main className={styles.container}>
				{children}
			</main>
		</>
	)
}
