
define(['jquery', 'com/helper'], function($, helper){
  var usBox = {
    init: function(){
      this.$element = $('#usBox')
      this.$content = this.$element.find('.container')
      this.start()
    },
  
    start: function(){
      var self = this
      this.getData(function(data){
        self.render(data)
      })
    },
  
    getData: function(callback){
      var self = this
      this.$element.find('.loading').show()
      $.ajax({
        url:'http://api.douban.com/v2/movie/us_box',
        dataType: 'jsonp'
      }).done(function(ret){
        console.log(ret)
        callback && callback(ret)
      }).fail(function(){
        console.log('请求数据异常')
      }).always(function(){
        self.$element.find('.loading').hide()
      })
    },
  
    render: function(data){
      var self = this
      data.subjects.forEach(function(movie){
        self.$content.append(helper.createNode(movie.subject))
      })
    }
  }

  return usBox
})