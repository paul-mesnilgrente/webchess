# frozen_string_literal: true

class CreateMoves < ActiveRecord::Migration[5.2]
  def up
    create_table :moves do |t|
      t.belongs_to :game
      t.integer 'number'
      t.string 'notation', limit: 8
      t.datetime 'created_at'
    end
  end

  def down
    drop_table :moves
  end
end
