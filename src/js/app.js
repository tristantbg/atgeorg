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
    $root = '/ateliergeorges/';
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
                app.sizeSet();
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
                document.addEventListener('lazybeforeunveil', function(e) {
                    if ($.fn.fullpage && !isMobile) {
                        setTimeout($.fn.fullpage.reBuild, 100);
                    }
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
            if (width <= 1024) isMobile = true;
            if (isMobile) {
                if (width >= 1024) {
                    location.reload();
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
                if (!this.parentNode.classList.contains('disabled')) {
                    app.loadPage(this);
                }
            });
            $("#page-panel-close").click(function(event) {
                app.quitProjectMode();
            });
            $("[data-filter]").click(function(event) {
                var filter = this.getAttribute('data-filter');
                var elems = $(this).parents('section').find(".project-item");
                elems.removeClass('disabled');
                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                } else {
                    $("[data-filter]").removeClass('active');
                    this.classList.add('active');
                    elems.not('.filter-' + filter).addClass('disabled');
                }
            });
            $("section[data-type='projects'] .project-item a").bind('touchstart', function(event) {
                $(this).find('.project-infos')[0].style.opacity = 1;
            }).bind('touchend', function(event) {
                $(this).find('.project-infos')[0].style.opacity = 0;
            });
        },
        hashNavigate: function() {
            // ?section=projects&project=friche-militaire
            var hash = getAllUrlParams(window.location.href);
            if (hash.section && hash.project) {
                $.fn.fullpage.moveTo(hash.section);
                setTimeout(function() {
                    $("[data-id='" + hash.project + "']").trigger('click');
                }, 300);
            }
        },
        loadPage: function(target) {
            var url = target.getAttribute("href");
            $.ajax({
                url: url,
                cache: true
            }).done(function(response) {
                var content = $(response).find("#page-panel").html();
                var id = target.getAttribute("data-id");
                var parent = target.getAttribute("data-parent");
                $("#page-panel").html(content);
                if (window.history) history.pushState(null, window.location.title, window.location.origin + $root + parent + '/' + id + '/?section=' + parent + '&project=' + id);
                setTimeout(function() {
                    app.toggleProjectMode(true);
                    app.interactEmbed();
                }, 100);
            });
        },
        interactEmbed: function() {
            var pluginEmbedLoadLazyVideo = function() {
                var wrapper = this.parentNode;
                var embed = wrapper.children[0];
                embed.src = embed.dataset.src;
                this.remove();
            };
            var thumb = document.getElementsByClassName('embed__thumb');
            for (var i = 0; i < thumb.length; i++) {
                thumb[i].addEventListener('click', pluginEmbedLoadLazyVideo, false);
            }
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
        quitProjectMode: function() {
            $body.removeClass('page-panel project-panel');
            $body[0].style.overflow = "initial";
            setTimeout(function() {
                if (!isMobile) $.fn.fullpage.setAutoScrolling(true);
            }, 700);
            $('.fp-scrollable').each(function(index, el) {
                $(this).data('iscrollInstance').enable();
            });
            var hash = getAllUrlParams(window.location.href);
            if (hash.section && window.history) history.pushState(null, window.location.title, window.location.origin + $root + "#" + hash.section);
            setTimeout(function() {
                $("#page-panel").empty();
            }, 600);
        },
        toggleProjectMode: function(forceOpen) {
            if (!forceOpen && $body.hasClass('page-panel')) {
                app.quitProjectMode();
            } else {
                $body.addClass('page-panel project-panel');
                if (!isMobile) $.fn.fullpage.setAutoScrolling(false);
                $body[0].style.overflow = "hidden";
                $('.fp-scrollable').each(function(index, el) {
                    $(this).data('iscrollInstance').disable();
                });
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
                        <img class="lazy lazyload lazypreload" data-src="{{image}}" width="100%">\
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
                        if ($.fn.fullpage && !isMobile) {
                            setTimeout($.fn.fullpage.reBuild, 50);
                        }
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
                scrollOverflow: !isMobile,
                scrollOverflowReset: false,
                scrollOverflowOptions: null,
                touchSensitivity: 15,
                normalScrollElementTouchThreshold: 5,
                bigSectionsDestination: top,
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
                    setTimeout(app.hashNavigate, 600);
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