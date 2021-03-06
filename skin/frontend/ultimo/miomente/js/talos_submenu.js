// Talos - Animated Horizontal Submenu (jQuery Plugin) v1.0
(function(a) {
    var e = {
        mouseHover: !0,
        submenuStayOpen: !0,
        animation: "1",
        responsive: !0,
        menuHeadline: "Menu"
    };
    a.fn.talos_submenu = function(f) {
        function l() {
            function e() {
                menuItem.hover(function() {
                    a(this).addClass("current");
                    menuItemActive.removeClass("current")
                }, function() {
                    a(this).removeClass("current");
                    menuItemActive.addClass("current")
                })
            }

            function d() {
                menuLink.on("click", function(h) {
                    var b = a(this);
                    //1 == b.siblings().length && h.preventDefault();
                    b.parent().addClass("current").siblings().removeClass("current")
                })
            }

            function f() {
                menuItem.on("mouseover", function() {
                    a(this).addClass("current").siblings().removeClass("current")
                })
            }

            function n(b) {
                a(window).resize(function() {
                    b()
                }).trigger("resize")
            }

            function l() {
                var h = c.children("ul"),
                    m = h.find("ul"),
                    e = c.children(".social"),
                    f = {
                        display: "none"
                    },
                    d = {
                        display: "block"
                    },
                    k = a("<div/>", {
                        "class": "navigation-menu"
                    }).prependTo(c),
                    g = a("<div/>", {
                        "class": "show-menu"
                    });
                a("<h2/>", {
                    text: b.menuHeadline
                }).appendTo(k);
                a("<i/>", {
                    "class": "fa fa-list"
                }).appendTo(g);
                g.appendTo(k);
                clicked = !1;
                g.on("click", function() {
                    a(this).parent().siblings().slideToggle(200);
                    !1 == clicked ? (clicked = !0, a(this).addClass("active")) : (clicked = !1, a(this).removeClass("active"))
                });
                n(function() {
                    g.is(":visible") && !1 == clicked ? a.merge(h, e).css(f) : a.merge(h, e).css(d);
                    g.is(":hidden") ? m.css(d) : g.is(":visible") && (m.css(f), a(".menu ul li.current > ul").css(d))
                })
            }

            function k() {
                menuLink.on("click", function(b) {
                    var c = a(this);
                    1 == c.siblings().length && b.preventDefault();
                    c.next("ul").slideToggle(180).parent().addClass("current").siblings().removeClass("current").children("ul").slideUp(360)
                })
            }
            n(function() {
                var c = a(this).width();
                b.responsive && 1024 >= c ? (menuItem.unbind(), menuLink.unbind(k()), d(), 768 >= c && (menuLink.unbind(d()), k())) : (b.responsive && (menuLink.unbind(), menuItem.unbind()), b.mouseHover && b.submenuStayOpen ? f() : b.mouseHover ? e() : d())
            });
            b.responsive && l();
            4 < b.animation ? c.addClass("animation-1") : c.addClass("animation-" + b.animation)
        }
        var b = a.extend({}, e, f),
            c = this;
        menuItem = c.find("> ul > li");
        menuItemActive = c.find("> ul > li.current");
        menuLink = menuItem.children("a");
        c.removeClass("no-js");
        this.each(function() {
            l()
        });
        return this
    }
})(jQuery);


