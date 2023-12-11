import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ChatBubble } from '../ChatBubble/ChatBubble'
import { StyledChatBox } from './StyledChatBox'
import { baseURL } from '../../../constants/baseURL'
import { CaretLeft, PaperPlaneRight } from '@phosphor-icons/react'
import toast from 'react-hot-toast'

type tChatProps = {
	id: string
	name: string
	contact: string
	isChatOpen: boolean
	setIsChatOpen: Dispatch<SetStateAction<boolean>>
}

type tMessage = {
	id: string
	content: string
	sentAt: Date
	sender: string
	receiver: string
}

export function ChatBox({ id, name, contact, isChatOpen, setIsChatOpen }: tChatProps) {
	const [messages, setMessages] = useState([] as tMessage[])
	const [sendMessageContent, setSendMessageContent] = useState('')
	const userConnected = JSON.parse(sessionStorage.getItem('user:connected')!)

	useEffect(() => {
		const eventSource = new EventSource(baseURL + `/messages/${userConnected.id}/chat/${id}`)
	
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

		if (!isChatOpen) eventSource.close()

		return () => {
			eventSource.close()
		}
	}, [isChatOpen])

	async function sendMessage() {
		const token = JSON.parse(sessionStorage.getItem('user:token')!)
		
		try {
			await fetch(baseURL + `/messages/send/${id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				},
				body: JSON.stringify({ content: sendMessageContent }),
			})
			setSendMessageContent('')
		} catch (error) {
			toast.error('Ops, tivemos algum erro ao enviar sua mensagem')
			console.error(error)
		}
	}

	return (
		<StyledChatBox>
			<div>
				<header>
					<button type="button" className='closeChat' onClick={() => { setIsChatOpen(false) } }>
						<CaretLeft size={32} color='var(--brand-1)' />
					</button>
					<h2>{name} - {contact}</h2>
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
										: name
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
					autoComplete='off'
					value={sendMessageContent}
					onChange={(e) => { setSendMessageContent(e.target.value) }}
					onKeyUp={(e) => {
						if (e.key === 'Enter') {
							sendMessage()
							e.currentTarget.value = sendMessageContent
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
