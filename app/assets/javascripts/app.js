document.addEventListener("DOMContentLoaded", function(event) { 
  var app = new Vue({
    el: '#app',
    data: {
      posts: [],
      newPostTitle: '',
      newPostBody: '',
    },
    mounted: function() {
      $.get("/api/v1/posts.json", function(result) {
        this.posts = result
      }.bind(this));
    }
  });
});
