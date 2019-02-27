class GameController < ApplicationController

  def index
    id = @current_user.id
    @games = Game.where(:black_player_id => id).or(Game.where(:white_player_id => id))
  end

  def play
    @game = Game.find(params[:id])
    @board = {
      'a' => ['wr', 'wp', nil, nil, nil, nil, 'bp', 'br'],
      'b' => ['wn', 'wp', nil, nil, nil, nil, 'bp', 'bn'],
      'c' => ['wb', 'wp', nil, nil, nil, nil, 'bp', 'bb'],
      'd' => ['wq', 'wp', nil, nil, nil, nil, 'bp', 'bq'],
      'e' => ['wk', 'wp', nil, nil, nil, nil, 'bp', 'bk'],
      'f' => ['wb', 'wp', nil, nil, nil, nil, 'bp', 'bb'],
      'g' => ['wn', 'wp', nil, nil, nil, nil, 'bp', 'bn'],
      'h' => ['wr', 'wp', nil, nil, nil, nil, 'bp', 'br'],
    }
    @game.moves.sort_by {|move| move.number}
    @game.moves.each() do |move|
      @board = move_piece(@board, move)
    end
  end

  private

  def move_piece(board, move)
    # norm: <file_start><rank_start></file_end><rank_end>
    file_start = move.notation[0]
    rank_start = move.notation[1].to_i
    file_end = move.notation[2]
    rank_end = move.notation[3].to_i
    board[file_end][rank_end-1] = board[file_start][rank_start-1]
    board[file_start][rank_start-1] = nil

    return board
  end
end
