json.array! @comments do |comment|
  json.id comment.id
  json.body comment.body
  json.upvotes comment.upvotes
  json.downvotes comment.downvotes
  json.username comment.user.username
end
