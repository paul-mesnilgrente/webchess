class CreateUsers < ActiveRecord::Migration[5.2]
  def up
    create_table :users do |t|
      t.string "username", limit: 40
      t.string "first_name", limit: 40
      t.string "last_name", limit: 40
      t.string "email", limit: 100
      t.string "password_digest"
      t.timestamps
    end
  end

  def down
    drop_table :users
  end
end
