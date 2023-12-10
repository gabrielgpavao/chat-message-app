import { StyledChatBubble} from './StyledChatBubble'
import { format } from 'date-fns'

type tChatBubbleProps = {
	name: string
	createdAt: Date
	message: string
	isSelf?: boolean
}

export function ChatBubble({ name, createdAt, message, isSelf = true }: tChatBubbleProps) {
	return (
		<StyledChatBubble isSelf={isSelf}>
			<div>
				<h3>{isSelf ? 'Você' : name}</h3>
				<small>{format(createdAt, 'HH:mm - dd/MM/yyyy')}</small>
			</div>

			<p>{message}</p>
		</StyledChatBubble>
	)
}
