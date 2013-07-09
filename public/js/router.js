(function() {
  define(["backbone", "app", "view/list", "view/post"], function(Backbone, app, ListView, PostView) {
    var Router;
    return Router = Backbone.Router.extend({
      routes: {
        "": "showHome",
        ":post": "showPost"
      },
      showHome: function() {
        var view;
        view = new ListView({
          collection: app.posts
        });
        return $("#main").html(view.render());
      },
      showPost: function(href) {
        var post;
        post = app.posts.findWhere({
          "Slug": href
        });
        if (post == null) {
          return this.notFound();
        }
        return post.fetch({
          success: function(model, response, options) {
            var view;
            view = new PostView({
              model: model
            });
            return $("#main").html(view.render());
          }
        });
      },
      notFound: function() {
        return $("#main").html("<h1>404 Not Found</h1>");
      }
    });
  });

}).call(this);
