document.addEventListener("DOMContentLoaded", function(event) { 

  Vue.component('post', {
    template: "#post-template",
    props: ['post'],
    data: function() {
      return {
        upvoted: false,
        downvoted: false
      };
    },
    methods: {
      upvote: function() {
        this.upvoted = !this.upvoted;
        // $.patch("/api/v1/posts" + this.post.id + ".json", {upvotes: this.post.upvotes + 1, downvotes: this.post.downvotes})
        $.ajax({url: "/api/v1/posts/" + this.post.id + ".json",
                data: {upvotes: this.post.upvotes + 1, downvotes: this.post.downvotes},
                method: "patch"})
        this.downvoted = false;
      },
      downvote: function() {
        this.downvoted = !this.downvoted;
        this.upvoted = false;
      }
    },
    computed: {
      votes: function() {

        if (this.upvoted) {
          return this.post.upvotes - this.post.downvotes + 1;
        } else if (this.downvoted) {
          $.patch("/api/v1/posts" + this.post.id + ".json", {upvotes: this.post.upvotes, downvotes: this.post.downvotes + 1})
          return this.post.upvotes - this.post.downvotes - 1;
        } else {
          return this.post.upvotes - this.post.downvotes;
        }

      }
    }
  });

  var app = new Vue({
    el: '#app',
    data: {
      posts: []
    },
    mounted: function() {
      $.get("/api/v1/posts.json", function(result) {
        this.posts = result
      }.bind(this));
    }, 
  });
});
