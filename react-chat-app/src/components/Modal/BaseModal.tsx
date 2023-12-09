import { createPortal } from 'react-dom'
import { StyledBaseModal } from './StyledBaseModal'

interface ModalProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export function Modal({ children, title, onClose, }: ModalProps): JSX.Element {
	return createPortal(
		<StyledBaseModal>
			<section>
				<div className='heading'>
					<h2>{title}</h2>
					<button onClick={onClose}>
						<span>+</span>
					</button>
				</div>
				{children}
			</section>
		</StyledBaseModal>,
		document.body
	)
}
