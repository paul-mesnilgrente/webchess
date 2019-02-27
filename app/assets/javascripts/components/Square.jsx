class Square extends React.Component {
	constructor(props) {
		super(props)
		this.onSquareClick = this.onSquareClick.bind(this)
	}

	onSquareClick() {
		this.props.onSquareClick(this.props.file, this.props.rank)
	}

	renderPiece() {
		onClick = this.props.onPieceClick
		piece = this.props.piece
		selected = this.props.selected
		if (piece) {
			let pieceColor = piece[0] == "w" ? "white" : "black"
			if (piece[1] == 'p')
				return <PieceImg imgFile={"/images/pieces/" + pieceColor + "_pawn.svg"} color={pieceColor} selected={selected} />
			else if (piece[1] == 'r')
				return <PieceImg imgFile={"/images/pieces/" + pieceColor + "_rook.svg"} color={pieceColor} selected={selected} />
			else if (piece[1] == 'n')
				return <PieceImg imgFile={"/images/pieces/" + pieceColor + "_knight.svg"} color={pieceColor} selected={selected} />
			else if (piece[1] == 'b')
				return <PieceImg imgFile={"/images/pieces/" + pieceColor + "_bishop.svg"} color={pieceColor} selected={selected} />
			else if (piece[1] == 'q')
				return <PieceImg imgFile={"/images/pieces/" + pieceColor + "_queen.svg"} color={pieceColor} selected={selected} />
			else if (piece[1] == 'k')
				return <PieceImg imgFile={"/images/pieces/" + pieceColor + "_king.svg"} color={pieceColor} selected={selected} />
		}
		return null
	}
	
	render() {
		key = this.props.rank + this.props.file
		let className = 'square square-' + this.props.color
		return (
			<div className={className} onClick={this.onSquareClick}>
				{this.renderPiece()}
			</div>
		)
	}
}