class Chessboard extends React.Component {
	constructor(props) {
		super(props)

		channel = App.cable.subscriptions.create({
			channel: "ChessGameChannel",
			room: "game-" + this.props.id}, {
				'connected': data => {
					console.log(`Connected to "game-${this.props.id}"`)
				},
				'disconnected': data => {
					console.log(`Disconnected from "game-${this.props.id}"`)
				},
				'received': data => {
					var square_start = new Position(data.message[0], parseInt(data.message[1]))
					var square_end = new Position(data.message[2], parseInt(data.message[3]))
					if (this.state.game.moveValid(square_start, square_end)) {
						this.state.game.board.move(square_start, square_end)
						this.setState({
							controlled: [],
							selectedPiece: null
						})
					}
				},
				'speak': function(message) {
					return this.perform('speak', {message: message})
				}
			}
		)


		channel.chessboard = this
		this.state = {
			game: new ChessGame(this.props.moves),
			selectedPiece: null,
			controlled: [],
			refresh: true,
			channel: channel
		}
		

		this.renderSquare = this.renderSquare.bind(this)
		this.renderRank = this.renderRank.bind(this)
		this.onSquareClick = this.onSquareClick.bind(this)
	}

	send(square_start, square_end) {
		if (this.state.game.moveValid(square_start, square_end)) {
			this.state.channel.speak(`${square_start.toString()}${square_end.toString()}`)
		} else {
			this.setState({
				controlled: [],
				selectedPiece: null
			})
		}
	}

	toggleSelectPiece(piece) {

		if (this.state.selectedPiece == null) {
			piece = this.state.game.board.at(piece.position)
			this.setState({
				selectedPiece: piece,
				controlled: piece.availableMoves(this.state.game.board)
			})
		} else {
			this.setState({
				selectedPiece: null,
				controlled: []
			})
		}
	}

	onSquareClick(square_clicked) {
		pieceOnSquare = this.state.game.board.at(square_clicked)

		// select a piece
		if (this.state.selectedPiece == null && pieceOnSquare != null) {
			if (pieceOnSquare.color == this.props.player) {
				this.toggleSelectPiece(pieceOnSquare)
			}
		// unselect the piece
		} else if (square_clicked.equals(this.state.selectedPiece.position)) {
			this.toggleSelectPiece(pieceOnSquare)
		}
		else {
			this.send(this.state.selectedPiece.position, square_clicked)
		}
	}

	renderSquare(file, rank) {
		var position = new Position(file, rank)
		controlled = false
		for (let i = 0; i < this.state.controlled.length && !controlled; i++) {
			move = this.state.controlled[i]
			if (move.square.equals(position))
				controlled = true
		}
		var selected = false
		if (this.state.selectedPiece != null && this.state.selectedPiece.position.equals(position)) {
			selected = true
		}
		return (
			<Square
				key={file + rank}
				position={position}
				selected={selected}
				controlled={controlled}
				onSquareClick={this.onSquareClick}
				piece={this.state.game.board.at(position)}
			/>
		)
	}

	renderRank(rank) {
		let squares = []
		let files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
		for (let i = 0; i <= 7; i++) {
			squares.push(this.renderSquare(files[i], rank))
		}
		return (
			<div key={rank} className="rank">
				{squares}
			</div>
		)
	}

	render() {
		let ranks = []
		for (let rank_number = 8; rank_number >= 1; rank_number--) {
			ranks.push(this.renderRank(rank_number))
		}
		return (
			<ErrorBoundary>
				<div className="chessboard">
					{ranks}
				</div>
			</ErrorBoundary>
		)
	}
}