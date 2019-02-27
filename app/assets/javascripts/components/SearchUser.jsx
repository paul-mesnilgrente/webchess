class UserItem extends React.Component {
	render() {
		attr = this.props.attributes
		href = "/challenge/new?challenged=" + attr.id
		return (
			<li className="list-group-item list-group-item-action">
				<div className="d-flex w-100 justify-content-between">
					<h5 className="mb-1">{attr.username}</h5>
					<p><a href={href} className="btn btn-primary">Challenge {attr.username}</a></p>
				</div>
				<p className="mb-1">{attr.first_name} {attr.last_name}</p>
				<small className="text-muted">{attr.email}</small>
			</li>
		)
	}
}

class SearchUser extends React.Component {
	constructor(props) {
		super(props)
		this.state = {data: [], loading: false}
		this.handleUsernameChange = this.handleUsernameChange.bind(this)
	}

	handleUsernameChange(e) {
		this.setState({loading: true})
		input = e.target.value;
		console.log('input:', input)
		fetch('http://localhost:3000/user/search.json?username=' + input)
		.then(data => data.json())
		.then(data => {
			console.log(data)
			this.setState({data: data, loading: false})
		})
	}

	render() {
		users = []
		for (var i = 0; i < this.state.data.length; i++) {
			users.push(
				<UserItem key={this.state.data[i].id} attributes={this.state.data[i]}
				/>
			)
		}
		loading = this.state.loading ? <p>Loading...</p> : null
		return (
			<div>
				<h2>Search a user to challenge</h2>
				<form>
					<div className="form-group row">
						<label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
						<div className="col-sm-10">
							<input type="text" onChange={this.handleUsernameChange} className="form-control" id="username" />
						</div>
					</div>
				</form>
				<ul className="list-group">
					{loading}
					{users}
				</ul>
			</div>
		)
	}
}