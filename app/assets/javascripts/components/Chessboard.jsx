class Chessboard extends React.Component {
	constructor(props) {
		super(props)
		channel = App.cable.subscriptions.create({
			channel: "ChessGameChannel",
			room: "game-" + this.props.id}, {
				'connected': data => {
					console.log('Connected to game-' + this.props.id)
				},
				'disconnected': data => {
					console.log('Disconnected from game-' + this.props.id)
				},
				'received': data => {
					file1 = data.message[0]
					rank1 = data.message[1]
					file2 = data.message[2]
					rank2 = data.message[3]
					if (this.moveValid(file1, rank1, file2, rank2)) {
						board = this.state.board
						board[file2][rank2-1] = board[file1][rank1-1]
						board[file1][rank1-1] = null
						this.setState({board: board, selectedPiece: ""})
					} else {
					}
				},
				'speak': function(message) {
					return this.perform('speak', {message: message})
				}
			}
		)
		channel.chessboard = this
		this.state = {
			board: this.props.board,
			selectedPiece: "",
			channel: channel
		}
		

		this.renderSquare = this.renderSquare.bind(this)
		this.renderRank = this.renderRank.bind(this)
		this.onSquareClick = this.onSquareClick.bind(this)
		this.receive = this.receive.bind(this)
	}

	send(file1, rank1, file2, rank2) {
		this.state.channel.speak(`${file1}${rank1}${file2}${rank2}`)
	}

	moveValid(file1, rank1, file2, rank2) {
		piece1 = this.state.board[file1][rank1 - 1]
		piece2 = this.state.board[file2][rank2 - 1]
		if (piece1 == null) {
			throw new Error("No piece in " + file1 + rank1)
		}
		if (piece2 != null) {
			if (this.pieceColor(file1 + rank1) == this.pieceColor(file2 + rank2)) {
				return false
			}
		}

		return true
	}

	pieceColor(square) {
		piece = this.state.board[square[0]][square[1] - 1]
		return piece[0] == "w" ? "white" : "black"
	}

	onSquareClick(file, rank) {
		square = file + rank
		file1 = this.state.selectedPiece[0]
		rank1 = this.state.selectedPiece[1]
		pieceOnSquare = this.state.board[file][rank-1]

		if (this.state.selectedPiece == "" && pieceOnSquare != null) {
			if (pieceOnSquare[0] == this.props.player) {
				this.setState({selectedPiece: square})
			}
		} else if (file1 == file && rank1 == rank) {
			this.setState({selectedPiece: ""})
		}
		else {
			this.send(file1, rank1, file, rank)
		}
	}

	renderSquare(file, rank) {
		let color = "black"
		file_i = file.charCodeAt(0) - 97
		if ((rank + file_i) % 2 == 0) {
			color = 'white';
		}
		selected = this.state.selectedPiece == file + rank ? true : false
			key = file + rank
		return (
			<Square
				key={key}
				file={file}
				rank={rank}
				color={color}
				selected={selected}
				onPieceClick={this.onPieceClick}
				onSquareClick={this.onSquareClick}
				piece={this.state.board[file][rank-1]}
			/>
		)
	}

	renderRank(rank) {
		let squares = []
		let files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
		for (var i = 0; i <= 7; i++) {
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
		for (var rank_number = 8; rank_number >= 1; rank_number--) {
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