# GoButton
Usually, people don’t like to wait and do “nothing”. For make waiting time as pleasant or at least tolerable as possible, we are excited to introduce you our new plugin named GOBUTTON.

Gobutton it's jQuery plugin which adds animation to html button and make it round.

**Current version:** *1.0.0*
## Installation 
##### Standalon:
```html
<link rel="stylesheet" href="dist/css/gobutton.css" />

<script src="jquery.min.css"></script>
<script src="dist/js/gobutton.js"></script>
```
## How to use
```html
<button class="foo"><img src="https://image.svg" style="height: 100%;"></button>
<button>Some Text</button>

<script>
    $('button').gobutton(options);
</script>
```
##### As a result:
```html
<div class="circle gobutton" style="width: 100px; height: 100px; padding: 6px;">
    <div class="loader" style="background-image: url('data:image/svg+xml;base64...'); background-color: rgba(37, 206, 209, 0.2);"></div>
    <button class="foo main circle" style="width: 100px; height: 100px; background-color: rgb(37, 206, 209);">
        <img src="https://image.svg" style="height: 100%;">
    </button>
</div>

<div class="circle gobutton" style="width: 100px; height: 100px; padding: 6px;">
    <div class="loader" style="background-image: url('data:image/svg+xml;base64...'); background-color: rgba(37, 206, 209, 0.2);"></div>
    <button class="main circle" style="width: 100px; height: 100px; background-color: rgb(37, 206, 209);">
        Some Text
    </button>
</div>
```
### Configuration
<table width="100%">
	<tr>
		<th valign="top" width="120px" align="left">Setting</th>
		<th valign="top" align="left">Description</th>
		<th valign="top" width="60px" align="left">Type</th>
		<th valign="top" width="60px" align="left">Default</th>
	</tr>
    <tr>
		<td valign="top"><code>size</code></td>
		<td valign="top">
        	Button size in pixels
		</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>"100"</code></td>
	</tr>
    <tr>
		<td valign="top"><code>color</code></td>
		<td valign="top">
        	Button color in css supported formats (RGB, RGBA, HEX ect.).
		</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>"#25CED1"</code></td>
	</tr>
    <tr>
		<td valign="top"><code>loaderGap</code></td>
		<td valign="top">
        	Gap between loader and button in pixels.
		</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>"6"</code></td>
	</tr>
    <tr>
		<td valign="top"><code>loaderWidth</code></td>
		<td valign="top">
        	Loader width in pixels.
		</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>"3"</code></td>
	</tr>
    <tr>
		<td valign="top"><code>loaderColor</code></td>
		<td valign="top">
        	Loader color in RGB, RGBA or HEX format.
		</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>"#25CED1"</code></td>
	</tr>
    <tr>
		<td valign="top"><code>infiniteSpin</code></td>
		<td valign="top">
        	Infinite animation flag.
		</td>
		<td valign="top"><code>boolean</code></td>
		<td valign="top"><code>false</code></td>
	</tr>
    <tr>
		<td valign="top"><code>animationSpeed</code></td>
		<td valign="top">
        	The time of the initial animation in seconds. The total animation time varies depending on the "infiniteSpin" flag. If the animation is finite then its time is equal to: animationSpeed + 0.5s.
		</td>
		<td valign="top"><code>int</code></td>
		<td valign="top"><code>2.5</code></td>
	</tr>
    <tr>
		<td valign="top"><code>classes</code></td>
		<td valign="top">
        	Add classes to the wrapper element.
		</td>
		<td valign="top"><code>string</code></td>
		<td valign="top"><code>""</code></td>
	</tr>
    <tr>
		<td valign="top"><code>disable</code></td>
		<td valign="top">
        	Adds the "disabled" attribute to the button. (Similarly to the native way elem.disabled = true)
		</td>
		<td valign="top"><code>boolean</code></td>
		<td valign="top"><code>false</code></td>
	</tr>
    <tr>
    	<th valign="top" colspan="4" align="left">Callbacks</th>
    </tr>
    <tr>
		<td valign="top"><code>onStart()</code></td>
		<td valign="top">
        	An event that triggers when the animation starts.
		</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
    <tr>
		<td valign="top"><code>onStop()</code></td>
		<td valign="top">
        	An event that triggers after the download is completed.
		</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
    <tr>
		<td valign="top"><code>onAnimationStart(event)</code></td>
		<td valign="top">
        	An event that triggers after the start of each animation (see the list of animations). The parameters - animation event.
		</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
    <tr>
		<td valign="top"><code>onAnimationStop(event)</code></td>
		<td valign="top">
        	An event that triggers after the end of each animation (see the list of animations). The parameters - animation event.
		</td>
		<td valign="top"><code>function</code></td>
		<td valign="top"><code>null</code></td>
	</tr>
</table>

##### Animations list
* *spin* - the main animation of the unwinding of the loader
* *infinitespin* - run after *spin*. Animation of infinite rotation, it works if the flag was set.
* *stopspoin* - run after *spin*. Animation stops rotation, it works depending on the set flag of infinite animation.
* *stop* - the rotation stop animation is triggered by a second press of the button or stopping via the stop method.

##### Methods
Available via gobutton object:
```javascript
var gobutton = $('#gobutton').gobutton(options)[0].gobutton;
gobutton.start();
```
or
```javascript
var button = document.getElementById('gobutton');
$(button).gobutton(options);
button.gobutton.start();
```
<table width="100%">
    <tr>
		<th valign="top" width="120px" align="left">Name</th>
		<th valign="top" align="left">Description</th>
	</tr>
    <tr>
		<td valign="top"><code>start()</code></td>
		<td valign="top">
        	Method which run animation.
		</td>
	</tr>
    <tr>
		<td valign="top"><code>stop()</code></td>
		<td valign="top">
        	Method which run stop animation.
		</td>
	</tr>
    <tr>
		<td valign="top"><code>infiniteStart(speed)</code></td>
		<td valign="top">
        	Run infinite roatation animation. In parametr get time of one spin in seconds.
		</td>
	</tr>
    <tr>
		<td valign="top"><code>changeOption(nameOrOptions, valueOrNothing || {})</code></td>
		<td valign="top">
        	Change one of options. In parametr get option name and value, or options object.
		</td>
	</tr>
</table>

## Examples 
##### [Base usage](examples/base usage/base_usage.html)
```html
    <button>GO</button>
    <script type="text/javascript">
        $('button').gobutton();
    </script>
```
![Preview](examples/base usage/base_usage.gif)
##### <a href="examples/custom size with infinite spin/custom_size_with_infinite_spin.html" target="_blank">Custom size with infinite spin</a>
```html
    <button>GO</button>
    <script type="text/javascript">
        $('button').gobutton({
            size: 150,
            loaderGap: '20',
            loaderWidth: '3',
            loaderColor: 'rgb(255,0,0)',
            infiniteSpin: true
         });
    </script>
```
![Preview](examples/custom size with infinite spin/custome_size.gif)

## Troubleshooting
Problems? Check the [Issues](issues) block 
to find the solution or create an new issue that we will fix asap. Feel free to contribute.
## Author
This jQuery plugin is open-sourced by [Agilie Team](https://www.agilie.com) ([info@agilie.com](mailto:info@agilie.com))
## Contributor
[Bohdan Zolotukhyn](https://github.com/fargo23) ([bohdan.zolotukhin@agilie.com](mailto:bohdan.zolotukhin@agilie.com))
## License
The [MIT](LICENSE.md) License (MIT) Copyright © 2017 [Agilie Team](https://www.agilie.com)