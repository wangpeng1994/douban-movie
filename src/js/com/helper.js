
define(['jquery'], function($){
  var helper = {
    isToBottom: function($content, $viewport){
      return $content.height() - 10 <= $viewport.scrollTop() + $viewport.height()
    },
  
    isEnd: function(target, ret){
      if(target.index >= ret.total){
        console.log('没有更多数据了')
        target.isEnd = true
      }
    },
  
    createNode: function(movie){
      var tpl = `
        <div class="item">
          <a href="#">
            <div class="cover">
              <img src="" alt="">
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
      return $node
    }
  }

  return helper
})
