class CreateGames < ActiveRecord::Migration[5.2]
  def up
    create_table :games do |t|
      t.integer 'white_player_id'
      t.integer 'black_player_id'

      t.timestamps
    end
  end

  def down
    drop_table :games
  end
end
