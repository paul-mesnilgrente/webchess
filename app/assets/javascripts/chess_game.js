class ChessGame {
	constructor(moves) {
		this.board = new Board()
		this.moves = moves
		moves.forEach(move => {
			var p1 = new Position(move.notation[0], move.notation[1])
			var p2 = new Position(move.notation[2], move.notation[3])
			this.board.move(p1, p2)
		})
	}

	moveValid(square_start, square_end) {
		var piece = this.board.at(square_start)
		if (piece == null) {
			throw new Error("No piece in " + square_start.toString())
		}
		var moves = piece.available_moves(this.board)
		for (var i = 0; i < moves.length; i++) {
			if (moves[i].square.equals(square_end))
				return true
		}

		return false
	}
}

class Board {
	constructor(moves) {
		this.board = {}
		var files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
		files.forEach(file => {
			this.board[file + 2] = new Pawn("w", new Position(file, 2))
		})
		files.forEach(file => {
			this.board[file + 7] = new Pawn("b", new Position(file, 7))
		})
		this.board['a' + 1] = new Rook("w",   new Position('a', 1))
		this.board['h' + 1] = new Rook("w",   new Position('h', 1))
		this.board['b' + 1] = new Knight("w", new Position('b', 1))
		this.board['g' + 1] = new Knight("w", new Position('g', 1))
		this.board['c' + 1] = new Bishop("w", new Position('c', 1))
		this.board['f' + 1] = new Bishop("w", new Position('f', 1))
		this.board['d' + 1] = new Queen("w",  new Position('d', 1))
		this.board['e' + 1] = new King("w",   new Position('e', 1))
		this.board['a' + 8] = new Rook("b",   new Position('a', 8))
		this.board['h' + 8] = new Rook("b",   new Position('h', 8))
		this.board['b' + 8] = new Knight("b", new Position('b', 8))
		this.board['g' + 8] = new Knight("b", new Position('g', 8))
		this.board['c' + 8] = new Bishop("b", new Position('c', 8))
		this.board['f' + 8] = new Bishop("b", new Position('f', 8))
		this.board['d' + 8] = new Queen("b",  new Position('d', 8))
		this.board['e' + 8] = new King("b",   new Position('e', 8))
	}

	build_controlled_squares_list(color) {
		var controlled_squares = []
		for (var key in this.board) {
			if (this.board[key] != color) {
				if (this.board[key].constructor.name != "King") {
					var moves = this.board[key].available_moves(this)
					for (var move in moves) {
						// to test
						if (! move.square in controlled_squares) {
							controlled_squares.push(move.square)
						}
					}
				}
			}
		}
		return controlled_squares
	}

	in(p) {
		return p.file >= 'a' && p.file <= 'h' && p.rank >= 1 && p.rank <= 8
	}

	move(square_start, square_end) {
		var piece = this.at(square_start)
		this.board[square_end.toString()] = piece
		piece.move(square_end)
		delete this.board[square_start.toString()]
	}

	at(position) {
		return this.board[position.toString()]
	}
}

function prevChar(c) {
	return String.fromCharCode(c.charCodeAt(0) - 1);
}

function nextChar(c) {
	return String.fromCharCode(c.charCodeAt(0) + 1);
}

class Position {
	constructor(file, rank) {
		this.file = file
		this.rank = parseInt(rank)
	}

	color() {
		return (this.rank + this.file.charCodeAt(0)) % 2 ? "w" : "b"
	}

	equals(p) {
		return this.file == p.file && this.rank == p.rank
	}

	toString() {
		return this.file + this.rank
	}
}

class Move {
	constructor(piece, square) {
		this.piece = square
		this.square = square
	}
}

class Piece {
	constructor(color, position) {
		this.color = color
		this.position = position
		this.hasMoved = false
	}

	move(position) {
		this.position = position
		this.hasMoved = true
	}
}

class Pawn extends Piece {
	available_moves(board) {
		var moves = []
		var additionner = this.color == "w" ? +1 : -1

		// move forward of 1
		var p1 = new Position(this.position.file, this.position.rank + additionner)
		if (board.in(p1) && board.at(p1) == null)
			moves.push(new Move(this, p1))

		// move forward of 2
		var p = new Position(this.position.file, this.position.rank + 2 * additionner)
		if (board.in(p) && board.at(p1) == null && board.at(p) == null && !this.hasMoved)
			moves.push(new Move(this, p))
		
		// eats in diagonal
		p = new Position(nextChar(this.position.file), this.position.rank + additionner)
		if (board.in(p) && board.at(p) != null && board.at(p).color != this.color)
			moves.push(new Move(this, p))

		// eats in diagonal
		p = new Position(prevChar(this.position.file), this.position.rank + additionner)
		if (board.in(p) && board.at(p) != null && board.at(p).color != this.color)
			moves.push(new Move(this, p))

		return moves
	}
}

class Rook extends Piece {
	available_moves(board) {
		var moves = []
		// forward and backward direction
		var directions = [-1, 1]
		directions.forEach(additionner => {
			var p = new Position(this.position.file, this.position.rank + additionner)
			while (board.at(p) == null && board.in(p)) {
				moves.push(new Move(this, p))
				p = new Position(p.file, p.rank + additionner)
			}
			if (board.at(p) != null && board.at(p).color != this.color) {
				moves.push(new Move(this, p))
			}
		})
		// right and left direction
		directions = [nextChar, prevChar]
		directions.forEach(next => {
			var p = new Position(next(this.position.file), this.position.rank)
			while (board.at(p) == null && board.in(p)) {
				moves.push(new Move(this, p))
				p = new Position(next(p.file), p.rank)
			}
			if (board.at(p) != null && board.at(p).color != this.color) {
				moves.push(new Move(this, p))
			}
		})
		return moves
	}
}

class Knight extends Piece {
	available_moves(board) {
		var moves = []
		var p = this.position
		var positions = [
			new Position(prevChar(p.file), p.rank + 2),
			new Position(nextChar(p.file), p.rank + 2),
			new Position(prevChar(p.file), p.rank - 2),
			new Position(nextChar(p.file), p.rank - 2),
			new Position(prevChar(prevChar(p.file)), p.rank + 1),
			new Position(prevChar(prevChar(p.file)), p.rank - 1),
			new Position(nextChar(nextChar(p.file)), p.rank + 1),
			new Position(nextChar(nextChar(p.file)), p.rank - 1)
		]

		positions.forEach(position => {
			if (board.in(position))
				if (board.at(position) == null || board.at(p).color != this.color)
					moves.push(new Move(this, position))

		})

		return moves
	}
}

class Bishop extends Piece {
	available_moves(board) {
		var moves = []
		// all diagonal directions
		var directions = [[nextChar, +1], [nextChar, -1], [prevChar, +1], [prevChar, -1]]
		directions.forEach(([nextFile, rank_add]) => {
			var p = new Position(nextFile(this.position.file), this.position.rank + rank_add)
			while (board.at(p) == null && board.in(p)) {
				moves.push(new Move(this, p))
				p = new Position(nextFile(p.file), p.rank + rank_add)
			}
			if (board.at(p) != null && board.at(p).color != this.color) {
				moves.push(new Move(this, p))
			}
		})
		return moves
	}
}

class Queen extends Piece {
	available_moves(board) {
		var moves = []
		// all diagonal directions
		var directions = [[nextChar, +1], [nextChar, -1], [prevChar, +1], [prevChar, -1]]
		directions.forEach(([nextFile, rank_add]) => {
			var p = new Position(nextFile(this.position.file), this.position.rank + rank_add)
			while (board.at(p) == null && board.in(p)) {
				moves.push(new Move(this, p))
				p = new Position(nextFile(p.file), p.rank + rank_add)
			}
			if (board.at(p) != null && board.at(p).color != this.color) {
				moves.push(new Move(this, p))
			}
		})

		// forward and backward direction
		directions = [-1, +1]
		directions.forEach(additionner => {
			var p = new Position(this.position.file, this.position.rank + additionner)
			while (board.at(p) == null && board.in(p)) {
				moves.push(new Move(this, p))
				p = new Position(p.file, p.rank + additionner)
			}
			if (board.at(p) != null && board.at(p).color != this.color) {
				moves.push(new Move(this, p))
			}
		})
		// right and left direction
		directions = [nextChar, prevChar]
		directions.forEach(next => {
			var p = new Position(next(this.position.file), this.position.rank)
			while (board.at(p) == null && board.in(p)) {
				moves.push(new Move(this, p))
				p = new Position(next(p.file), p.rank)
			}
			if (board.at(p) != null && board.at(p).color != this.color) {
				moves.push(new Move(this, p))
			}
		})

		return moves
	}
}

class King extends Piece {

	available_moves(board) {
		var moves = []
		var p = this.position
		var positions = [
			new Position(p.file, p.rank + 1),
			new Position(p.file, p.rank - 1),
			new Position(nextChar(p.file), p.rank),
			new Position(prevChar(p.file), p.rank),
			new Position(nextChar(p.file), p.rank + 1),
			new Position(nextChar(p.file), p.rank - 1),
			new Position(prevChar(p.file), p.rank + 1),
			new Position(prevChar(p.file), p.rank - 1)
		]
		var controlled_squares = board.build_controlled_squares_list(this.color)
		positions.forEach((position, index, object) => {
			console.log('available_moves')
			var removed = false
			for (var i = 0; i < controlled_squares.length && !removed; i++) {
				console.log('in:', board.in(position))
				console.log('new_square:', position)
				console.log('controlled_square:', controlled_squares[i].square)
				if (!board.in(position) || position.equals(controlled_squares[i].square)) {
					console.log('')
					object.splice(index, 1)
					removed = true
				}
			}
		})

		return moves
	}
}