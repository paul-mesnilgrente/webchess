class ApplicationController < ActionController::Base

  private

  def confirm_logged_in
    unless session[:user_id]
      flash[:notice] = "Please log in."
      redirect_to(user_login_path)
      # redirect_to prevents requested action from running
    end
    @user = User.find(session[:user_id])
  end
end
