/* globals $:false */
var width = $(window).width(),
    height = $(window).height(),
    isMobile = false,
    target,
    lastTarget = false,
    $mouseNav,
    $root = '/';
$(function() {
    var app = {
        init: function() {
            console.log('Code by Tristan Bagot', 'www.tristanbagot.com');
            $(window).resize(function(event) {
                app.sizeSet();
            });
            $(document).ready(function($) {
                $body = $('body');
                $container = $('#container');
                app.interact();
                app.smoothState('#main', $container);
                // window.viewportUnitsBuggyfill.init();
                $(document).keyup(function(e) {
                    //esc
                    if (e.keyCode === 27) app.goBack();
                    if ($slider && e.keyCode === 39) $slider.flickity('next');
                    if ($slider && e.keyCode === 37) $slider.flickity('previous');
                });
                $(window).load(function() {
                    $(".loader").hide();
                });
            });
        },
        sizeSet: function() {
            width = $(window).width();
            height = $(window).height();
            if (width <= 770) isMobile = true;
            if (isMobile) {
                if (width >= 770) {
                    //location.reload();
                    isMobile = false;
                }
            }
        },
        interact: function() {
            app.loadSlider();
        },
        loadSlider: function(hasVideos) {
            $slider = false;
            $slider = $('.slider').flickity({
                cellSelector: '.slide',
                imagesLoaded: true,
                lazyLoad: 2,
                setGallerySize: false,
                accessibility: false,
                wrapAround: true,
                prevNextButtons: !isMobile,
                pageDots: false,
                draggable: isMobile,
                dragThreshold: 20
            });
            $mouseNav = $('#mouse-nav');
            app.mouseNav();
            if ($slider.length > 0) {
                $slider.flkty = $slider.data('flickity');
                $slider.count = $slider.flkty.slides.length;
                if ($slider.flkty && $slider.count > 0) {
                    $slider.attr("data-media", $slider.flkty.selectedElement.getAttribute("data-media"));
                    $slider.on('select.flickity', function() {
                        $('#slide-number').html(($slider.flkty.selectedIndex + 1) + '/' + $slider.count);
                        $slider.attr("data-media", $slider.flkty.selectedElement.getAttribute("data-media"));
                    });
                    $slider.on('staticClick.flickity', function(event, pointer, cellElement, cellIndex) {
                        if (!cellElement || !isMobile) {
                            return;
                        } else {
                            $slider.flickity('next');
                        }
                    });
                    // For lazysizes
                    // $slider.on('select.flickity', function() {
                    // var adjCellElems = $slider.flickity('getAdjacentCellElements', 2);
                    // $(adjCellElems).find('.lazyimg:not(".lazyloaded")').addClass('lazyload');
                    // });
                    if (hasVideos) {
                        var vids = $(".slider video");
                        $.each(vids, function() {
                            this.controls = false;
                        });
                        app.plyr();
                        if (vids.length > 0) {
                            $slider.on('select.flickity', function() {
                                $.each(vids, function() {
                                    this.pause();
                                });
                                $slider.removeClass('play pause');
                            });
                            if ($slider.flkty.selectedElement.getAttribute("data-media") == "video") {
                                vids[0].play();
                            }
                        } else if ($slider.count < 2) {
                            $mouseNav.hide();
                            $slider.css('cursor', 'auto');
                        }
                    }
                }
            }
        },
        mouseNav: function() {
            $slider.mousemove(function(event) {
                var x = event.pageX;
                var y = event.pageY;
                if (x < width / 2) {
                    $slider.removeClass('right').addClass('left');
                } else {
                    $slider.removeClass('left').addClass('right');
                }
                if (this.getAttribute("data-media") === "video" && $slider.count > 1) {
                    if (x < 0.15 * width || x > 0.85 * width) {
                        $slider.addClass('nav-hover');
                    } else {
                        $slider.removeClass('nav-hover');
                    }
                }
                $mouseNav.css({
                    transform: "translate(" + x + "px, " + (y - $(window).scrollTop()) + "px) translateZ(0)"
                });
            });
        },
        goIndex: function() {},
        goBack: function() {
            if (window.history && history.length > 0 && !$body.hasClass('projects')) {
                window.history.go(-1);
            } else {
                $('#site-title a').click();
            }
        },
        smoothState: function(container, $target) {
            var options = {
                    debug: true,
                    scroll: false,
                    anchors: '[data-target]',
                    loadingClass: 'is-loading',
                    prefetch: true,
                    cacheLength: 4,
                    onAction: function($currentTarget, $container) {
                        lastTarget = target;
                        target = $currentTarget.data('target');
                        if (target === "back") app.goBack();
                        // console.log(lastTarget);
                    },
                    onBefore: function(request, $container) {
                        popstate = request.url.replace(/\/$/, '').replace(window.location.origin + $root, '');
                        // console.log(popstate);
                    },
                    onStart: {
                        duration: 0, // Duration of our animation
                        render: function($container) {
                            $body.addClass('is-loading');
                        }
                    },
                    onReady: {
                        duration: 0,
                        render: function($container, $newContent) {
                            // Inject the new content
                            $(window).scrollTop(0);
                            $container.html($newContent);
                        }
                    },
                    onAfter: function($container, $newContent) {
                        app.interact();
                        setTimeout(function() {
                            $body.removeClass('is-loading');
                            // Clear cache for random content
                            // smoothState.clear();
                        }, 200);
                    }
                },
                smoothState = $(container).smoothState(options).data('smoothState');
        }
    };
    app.init();
});