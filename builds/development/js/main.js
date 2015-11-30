(function(){
  alert("Hello from somefile!")
})();

var fill;

(fill = function(item) {
  return $('.tagline').append("" + item);
})('The most creative minds in Art');

fill;

$(function(){
  var Mustache = require('mustache');

  $.getJSON('js/data.json', function(data){
    var template = $('#speakerstpl').html();
    var html = Mustache.to_html(template, data);
    $('#speakers').html(html);
  });
});
