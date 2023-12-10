import { useState } from 'react'
import { SubscribeModal } from './components/Modal/Subscribe/SubscribeModal'

export function App() {
	const [isOpen, setIsOpen] = useState(!localStorage.getItem('user:connected'))

	return (
		<main>
			{isOpen && <SubscribeModal setIsOpen={setIsOpen} />}
		</main>
	)
}
