class Square extends React.Component {
	constructor(props) {
		super(props);
		let rank = props.rank % 2;
		let file = props.file.charCodeAt(0) % 2;
		let color = "black";
		if ((rank == 1 && file == 0) || (rank == 0 && file == 1)) {
			color = 'white';
		}
		this.state = {
			color: color,
			piece: this.props.piece
		};
	}
	
	render() {
		let class_name = 'square square-' + this.state.color;
		let piece = null;
		if (this.state.piece) {
			let color = this.state.piece[0] == "w" ? "white" : "black";
			if (this.state.piece[1] == 'p')
				piece = <Pawn color={color} />;
			else if (this.state.piece[1] == 'r')
				piece = <Rook color={color} />;
			else if (this.state.piece[1] == 'n')
				piece = <Knight color={color} />;
			else if (this.state.piece[1] == 'b')
				piece = <Bishop color={color} />;
			else if (this.state.piece[1] == 'q')
				piece = <Queen color={color} />;
			else if (this.state.piece[1] == 'k')
				piece = <King color={color} />;
		}
		return <div className={class_name}>{piece}</div>;
	}
}