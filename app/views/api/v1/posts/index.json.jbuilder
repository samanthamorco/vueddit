json.array! @posts do |post|
  json.id post.id
  json.title post.title
  json.body post.body
  json.upvotes post.upvotes
  json.downvotes post.downvotes
  json.username post.user.username
  json.created_at post.created_at
end
