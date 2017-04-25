Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'posts#index'
  resources :posts, only: [:index, :new, :create, :show]
  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index, :update] do
        resources :comments, only: [:index, :create]
      end
      resources :comments, only: [:update]
    end
  end
end
