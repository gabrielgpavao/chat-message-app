import { SubscribeModal } from './components/Modal/Subscribe'
import { StyledContainer } from './styles/StyledContainer'
import { Chat } from './components/Chat/Chat'
import { Toaster } from 'react-hot-toast'

export function App() {
	return (
		<StyledContainer>
			{/* <SubscribeModal /> */}
			{/* <Chat /> */}
			<Toaster position='top-right'/>
		</StyledContainer>
	)
}
