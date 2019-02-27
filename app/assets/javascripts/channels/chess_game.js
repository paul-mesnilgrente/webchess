App.room = App.cable.subscriptions.create({
	channel: "ChessGame",
	room: "1"}, {
		'connected': (data) => {
			console.log('Connected to game_')
		},
		'disconnected': (data) => {
			console.log('Disconnected from game_')
		},
		'received': (data) => {
			console.log('Received:', data)
		},
		'speak': (message) => {
			this.perform('speak', {message: message})
		}
	}
);