source "https://rubygems.org"

gem "rails", "~> 8.0.3"
gem "propshaft"
gem "sqlite3", ">= 2.1"
gem "puma", ">= 5.0"
gem "importmap-rails"
gem "turbo-rails"
gem "stimulus-rails"
gem "jbuilder"

# Windows timezone data
gem "tzinfo-data"

# Caching/job/cable (as generated)
gem "solid_cache"
gem "solid_queue"
gem "solid_cable"

gem "bootsnap", require: false
gem "kamal", require: false
gem "thruster", require: false

# --- Added for API/JWT/CORS/Auth/Tests ---
gem "bcrypt", "~> 3.1"
gem "jwt", "~> 3.1"
gem "rack-cors", "~> 3.0"

group :development, :test do
  gem "debug", platforms: %i[mri windows], require: "debug/prelude"
  gem "brakeman", require: false
  gem "rubocop-rails-omakase", require: false
  gem "rspec-rails"
  gem "faker"
end

group :development do
  gem "web-console"
end

group :test do
  gem "capybara"
  gem "selenium-webdriver"
  gem "cucumber-rails", require: false
  gem "database_cleaner-active_record"
end
