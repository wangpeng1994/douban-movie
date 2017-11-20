/*

//绑定底部tab切换事件
$('footer>div').on('click', function(){
  var index = $(this).index()
  $('section').hide().eq(index).fadeIn()
  $(this).addClass('active').siblings().removeClass('active')
})

var index = 0
var isLoading = false

getData()

function getData(){
  if(isLoading) return
  isLoading = true
  $('.loading').show()
  $.ajax({
    url:'http://api.douban.com/v2/movie/top250',
    method: 'GET',
    data: {
      start: index,
      count: 20
    },
    dataType: 'jsonp'
  }).done(function(ret){
    console.log(ret)
    render(ret)
    index += 20
  }).fail(function(){
    console.log('error...')
  }).always(function(){
    isLoading = false
    $('.loading').hide()
  })
}

var clock
$('main').on('scroll', function(){
  if(clock){
    clearTimeout(clock)
  }
  clock = setTimeout(function(){
    if($('section').eq(0).height() - 10 <= $('main').scrollTop() + $('main').height()){
      console.log('滚动到底了')
      getData()
    }
  }, 300)
})

function render(data){
  data.subjects.forEach(function(movie){
    var tpl = `
      <div class="item">
        <a href="">
          <div class="cover">
            <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.jpg" alt="">
          </div>
          <div class="detail">
            <h2></h2>
            <div class="rest"><span class="rating"></span>分 / <span class="collect"></span>收藏</div>
            <div class="rest"><span class="year"></span> / <span class="tyle"></span></div>
            <div class="rest">导演: <span class="directors"></span></div>
            <div class="rest">主演：<span class="casts"></span></div>
          </div>
        </a>
      </div>
    `
    var $node = $(tpl)
    $node.children('a').attr('href', movie.alt)
    $node.find('.cover img').attr('src', movie.images.small)
    $node.find('.detail h2').text(movie.title)
    $node.find('.rating').text(movie.rating.average)
    $node.find('.collect').text(movie.collect_count)
    $node.find('.year').text(movie.year)
    $node.find('.tyle').text(movie.genres.join(' / '))
    $node.find('.directors').text(function(){
      var directorsArr = []
      movie.directors.forEach(function(item){
        directorsArr.push(item.name)
      })
      return directorsArr.join('、')
    })
    $node.find('.casts').text(function(){
      var castsArr = []
      movie.casts.forEach(function(item){
        castsArr.push(item.name)
      })
      return castsArr.join('、')
    })

    $('.container').append($node)
  })
}

*/

var top250 = {
  init: function(){
    this.$element = $('#top250')
    this.isLoading = false
    this.index = 0
    this.isEnd = false
    this.bind()
    this.start()
  },

  bind: function(){
    var self = this
    console.log(this.$element)
    this.$element.on('scroll', function(){
      console.log('gundong.....')
      if(self.isEnd) return //250条数据已经展示到底部了
      if(self.isToBottom()) self.start()
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
      url:'http://api.douban.com/v2/movie/top250',
      data: {
        start: self.index || 0,
        count: 20
      },
      dataType: 'jsonp'
    }).done(function(ret){
      console.log(ret)
      self.index += 20
      if(self.index >= ret.total){
        self.isEnd = true
        console.log('没有更多数据了')
      }
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
      var tpl = `
        <div class="item">
          <a href="">
            <div class="cover">
              <img src="http://img7.doubanio.com/view/photo/s_ratio_poster/public/p1910813120.jpg" alt="">
            </div>
            <div class="detail">
              <h2></h2>
              <div class="rest"><span class="rating"></span>分 / <span class="collect"></span>收藏</div>
              <div class="rest"><span class="year"></span> / <span class="tyle"></span></div>
              <div class="rest">导演: <span class="directors"></span></div>
              <div class="rest">主演：<span class="casts"></span></div>
            </div>
          </a>
        </div>
      `
      var $node = $(tpl)
      $node.children('a').attr('href', movie.alt)
      $node.find('.cover img').attr('src', movie.images.small)
      $node.find('.detail h2').text(movie.title)
      $node.find('.rating').text(movie.rating.average)
      $node.find('.collect').text(movie.collect_count)
      $node.find('.year').text(movie.year)
      $node.find('.tyle').text(movie.genres.join(' / '))
      $node.find('.directors').text(function(){
        var directorsArr = []
        movie.directors.forEach(function(item){
          directorsArr.push(item.name)
        })
        return directorsArr.join('、')
      })
      $node.find('.casts').text(function(){
        var castsArr = []
        movie.casts.forEach(function(item){
          castsArr.push(item.name)
        })
        return castsArr.join('、')
      })
  
      self.$element.find('.container').append($node)
    })
  },
  
  isToBottom: function(){
    return this.$element.find('.container').height() - 10 <= this.$element.scrollTop() + this.$element.height()
  }
}



var usZone = {
  init: function(){
    console.log('usZone ok')
  },
  bind: function(){

  },
  start: function(){

  }
}


var search = {
  init: function(){
    console.log('search ok')
  },
  bind: function(){

  },
  start: function(){

  }
}






var app = {
  init: function(){
    this.$tabs = $('footer>div')
    this.$panels = $('section')
    this.bind()

    top250.init()
    usZone.init()
    search.init()
  },
  bind: function(){
    var self = this
    this.$tabs.on('click', function(){
      $(this).addClass('active').siblings().removeClass('active')
      self.$panels.hide().eq($(this).index()).fadeIn()
    })
  }
}

app.init()
