import styled from 'styled-components'

export const StyledSubscribeForm = styled.form`
	p {
		line-height: 1.375rem;
		margin-bottom: 1rem;
		font-weight: 500;
	}

	fieldset {
		display: flex;
		flex-direction: column;
		margin-bottom: 1.25rem;

		label {
			margin-bottom: 0.625rem;
		}
		
		input {
			width: 100%;
			height: 2.5rem;
			padding-left: 0.75rem;

			border-radius: 0.375rem;
			font-size: 0.875rem;
			font-weight: 500;

			color: var(--blue-1);
			background-color: var(--brand-2);
			outline: none;

		}

		.error {
			margin-top: 0.375rem;
			font-size: 0.875rem;
			color: var(--error);
		}
	}
	button {
		height: 2.5rem;
		width: 100%;
		
		border-radius: 0.375rem;
		font-weight: 600;
		font-size: 1.125rem;
		color: var(--blue-1);
		background-color: var(--brand-1);
		transition: 0.3s;
	}

	button:hover {
		transition: 0.3s;
		background-color: var(--brand-2);
	}
`
