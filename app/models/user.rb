class User < ApplicationRecord

  has_secure_password

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
end
