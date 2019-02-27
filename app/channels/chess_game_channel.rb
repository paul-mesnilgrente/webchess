class ChessGameChannel < ApplicationCable::Channel
  def subscribed
    stream_from("game_")
    # stream_from "some_channel"
  end

  def speak(data)
    ActionCable.server.broadcast("game_",
      :message => data['message'])
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
