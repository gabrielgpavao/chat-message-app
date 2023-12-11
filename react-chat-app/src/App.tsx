import { StyledContainer } from './styles/StyledContainer'
import { ChatGroups } from './components/Chat'
import { Toaster } from 'react-hot-toast'
import { SubscribeModal } from './components/Modal/Subscribe'
import { useState } from 'react'

export function App() {
	const [isSubscribeOpen, setIsSubscribeOpen] = useState(true)

	return (
		<StyledContainer>
			{isSubscribeOpen && <SubscribeModal setIsSubscribeOpen={setIsSubscribeOpen} />}
			{!isSubscribeOpen && <ChatGroups />}

			<Toaster position='top-right'/>
		</StyledContainer>
	)
}
