class Api::V1::PostsController < ApplicationController

  def index
    @posts = Post.all.order(created_at: :desc)
    render 'index.json.jbuilder'
  end

  def show
    @post = Post.find(params[:id])
    render 'show.json.jbuilder'
  end

  def update
    @post = Post.find(params[:id])
    @post.update(upvotes: params[:upvotes], downvotes: params[:downvotes])
    render 'show.json.jbuilder'
  end
end
