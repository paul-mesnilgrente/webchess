class PieceImg extends React.Component {
	render() {
		var className = this.props.selected ? "selected": ""
		className += this.props.attacked ? "attacked": ""
		return (
			<img
				className={className}
				src={this.props.imgFile}
			/>
		)
	}
}