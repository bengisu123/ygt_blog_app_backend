class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  private

  def authenticate_user!
    render json: { error: "Unauthorized" }, status: :unauthorized unless current_user
  end

  def current_user
    return @current_user if defined?(@current_user)

    auth_header = request.headers["Authorization"]
    token = auth_header&.split(" ")&.last
    if token.present?
      begin
        decoded = JWT.decode(token, Rails.application.secret_key_base, true, { algorithm: "HS256" })
        user_id = decoded.first["sub"]
        @current_user = User.find_by(id: user_id)
      rescue JWT::DecodeError, JWT::ExpiredSignature
        @current_user = nil
      end
    else
      @current_user = nil
    end
  end
end
