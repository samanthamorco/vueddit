class Api::V1::CommentsController < ApplicationController

  def index
    @comments = Post.find(params[:post_id]).comments.order(created_at: :asc)
    render 'index.json.jbuilder'
  end

  def create
    @comment = Comment.new(body: params[:body],
                 user: current_user,
                 post_id: params[:post_id])
    if @comment.save
      render 'show.json.jbuilder'
    else
      render json: { errors: 'Something blew up' }
    end
  end

  def update
    @comment = Comment.find(params[:id])
    @comment.update(upvotes: params[:upvotes],
                    downvotes: params[:downvotes])
    render 'show.json.jbuilder'
  end
end
