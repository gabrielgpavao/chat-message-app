import styled from 'styled-components'

export const StyledChatBox = styled.section`
	width: calc(100vw - 2rem);
	height: calc(100vh - 2rem);
	padding: 0.625rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: fixed;
	inset: 0;
	margin: 1rem;


	border-radius: 0.375rem;
	background-color: var(--blue-2);

	header {
		width: 100%;
		height: 2.5rem;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 1.25rem;
		
		border-radius: 0.375rem;
		background-color: var(--blue-3);
		color: var(--brand-1);
		font-size: 24px;
		font-weight: 600;
	}

	> div {
		max-height: calc(100% - 3.5rem);
	}
	
	.messages {
		color: var(--blue-1);
		max-height: calc(100% - 0.30rem - 2*(2.5rem - 0.625rem));
		overflow-y: scroll;
	}

	.messages::-webkit-scrollbar {
		display: none;
	}

	.text-message {
		width: 100%;
		height: 2.5rem;
		padding-left: 0.75rem;
		
		border-radius: 0.375rem;
		background-color: var(--brand-2);
		color: var(--blue-1);
	}

	button {
		height: 2.5rem;
		width: 2.5rem;
		position: absolute;
		right: 0.625rem;
		border-radius: 0 0.375rem 0.375rem 0 ;
		background-color: var(--brand-1);
		cursor: pointer;
	}
`
