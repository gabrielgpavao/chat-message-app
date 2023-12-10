import { useState } from 'react'
import { SubscribeModal } from './components/Modal/Subscribe/SubscribeModal'
import { StyledContainer } from './styles/StyledContainer'

export function App() {
	const [isOpen, setIsOpen] = useState(!!localStorage.getItem('user:connected'))

	return (
		<StyledContainer>
			{isOpen && <SubscribeModal setIsOpen={setIsOpen} />}
		</StyledContainer>
	)
}
