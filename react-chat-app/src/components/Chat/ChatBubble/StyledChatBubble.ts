import styled, { css } from 'styled-components'

type tStyledChatBubbleProps = {
	isSelf: boolean
}

export const StyledChatBubble = styled.div<tStyledChatBubbleProps>`
	width: 100%;
	padding: 0.5rem;
	border-radius: 0.375rem;
	margin-bottom: 0.75rem;
	background-color: var(--brand-1);
	
	div {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.625rem;
		font-weight: 500;
		
		small {
			font-size: 0.8125rem;
		}
	}
	
	${({ isSelf }) => !isSelf && css`
		background-color: var(--brand-2);
	`}
`
