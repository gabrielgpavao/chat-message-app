import { MouseEvent, useEffect, useState } from 'react'
import { StyledChatGroups } from './StyledChatGroups'
import { ChatDots } from '@phosphor-icons/react'
import { baseURL } from '../../constants/baseURL'
import { ChatBox } from './ChatBox/ChatBox'

type tGroup = {
	_id: string
	name: string
	contact: string
}

function Group({
	_id,
	name,
	contact,
	onClick
}: tGroup & {
	onClick: (event?: MouseEvent<HTMLLIElement>) => void
}) {
	return (
		<li id={_id} onClick={onClick}>
			<h4>{name}</h4>
			<p>{contact}</p>
			<ChatDots size={36} color='var(--blue-1)' />
		</li>
	)
}

export function ChatGroups() {
	const [groups, setGroups] = useState([] as tGroup[])
	const [chatBoxContact, setChatBoxContact] = useState({} as tGroup)
	const [isChatOpen, setIsChatOpen] = useState(false)

	async function getGroupsList() {
		try {
			const response = await fetch(baseURL + '/users')

			if (!response.ok) {
				throw Error
			}
			
			return await response.json()
		} catch (error) {
			console.error(error)
		}
	}

	useEffect(() => {
		(async () => {
			const groups: tGroup[] = await getGroupsList()
			const userConnected = JSON.parse(sessionStorage.getItem('user:connected')!)
			setGroups(groups.filter(group => group._id !== userConnected.id))
		})()
	}, [])
	
	return (
		<>
			<StyledChatGroups>
				<div>
					<h1>Chat App</h1>
					<h3>Escolha com quem você quer conversar hoje:</h3>
				</div>
				<section>
					<ul>
						{groups.map(({ _id, name, contact }) => (
							<Group
								key={_id}
								_id={_id}
								name={name}
								contact={contact}
								onClick={() => {
									setChatBoxContact({ _id, name, contact })
									setIsChatOpen(true)
								}}
							/>
						))}
					</ul>
				</section>

			</StyledChatGroups>

			{isChatOpen && (
				<ChatBox
					id={chatBoxContact._id}
					name={chatBoxContact.name}
					contact={chatBoxContact.contact}
					isChatOpen={isChatOpen}
					setIsChatOpen={setIsChatOpen}
				/>
			)}
		</>
	)
}
