class Square extends React.Component {
	constructor(props) {
		super(props)
		this.onSquareClick = this.onSquareClick.bind(this)
	}

	onSquareClick() {
		this.props.onSquareClick(this.props.position)
	}

	renderPiece() {
		onClick = this.props.onPieceClick
		piece = this.props.piece
		if (piece != null) {
			var imgFile = ""
			if (piece.constructor.name == 'Pawn')
				imgFile = `/images/pieces/${piece.color}_pawn.svg`
			else if (piece.constructor.name == 'Rook')
				imgFile = `/images/pieces/${piece.color}_rook.svg`
			else if (piece.constructor.name == 'Knight')
				imgFile = `/images/pieces/${piece.color}_knight.svg`
			else if (piece.constructor.name == 'Bishop')
				imgFile = `/images/pieces/${piece.color}_bishop.svg`
			else if (piece.constructor.name == 'Queen')
				imgFile = `/images/pieces/${piece.color}_queen.svg`
			else if (piece.constructor.name == 'King')
				imgFile = `/images/pieces/${piece.color}_king.svg`
			return  <PieceImg
								imgFile={imgFile}
								color={piece.color}
								selected={this.props.selected}
								attacked={this.props.controlled}
								piece={this.props.piece}
							/>
		}
		return null
	}
	
	render() {
		className = `square square-${this.props.position.color()}`
		className += this.props.controlled ? "controlled" : ""
		return (
			<div className={className} onClick={this.onSquareClick}>
				{this.renderPiece()}
			</div>
		)
	}
}