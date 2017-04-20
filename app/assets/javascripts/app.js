document.addEventListener("DOMContentLoaded", function(event) { 

  Vue.component('post', {
    template: '#post-template',
    props: ['post']
  })
  var app = new Vue({
    el: '#app',
    data: {
      posts: []
    },
    mounted: function() {
      $.get("/api/v1/posts.json", function(result) {
        this.posts = result
      }.bind(this));
    }
  });
});
