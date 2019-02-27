class UserController < ApplicationController

  skip_before_action :ensure_authenticated_user, only: %i( login attempt_login logout )

  def new
  end

  def create
  end

  def index
  end

  def show
  end

  def edit
  end

  def update
  end

  def delete
  end

  def destroy
  end

  def search
    respond_to do |format|
      if params[:username].present?
        users = User.search(params[:username]).where("id != ?", @user.id)
        format.json { render({:json => users})}
      else
        format.json { render({:json => 'username should be included'})}
      end
    end
  end


  def login
  end

  def attempt_login
    if params[:email].present? && params[:password].present?
      found_user = User.where(:email => params[:email]).first
      if found_user
        authorized_user = found_user.authenticate(params[:password])
      end
    end

    if authorized_user
      authenticate_user(found_user.id)
      flash[:notice] = "You are now logged in."
      redirect_to(challenge_index_path)
    else
      flash.now[:notice] = "Invalid email/password combination."
      render('login')
    end
  end

  def logout
    unauthenticate_user
    flash[:notice] = 'Logged out'
    redirect_to(user_login_path)
  end
end
