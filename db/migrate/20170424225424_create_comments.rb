class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.string :body
      t.integer :user_id
      t.integer :post_id
      t.integer :upvotes, default: 0
      t.integer :downvotes, default: 0

      t.timestamps
    end
  end
end
