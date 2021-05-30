$(document).ready(function() {
  /*
  // Day 5
  console.log($('p'));
  console.log($('#menu-top'));
  console.log($('form'));
  console.log($('h1.page-title'));
  console.log($('h1, h2, h3, h4, h5, h6'));
  console.log($('#menu-top a'));
  console.log($('article'));
  $('a').css('color', 'red');
  $('p').first().hide();
  $('.entry-header').css('font-size', '24pt');
  $('input[name="s"]').val('raspberries');
  */

  // Day 6
  $('p').first().on('click', function(event) {
    event.target.remove();
  });
  $('input[name="s"]').on('keyup', function(event) {
    $('h1.page-title').text($(event.target).val());
  });
  $('.entry-title').on('mouseenter', function(event) {
    $(event.target).closest('article').css('background-color', 'green');
  });

  $('article').on('mouseleave', function(event) {
    $(event.currentTarget).css('background-color', '');
  });
  $('body').on('mouseenter', '.entry-title', function(event) {
    var $article = $(event.currentTarget);
    $article.css('background-color', '');
  });

  $('div#content-wrapper').on('click', '.entry-title', function(event) {
    event.preventDefault();
    var $article = $(event.currentTarget).closest('article');
    $article.remove();
    $('hr').after(article);
  });

  $('input[name="s"]').on('keyup', function(event) {
    event.preventDefault();

    if (event.which === 13) {
      var $p = $('<p class="input-par"></p>');
      $p.text($'input[name="s"]').val());
      $('h1.page-title').after($p);
    }
  })
  $('body').on('click', 'p.input-par', function(event) {
    var $p = $(event.currentTarget);
    $p.remove();
  })

  var $links = $('.links > li').toArray();

  for (var i = $links.length - 1; i >= 0; i--) {
    $('.links').append($links[i]);
  }
});
