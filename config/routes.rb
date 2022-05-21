# Rails.application.routes.draw do
#   get 'site/index'
#   # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

#   # Defines the root path route ("/")
#   # root "articles#index"
# end

Rails.application.routes.draw do
  root to: 'site#index'

  namespace :api do
    resources :events, only: %i[index show create update destroy]
  end
end