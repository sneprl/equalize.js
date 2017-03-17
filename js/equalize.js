/**
 * @preserve
 * equalize.js
 * Dual MIT & GPL license
 *
 * Repo: https://github.com/Etiqa/equalize.js.git
 *
 * The jQuery plugin for equalizing the height or width of elements.
 *
 * Equalize will accept any of the jQuery Dimension methods:
 *   height, outerHeight, innerHeight,
 *   width, outerWidth, innerWidth.
 *
 * EXAMPLE
 * $('.parent').equalize(); // defaults to 'height'
 * $('.parent').equalize('width'); // equalize the widths
 *
 * ADVANCED EXAMPLES
 * Get the minimum max dimension by removing the existing height/width
 * $('.parent').equalize({reset: true}); // equalize height by default, remove existing height, then determin max
 * $('.parent').equalize({equalize: 'width', reset: true}); // equalize width, remove existing width, then determin max
 * $('.parent').equalize({checkPageResize: true}); // equalize on resize
 *
 * MULTI-ELEMENT EXAMPLE
 * Equalize elements
 * $('.elements').equalize();
 *
 * Equalize internal child elements
 * From @larsbo : http://jsfiddle.net/4QTNP/3/
 * $('.parent').equalize({children: 'p'}); // equalize height of paragraphs within .parent
 */
;(function($) {
    $.fn.equalize = function(options) {
        var $containers = this, // this is the jQuery object
            children = false,
            reset = false,
            checkPageResize = false,
            equalize, type, $elements;

        function alignElements ($elements) {
            var max = 0;

            $elements.each(function() {
                var $element = $(this),
                    value;
                if (reset) { $element.css(type, ''); } // remove existing height/width dimension
                value = $element[equalize]();          // call height(), outerHeight(), etc.
                if (value > max) { max = value; }      // update max
            });

            $elements.css(type, 'auto');
            $elements.css(type, max +'px'); // add CSS to children
        }

        // when options are an object
        if ($.isPlainObject(options)) {
            equalize = options.equalize || 'height';
            children = options.children || false;
            reset    = options.reset || false;
            checkPageResize    = options.checkPageResize || false;
        } else { // otherwise, a string was passed in or default to height
            equalize = options || 'height';
        }

        if (!$.isFunction($.fn[equalize])) { return false; }

        // determine if the height or width is being equalized
        type = (equalize.indexOf('height') !== -1) ? 'height' : 'width';

        if ($containers.toArray().length > 1) {
            $elements = $containers;
        } else {
            return $containers.each(function() {
                // when children exist, equalize the passed in child elements, otherwise equalize the children
                $elements = (children) ? $(this).find(children) : $(this).children();
            });
        }
        alignElements($elements);

        if (checkPageResize) {
            function onResize () {
                alignElements($elements);
            }

            $(window).resize(onResize);
        }

        return this;
    };

}(jQuery));
