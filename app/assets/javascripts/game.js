class Game {
	constructor(moves) {
		this.moves = moves
		this.board = new Board(this.moves)
	}
}

class Board {
	constructor(moves) {
		this.board = {}
		var files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
		files.forEach((file) => this.board[new Position(file, 2)](new Pawn("white", new Position(file, 2))));
		files.forEach((file) => this.board[new Position(file, 7)](new Pawn("black", new Position(file, 7))));
		this.board[new Position('a', 1)] = new Rook("white",   new Position('a', 1))
		this.board[new Position('h', 1)] = new Rook("white",   new Position('h', 1))
		this.board[new Position('b', 1)] = new Knight("white", new Position('b', 1))
		this.board[new Position('g', 1)] = new Knight("white", new Position('g', 1))
		this.board[new Position('c', 1)] = new Bishop("white", new Position('c', 1))
		this.board[new Position('f', 1)] = new Bishop("white", new Position('f', 1))
		this.board[new Position('d', 1)] = new Queen("white",  new Position('d', 1))
		this.board[new Position('e', 1)] = new King("white",   new Position('e', 1))
		this.board[new Position('a', 8)] = new Rook("black",   new Position('a', 8))
		this.board[new Position('h', 8)] = new Rook("black",   new Position('h', 8))
		this.board[new Position('b', 8)] = new Knight("black", new Position('b', 8))
		this.board[new Position('g', 8)] = new Knight("black", new Position('g', 8))
		this.board[new Position('c', 8)] = new Bishop("black", new Position('c', 8))
		this.board[new Position('f', 8)] = new Bishop("black", new Position('f', 8))
		this.board[new Position('d', 8)] = new Queen("black",  new Position('d', 8))
		this.board[new Position('e', 8)] = new King("black",   new Position('e', 8))
	}

	build_controlled_squares_list(color) {
		controlled_squares = []
		for (var key in this.board) {
			if (this.board[key] != color) {
				moves = this.board[key].available_moves()
				for (var move in moves) {
					// to test
					if (! move.square in controlled_squares) {
						controlled_squares.push(move.square)
					}
				}
			}
		}
		return controlled_squares
	}

	move(p1, p2) {
		this.board[]
	}

	at(position) {
		return this.board[position]
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
		this.rank = rank
	}

	equal(p) {
		return this.file == p.file && this.rank == p.rank
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
		moves = []
		additionner = this.color "white" ? +1 : -1

		// move forward of 1
		p1 = new Position(this.position.file, this.position.rank + additionner)
		if (board.at(p1) == null) {
			moves.push(Move(this, p1))
		}

		// move forward of 2
		p = new Position(this.position.file, this.position.rank + 2 * additionner)
		if (board.at(p1) == null && board.at(p) == null && !this.hasMoved)
			moves.push(Move(this, p))
		
		// eats in diagonal
		p = new Position(nextChar(this.position.file), this.position.rank + additionner)
		if (board.at(p) != null && board.at(p).color != this.color)
			moves.push(Move(this, p))

		// eats in diagonal
		p = new Position(prevChar(this.position.file), this.position.rank + additionner)
		if (board.at(p) != null && board.at(p).color != this.color)
			moves.push(Move(this, p))

		return moves
	}
}

class Rook extends Piece {
	available_moves(board) {
		moves = []
		// forward and backward direction
		[-1, +1].forEach(additionner => {
			p = new Position(this.position.file, this.position.rank + additionner)
			while (board.at(p) == null && p.rank >= 0 && p.rank <= 8) {
				moves.push(Move(this, p))
				p = new Position(p.file, p.rank + additionner)
			}
			if (board.at(p) != null && board.at(p).color != this.color) {
				moves.push(Move(this, p))
			}
		})
		// right and left direction
		[nextChar, prevChar].forEach(next => {
			p = new Position(next(this.position.file), this.position.rank)
			while (board.at(p) == null && p.file >= 'a' && p.file <= 'h') {
				moves.push(Move(this, p))
				p = new Position(next(p.file), p.rank)
			}
			if (board.at(p) != null && board.at(p).color != this.color) {
				moves.push(Move(this, p))
			}
		})
		return moves
	}
}

class Knight extends Piece {
	available_moves(board) {
		moves = []
		p = this.position
		positions = [
			new Position(prevChar(p.file), p.rank + 2),
			new Position(nextChar(p.file), p.rank + 2),
			new Position(prevChar(p.file), p.rank - 2),
			new Position(nextChar(p.file), p.rank - 2),
			new Position(prevChar(prevChar(p.file), p.rank + 1),
			new Position(prevChar(prevChar(p.file), p.rank - 1),
			new Position(nextChar(nextChar(p.file), p.rank + 1),
			new Position(nextChar(nextChar(p.file), p.rank - 1)
		]

		positions.forEach(position => {
			if (position.rank >= 0 && position.rank <= 8)
				if (position.file >= 'a' && position.file <= 'h')
					if (board.at(position) == null || board.at(p).color != this.color)
						moves.push(Move(this, position))

		})

		return moves
	}
}

class Bishop extends Piece {
	available_moves(board) {
		moves = []
		// all diagonal directions
		[[nextChar, +1], [nextChar, -1], [prevChar, +1], [prevChar, -1]]
		.forEach((nextFile, rank_add) => {
			p = new Position(nextFile(this.position.file), this.position.rank + rank_add)
			while (board.at(p) == null && p.rank >= 0 && p.rank <= 8) {
				moves.push(Move(this, p))
				p = new Position(nextFile(this.position.file), this.position.rank + rank_add)
			}
			if (board.at(p) != null && board.at(p).color != this.color) {
				moves.push(Move(this, p))
			}
		})
	}
}

class Queen extends Piece {
	available_moves(board) {
		moves = []
		// all diagonal directions
		[[nextChar, +1], [nextChar, -1], [prevChar, +1], [prevChar, -1]]
		.forEach((nextFile, rank_add) => {
			p = new Position(nextFile(this.position.file), this.position.rank + rank_add)
			while (board.at(p) == null && p.rank >= 0 && p.rank <= 8) {
				moves.push(Move(this, p))
				p = new Position(nextFile(this.position.file), this.position.rank + rank_add)
			}
			if (board.at(p) != null && board.at(p).color != this.color) {
				moves.push(Move(this, p))
			}
		})

		// forward and backward direction
		[-1, +1].forEach(additionner => {
			p = new Position(this.position.file, this.position.rank + additionner)
			while (board.at(p) == null && p.rank >= 0 && p.rank <= 8) {
				moves.push(Move(this, p))
				p = new Position(p.file, p.rank + additionner)
			}
			if (board.at(p) != null && board.at(p).color != this.color) {
				moves.push(Move(this, p))
			}
		})
		// right and left direction
		[nextChar, prevChar].forEach(next => {
			p = new Position(next(this.position.file), this.position.rank)
			while (board.at(p) == null && p.file >= 'a' && p.file <= 'h') {
				moves.push(Move(this, p))
				p = new Position(next(p.file), p.rank)
			}
			if (board.at(p) != null && board.at(p).color != this.color) {
				moves.push(Move(this, p))
			}
		})

		return moves
	}
}

class King extends Piece {

	available_moves(board) {
		moves = []
		p = this.position
		positions = [
			new Position(p.file, p.rank + 1),
			new Position(p.file, p.rank - 1),
			new Position(nextChar(p.file), p.rank),
			new Position(prevChar(p.file), p.rank),
			new Position(nextChar(p.file), p.rank + 1),
			new Position(nextChar(p.file), p.rank - 1),
			new Position(prevChar(p.file), p.rank + 1),
			new Position(prevChar(p.file), p.rank - 1)
		]
		controlled_squares = board.build_controlled_squares_list(this.color)
		positions.forEach((position, index, object) => {
			removed = false
			for (var i = 0; i < controlled_squares.length && !removed; i++) {
				if (position.equal(controlled_squares[i])) {
					object.splice(index, 1)
					removed = true
				}
			}
		})

		return moves
	}
}