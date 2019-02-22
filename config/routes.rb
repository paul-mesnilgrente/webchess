Rails.application.routes.draw do
  root 'default#index'

  resources :users do
    member do
      get :delete
    end
  end

  resources :challenges do
    member do
      get :delete
    end
  end

  get 'user/login', as: 'login'

  get 'challenge/index'
  get 'challenge/show'
  get 'challenge/edit'
  get 'challenge/delete'
  root 'default#index'
  
  get 'default/index', as: 'homepage'
  get 'default/contact'
  get 'default/sandbox'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
