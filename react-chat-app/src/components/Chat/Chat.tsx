import { useEffect, useState } from 'react'
import { ChatBubble } from './ChatBubble/ChatBubble'
import { StyledChat } from './StyledChat'
import { baseURL } from '../../constants/baseURL'

type tChatProps = {
	id: string
	name: string
	contact: string
}

type tMessage = {
	id: string
	content: string
	sentAt: Date
	senderId: string
	receiverId: string
}

export function Chat({ receiver }: { receiver: tChatProps }) {
	const [messages, setMessages] = useState([] as tMessage[])
	const userConnected = JSON.parse(localStorage.getItem('user:connected')!)

	useEffect(() => {
		const eventSource = new EventSource(baseURL + `/messages/${userConnected}/chat/${receiver.id}`)
	
		eventSource.onmessage = (event) => {
			const data = JSON.parse(event.data)
			const dataLength = data.length ?? 0
	
			if (dataLength) {
				setMessages(data)
			}
		}
	
		eventSource.onerror = () => {
			eventSource.close()
		}

		return () => {
			eventSource.close()
		}
	}, [])
	
	return (
		<StyledChat>
			<div>
				<header>
					<h2>Chat Message</h2>
				</header>
				<section className='messages'>
					{messages.map(({ id, content, sentAt, senderId }) => {
						const isSender = userConnected.id === senderId
						
						return (
							<ChatBubble
								key={id}
								name={
									isSender
										? userConnected.name
										: receiver.name
								}
								sentAt={sentAt}
								message={content}
								isSelf={isSender}
							/>
						)
					})}
				</section>
			</div>
			<input
				type="text"
				name="text-message"
				className="text-message"
				placeholder='Digite uma mensagem...'
			/>
		</StyledChat>
	)
}
