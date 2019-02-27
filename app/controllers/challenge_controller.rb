class ChallengeController < ApplicationController

  before_action :confirm_logged_in

  def index
    @challenges_received = Challenge.where("challenged_id = ?", @user.id)
    @challenges_sent = Challenge.where("challenger_id = ?", @user.id)
  end

  def new
    challenger = @user
    if params[:challenged].present?
      challenged = User.find(params[:challenged])
      challenge = Challenge.new
      challenge.challenger = challenger
      challenge.challenged = challenged
      if ! challenge.save
        flash[:notice] = 'Error, the challenge could not be saved'
      end
    else
      flash[:notice] = "Error you haven't provide the id of the challenged"
    end
    redirect_to(challenge_index_path)
  end

  def show
  end

  def edit
  end

  def delete
    @challenge = Challenge.find(params[:id])
  end

  def destroy
    @challenge = Challenge.find(params[:id])
    @challenge.destroy
    if @challenge.challenger == @user
      flash[:notice] = "Challenge with '#{@challenge.challenged.username}' successfully cancelled."
    else
      flash[:notice] = "Challenge with '#{@challenge.challenged.username}' successfully rejected."
    end
    redirect_to(challenge_index_path)
  end

  def accept
    @challenge = Challenge.find(params[:id])
    if rand(2)
      black_player = @challenge.challenged
      white_player = @challenge.challenger
    else
      black_player = @challenge.challenger
      white_player = @challenge.challenged
    end
    @game = Game.create(:white_player_id => black_player.id, :black_player_id => white_player.id)
    @challenge.destroy
    redirect_to(play_game_path(:id => @game.id))
  end
end
