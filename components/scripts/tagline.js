var $, fill;

$ = require('jquery');

(fill = function(item) {
  return $('.tagline').append("" + item);
})('A few of the most fascinating, brilliant, stupendously creative minds in Art');

fill;
