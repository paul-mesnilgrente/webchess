class Piece extends React.Component {
	render() {
		return (
			<img
				className={this.props.selected ? "selected": null}
				src={this.props.imgFile}
			/>
		)
	}
}

class Pawn extends Piece {
	constructor(props) {
		super(props)
		this.state = {
			img_file: "/images/pieces/" + this.props.color + "_pawn.svg"
		}
	}
}

class Rook extends Piece {
	constructor(props) {
		super(props)
		this.state = {
			img_file: "/images/pieces/" + this.props.color + "_rook.svg"
		}
	}
}

class Knight extends Piece {
	constructor(props) {
		super(props)
		this.state = {
			img_file: "/images/pieces/" + this.props.color + "_knight.svg"
		}
	}
}

class Bishop extends Piece {
	constructor(props) {
		super(props)
		this.state = {
			img_file: "/images/pieces/" + this.props.color + "_bishop.svg"
		}
	}
}

class Queen extends Piece {
	constructor(props) {
		super(props)
		this.state = {
			img_file: "/images/pieces/" + this.props.color + "_queen.svg"
		}
	}
}

class King extends Piece {
	constructor(props) {
		super(props)
		this.state = {
			img_file: "/images/pieces/" + this.props.color + "_king.svg"
		}
	}
}