import { FormEvent, useState } from 'react'
import { Modal } from '../Base/BaseModal'
import { StyledForm } from './StyledForm'
import { ZodError, z } from 'zod'
import { tSubscribeModalsProps } from '.'
import toast from 'react-hot-toast'
import { baseURL } from '../../../constants/baseURL'

const loginUserSchema = z.object({
	contact: z
		.string()
		.min(1, 'Campo obrigatório')
		.max(127, 'Capacidade máxima de caracteres atingida')
		.trim()
})

type tLoginUserInput = z.infer<typeof loginUserSchema>

export function LoginModal({ setIsLoginOpen, setIsRegisterOpen }: tSubscribeModalsProps) {
	const [loginUserInput, setLoginUserInput] = useState<Partial<tLoginUserInput>>()
	const [formErrors, setFormErrors] = useState<Record<string, string>>({})
	
	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		
		try {
			const reqBody = loginUserSchema.parse(loginUserInput)

			const response = await fetch(baseURL + '/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(reqBody),
			})

			if (!response.ok) throw new Error

			const { user, token } = await response.json()

			sessionStorage.setItem('user:connected', JSON.stringify(user))
			sessionStorage.setItem('user:token', JSON.stringify(token))

			setIsLoginOpen(false)
		} catch (error) {
			if (error instanceof ZodError) {
				const errors: Record<string, string> = {}
				error.errors.forEach((err) => {
					if (err.path) {
						errors[err.path[0]] = err.message
					}
				})
				setFormErrors(errors)
			}

			if (error instanceof Error) {
				toast.error(error.toString())
			}
			
			toast.error('Ops,tivemos algum erro inesperado.')
			console.error(error)
		}
	}

	return (
		<Modal title='Bem-vindo de volta' >
			<StyledForm onSubmit={handleSubmit}>
				<p>Nos informe o seu contato:</p>

				<fieldset>
					<label htmlFor="contact">Contato</label>
					<input
						id="contact"
						type="text"
						name="contact"
						placeholder='Digite o seu email ou celular...'
						required
						onBlur={(e) => { setLoginUserInput({ contact: e.target.value}) }}
					/>
					{formErrors.contact && <small className='error'>{formErrors.contact}</small>}
				</fieldset>

				<small>Ainda não possui uma conta? Clique {}
					<span onClick={() => {
						setIsLoginOpen(false)
						setIsRegisterOpen(true)
					}}>
						aqui
					</span>
				</small>

				<button type="submit">Concluir</button>
			</StyledForm>
		</Modal>
	)
}
