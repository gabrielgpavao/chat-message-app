import { StyledContainer } from './styles/StyledContainer'
import { ChatGroups } from './components/Chat'
import { Toaster } from 'react-hot-toast'
import { SubscribeModal } from './components/Modal/Subscribe'

export function App() {
	return (
		<StyledContainer>
			<ChatGroups />
			{/* <SubscribeModal /> */}
			<Toaster position='top-right'/>
		</StyledContainer>
	)
}
