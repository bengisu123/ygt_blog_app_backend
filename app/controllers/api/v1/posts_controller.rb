module Api
  module V1
    class PostsController < ApplicationController
      protect_from_forgery with: :null_session
    

      def index
        def index
          posts = Post.order(created_at: :desc)
          render json: posts
        end
        
      end

      def create
        post = current_user.posts.new(post_params)
        if post.save
          render json: post, status: :created
        else
          render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        post = current_user.posts.find(params[:id])
        if post.update(post_params)
          render json: post, status: :ok
        else
          render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        post = current_user.posts.find(params[:id])
        post.destroy
        head :no_content
      end

      private

      def post_params
        params.require(:post).permit(:title, :content)
      end

      def authenticate_user!
        header = request.headers['Authorization']
        unless header&.start_with?('Bearer ')
          render json: { error: 'Unauthorized' }, status: :unauthorized and return
        end
        token = header.split(' ').last
        begin
          decoded = JWT.decode(token, Rails.application.secret_key_base, true, { algorithm: 'HS256' })
          user_id = decoded.first['sub']
          @current_user = User.find(user_id)
        rescue => _
          render json: { error: 'Unauthorized' }, status: :unauthorized
        end
      end

      def current_user
        @current_user
      end
    end
  end
end
