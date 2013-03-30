(function($){
  
	// Nav
  var page = location.pathname.split('/')[1];
  if (page) {
    $('#nav .'+page).addClass('selected');
  }

  // Catalog
  var catalog = $('#catalog');
  if (catalog.length) {
    var featured =  catalog.find('.featured');
    var scroll = featured.find('.images')
    var images = scroll.find('li');
    var index = 0;

    featured.find('.left,.right').click(function(){
      var newIndex = index + (this.className === 'left' ? -1 : 1);
      var photo = images.eq(newIndex);
      if (!photo.length) return;

      index = newIndex;
      scroll.stop(true).animate({scrollLeft:index * 423/*photo.offset().left*/}, 1000);
    });
  }

  // Product
  var product = $('#product');
  if (product.length) {
    var photos = product.find('.photos');
    photos.find('.thumbs li').click(function(){
      var src = this.style.backgroundImage.replace(/url\("?|"?\)/g, '');
      product.find('img').attr('src', src);
    });
  }

})(jQuery);