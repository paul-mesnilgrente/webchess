class Piece extends React.Component {
	constructor(props) {
		super(props);
		this.toggleSelected= this.toggleSelected.bind(this);
	}

	toggleSelected() {
		const selected = this.state.selected;
		this.setState({selected: !selected});
	}

	render() {
		return (
			<img
				className={this.state.selected ? "selected": null}
				src={this.state.img_file}
				onClick={() => this.toggleSelected()}
			/>
		);
	}
}

class Pawn extends Piece {
	constructor(props) {
		super(props);
		this.state = {
			selected: false,
			img_file: "/images/pieces/" + this.props.color + "_pawn.svg"
		}
	}
}

class Rook extends Piece {
	constructor(props) {
		super(props);
		this.state = {
			selected: false,
			img_file: "/images/pieces/" + this.props.color + "_rook.svg"
		}
	}
}

class Knight extends Piece {
	constructor(props) {
		super(props);
		this.state = {
			selected: false,
			img_file: "/images/pieces/" + this.props.color + "_knight.svg"
		}
	}
}

class Bishop extends Piece {
	constructor(props) {
		super(props);
		this.state = {
			selected: false,
			img_file: "/images/pieces/" + this.props.color + "_bishop.svg"
		}
	}
}

class Queen extends Piece {
	constructor(props) {
		super(props);
		this.state = {
			selected: false,
			img_file: "/images/pieces/" + this.props.color + "_queen.svg"
		}
	}
}

class King extends Piece {
	constructor(props) {
		super(props);
		this.state = {
			selected: false,
			img_file: "/images/pieces/" + this.props.color + "_king.svg"
		}
	}
}