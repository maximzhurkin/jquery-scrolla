# jQuery Scrolla
Simple jQuery plugin for reveal animations when scrolling

[Examples](https://maximzhurkin.github.io/jquery-scrolla/)

## Getting Started
<<<<<<< HEAD
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
=======
### 1. Include [animate.css](http://daneden.github.io/animate.css/)
```html
<head>
  <link rel="stylesheet" href="animate.min.css">
</head>
```
### 2. Include [jQuery](https://jquery.com/) and Scrolla
```html
<script src="jquery.min.js"></script>
<script src="scrolla.jquery.min.js"></script>
```
### 3. Add data attributes
```html
<div class="animate" data-animate="rubberBand" data-duration="1.0s" data-delay="0.1s" data-iteration="1">animate div</div>
```
### 4. Call Scrolla
```javascript
$('.animate').scrolla();
```
## JavaScript Options
```javascript
$('.animate').scrolla({
    mobile: false, // disable animation on mobiles 
    once: false // only once animation play on scroll
});
```
>>>>>>> 620e4a6d6ff1343c1d98430418dce583ad9a991c
