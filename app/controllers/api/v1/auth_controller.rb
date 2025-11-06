module Api
  module V1
    class AuthController < ApplicationController
      protect_from_forgery with: :null_session

      # POST /api/v1/login
      def create
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
          token = generate_token(user)
          render json: { token:, user: { id: user.id, name: user.name, email: user.email } }, status: :ok
        else
          render json: { error: "Invalid email or password" }, status: :unauthorized
        end
      end

      # POST /api/v1/register
      def register
        user = User.new(
          name:  params[:name],
          email: params[:email],
          password: params[:password],
          password_confirmation: params[:password_confirmation]
        )
        if user.save
          token = generate_token(user)
          render json: { token:, user: { id: user.id, name: user.name, email: user.email } }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def generate_token(user)
        payload = {
          sub: user.id,
          name: user.name,
          email: user.email,
          iat: Time.now.to_i,
          exp: 24.hours.from_now.to_i
        }
        secret = Rails.application.secret_key_base
        JWT.encode(payload, secret, "HS256")
      end
    end
  end
end
