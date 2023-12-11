import { StyledChatGroups } from './StyledChatGroups'
import { ChatDots } from '@phosphor-icons/react'

function Group({ name, contact }: { name: string, contact: string }) {
	return (
		<li id='user-id'>
			<h4>{name}</h4>
			<p>{contact}</p>
			<ChatDots size={36} color='var(--blue-1)' />
		</li>
	)
}

export function ChatGroups() {
	return (
		<StyledChatGroups>
			<div>
				<h1>Chat App</h1>
				<h3>Escolha com quem você quer conversar hoje:</h3>
			</div>
			<section>
				<ul>
					<Group name='Gabriel' contact='gab@mail.com' />
				</ul>
			</section>
		</StyledChatGroups>
	)
}
