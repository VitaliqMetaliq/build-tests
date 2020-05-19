import $ from 'jquery';

(function() {


    var loadImage = function($image, src, callback) {
        $image.bind("load", function(evt) {
            $image.unbind("load");
            callback($image);
        }).each(function () {
            if($image[0].complete) {
                $image.trigger("load");
            }
        });
        // if($.browser.webkit) {
        //     $image.attr('src', '');
        // }
        $image.attr('src', src);
    }
    
    var createItem = function($image, angle, options) {
        var loaded = false,
            orgWidth, orgHeight, $originDiv, 
            sizeRange = (1 - options.minScale) * 0.5,
            that;
        $image.css({
            opacity: 0, 
            position: 'absolute' 
        });
        $originDiv = $image.wrap('<div style="position:absolute;">').parent();
        that = {
            update: function(ang) {
                var sinVal, scale, x, y;
                ang += angle; 
    
                sinVal = Math.sin(ang);
                scale = ((sinVal + 1) * sizeRange) + options.minScale;
    
                x = ((Math.cos(ang) * options.radiusX) * scale) + 
                                    options.width / 2;
                y = ((sinVal * options.radiusY) * scale) + options.height / 2;
                $originDiv.css({
                    left: (x >> 0) + 'px', 
                    top: (y >> 0) + 'px', 
                    'z-index': (scale * 100) >> 0
                });
                if(loaded) {
                    $image.css({
                        width: (orgWidth * scale) + 'px',
                        height: (orgHeight * scale) + 'px', 
                        top: ((-orgHeight * scale) / 2) + 'px', 
                        left: ((-orgWidth * scale) / 2) + 'px'
                    });
                }
            }
        }; 
    
        loadImage($image, $image.attr('src'), function($image) {
            loaded = true; 
            orgWidth = $image.width();
            orgHeight = $image.height();
            $image.animate({
                opacity: 1
            }, 1000);
        });
        return that;
    };
    
    var createCarousel = function($wrap, options) {
        var items = [], 
            rot = 0, pause = false, 
            rotAmount = (Math.PI * 2) * (options.frameRate / options.rotRate), 
            $images = $('img', $wrap), 
            spacing = (Math.PI / $images.length) * 2, 
            angle = Math.PI / 2, 
            i;
        // $wrap.bind('mouseover mouseout', function(evt) { 
        //     if(!$(evt.target).is('img')) {
        //         return;
        //     }
        //     if(evt.type === 'mouseover') {
        //         clearTimeout(unpauseTimeout);
        //         pause = true;
        //     } else {
        //         unpauseTimeout = setTimeout(function() {
        //             pause = false;
        //         }, 200);
        //     }
        // });
    
        for(i = 0; i < $images.length; i++) {
            var image = $images[i]; 
            var item = createItem($(image), angle, options);
            items.push(item);
            angle += spacing;
        }
    
        setInterval(function() { 
            if(!pause) {
                rot += rotAmount;
            }
            for(i = 0; i < items.length; i++) {
                items[i].update(rot);
            }
        }, options.frameRate);
    };
    
    $.fn.Carousel = function(options) {
        this.each(function() {
            options = $.extend({}, $.fn.Carousel.defaults, options);
            $(this).css({
                position: 'relative', 
                width: options.width + 'px', 
                height: options.height + 'px'
            });
            createCarousel($(this), options);
        });
    };
    
    $.fn.Carousel.defaults = {
        radiusX: 230, 
        radiusY: 80, 
        width: 700, 
        height: 500, 
        frameRate: 10, 
        rotRate: 20000, 
        minScale: 0.60
    };
    })($)
    
    // $(function() {
    //     $('.carousel').Carousel({
    //         width: 700, height: 500,
    //         radiusX: 400, radiusY: 70, //radiusX: 220, radiusY: 70 
    //         minScale: 0.6
    //     });
    // })