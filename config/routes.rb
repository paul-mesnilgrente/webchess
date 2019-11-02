# frozen_string_literal: true

Rails.application.routes.draw do
  root 'public#index', as: 'homepage'

  resources :users do
    member do
      get :delete
    end
  end

  resources :challenge do
    member do
      get :delete
    end
  end

  get 'challenge/:id/accept', to: 'challenge#accept', as: 'accept_challenge'

  get 'game/:id/play', to: 'game#play', as: 'play_game'
  get 'game/', to: 'game#index', as: 'game_index'

  get  'user/search'
  get  'user/login'
  post 'user/attempt_login'
  get  'user/logout'

  get '/contact', to: 'public#contact'
  get '/sandbox', to: 'public#sandbox'

  mount ActionCable.server => '/cable'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
