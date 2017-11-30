
define(['jquery', 'com/helper'], function($, helper){
  var search = {
    init: function(){
      this.$element = $('#search')
      this.$content = this.$element.find('.search-result')
      this.$btn = this.$element.find('.button')
      this.$input = this.$element.find('input')
      this.index = 0
      this.isLoading = false
      this.isEnd = false
      this.keyword = ''
      this.bind()
    },
  
    bind: function(){
      var self = this
      this.$btn.on('click', function(){
        self.$content.children().remove() //每次搜索前，先清空
        self.keyword = self.$input.val()
        self.start()
      })
      this.$element.on('scroll', function(){
        if(!self.isEnd && helper.isToBottom(self.$content, self.$element)){
          self.start()
        }
      })
    },
  
    start: function(){
      var self = this
      this.getData(function(data){
        self.render(data)
      })
    },
  
    getData: function(callback){
      var self = this
      if(this.isLoading) return
      this.isLoading = true
      this.$element.find('.loading').show()
      $.ajax({
        url:'https://api.douban.com/v2/movie/search',
        data: {
          q: this.keyword,
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

  return search
})



