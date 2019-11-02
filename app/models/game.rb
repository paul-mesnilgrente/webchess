# frozen_string_literal: true

class Game < ApplicationRecord
  belongs_to :white_player, class_name: 'User', inverse_of: :white_player
  belongs_to :black_player, class_name: 'User', inverse_of: :black_player
  has_many :moves, dependent: :destroy
end
