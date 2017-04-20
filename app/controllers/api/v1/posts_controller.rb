class Api::V1::PostsController < ApplicationController

  def index
    @posts = Post.all
    render 'index.json.jbuilder'
  end
end
