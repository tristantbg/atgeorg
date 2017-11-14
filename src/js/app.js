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
                $(document).keyup(function(e) {
                    //esc
                    if (e.keyCode === 27) app.goBack();
                    // if ($slider && e.keyCode === 39);
                    // if ($slider && e.keyCode === 37);
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
                el.removeAttribute('style');
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
            $header.css('transition', 'none');
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
            $(".project-link, [data-target]").click(function(event) {
                event.preventDefault();
                app.loadPage(this);
            });
            $("#page-panel-close").click(function(event) {
                $body.removeClass('page-panel');
            });
        },
        loadPage: function(target) {
            var url = target.getAttribute("href");
            $.ajax({
                url: url,
                cache: true
            }).done(function(response) {
                var content = $(response).find("#page-panel").html();
                $("#page-panel").html(content);
                history.pushState(null, window.title, url);
                setTimeout(function() {
                    app.toggleProjectMode(true);
                }, 100);
            });
        },
        toggleMenu: function(forceOpen) {
            if (!forceOpen && $body.hasClass('menu-visible')) {
                $body.removeClass('menu-visible');
                $container.add($header).removeAttr('style');
            } else {
                $body.addClass('menu-visible');
                $container.add($header).css('transform', 'translateX(' + $menu.outerWidth() + 'px) translateZ(0)');
            }
        },
        toggleProjectMode: function(forceOpen) {
            if (!forceOpen && $body.hasClass('page-panel')) {
                $body.removeClass('page-panel');
            } else {
                $body.addClass('page-panel');
            }
        },
        juicerFeed: function() {
            if (feedId) {
                var loading = document.getElementById("load-more-news");
                if (!loading) return;
                loading.savedText = loading.innerHTML;
                var templates = {
                    Default: '\
                    <div class="news-item">\
                      <a href="{{full_url}}" target="_blank" rel="noopener nofollow">\
                        <h4>{{source_source}} il y a {{human_time_diff}} {{human_likes_and_comments}}</h4>\
                      </a>\
                      <div class="message">{{message}}</div>\
                      <a href="{{full_url}}" target="_blank" rel="noopener nofollow">\
                        <img src="{{image}}" width="100%">\
                      </a>\
                    </div>',
                };
                var juicer = juicerjs({
                    feed: feedId,
                    limit: 5,
                    templates: templates,
                    human_time: {
                        day: ['jour', 'jours'],
                        hour: ['heure', 'heures'],
                        minute: ['minute', 'minutes'],
                        second: ['seconde', 'secondes']
                    },
                    human_words: {
                        comment: ['commentaire', 'commentaires'],
                        like: ['like', 'likes']
                    },
                    human_divider: 'et',
                    onSuccess: function(newPosts) {
                        // callback
                        loading.innerHTML = loading.savedText;
                        $('#feed').append(newPosts);
                        setTimeout($.fn.fullpage.reBuild, 50);
                    }
                });
                juicer.load();
                $(loading).click(function(event) {
                    juicer.more();
                    this.innerHTML = "[chargement…]";
                });
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
                autoScrolling: true,
                fitToSection: true,
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
                scrollOverflow: true,
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
                afterRender: function() {
                    setTimeout(function() {
                        $header.removeAttr('style');
                    }, 300);
                },
                afterResize: function() {},
                afterResponsive: function(isResponsive) {},
                afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex) {},
                onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex) {}
            });
        }
    };
    app.init();
});