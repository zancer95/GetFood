Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :profiles, only: [:show,:create, :update]
      resources :favorites, only: [:show, :destroy, :create]
      resources :user_locations, only: [:create]
      post 'authentication/sign_up', to: 'authentication#sign_up'
      post 'authentication/sign_in', to: 'authentication#sign_in'
      get 'locations/location', to: 'locations#location'
      get 'locations/image', to: 'locations#image_src'
    end
  end
end
