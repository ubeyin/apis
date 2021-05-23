# changelogs

Version 1.0.0# 
Changelog All notable changes to this project will be documented in this file. 
The format is based on [Slize Changelog](https://keepachangelog.com/en/1.0.0/), and this 
project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html). 

## [Released] 
## [1.0] - 2021-05-20
### Created - [@1.0](https://github.com/ubeyin/1.0/)
- Scope: scope the data of elements- ```<element> Hi {{name}}! </element>```  ```object = { name: "jayed" }``` ```$( "element" ).scope( object:scope )```
- Slideshow: slide all elements-  ```$( "elements" ).slide( number:milliseconds )```
- Cursor: add text on cursor- ```$( "element" ).cursor( string:text )```
- Vurl: set input value from url- ```$( "input" ).vurl( string:name )```
- Gps: get location latitude and longitude- ```$( ).gps( function(lat, lon, response):load, function(status):catch )```
- Fetch: fetch url with xhr- ```$( "url" ).fetch( function(value, response):load, function(status):catch )```
- Include: fetch url and include in element- ```<div my-attr="/test.html"> Loading </div>``` ```$( "my-attr" ).include()```
- Copy: copy text to clipboard, works only event- ```btn.onclick = function(){  $( "input" ).copy()```
- Download: download url-object- ```$( "Blank document" ).download( string:title, string:format )``` ```format: text/html and more```
- Share: share text to social media- ```$( "url" ).share( string:title, string:fullName )```

## [Versions]
 [1.0.0] : [https://github.com/ubeyin/slize/1.0/slize](https://github.com/ubeyin/slize/1.0/slize)

