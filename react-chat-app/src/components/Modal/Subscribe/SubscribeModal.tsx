import { Dispatch, FocusEvent, FormEvent, SetStateAction, useState } from 'react'
import { Modal } from '../Base/BaseModal'
import { StyledSubscribeForm } from './StyledSubscribeForm'
import { ZodError, z } from 'zod'

const userInputSchema = z.object({
	name: z
		.string()
		.min(1, 'Campo obrigatório')
		.refine(value => /^[A-Za-z]+$/.test(value), 'Caractere inválido'),
	contact: z
		.string()
		.min(1, 'Campo obrigatório')
		.max(127, 'Capacidade máxima de caracteres atingida')
		.trim()
})

type tUserInput = z.infer<typeof userInputSchema>

export function SubscribeModal({ setIsOpen }: { setIsOpen: Dispatch<SetStateAction<boolean>> }) {
	const [userInput, setUserInput] = useState<Partial<tUserInput>>()
	const [formErrors, setFormErrors] = useState<Record<string, string>>({})

	function handleInputBlur(e: FocusEvent<HTMLInputElement, Element>) {
		const { name, value } = e.target
		
		setUserInput((prev) => ({
			...prev,
			[name]: value
		}))
	}
	
	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()

		try {
			const reqBody = userInputSchema.parse(userInput)

			const baseURL = import.meta.env.VITE_SERVER_URL
			const response = await fetch(baseURL + '/users', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(reqBody),
			})

			const responseData = await response.json()
			localStorage.setItem('user:connected', JSON.stringify(responseData))
			setIsOpen(false)
	
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

			console.error(error)
		}
	}

	return (
		<Modal title='Bem-vindo ao App' >
			<StyledSubscribeForm onSubmit={handleSubmit}>
				<p>Nos informe o seu contato:</p>

				<fieldset>
					<label htmlFor="name">Nome</label>
					<input
						id="name"
						type="text"
						name='name'
						placeholder='Digite o seu nome...'
						required
						onBlur={handleInputBlur}
					/>
					{formErrors.name && <small className='error'>{formErrors.name}</small>}
				</fieldset>

				<fieldset>
					<label htmlFor="contact">Contato</label>
					<input
						id="contact"
						type="text"
						name="contact"
						placeholder='Digite o seu email ou celular...'
						required
						onBlur={handleInputBlur}
					/>
					{formErrors.contact && <small className='error'>{formErrors.contact}</small>}
				</fieldset>

				<button type="submit">Concluir</button>
			</StyledSubscribeForm>
		</Modal>
	)
}
