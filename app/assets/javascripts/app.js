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
