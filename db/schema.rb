# frozen_string_literal: true

# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20_190_222_031_958) do
  create_table 'challenges', options: 'ENGINE=InnoDB DEFAULT CHARSET=latin1', force: :cascade do |t|
    t.integer 'challenger_id'
    t.integer 'challenged_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['challenged_id'], name: 'index_challenges_on_challenged_id'
    t.index ['challenger_id'], name: 'index_challenges_on_challenger_id'
  end

  create_table 'games', options: 'ENGINE=InnoDB DEFAULT CHARSET=latin1', force: :cascade do |t|
    t.integer 'white_player_id'
    t.integer 'black_player_id'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end

  create_table 'moves', options: 'ENGINE=InnoDB DEFAULT CHARSET=latin1', force: :cascade do |t|
    t.bigint 'game_id'
    t.integer 'number'
    t.string 'notation', limit: 8
    t.datetime 'created_at'
    t.index ['game_id'], name: 'index_moves_on_game_id'
  end

  create_table 'users', options: 'ENGINE=InnoDB DEFAULT CHARSET=latin1', force: :cascade do |t|
    t.string 'username', limit: 40
    t.string 'first_name', limit: 40
    t.string 'last_name', limit: 40
    t.string 'email', limit: 100
    t.string 'password_digest'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
  end
end
