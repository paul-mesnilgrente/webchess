class GameController < ApplicationController

  before_action :confirm_logged_in

  def index
    games = Game.where(:black_player_id => @user.id).or(:black_player_id => @user.id)
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
    rank_start = move.notation[1]
    file_end = move.notation[2]
    rank_end = move.notation[3]
    board[file_end][rank_end-1] = board[file_start][rank_start-1]

    return board
  end
end
