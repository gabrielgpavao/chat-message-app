import { Dispatch, SetStateAction, useState } from 'react'
import { LoginModal } from './LoginModal'
import { RegisterModal } from './RegisterModal'

export type tSubscribeModalsProps = {
	setIsRegisterOpen: Dispatch<SetStateAction<boolean>>
	setIsLoginOpen: Dispatch<SetStateAction<boolean>>
}

export function SubscribeModal() {
	const [isRegisterOpen, setIsRegisterOpen] = useState(true)
	const [isLoginOpen, setIsLoginOpen] = useState(false)
	
	return (
		<>
			{isRegisterOpen && <RegisterModal setIsLoginOpen={setIsLoginOpen} setIsRegisterOpen={setIsRegisterOpen} />}

			{isLoginOpen && <LoginModal setIsLoginOpen={setIsLoginOpen} setIsRegisterOpen={setIsRegisterOpen} />}
		</>
	)
}
