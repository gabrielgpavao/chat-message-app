import styled from 'styled-components'

export const StyledBaseModal = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	padding: 0 1rem;
	position: fixed;
	inset: 0;
	background-color: var(--blue-1);

	section {
		width: 32rem;
		margin-top: 6.25rem;
		padding: 2.5rem 1.5rem;
		border-radius: 0.375rem;
		background-color: var(--blue-2);

		.heading {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 1.75rem;

			h2 {
				font-size: 1.5rem;
				font-weight: 500;
				color: var(--brand-1);
			}
		}
	}
`
