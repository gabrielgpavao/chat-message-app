const smpp = require('smpp')

smpp.connect({
	url: 'smpp://localhost:2775',
	auto_enquire_link_period: 10000,
	debug: true
}, (session) => {
	session.bind_transceiver({
		system_id: '1234',
		password: '1234'
	}, function(pdu) {
		if (pdu.command_status === 0) {
			session.submit_sm({
				destination_addr: 'DESTINATION NUMBER',
				short_message: 'Hello, buddy!'
			}, function(pdu) {
				if (pdu.command_status === 0) {
					session.on('deliver_sm', (pdu) => {
						session.send(pdu.response())
					})
				}
			})
	
			session.on('submit_sm', (submitPdu) => {
				session.send(submitPdu.response())
			})
		}
	})
})
