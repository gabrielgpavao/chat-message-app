const smpp = require('smpp')
require('dotenv').config()

const messages = []

const server = smpp.createServer({ debug: true }, (session) => {
	session.on('bind_transceiver', (pdu) => {
		session.pause()

		if (pdu.system_id !== process.env.SYSTEM_ID || pdu.password !== process.env.PASSWORD) {
			session.send(pdu.response({
				command_status: smpp.ESME_RBINDFAIL
			}))

			session.close()
			return
		}

		session.send(pdu.response())
		session.resume()
	})

	session.on('submit_sm', (submitPdu) => {
		const message = {
			destination_addr: submitPdu.destination_addr,
			short_message: submitPdu.short_message.message
		}

		messages.push(message)

		session.send(submitPdu.response(), () => {
			const deliverPdu = new smpp.PDU('deliver_sm')

			session.send(deliverPdu, (deliverPdu) => {
				if (deliverPdu.command_status === 0) {
					session.submit_sm(message)
				}
			})
		})
	})

	session.on('get_sm', (pdu) => {
		session.send(pdu.response(messages))
	})
	
	session.on('error', () => {
		session.send(pdu.response({
			command_status: smpp.ESME_RBINDFAIL
		}))
		session.close()
	})
})

server.listen(2775)
