# frozen_string_literal: true

class UserController < ApplicationController
  skip_before_action :ensure_authenticated_user,
                     only: %i[login attempt_login logout]

  def new; end

  def create; end

  def index; end

  def show; end

  def edit; end

  def update; end

  def delete; end

  def destroy; end

  def search
    if params[:username].blank?
      users = User.search(params[:username]).where('id != ?', @current_user.id)
      render json: users
    else
      render json: { error: 'username should be included' }
    end
  end

  def login; end

  # this method will be removed when the chess library will be used
  # rubocop:disable Metrics/AbcSize
  # rubocop:disable Metrics/MethodLength
  def attempt_login
    if params[:email].present? && params[:password].present?
      found_user = User.where(email: params[:email]).first
      authorized_user = found_user.authenticate(params[:password]) if found_user
    end

    if authorized_user
      authenticate_user(found_user.id)
      flash[:notice] = 'You are now logged in.'
      redirect_to(challenge_index_path)
    else
      flash.now[:notice] = 'Invalid email/password combination.'
      render('login')
    end
  end
  # rubocop:enable Metrics/AbcSize
  # rubocop:enable Metrics/MethodLength

  def logout
    unauthenticate_user
    flash[:notice] = 'Logged out'
    redirect_to(user_login_path)
  end
end
