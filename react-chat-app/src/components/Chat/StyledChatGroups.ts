import styled from 'styled-components'

export const StyledChatGroups = styled.section`
	width: 100%;
	height: calc(100vh - 2rem);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	padding-top: 2.5rem;

	> div {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 2rem;
		
		h1 {
			font-weight: 600;
			font-size: 2.25rem;
			color: var(--brand-1);
			margin-bottom: 1.25rem;
		}

		h3 {
			font-weight: 500;
			font-size: 1.75rem;
			color: var(--brand-2);
		}
	}

	section {
		height: 100%;
		max-height: calc(100vh - 9.0625rem - 2.5rem - 2rem);
		width: 100%;
		max-width: 68rem;
		
		ul {
			display: grid;
			grid-template-columns: repeat(1fr);
			justify-items: center;
			grid-gap: 1.25rem;

			@media (min-width: 560px) {
				grid-template-columns: repeat(2, 1fr);	
			}

			@media (min-width: 840px) {
				grid-template-columns: repeat(3, 1fr);	
			}

			@media (min-width: 1100px) {
				grid-template-columns: repeat(4, 1fr);	
			}

			li {
				height: 4.5rem;
				width: 15.625rem;
				padding: 0.75rem;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				position: relative;

				border-radius: 0.375rem;
				background-color: var(--brand-2);
				cursor: pointer;
				transition: 0.3s;

				h4 {
					font-size: 1.25rem;
					font-weight: 600;
					color: var(--blue-1);
				}

				p {
					height: 18px;
					max-width: calc(100% - 1.5rem - 0.625rem);

					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;

					font-weight: 500;
					color: var(--blue-2);
				}

				svg {
					position: absolute;
					right: 0.625rem;
					bottom: 1.25rem;
				}
			}

			li:hover {
				transition: 0.3s;
				background-color: var(--brand-1);
			}
		}
	}
`
