class ChessGameChannel < ApplicationCable::Channel
  def subscribed
    @game = Game.find(params[:room])
    stream_from @game.id
  end

  def receive(data)
    move = Move.new
    move.game = @game
    move.number = @game.moves.length + 1
    move.notation = data
    if move.save
      ChessGameChannel.broadcast_to(@game.id, move)
  end

  def speak(data)
    ActionCable.server.broadcast(@game.id,
      :message => data['message'])
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
