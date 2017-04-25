class PostsController < ApplicationController
  before_action :authenticate_user!, except: :index
  rescue_from ActiveRecord::RecordNotFound, with: :back_to_root

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)
    @post.user_id = current_user.id
    if @post.save
      flash[:success] = 'Post Created'
      redirect_to root_path
    else
      flash[:error] = '<ul>' + @post.errors.full_messages.map { |msg| "<li>#{msg}</li>" }.join(' ') + '</ul>'
      render :new
    end
  end

  def show
    @post = Post.find(params[:id])
  end

  private

  def post_params
    params.require(:post).permit(:title, :body)
  end

  def back_to_root
    flash[:warning] = "Post does not exist!"
    redirect_to root_path
  end
end
