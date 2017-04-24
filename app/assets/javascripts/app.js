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
      // TODO: way to keep track of user has already upvoted/downvoted once after page refresh
      upvote: function() {
        this.upvoted = !this.upvoted;
        $.ajax({url: "/api/v1/posts/" + this.post.id + ".json",
                data: {upvotes: this.post.upvotes + 1, downvotes: this.post.downvotes},
                method: "patch"});
        this.downvoted = false;
      },
      downvote: function() {
        this.downvoted = !this.downvoted;
        $.ajax({url: "/api/v1/posts/" + this.post.id + ".json",
                data: {upvotes: this.post.upvotes, downvotes: this.post.downvotes + 1},
                method: "patch"});
        this.upvoted = false;
      }
    },
    computed: {
      // might be able to refactor this?
      votes: function() {
        if (this.upvoted) {
          return this.post.upvotes - this.post.downvotes + 1;
        } else if (this.downvoted) {
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
