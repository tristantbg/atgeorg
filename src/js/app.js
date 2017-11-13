/* globals $:false */
var width = $(window).width(),
    height = $(window).height(),
    isMobile = false,
    $body,
    $menu,
    $header,
    $siteTitle,
    target,
    $slider,
    lastTarget = false,
    $mouseNav,
    $root = '/';
$(function() {
    var app = {
        init: function() {
            console.log('DESIGN + CODE by HTTB', 'www.httb.eu');
            $(window).resize(function(event) {
                app.sizeSet();
            });
            $(document).ready(function($) {
                $body = $('body');
                $siteTitle = $("#site-title");
                $header = $("header");
                $menu = $("#menu");
                $container = $('#container');
                app.interact();
                // app.smoothState('#main', $container);
                // window.viewportUnitsBuggyfill.init();
                $(document).keyup(function(e) {
                    //esc
                    if (e.keyCode === 27) app.goBack();
                    if ($slider && e.keyCode === 39) $slider.flickity('next');
                    if ($slider && e.keyCode === 37) $slider.flickity('previous');
                });
                $(window).load(function() {
                    app.sizeSet();
                    $(".loader").hide();
                });
            });
        },
        sizeSet: function() {
            width = $(window).width();
            height = $(window).height();
            $("#site-title, .section-title").each(function(index, el) {
                el.setAttribute('style', '');
                if (el.classList.contains('hidden')) {
                    el.classList.remove('hidden');
                    el.style.width = $(el).width() + 'px';
                    el.classList.add('hidden');
                } else {
                    el.style.width = $(el).width() + 'px';
                }
            });
            if (width <= 770) isMobile = true;
            if (isMobile) {
                if (width >= 770) {
                    //location.reload();
                    isMobile = false;
                }
            }
        },
        interact: function() {
            //app.loadSlider();
            app.fullPage();
            app.juicerFeed();
            app.peopleAccordion();
            $header.click(function(event) {
                app.toggleMenu();
            });
            $("[data-menuanchor]").click(function(event) {
                setTimeout(app.toggleMenu, 1000);
            });
            $("[data-type='landing']").click(function(event) {
                $.fn.fullpage.moveSectionDown();
            });
        },
        toggleMenu: function() {
            if ($body.hasClass('menu-visible')) {
                $body.removeClass('menu-visible');
                $container.add($header).attr('style', '');
            } else {
                $body.toggleClass('menu-visible');
                $container.add($header).css('transform', 'translateX(' + $menu.outerWidth() + 'px) translateZ(0)');
            }
        },
        juicerFeed: function() {
            if (feedId) {
                var templates = {
                  Default: '\
                    <a href="{{full_url}}" target="_blank" class="post"> \
                      {{poster_name}}<br>\
                      <img src="{{image}}" />\
                    </a>'
                };
                var juicer = juicerjs({
                    feed: feedId,
                    templates: templates,
                    human_time: {
                        day: ['Jour', 'Jours'],
                        hour: ['Heure', 'Heures'],
                        minute: ['Minute', 'Minutes'],
                        second: ['Seconde', 'Secondes']
                    },
                    onSuccess: function(newPosts) {
                        // callback
                        $('#feed').append(newPosts);
                    }
                });
                juicer.load();
            }
        },
        peopleAccordion: function() {
            $(".people").click(function(event) {
                if (!this.classList.contains('open')) {
                    $('.people').removeClass('open');
                    $('.people-text').slideUp(600, 'easeInOutExpo');
                    $(this).toggleClass('open').find('.people-text').slideToggle(600, 'easeInOutExpo');
                } else {
                    $(this).removeClass('open').find('.people-text').slideUp(600, 'easeInOutExpo');
                }
            });
        },
        fullPage: function() {
            function animTitle(loadedSection) {
                $(".section-title").addClass('hidden');
                $(".section-title[data-id='" + loadedSection.data('title') + "']").removeClass('hidden');
                if (loadedSection.attr('hide-title')) {
                    $siteTitle.addClass('hidden');
                } else {
                    $siteTitle.removeClass('hidden');
                }
                if (loadedSection.attr('question')) {
                    $("#question-mark").removeClass('hidden');
                } else {
                    $("#question-mark").addClass('hidden');
                }
            }
            test = true;
            $('#sections').fullpage({
                menu: '#menu',
                //Design
                controlArrows: false,
                verticalCentered: false,
                responsiveWidth: 1024,
                responsiveHeight: 0,
                responsiveSlides: false,
                //Scrolling
                animateAnchor: false,
                css3: true,
                scrollingSpeed: 1000,
                autoScrolling: test,
                fitToSection: test,
                scrollBar: false,
                easing: 'easeInOutCubic',
                easingcss3: 'ease',
                loopBottom: false,
                loopTop: false,
                loopHorizontal: true,
                continuousVertical: false,
                continuousHorizontal: false,
                scrollHorizontally: false,
                interlockedSlides: false,
                dragAndMove: false,
                offsetSections: false,
                resetSliders: false,
                fadingEffect: false,
                normalScrollElements: '#element1, .element2',
                scrollOverflow: test,
                scrollOverflowReset: false,
                scrollOverflowOptions: null,
                touchSensitivity: 15,
                normalScrollElementTouchThreshold: 5,
                bigSectionsDestination: null,
                //Custom selectors
                sectionSelector: 'section',
                slideSelector: '.slide',
                lazyLoading: false,
                //events
                onLeave: function(index, nextIndex, direction) {
                    var loadedSection = $('section').eq(nextIndex - 1);
                    animTitle(loadedSection);
                },
                afterLoad: function(anchorLink, index) {
                    var loadedSection = $(this);
                    animTitle(loadedSection);
                },
                afterRender: function() {},
                afterResize: function() {},
                afterResponsive: function(isResponsive) {},
                afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {},
                onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex) {}
            });
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