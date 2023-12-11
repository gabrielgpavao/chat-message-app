import { useEffect, useState } from 'react'
import { ChatBubble } from '../ChatBubble/ChatBubble'
import { StyledChatBox } from './StyledChatBox'
import { baseURL } from '../../../constants/baseURL'
import { PaperPlaneRight } from '@phosphor-icons/react'
import toast from 'react-hot-toast'

type tChatProps = {
	id: string
	name: string
	contact: string
}

type tMessage = {
	id: string
	content: string
	sentAt: Date
	sender: string
	receiver: string
}

export function ChatBox({ receiver }: { receiver: tChatProps }) {
	const [messages, setMessages] = useState([] as tMessage[])
	const [sendMessageContent, setSendMessageContent] = useState('')
	const userConnected = JSON.parse(localStorage.getItem('user:connected')!)

	useEffect(() => {
		const eventSource = new EventSource(baseURL + `/messages/${userConnected.id}/chat/${receiver.id}`)
	
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

	async function sendMessage() {
		const token = JSON.parse(localStorage.getItem('user:token')!)
		
		try {
			await fetch(baseURL + `/messages/send/${receiver.id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ content: sendMessageContent }),
			})
		} catch (error) {
			toast.error('Ops, tivemos algum erro ao enviar sua mensagem')
			console.error(error)
		}
	}

	return (
		<StyledChatBox>
			<div>
				<header>
					<h2>Chat Message</h2>
				</header>
				<section className='messages'>
					{messages.map(({ id, content, sentAt, sender }) => {
						const isSender = userConnected.id === sender
						
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
			<div>
				<input
					type="text"
					name="text-message"
					className="text-message"
					placeholder='Digite uma mensagem...'
					defaultValue={sendMessageContent}
					onChange={(e) => { setSendMessageContent(e.target.value) }}
					onKeyUp={(e) => {
						if (e.key === 'Enter') {
							sendMessage()
							e.currentTarget.value = ''
						}
					}}
				/>
				<button type="button" onClick={sendMessage}>
					<PaperPlaneRight size={30} color='var(--blue-1)' />
				</button>
			</div>
		</StyledChatBox>
	)
}
