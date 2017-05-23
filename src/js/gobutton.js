(function( $ ) {
	$.fn.gobutton = function(userSettings) {
		var settings;
		var options;
		var loaderImage;
		var wrap;

		loaderImage = $('<div><svg width="101px" height="101px" viewBox="1310 528 101 101" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="rotate"><desc>Created with Sketch.</desc><defs><linearGradient x1="69.3641269%" y1="96.8508376%" x2="60.2027223%" y2="81.443299%" id="gradient"><stop stop-color="#FFFFFF" offset="0%"></stop><stop stop-color="#FFFFFF" stop-opacity="0" offset="90%"></stop></linearGradient></defs><path d="M1368.7985,626.292822 C1391.63073,622.356234 1409,602.456522 1409,578.5 C1409,551.71419 1387.28581,530 1360.5,530 C1333.71419,530 1312,551.71419 1312,578.5 C1312,599.965964 1325.94552,618.174777 1345.27099,624.560849" id="oval" stroke="url(#gradient)" stroke-width="4" stroke-linecap="round" fill="none"></path></svg></div>');

		wrap = $('<div class="circle gobutton"><div class="loader"></div></div>');

		settings = $.extend({
			size: '100',
			color: '#25CED1',
			loaderGap: '6',
			loaderColor: '#25CED1',
			loaderWidth: '3',
			infiniteSpin: false,
			animationSpeed: 2.5,
			waves: true,
			classes: '',
			disable: false,
			onStop: null,
			onStart: null,
			onAnimationStop: null,
			onAnimationStart: null
		}, userSettings);

		options = {
			size: function(size) {
				size = {
					'width': size + 'px',
					'height': size + 'px'
				};
				this.$content_wrap.css(size);
				this.$content_button.css(size);
			},
			disable: function(flag) {
				this.$content_button[0].disabled = flag;
			},
			color: function(color) {
				this.$content_button.css({
					'background-color': color
				});
			},
			loaderGap: function(loaderGap) {
				this.$content_wrap.css('padding', loaderGap + 'px');
			},
			loaderColor: function(loaderColor) {
				this.$loader_img.find('#gradient stop').attr('stop-color', loaderColor);
				this.$content_loader.css({
					'background-image': 'url(data:image/svg+xml;base64,' + window.btoa(this.$loader_img.html()) + ')',
					'background-color': returnLoaderBackground(loaderColor)
				});
			},
			loaderWidth: function(loaderWidth) {
				this.$loader_img.find('#oval').attr('stroke-width', loaderWidth);
				this.$content_loader.css({
					'background-image': 'url(data:image/svg+xml;base64,' + window.btoa(this.$loader_img.html()) + ')'
				});
			},
			infiniteSpin: function(infiniteSpin) {
				this.animation.infiniteSpin = infiniteSpin;
			},
			animationSpeed: function(animationSpeed) {
				this.animation.speed = animationSpeed;
			},
			waves: function(waves) {
				if (waves) {
					this.$content_button[0].waveInd = -1;
					this.$content_button[0].addEventListener('mousedown', addWave);
					this.$content_button[0].addEventListener('mouseup', removeWaveOnMouseup);
					this.$content_button[0].addEventListener('animationend', removeWaveOnAnimationend);
				}
				else {
					delete this.$content_button[0].waveInd;
					this.$content_button[0].removeEventListener('mousedown', addWave);
					this.$content_button[0].removeEventListener('mouseup', removeWaveOnMouseup);
					this.$content_button[0].removeEventListener('animationend', removeWaveOnAnimationend);
				}
			},
			classes: function(classes) {
				this.$content_wrap.addClass(classes);
			},
			onStop: function(func) {
				this.onStop = func || pureFunc;
			},
			onStart: function(func) {
				this.onStart = func || pureFunc;
			},
			onAnimationStop: function(func) {
				this.onAnimationStop = func || pureFunc;
			},
			onAnimationStart: function(func) {
				this.onAnimationStart = func || pureFunc;
			}
		};

		return this.each(function() {
			if (this.tagName !== 'BUTTON') {
				return;
			}
			this.classList.add('main');
			this.classList.add('circle');
			
			var elem = $(this);
			var gobutton = this.gobutton = {};
			gobutton.$loader_img = loaderImage.clone();
			gobutton.$content_wrap = wrap.clone();

			elem.after(gobutton.$content_wrap);
			gobutton.$content_wrap.append(this);
			gobutton.$content_button = gobutton.$content_wrap.find('.main');
			gobutton.$content_loader = gobutton.$content_wrap.find('.loader');
			gobutton.animation = {
				speed: '',
				infiniteSpin: false
			};
			gobutton.start = function() {
				animationStart.call(gobutton);
			};

			gobutton.infiniteStart = function(speed) {
				animationInfiniteStart.call(gobutton, speed);
			};
			
			gobutton.stop = function() {
				animationStop.call(gobutton);
			};

			gobutton.changeOption = function(nameOrOptions, value) {
				if (nameOrOptions instanceof Object) {
					for (var option in nameOrOptions) {
						if (options.hasOwnProperty(option)) {
							options[option].call(gobutton, nameOrOptions[option]);
						}
					}
				}
				else if (typeof nameOrOptions === 'string')
				{
					options[nameOrOptions].call(gobutton, value);
				} 
			};

			gobutton.$content_button[0].addEventListener('mouseup',function(event) {
				if (event.button === 0) {
					runAnimation.call(gobutton);
				}
			});

			gobutton.$content_button[0].disabled = settings.disabled;

			gobutton.$content_loader[0].addEventListener('animationstart', function(event) {
				switch (event.animationName) {
					case 'spin':
						gobutton.onStart.call(gobutton);
						break;
					case 'stopspin':
						this.classList.remove('spin');
						break;
				}
				gobutton.onAnimationStart.call(gobutton, event);
			});
			gobutton.$content_loader[0].addEventListener('animationend', function(event) {
				gobutton.onAnimationStop.call(gobutton, event);
				if (event.animationName === 'stopspin' || event.animationName === 'stop') {
					this.classList.remove('spin');
					this.style.animation = '';
					gobutton.onStop.call(gobutton);
				}
			});

			for (var setting in settings) {
                if (options.hasOwnProperty(setting)) {
                    try {
                        options[setting].call(gobutton, settings[setting]);
                    } catch (e) {
                        console.error(e);
                    }
                }
            }

		});

		function addWave(event) {
			if (event.button === 0) {
				this.waveInd++;
				var shade = document.createElement('div');
				shade.classList.add('shade');
				shade.style.backgroundColor = calcShadeColor(window.getComputedStyle(this).backgroundColor);
				this.appendChild(shade);
			}
		}

		function removeWaveOnMouseup(event) {
			if (event.button !== 0) {
				return;
			}
			var shade = this.querySelectorAll('.shade')[this.waveInd];
			shade.mouseupEnd = true;
			if (shade.animationEnd) {
				shade.parentNode.removeChild(shade);
				this.waveInd--;
			}
		}

		function removeWaveOnAnimationend(event) {
			var shade = event.target;
			shade.animationEnd = true;
			if (shade.mouseupEnd) {
				shade.parentNode.removeChild(shade);
				this.waveInd--;
			}
		}

		function runAnimation() {
			if (!this.$content_loader[0].classList.contains('spin')) {
				animationStart.call(this);
			}
			else {
				animationStop.call(this);
			}
		}

		function animationStart() {
			this.$content_loader[0].classList.add('spin');
			this.$content_loader[0].classList.remove('stopspin');
			this.$content_loader[0].style.animation = returnAnimation.call(this);
		}

		function animationInfiniteStart(speed) {
			this.$content_loader[0].classList.add('spin');
			this.$content_loader[0].classList.remove('stopspin');
			this.$content_loader[0].style.animation = 'infinitespin ' + (speed || 0.12) + 's linear 0s infinite';
		}

		function animationStop() {
			this.$content_loader[0].classList.add('stopspin');
			this.$content_loader[0].classList.remove('spin');
			this.$content_loader[0].style.animation = 'stop 0.5s linear 0s 1';
		}

		function returnAnimation() {
			var animationSpeed = this.animation.speed;
			var infiniteSpin = this.animation.infiniteSpin;
			var infinitespinSpeed = ((animationSpeed * 2.5)/100);
			infinitespinSpeed = infinitespinSpeed < 0.12 ? 0.12 : infinitespinSpeed;
			var animations = {
				base: 'spin ' + animationSpeed + 's cubic-bezier(0.880, 0.160, 1.000, 0.985) 0.1s 1',
				stopWithDelay: ' stopspin 0.5s linear ' + animationSpeed + 's 1',
				infinite: ' infinitespin ' + infinitespinSpeed + 's linear ' + animationSpeed + 's infinite'
			};
			return animations.base + ', ' + (infiniteSpin ? animations.infinite : animations.stopWithDelay);
		}

		function returnLoaderBackground(loaderColor) {
				if (loaderColor.indexOf('rgba') !== -1) {
					var arr = loaderColor.split(',');
					arr[3] = '.2)';
					return arr.join(',');
				}
				else if (loaderColor.indexOf('rgb') !== -1) {
					return loaderColor.replace('(','a(').replace(')',',.2)');
				}
				else if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(loaderColor)){
					return hexToRgbA(normolizeHex(loaderColor), 0.2);
				}
				else {
					return 'rgba(0,0,0,0)';
				}
		}

		function hexToRgbA(hex, opacity){
		        var c = '0x' + hex;
		        return 'rgba(' + [(c>>16)&255, (c>>8)&255, c&255].join(',') + ',' + opacity + ')';
		}

		function calcShadeColor(buttonColor) {
			// if (buttonColor.indexOf('rgb') > -1) {
				var rgb = buttonColor.split(',');
				rgb[0] = rgb[0].split('(')[1];
				rgb.push(rgb.pop().split(')')[0]);
				return contrastColor(rgbToHex(parseInt(rgb[0],10),parseInt(rgb[1],10),parseInt(rgb[2],10)));
			// }
			// else if (buttonColor.indexOf('#') > -1) {
			// 	return contrastColor(normolizeHex(buttonColor));
			// }
		}

		function rgbToHex(r, g, b) {
			return ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
		}

		function normolizeHex(hex) {
			var c;
	        c = hex.substring(1).split('');
	        if (c.length === 3){
	            c = [c[0], c[0], c[1], c[1], c[2], c[2]];
	        }
	        return c.join('');
		}

		function  contrastColor(hexcolor) {
		    return (parseInt(hexcolor, 16) > 0xffffff/2) ? 'rgba(86, 77, 77, 0.3)':'rgba(214, 205, 205, 0.2)';
		}

		function pureFunc() {

		}

	}; 
}(jQuery));

















































