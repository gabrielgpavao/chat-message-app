import { createPortal } from 'react-dom'
import { StyledBaseModal } from './StyledBaseModal'

interface ModalProps {
  title: string;
  children: React.ReactNode;
}

export function Modal({ children, title, }: ModalProps): JSX.Element {
	return createPortal(
		<StyledBaseModal>
			<section>
				<div className='heading'>
					<h2>{title}</h2>
				</div>
				{children}
			</section>
		</StyledBaseModal>,
		document.body
	)
}
