import { useState } from 'react'
import { SubscribeModal } from './components/Modal/Subscribe/SubscribeModal'
import { StyledContainer } from './styles/StyledContainer'
import { Chat } from './components/Chat/Chat'

export function App() {
	const [isOpen, setIsOpen] = useState(!localStorage.getItem('user:connected'))

	return (
		<StyledContainer>
			{isOpen && <SubscribeModal setIsOpen={setIsOpen} />}

			<Chat/>
		</StyledContainer>
	)
}
