
define(['jquery', 'com/helper'], function($, helper){
  var top250 = {
    init: function(){
      this.$element = $('#top250')
      this.$content = this.$element.find('.container')
      this.index = 0
      this.isLoading = false
      this.isEnd = false
      this.bind()
      this.start()
    },
  
    bind: function(){
      var self = this
      this.$element.on('scroll', function(){
        if(!self.isEnd && helper.isToBottom(self.$content, self.$element)){
          self.start()
        }  
      })
    },
  
    start: function(){
      var self = this
      this.getData(function(data){ //这里使用回调函数，而不是直接在getData里执行render，是为了提供拓展接口
        self.render(data)
      })
    },
  
    getData: function(callback){
      var self = this
      if(this.isLoading) return
      this.isLoading = true
      this.$element.find('.loading').show()
      $.ajax({
        url:'https://api.douban.com/v2/movie/top250',
        data: {
          start: this.index || 0,
          count: 20
        },
        dataType: 'jsonp'
      }).done(function(ret){
        console.log(ret)
        self.index += 20
        helper.isEnd(self, ret)
        callback && callback(ret)
      }).fail(function(){
        console.log('请求数据异常')
      }).always(function(){
        self.isLoading = false
        self.$element.find('.loading').hide()
      })
    },
  
    render: function(data){
      var self = this
      data.subjects.forEach(function(movie){
        self.$content.append(helper.createNode(movie))
      })
    }
  }

  return top250
})

