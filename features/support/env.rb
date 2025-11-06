require 'cucumber/rails'
require 'database_cleaner/active_record'
require 'rack/test'
require 'securerandom'

World(Module.new do
  include Rack::Test::Methods
  def app
    Rails.application
  end
end)

ActionController::Base.allow_forgery_protection = false
DatabaseCleaner.allow_remote_database_url = true
DatabaseCleaner.strategy = :transaction

Before { DatabaseCleaner.start }
After  { DatabaseCleaner.clean }
