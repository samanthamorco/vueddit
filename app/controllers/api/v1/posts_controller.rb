class Api::V1::PostsController < ApplicationController

  def index
    @posts = Post.all.order(created_at: :desc)
    render 'index.json.jbuilder'
  end

  def show
    @post = Post.find(params[:id])
    render 'show.json.jbuilder'
  end
end
