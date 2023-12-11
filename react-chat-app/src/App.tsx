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
					id: '657704d54eb05b4c25e9ece2',
					name: 'Ale',
					contact: 'ale@mail.com'
				}}
			/> */}
			<Toaster position='top-right'/>
		</StyledContainer>
	)
}
