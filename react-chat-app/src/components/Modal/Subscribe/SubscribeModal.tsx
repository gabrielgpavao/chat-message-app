import { Modal } from '../Base/BaseModal'
import { StyledSubscribeForm } from './StyledSubscribeForm'

export function SubscribeModal() {
	return (
		<Modal title='Bem-vindo ao App' >
			<StyledSubscribeForm>
				<p>Nos informe o seu contato:</p>

				<fieldset>
					<label htmlFor="name">Nome</label>
					<input type="text" name="name" id="name" required placeholder='Digite o seu nome...' />
				</fieldset>

				<fieldset>
					<label htmlFor="contact">Contato</label>
					<input type="text" name="contact" id="contact" required placeholder='Digite o seu email ou celular...' />
				</fieldset>

				<button type="submit">Concluir</button>
			</StyledSubscribeForm>
		</Modal>
	)
}
