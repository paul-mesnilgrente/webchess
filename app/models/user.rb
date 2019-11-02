# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  scope :search, ->(query) { where(['username LIKE ?', "%#{query}%"]) }

  has_many :white_games,
           class_name: 'Game',
           inverse_of: :white_player,
           dependent: :nullify
  has_many :black_games,
           class_name: 'Game',
           inverse_of: :black_player,
           dependent: :nullify

  has_many :challenges,
           class_name: 'Challenge',
           inverse_of: :challenger,
           dependent: :destroy
  has_many :challenged,
           class_name: 'Challenge',
           inverse_of: :challenged,
           dependent: :destroy

  EMAIL_REGEX = /\A[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}\Z/i.freeze

  validates :first_name, presence: true, length: { maximum: 40 }
  validates :last_name, presence: true, length: { maximum: 40 }
  validates :username, length: { within: 5..40 }, uniqueness: true
  validates :email, presence: true,
                    length: { maximum: 100 },
                    format: EMAIL_REGEX,
                    uniqueness: true,
                    confirmation: true

  def name
    first_name + ' ' + last_name
  end
end
