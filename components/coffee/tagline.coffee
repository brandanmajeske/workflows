$ = require 'jquery'

do fill = (item = 'A few of the most fascinating, brilliant, stupendously creative minds in Art') ->
  $('.tagline').append "#{item}"
fill
