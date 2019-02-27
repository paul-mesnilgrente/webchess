class User < ApplicationRecord

  has_secure_password

  scope :search, lambda {|query| where(["username LIKE ?", "%#{query}%"]) }

  has_many :white_games, :class_name => 'Game', :foreign_key => 'white_player_id'
  has_many :black_games, :class_name => 'Game', :foreign_key => 'black_player_id'
  has_many :challenges, :class_name => 'Challenge', :foreign_key => 'challenger_id'
  has_many :challenged, :class_name => 'Challenge', :foreign_key => 'challenged_id'

  EMAIL_REGEX = /\A[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}\Z/i

  validates :first_name, :presence => true,
                         :length => { :maximum => 40 }
  validates :last_name, :presence => true,
                        :length => { :maximum => 40 }
  validates :username, :length => { :within => 5..40 },
                       :uniqueness => true
  validates :email, :presence => true,
                    :length => { :maximum => 100 },
                    :format => EMAIL_REGEX,
                    :uniqueness => true,
                    :confirmation => true

  def name
    first_name + ' ' + last_name
  end
end
