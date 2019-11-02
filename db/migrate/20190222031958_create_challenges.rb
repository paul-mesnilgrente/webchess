# frozen_string_literal: true

class CreateChallenges < ActiveRecord::Migration[5.2]
  def up
    create_table :challenges do |t|
      t.integer 'challenger_id', index: true
      t.integer 'challenged_id', index: true
      t.timestamps
    end
  end

  def down
    drop_table :challenges
  end
end
