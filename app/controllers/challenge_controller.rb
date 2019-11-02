# frozen_string_literal: true

class ChallengeController < ApplicationController
  def index
    @challenges_received = Challenge.where(challenged: @current_user)
    @challenges_sent = Challenge.where(challenger: @current_user.id)
  end

  def new
    challenger = @current_user
    if params[:challenged].present?
      challenged = User.find(params[:challenged])
      c = Challenge.new(challenger, challenged)

      flash[:notice] = 'Error, the challenge could not be saved' unless c.save
    else
      flash[:notice] = "Error you haven't provide the id of the challenged"
    end
    redirect_to(challenge_index_path)
  end

  def show; end

  def edit; end

  def delete
    @challenge = Challenge.find(params[:id])
  end

  def destroy
    @challenge = Challenge.find(params[:id])
    @challenge.destroy

    redirect_to(challenge_index_path)
  end

  def accept
    @challenge = Challenge.find(params[:id])
    black, white = pick_colors
    @game = Game.create(white_player: white, black_player: black)

    @challenge.destroy
    redirect_to(play_game_path(id: @game.id))
  end

  def pick_colors
    if rand(2)
      [@challenge.challenged, @challenge.challenger]
    else
      [@challenge.challenger, @challenge.challenged]
    end
  end
end
