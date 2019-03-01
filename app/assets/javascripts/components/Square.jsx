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
			var pieceName = piece.constructor.name.toLowerCase()
			imgFile = `/images/pieces/${piece.color}_${pieceName}.svg`
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