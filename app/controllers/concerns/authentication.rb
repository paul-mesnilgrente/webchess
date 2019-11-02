# frozen_string_literal: true

module Authentication
  extend ActiveSupport::Concern

  included do
    before_action :ensure_authenticated_user
  end

  private

  def ensure_authenticated_user
    authenticate_user(cookies.signed[:user_id]) || redirect_to(user_login_path)
  end

  def authenticate_user(user_id)
    return unless (authenticated_user = User.find_by(id: user_id))

    cookies.signed[:user_id] ||= user_id
    @current_user = authenticated_user
  end

  def unauthenticate_user
    ActionCable.server.disconnect(current_user: @current_user)
    @current_user = nil
    cookies.delete(:user_id)
  end
end
