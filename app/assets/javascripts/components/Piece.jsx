class PieceImg extends React.Component {
	render() {
		return (
			<img
				className={this.props.selected ? "selected": null}
				src={this.props.imgFile}
			/>
		)
	}
}