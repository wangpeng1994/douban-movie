
define(['jquery', 'com/top250', 'com/usbox', 'com/search'], function($, top250, usBox, search){
  var app = {
    init: function(){
      this.bind()
      top250.init()
      usBox.init()
      search.init()
    },
    bind: function(){
      var self = this
      $('footer>div').on('click', function(){
        $(this).addClass('active').siblings().removeClass('active')
        $('main>section').hide().eq($(this).index()).fadeIn()
      })
    }
  }
  
  app.init()
})




