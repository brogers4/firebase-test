

(function(document){
  var app = document.querySelector('#app');

  app.baseUrl = '/';

  window.addEventListener('WebComponentsReady',function(){

    page('/',function(){
      app.route = 'home';
    });

    page('/widgets',function(){
      app.route = 'widgets';
    });

    page('/widgets/:widget',function(ctx){
      app.route = 'widget';
      document.querySelector('widget-view').params = ctx.params;
    });

    page({
      hashbang: true
    });

  });

})(document);
