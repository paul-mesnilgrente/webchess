class Chessboard extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			board: this.props.board
		};
	}

	render() {
		let elements = [];
		for (var i = 7; i >= 0; i--) {
			elements.push(<Rank key={i} name={i+1} pieces={this.state.board[i+1]} />);
		}
		return (
			<div className="chessboard">
				<ErrorBoundary>{elements}</ErrorBoundary>
			</div>
		);
	}
}

class Rank extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pieces: props.pieces
		};
	}

	renderSquare(i, file) {
		return (
			<Square
				key={i}
				rank={this.props.name}
				file={file}
				piece={this.props.pieces[i-1]}
			/>
		);
	}

	render() {
		let squares = [];
		let files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
		for (var i = 1; i <= 8; i++) {
			squares.push(this.renderSquare(i, files[i-1]));
		}
		return (
			<div className="rank">
				{squares}
			</div>
		)
	}
}