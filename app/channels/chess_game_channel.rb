# frozen_string_literal: true

class ChessGameChannel < ApplicationCable::Channel
  def subscribed
    @game = Game.find(params[:room].split('-')[1])
    stream_from room
  end

  def unsubscribed
    stop_all_streams
  end

  def speak(data)
    move = Move.new
    move.game = @game
    move.number = @game.moves.length + 1
    move.notation = data['message']
    ActionCable.server.broadcast(room, message: move.notation) if move.save
  end

  private

  def room
    "game-#{@game.id}"
  end
end
