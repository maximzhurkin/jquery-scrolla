# jQuery Scrolla
Simple jQuery plugin for reveal animations when scrolling

[Examples](https://maximzhurkin.github.io/jquery-scrolla/)

## Getting Started
### Include [animate.css](http://daneden.github.io/animate.css/)
```html
<head>
  <link rel="stylesheet" href="animate.min.css">
</head>
```
### Include jQuery and jquery-scrolla
```html
<script src="jquery.min.js"></script>
<script src="/dist/js/jquery-scrolla.min.js"></script>
```
### Add html
```html
<div 
  class="box" 
  data-animate="bounceIn" 
  data-duration="1s" 
  data-delay="0.5s" 
  data-offset="100" 
  data-iteration="1">
</div>
```
### Initialize plugin
```javascript
$(document).ready(function(){
  $('.box').scrolla();
});
```
### Custom settings
```javascript
$('.box').scrolla({
  // default
  mobile: false, // disable animation on mobiles
  once: false, // only once animation play on scroll
  animateCssVersion: 4 // used animate.css version (3 or 4)
});
```
