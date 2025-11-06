Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "/login",    to: "auth#create"
      post "/register", to: "auth#register"

      resources :posts, only: [:index, :create, :update, :destroy]
      # Optional: allow /api/v1 to map to posts#index
      get "/", to: "posts#index"
    end
  end

  # Optional browser home (already exists)
  root "home#index"
end
