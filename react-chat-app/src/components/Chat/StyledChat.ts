import styled from 'styled-components'

export const StyledChat = styled.section`
	width: 100%;
	height: calc(100vh - 2rem);
	padding: 0.625rem;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

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
`
