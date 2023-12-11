import { StyledChatBubble} from './StyledChatBubble'
import { format } from 'date-fns'

type tChatBubbleProps = {
	name: string
	sentAt: Date
	message: string
	isSelf?: boolean
}

export function ChatBubble({ name, sentAt, message, isSelf = true }: tChatBubbleProps) {
	return (
		<StyledChatBubble $isSelf={isSelf}>
			<div>
				<h3>{isSelf ? 'Você' : name}</h3>
				<small>{format(new Date(sentAt), 'HH:mm - dd/MM/yyyy')}</small>
			</div>

			<p>{message}</p>
		</StyledChatBubble>
	)
}
