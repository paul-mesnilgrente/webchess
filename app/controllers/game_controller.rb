# frozen_string_literal: true

class GameController < ApplicationController
  def index
    id = @current_user.id
    @games = Game
             .where(black_player_id: id)
             .or(Game.where(white_player_id: id))
  end

  def play
    @game = init_game
    @board = init_board
    if @current_user == @game.white_player
      @player = 'w'
      @opponent = @game.black_player
    else
      @player = 'b'
      @opponent = @game.white_player
    end
  end

  private

  def init_board
    {
      'a' => ['wr', 'wp', nil, nil, nil, nil, 'bp', 'br'],
      'b' => ['wn', 'wp', nil, nil, nil, nil, 'bp', 'bn'],
      'c' => ['wb', 'wp', nil, nil, nil, nil, 'bp', 'bb'],
      'd' => ['wq', 'wp', nil, nil, nil, nil, 'bp', 'bq'],
      'e' => ['wk', 'wp', nil, nil, nil, nil, 'bp', 'bk'],
      'f' => ['wb', 'wp', nil, nil, nil, nil, 'bp', 'bb'],
      'g' => ['wn', 'wp', nil, nil, nil, nil, 'bp', 'bn'],
      'h' => ['wr', 'wp', nil, nil, nil, nil, 'bp', 'br']
    }
  end

  def init_game
    game = Game.find(params[:id])
    game.moves.sort_by(&:number)
    game.moves.each { |move| @board = move_piece(@board, move) }
    game
  end

  # this method will be removed when the chess library will be used
  # rubocop:disable Metrics/AbcSize
  def move_piece(board, move)
    # norm: <file_start><rank_start></file_end><rank_end>
    file_start = move.notation[0]
    rank_start = move.notation[1].to_i
    file_end = move.notation[2]
    rank_end = move.notation[3].to_i
    board[file_end][rank_end - 1] = board[file_start][rank_start - 1]
    board[file_start][rank_start - 1] = nil

    board
  end
  # rubocop:enable Metrics/AbcSize
end
