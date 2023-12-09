import styled from 'styled-components'

export const StyledBaseModal = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: flex-start;
	position: fixed;
	inset: 0;

	section {
		width: 32rem;
		margin-top: 6.25rem;
		padding: 2.5rem 1.5rem;
		border-radius: 0.25rem;
		background-color: var(--blue-2);

		.heading {
			display: flex;
			justify-content: space-between;
			align-items: center;

			h2 {
				font-size: 24px;
				font-weight: 500;
				color: var(--brand-1);
			}

			button {
				height: 2.25rem;
				width: 2.25rem;
				position: relative;
				display: grid;
				place-items: center;

				font-size: 32px;
				font-weight: 400;
				border-radius: 100%;
				background-color: var(--brand-1);
				transition: 0.2s;
				
				span {
					position: absolute;
					right: 0.375rem;
					bottom: 0.1875rem;
					rotate: 45deg;
				}
			}

			button:hover {
				background-color: var(--brand-2);
				transition: 0.2s;
			}
		}
	}
`
