# frozen_string_literal: true

class Challenge < ApplicationRecord
  belongs_to :challenger, class_name: 'User', inverse_of: :challenger
  belongs_to :challenged, class_name: 'User', inverse_of: :challenged

  def initialize(challenger = nil, challenged = nil)
    @challenger = challenger
    @challenged = challenged
  end

  def notice_message_after_destroy(user)
    res = "Challenge with '"
    res << if challenger == user
             "#{@challenged.username}'  successfully cancelled."
           else
             "#{@challenge.challenged.username}' successfully rejected."
           end
    res
  end
end
