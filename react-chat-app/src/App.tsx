import { Modal } from './components/Modal/BaseModal'

export function App() {
	return (
		<main>
			<Modal title='Bem-vindo ao App' onClose={() => console.log('fechar')}>
				<div>Conteúdo do modal</div>
			</Modal>
		</main>
	)
}
