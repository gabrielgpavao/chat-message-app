import { Dispatch, SetStateAction, useState } from 'react'
import { LoginModal } from './LoginModal'
import { RegisterModal } from './RegisterModal'

export type tSubscribeModalsProps = {
	setIsRegisterOpen: Dispatch<SetStateAction<boolean>>
	setIsLoginOpen: Dispatch<SetStateAction<boolean>>
}

export function SubscribeModal({ setIsSubscribeOpen }: { setIsSubscribeOpen: Dispatch<SetStateAction<boolean>>}) {
	const [isRegisterOpen, setIsRegisterOpen] = useState(true)
	const [isLoginOpen, setIsLoginOpen] = useState(false)
	
	if (!isRegisterOpen && !isLoginOpen) {
		setIsSubscribeOpen(false)
	}
	
	return (
		<>
			{isRegisterOpen && <RegisterModal setIsLoginOpen={setIsLoginOpen} setIsRegisterOpen={setIsRegisterOpen} />}

			{isLoginOpen && <LoginModal setIsLoginOpen={setIsLoginOpen} setIsRegisterOpen={setIsRegisterOpen} />}
		</>
	)
}
