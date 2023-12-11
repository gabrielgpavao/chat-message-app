import { SubscribeModal } from './components/Modal/Subscribe'
import { StyledContainer } from './styles/StyledContainer'
import { ChatGroups } from './components/Chat'
import { Toaster } from 'react-hot-toast'

export function App() {
	return (
		<StyledContainer>
			<ChatGroups />
			{/* <SubscribeModal /> */}
			{/* <Chat
				receiver={{
					id: '6575fc5fd5874d448b4ca1fa',
					name: 'Leo',
					contact: 'leo@mail.com'
				}}
			/> */}
			<Toaster position='top-right'/>
		</StyledContainer>
	)
}
