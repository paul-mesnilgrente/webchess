Rails.application.routes.draw do
  resources :users
  resources :challenges
  get 'challenge/index'
  get 'challenge/show'
  get 'challenge/edit'
  get 'challenge/delete'
  root 'default#index'
  
  get 'default/index'
  get 'default/contact'
  get 'default/sandbox'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
