class ChessGame {
	constructor(moves) {
		this.board = new Board()
		this.moves = []
		moves.forEach(move => {
			var p1 = new Position(move.notation[0], move.notation[1])
			var p2 = new Position(move.notation[2], move.notation[3])
			var m = new Move(this.board.at(p1), p2)
			this.board.move(m)
			this.moves.push(m)
		})
	}

	moveValid(move) {
		if (move.piece == null) {
			throw new Error("No piece in " + move.piece.position.toString())
		}
		var moves = move.piece.availableMoves(this.board)
		return moves.find(m => move.square.equals(m.square)) != null
	}
}

class Board {
	constructor() {
		// main pieces
		this.board = {
			// whites
			'a1': new Rook(  "w",   new Position('a', 1)),
			'b1': new Knight("w", new Position('b', 1)),
			'c1': new Bishop("w", new Position('c', 1)),
			'd1': new Queen( "w",  new Position('d', 1)),
			'e1': new King(  "w",   new Position('e', 1)),
			'f1': new Bishop("w", new Position('f', 1)),
			'g1': new Knight("w", new Position('g', 1)),
			'h1': new Rook(  "w",   new Position('h', 1)),
			// blacks
			'a8': new Rook(  "b", new Position('a', 8)),
			'b8': new Knight("b", new Position('b', 8)),
			'c8': new Bishop("b", new Position('c', 8)),
			'd8': new Queen( "b", new Position('d', 8)),
			'e8': new King(  "b", new Position('e', 8)),
			'f8': new Bishop("b", new Position('f', 8)),
			'g8': new Knight("b", new Position('g', 8)),
			'h8': new Rook(  "b", new Position('h', 8)),
		}
		// pawns
		var files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
		files.forEach(file => {
			this.board[file + 2] = new Pawn("w", new Position(file, 2))
			this.board[file + 7] = new Pawn("b", new Position(file, 7))
		})
	}

	move(move) {
		this.board[move.square.toString()] = move.piece
		delete this.board[move.piece.position.toString()]
		move.piece.move(move.square)
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
		this.piece = piece
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

	get name() { return this.constructor.name.toLowerCase() }
	get rank() { return this.position.rank }
	get file() { return this.position.file }
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
			if (!this.hasMoved && board.in(p) && board.squareEmpty(p, this.color))
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

		// prise en passant
		// ...

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
		// [right, left, up, down]
		var sameChar = c => c
		var directions = [[nextChar, 0], [prevChar, 0], [sameChar, +1], [sameChar, -1]]
		return bishopRookMoves(board, this, directions)
	}
}

class Bishop extends Piece {
	availableMoves(board) {
		// [right up, right down, left up, left down]
		var directions = [[nextChar, +1], [nextChar, -1], [prevChar, +1], [prevChar, -1]]
		return bishopRookMoves(board, this, directions)
	}
}

class Queen extends Piece {
	availableMoves(board) {
		var bishop = new Bishop(this.color, this.position)
		var rook = new Rook(this.color, this.position)

		var moves = bishop.availableMoves(board)
		return moves.concat(rook.availableMoves(board))
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

	canRock(board, controlled_squares, rook, square1, square2) {
		return !this.hasMoved && rook != null && !rook.hasMoved &&
			   board.squareEmpty(square1) && board.squareEmpty(square2) &&
			   controlled_squares.find(s => square1.equals(s)) == null &&
			   controlled_squares.find(s => square2.equals(s)) == null
	}

	canKingRock(board, controlled_squares) {
		var rook = board.at(new Position('h', this.rank))
		var square1 = new Position('g', this.rank)
		var square2 = new Position('f', this.rank)

		return this.canRock(board, controlled_squares, rook, square1, square2)
	}

	canQueenRock(board, controlled_squares) {
		var rook = board.at(new Position('a', this.rank))
		var square1 = new Position('c', this.rank)
		var square2 = new Position('d', this.rank)

		return this.canRock(board, controlled_squares, rook, square1, square2)
	}

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
		if (this.canKingRock(board, controlled_squares)) {
			moves.push(new Move(this, new Position('g', this.rank)))
		}
		if (this.canQueenRock(board, controlled_squares)) {
			moves.push(new Move(this, new Position('c', this.rank)))
		}

		return moves
	}
}