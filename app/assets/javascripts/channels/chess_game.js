App.room = App.cable.subscriptions.create(
	"game_", {
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