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
		var moves = piece.availableMoves(this.board)
		return moves.find(move => move.square.equals(square_end)) != null
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

	controlledSquares(color) {
		var squares = []
		for (var key in this.board) {
			if (this.board[key].color != color) {
				if (this.board[key].constructor.name != "King") {
					var moves = this.board[key].availableMoves(this)
					squares = squares.concat(moves.map(move => move.square))
				} else {
					var p = this.board[key].position
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
					squares = squares.concat(positions.filter(p => this.in(p)))
				}
			}
		}
		// remove duplicates
		squares = squares.filter((square, index, self) =>
			index == self.findIndex(s => square.equals(s))
		)
		return squares
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

	squareEmpty(position) {
		return this.board[position.toString()] == null
	}

	sameColor(position, color) {
		return this.at(position).color == color
	}

	available(to, color) {
		return this.in(to) &&
			   (this.squareEmpty(to) || !this.sameColor(to, color))
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

	get name() {
		return this.constructor.name.toLowerCase()
	}
}

class Pawn extends Piece {
	availableMoves(board) {
		var moves = []
		var additionner = this.color == "w" ? +1 : -1

		// move forward of 1
		var p = new Position(this.position.file, this.position.rank + additionner)
		if (board.in(p) && board.squareEmpty(p, this.color)) {
			moves.push(new Move(this, p))
			p = new Position(this.position.file, this.position.rank + 2 * additionner)
			// move forward of 2
			if (board.in(p) && board.squareEmpty(p, this.color))
				moves.push(new Move(this, p))
		}
		
		// eats in diagonal
		p = new Position(nextChar(this.position.file), this.position.rank + additionner)
		if (!board.squareEmpty(p) && board.available(p, this.color))
			moves.push(new Move(this, p))

		// eats in diagonal
		p = new Position(prevChar(this.position.file), this.position.rank + additionner)
		if (!board.squareEmpty(p) && board.available(p, this.color))
			moves.push(new Move(this, p))

		return moves
	}
}

function bishopRookMoves(board, piece, directions) {
	var moves = []
	directions.forEach(([nextFile, rank_add]) => {
		var p = new Position(nextFile(piece.position.file), piece.position.rank + rank_add)
		while (board.available(p, piece.color)) {
			moves.push(new Move(piece, p))
			if (!board.squareEmpty(p)) break;
			p = new Position(nextFile(p.file), p.rank + rank_add)
		}
	})
	return moves
}

class Rook extends Piece {
	availableMoves(board) {
		// right, left, up, down
		var sameChar = c => c
		var directions = [[nextChar, 0], [prevChar, 0], [sameChar, +1], [sameChar, -1]]
		return bishopRookMoves(board, this, directions)
	}
}

class Bishop extends Piece {
	availableMoves(board) {
		// all diagonal directions
		var directions = [[nextChar, +1], [nextChar, -1], [prevChar, +1], [prevChar, -1]]
		return bishopRookMoves(board, this, directions)
	}
}

class Queen extends Piece {
	availableMoves(board) {
		var moves = []

		var bishop = new Bishop(this.color, this.position)
		var rook = new Rook(this.color, this.position)

		moves = moves.concat(bishop.availableMoves(board))
		moves = moves.concat(rook.availableMoves(board))

		return moves
	}
}

class Knight extends Piece {
	availableMoves(board) {
		var p = this.position
		var moves = [
			new Move(this, new Position(prevChar(p.file), p.rank + 2)),
			new Move(this, new Position(nextChar(p.file), p.rank + 2)),
			new Move(this, new Position(prevChar(p.file), p.rank - 2)),
			new Move(this, new Position(nextChar(p.file), p.rank - 2)),
			new Move(this, new Position(prevChar(prevChar(p.file)), p.rank + 1)),
			new Move(this, new Position(prevChar(prevChar(p.file)), p.rank - 1)),
			new Move(this, new Position(nextChar(nextChar(p.file)), p.rank + 1)),
			new Move(this, new Position(nextChar(nextChar(p.file)), p.rank - 1))
		]

		moves = moves.filter(move => 
			board.available(move.square, this.color)
		)

		return moves
	}
}

class King extends Piece {

	availableMoves(board) {
		var p = this.position
		var moves = [
			new Move(this, new Position(p.file, p.rank + 1)),
			new Move(this, new Position(p.file, p.rank - 1)),
			new Move(this, new Position(nextChar(p.file), p.rank)),
			new Move(this, new Position(prevChar(p.file), p.rank)),
			new Move(this, new Position(nextChar(p.file), p.rank + 1)),
			new Move(this, new Position(nextChar(p.file), p.rank - 1)),
			new Move(this, new Position(prevChar(p.file), p.rank + 1)),
			new Move(this, new Position(prevChar(p.file), p.rank - 1))
		]
		var controlled_squares = board.controlledSquares(this.color)
		// remove basic forgiven moves
		moves = moves.filter(move => board.available(move.square, this.color))
		moves = moves.filter(move =>
			controlled_squares.find(square => square.equals(move.square)) == null
		)
		return moves
	}
}