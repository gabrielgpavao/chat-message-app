import { ChatBubble } from './ChatBubble/ChatBubble'
import { StyledChat } from './StyledChat'

export function Chat() {
	return (
		<StyledChat>
			<div>
				<header>
					<h2>Chat Message</h2>
				</header>
				<section className='messages'>
					<ChatBubble
						name='Gabriel'
						createdAt={new Date()}
						message='Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem nulla, nesciunt nihil quidem nobis exercitationem obcaecati qui rem dolores consequatur, rerum nemo, neque laboriosam velit aspernatur molestiae doloremque. Maiores, fugiat.' 
					/>
					
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
