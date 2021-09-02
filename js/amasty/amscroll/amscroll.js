/*
 * Amasty Scroll
 *  
 * @copyright   Copyright (c) 2009-2012 Amasty (http://www.amasty.com)
 */
function amscroll() {
    this.frameHeight = null;

    this.initialized = false;

    /*
     * Button action was set
     */
    this.loaderSet = false;

    /*
     * Ignore flat that loader was set
     */
    this.ignoreLoaderSetFlag = false;

    /*
     * Current page
     */
    this.page = 1;

    /*
     * Amount of pages to load within curretn search/filters.
     */
    this.pagesCount = 0;

    /*
     * Top offset
     */
    this.previousTop = 0;

    /*
     * Fetch
     */
    this.pagesMultiplier = 3;

    /*
     * All pages loaded, now new pages to load
     */
    this.pagesReached = false;

    /*
     * Navigation element
     */
    this.navBarElement = null;

    /*
     * Holds amount of loaded pages
     */
    this.loadedPagesNumbers = 1;

    /*
     * Url to make request
     */
    this.url = '';

    this.placeHolderElement = null;

    /*
     * Ajax request can be done:
     * - auto - automatically
     * - button - on button click
     */
    this.actionMode = 'auto';

    /*
     * Label on button
     */
    this.loadingTextButton = '';

    /*
     * Path to loading image
     */
    this.loadingImage = '';

    /*
     * Progress bar config
     */
    this.progressbar = {};

    /*
     * Display page numbers or not
     */
    this.showPageNumberBlock = 0;

    this.loadNextStyle = '';

    this.offsetRanges = [];

    this.loadedPages = [];

    this.init = function (params) {
        /*
         * Get total pages count
         */

        this.pagesCount = this.getPagesCount();

        if (this.pagesCount < 2) {
            return;
        }

        this.url = window.location.href.split('#')[0];
        this.initialized = true;
        this.loaderSet = false;

        this.destroyNavBarElement();

        if (params) {
            for (param in params) {
                this[param] = params[param];
            }
        }

        /*
         * Remove bottom toolbar
         */
        var toolbar = $$(amscroll_toolbar_bottom)[0];
        if (toolbar) {
            $(toolbar).remove();
        }

        /*
         * Hide pager
         */
        $$(amscroll_pager).each(function (pager) {
            $(pager).hide();
        });

        // create page container for default page
        this.insertPageContainer(parseInt(amscroll_params.page), $$(amscroll_product_container));
        $('amscroll-page-' + amscroll_params.page).addClassName('loaded');
        if (this.showPageNumberBlock == 1) {
            $('amscroll-page-num-' + amscroll_params.page).show();
        }

        // create page container for next page
        this.insertPageContainer(parseInt(amscroll_params.page) + 1);

        /*
         * Calculate frame height depending on loaded page.
         * Saved default range.
         */
        this.offsetRanges.push({
            start: jQuery(amscroll_product_container).offset().top,
            end: jQuery(amscroll_product_container).offset().top + this.getFrameHeight(),
            page: parseInt(amscroll_params.page)
        });
        this.loadedPages.push(parseInt(amscroll_params.page));

        if (this.isLocalStorageSupported() && this.getUrlParam('external')) {
            this.offsetRanges = JSON.parse(localStorage.getItem('saved_ranges'));
            this.loadedPages = JSON.parse(localStorage.getItem('loaded_pages'));
            this.loadNextPage(localStorage.getItem('am-current-page'));
        }

        Event.observe(window, "load", function () {
            amscroll_correct_height();
            setTimeout(function () {
                amscroll_correct_height();
            }, 1000);
            if (typeof jQuery != 'undefined') {
                jQuery(window).resize(function () {
                    amscroll_correct_height();
                });
            }
        });
    };

    this.getFrameHeight = function () {
        if (this.frameHeight == null) {
            var el = $$(amscroll_product_container)[0];
            if (el && $(el).getHeight()) {
                this.frameHeight = $(el).getHeight();
            }
        }

        if (this.frameHeight <= 50) {
            this.frameHeight = 960;
        }

        return this.frameHeight - 50; // 50 for margins and paddings
    };

    /*
     * All pages were loaded
     */
    this.limitReached = function () {
        return (this.loadedPagesNumbers == this.pagesCount);
    };

    /*
     * Check that page "page" should be loaded.
     * Order of blocks is imporant
     */
    this.shouldLoadNextPage = function (page) {
        var item = $$('#amscroll-page-' + page),
            shouldLoad = false;

        if (item.length > 0
            && !item[0].hasClassName('loaded')
            && !item[0].hasClassName('loading')
        ) {
            shouldLoad = true;
        }

        return shouldLoad;
    };

    this.destroyNavBarElement = function () {
        if ($('amscroll-navbar')) {
            $('amscroll-navbar').remove();
        }
        this.navBarElement = null;
    };

    this.renderPaginator = function (current) {
        var element = this.getNavBarElement();
        if (element) {
            if (current > 1 && current <= this.pagesCount && this.loadedPagesNumbers > 1) {
                element.style.display = 'block';
                var html = '<div class="amscroll-top">';
                var str = this.page_of_text;
                str = str.replace('{0}', current).replace('{1}', this.pagesCount);
                html += '<span>' + str + '</span>';
                html += '<a href="#" class="amscroll-navbar-link"></a></div>';
                element.update(html);
            } else {
                element.style.display = 'none';
            }
        }
    };

    this.setHashParam = function (key, value) {
        if ("0" !== this.remove_hash ||
            window.navigator.userAgent.indexOf("Edge") > -1	//disable hash for Microsoft Edge
        ) {
            return;
        }

        var params = this.getUrlParam();
        var hash = '';
        if (value == null) {
            delete params[key];
        } else {
            params[key] = value;
        }

        var i = 0;
        for (param in params) {
            hash += param + '=' + params[param] + '&';
            i++;
        }
        hash = hash.slice(0, -1);
        if (window.location.href.split('#')[1] != hash) {
            window.location.replace(window.location.href.split('#')[0] + '#' + hash);
        }
    };


    this.getUrlParam = function (param, type) {
        var hashParams = {};
        var e,
            a = /\+/g,  // Regex for replacing addition symbol with a space
            r = /([^&;=]+)=?([^&;]*)/g,
            d = function (s) {
                return decodeURIComponent(s.replace(a, " "));
            };

        var s = window.location.hash;

        if (type == 'url') {
            s = window.location.search;
        }
        q = s.substring(1);

        while (e = r.exec(q))
            hashParams[d(e[1])] = d(e[2]);

        if (typeof param == "undefined") {
            return hashParams;
        } else {
            return hashParams[param];
        }
    };


    /*
     * Return true if scrolling down;
     */
    this.getDirection = function () {
        var diff = (document.viewport.getScrollOffsets().top > this.previousTop);
        return diff;
    };

    this.setUrl = function (url) {
        this.url = url;
    };

    this.getLoadingPlaceholder = function (page) {
        var p = parseInt(page);

        if (p <= 0) {
            return;
        }

        var tmpElement = document.getElementById('amscroll-page-' + p);

        if (!tmpElement) {
            return null;
        }

        if (this.actionMode == 'button') {
            if ($(tmpElement).hasClassName('loading') == false && $(tmpElement).hasClassName('loaded') == false && (this.ignoreLoaderSetFlag || !this.loaderSet)) {
                if ($$('.amscroll-load-button').length > 0) {
                    return null;
                }
                $(tmpElement).addClassName('loading');

                tmpElement.innerHTML = '<input type="button" class="amscroll-load-button" style="' + this.loadNextStyle + '" onclick="amscroll_object.loadNextPage(' + p + ');" value="' + this.loadingTextButton + '" />';
                this.loaderSet = true;

                if (this.showPageNumberBlock == 1) {
                    $('amscroll-page-num-' + p).show();
                }
            }
            return tmpElement;
        }

        if ($(tmpElement) && ($(tmpElement).hasClassName('loaded') || $(tmpElement).hasClassName('loading'))) {
            return null;
        }

        $(tmpElement).addClassName('loading');

        return tmpElement;
    };

    /*
     * Load previous pages ir customer go back to category
     */
    this.loadPrevPages = function (pageNumber) {
        pageNumber--;

        // skip default page
        if (parseInt(amscroll_params.page) == pageNumber) {
            pageNumber--;
        }

        if (pageNumber > 0) {
            this.insertPageContainer(pageNumber);
            this.loadNextPage(pageNumber, true);
        }
    };

    /*
     * Perform ajax action
     */
    this.loadNextPage = function (pageNumber, isPrevPage) {
        pageNumber = parseInt(pageNumber);

        /*
         * Exceeding amount of pages
         */
        if (pageNumber > this.pagesCount) {
            return;
        }

        this.insertPageContainer(pageNumber);

        var me = this,
            url = this.url,
            tmpElement = this.getLoadingPlaceholder(pageNumber),
            needScroll = isPrevPage;

        if (tmpElement == null) {
            return null;
        }

        if (tmpElement.parentNode && tmpElement.parentNode.innerHTML.indexOf('amscroll-loading') == -1)
            tmpElement.innerHTML = '<div class="amscroll-loading" style="background-image: url(' + this.loadingImage + ');">&nbsp;</div>';

        var params = {
            is_ajax: 1,
            p: pageNumber,
            is_scroll: 1
        };

        var request = new Ajax.Request(url, {
            method: 'get',
            parameters: params,
            onSuccess: function (response) {
                data = response.responseText;
                if (!data.isJSON()) {
                    var tmp = document.createElement('div');
                    tmp.innerHTML = data;

                    if (tmp.select(amscroll_product_container_group).length) {
                        tmpPage = tmp.select(amscroll_product_container_group).first();
                    }
                    else {
                        $(tmpElement).update("");
                        console.debug('Observer does not return the JSON.');
                        return false;
                    }
                }
                else {
                    data = data.evalJSON();
                    if (!data.page) {
                        data.page = data.listing;
                    }
                    if (!data.page) {
                        data.page = data.productlist;
                    }
                    if (!data.page) {
                        $(tmpElement).update("");
                        console.debug('Observer does not return data.page.');
                        return false;
                    }

                    var tmpPage = document.createElement('div');
                    tmpPage.innerHTML = data.page;

                    if (data.amlabel_script) {
                        data.amlabel_script.evalScripts();
                    }
                }
                data = "";

                //Uncomment line below in case of any redirects due to js in page code
                //tmpPage.innerHTML = data.page.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");

                /*
                 * Remove toolbar and pagings from received HTML
                 */
                $(tmpPage).getElementsBySelector(amscroll_toolbar).each(function (toolbar) {
                    $(toolbar).remove();
                });

                var elements = $(tmpPage).getElementsBySelector(amscroll_toolbar_bottom);
                if (elements.length > 0) {
                    elements[0].remove();
                }

                if (me.showPageNumberBlock == 1) {
                    $('amscroll-page-num-' + pageNumber).show();
                }
                $(tmpElement).update($(tmpPage).innerHTML);

                var actualHeight = $(tmpElement).down(0).getHeight();

                /*
                 * Adjust block height
                 */

                $(tmpElement).setStyle({height: 'auto'});

                /*
                 * Check that current page is not last item
                 */
                if (pageNumber < this.pagesCount) {
                    me.frameHeight = actualHeight;
                }

                if (me.isLocalStorageSupported()) {
                    me.scrollBack(pageNumber);
                    if (needScroll) {
                        jQuery('body').trigger('scroll_back');
                    }
                }

                if (data.zoom_information) {
                    var zoomObject = new AmZoomergrid(JSON.parse(data.zoom_information), amzoom_setting);
                    zoomObject.loadZoom();
                }

                me.insertPageContainer(pageNumber + 1);

                if (me.loadedPages.indexOf(pageNumber) == -1) {
                    me.offsetRanges.push({
                        start: jQuery(tmpElement).offset().top,
                        end: jQuery(tmpElement).offset().top + me.getFrameHeight(),
                        page: pageNumber
                    });
                    me.loadedPages.push(pageNumber);
                }
            },
            onFailure: function () {
                setLocation(url);
            },
            onComplete: function () {

                /* Increase amount of loaded pages */
                me.loadedPagesNumbers++;

                /* Mark current frame as "loaded" */
                $(tmpElement).addClassName('loaded');

                /* Bind click on any link or button within received frame */
                me.bindClick(pageNumber);

                amscroll_external(pageNumber);

                me.loaderSet = false;
            }
        });

        this.loadPrevPages(pageNumber);
    };

    this.bindClick = function (page) {
        var me = this;
        $$('#amscroll-page-' + page + ' ' + amscroll_product_container + ' a, ' + '#amscroll-page-' + page + ' ' + amscroll_product_container + ' input').each(function (e) {
            e.onclick = function () {
                me.setHashParam('external', 1);
                if (me.isLocalStorageSupported()) {
                    localStorage.setItem('amscroll_height', me.frameHeight);
                    var productPart = jQuery(this);
                    localStorage.setItem('am-product', productPart.attr("href"));
                    localStorage.setItem('am-page', jQuery(this).closest('.amscroll-page').attr('rel'));
                    localStorage.setItem('saved_ranges', JSON.stringify(me.offsetRanges));
                    localStorage.setItem('loaded_pages', JSON.stringify(me.loadedPages));
                }
            }
        });
    };


    /*
     * Initialize progress bar (if required)
     */
    this.getNavBarElement = function () {

        var progressbar = this.progressbar;
        if (progressbar.enabled == 0) {
            return null;
        }
        if (this.navBarElement == null) {
            this.navBarElement = new Element('div', {
                'class': 'amscroll-navbar',
                'id': 'amscroll-navbar',
                'style': progressbar.offset
            }).update('');

            $(this.navBarElement).setStyle({
                'width': progressbar.width,
                'position': 'fixed',
                'background': progressbar.background
            });

            $(document.body).insert(this.navBarElement);
        }
        return this.navBarElement;
    };

    this.handleScroll = function () {
        if (document.viewport) {
            var top = document.viewport.getScrollOffsets().top;

            if (top == 0) {
                top = 1;
            }

            var currentPage = this.getCurrentPage();

            if (currentPage > 0 && currentPage <= this.pagesCount) {
                this.setHashParam('page', currentPage);
            }

            if (this.pagesCount > 0) {
                this.renderPaginator(currentPage);
            }
            if (!this.getUrlParam('external') && this.isLocalStorageSupported()) {
                localStorage.setItem('amscroll_top', top);
                localStorage.setItem(
                    'am-current-page',
                    currentPage == this.pagesCount ? currentPage : currentPage + 1
                );
            }
        }
        if (typeof amshopby_working == 'undefined' || amshopby_working == false) {
            if (this.actionMode == 'auto') {

                if (this.shouldLoadNextPage(currentPage)) {
                    this.loadNextPage(currentPage);
                }

                if (this.shouldLoadNextPage(currentPage + 1)) {
                    this.loadNextPage(currentPage + 1);
                }
                if (this.getDirection() == false) {
                    if (this.shouldLoadNextPage(currentPage - 1)) {
                        this.loadNextPage(currentPage - 1);
                    }
                }
            }
            if (this.actionMode == 'button') {
                if (this.shouldLoadNextPage(currentPage)) {
                    this.getLoadingPlaceholder(currentPage);
                }

                if (this.shouldLoadNextPage(currentPage + 1)) {
                    this.getLoadingPlaceholder(currentPage + 1);
                }
                if (this.getDirection() == false) {
                    if (this.shouldLoadNextPage(currentPage - 1)) {
                        this.getLoadingPlaceholder(currentPage - 1);
                    }
                }
            }
        }

        this.previousTop = top;
    };

    this.getCurrentPage = function () {
        var top = document.viewport.getScrollOffsets().top,
            currentPage = parseInt(amscroll_params.page),
            difference = Number.MAX_SAFE_INTEGER;

        this.offsetRanges.forEach(function (range) {
            var tempDifference  = Math.min(
                Math.abs(top - range.start),
                Math.abs(top - range.end)
            );
            if (difference > tempDifference) {
                difference = tempDifference;
                currentPage = range.page;
            }
        });

        return currentPage;
    };

    this.getPagesCount = function () {
        var ampager = $('am-pager-count');
        /*get page count from our observer*/
        if (ampager) {
            return parseInt(ampager.innerHTML);
        }

        var selector = 'div.pager p.amount, div.sorter p.amount';
        var pager = $$(selector);

        if (pager[0]) {
            var str = pager[0].innerHTML;
            var re = /\D*(\d+)\D*(\d+)\D*(\d+)/;
            var result = re.exec(str);
            if (result && result.length == 4) {
                if (result[3] > 0 && result[2] > 0) {
                    return Math.ceil(parseInt(result[3]) / parseInt(result[2]));
                }
            }
        } else if ($$('div.pager li').length > 1) {
            return $$('div.pager li').length - 1;
        }

        return 1;
    };

    this.isLocalStorageSupported = function () {
        var testKey = 'testKey';
        try {
            localStorage.setItem(testKey, '1');
            localStorage.removeItem(testKey);
            return true;
        } catch (error) {
            return false;
        }
    };

    this.insertPageContainer = function (page, insertBefore) {
        if (page > 0 && page <= this.pagesCount) {
            if (this.showPageNumberBlock == '1') {
                this.insertPageBlock(page, 'page_number', insertBefore);
            }
            this.insertPageBlock(page, 'frame', insertBefore);
        }
    };

    this.insertPageBlock = function (page, type, insertBefore) {
        var insertedBlockClass = null,
            insertedBlockId = null,
            content = null,
            style = null;

        switch (type) {
            case 'frame':
                insertedBlockClass = 'amscroll-page';
                insertedBlockId = insertedBlockClass + '-' + page;
                content = '';
                style = '';
                break;
            case 'page_number':
                insertedBlockClass = 'amscroll-page-num';
                insertedBlockId = insertedBlockClass + '-' + page;
                content = this.page_text + page;
                style = 'display: none';
                break;
        }

        // invalid block type
        if (!insertedBlockClass) {
            return null;
        }

        // block already exist
        if ($$('#' + insertedBlockId).length > 0) {
            return null;
        }

        var productContainer = $$(amscroll_product_container_group)[0],
            nextPageBlockSuffix = this.showPageNumberBlock == '1' ? 'num-' : '',
            nextPageBlock = insertBefore ? insertBefore : $$('#amscroll-page-' + nextPageBlockSuffix + (page + 1)),
            insertedPageBlock = new Element('div', {
                'class': insertedBlockClass,
                'id': insertedBlockId,
                'rel': page,
                'style': style
            }).update(content);

        if (nextPageBlock.length > 0) {
            productContainer.insertBefore(insertedPageBlock, nextPageBlock[0]);
        } else {
            productContainer.insert(insertedPageBlock, {position: 'content'});
        }
    };

    this.scrollBack = function(pageNumber) {
        if (localStorage.getItem('am-page') == pageNumber) {
            var item = jQuery('a[href="' + localStorage.getItem('am-product') + '"]').closest('.item');
            history.scrollRestoration = 'manual';
            jQuery('body').on('scroll_back', function () {
                jQuery('html, body').animate({
                    scrollTop: (item.offset().top)
                }, 0);
            });
            localStorage.removeItem('am-product');
            localStorage.removeItem('am-page');
            localStorage.removeItem('am-current-page');
            localStorage.removeItem('saved_ranges');
            localStorage.removeItem('loaded_pages');
            localStorage.removeItem('loaded_pages');
            this.setHashParam('external', null);
        }
    }
}

function amscroll_external(page) {
    //add here all external scripts for page reloading
    if (typeof AmAjaxObj != 'undefined') {
        AmAjaxShoppCartLoad('button.btn-cart');
    }

    if (typeof setGridItemsEqualHeight != 'undefined') {
        mysetGridItemsEqualHeight(jQuery);
    }

    if (typeof amlabel_init == 'function') {
        amlabel_init();
    }

    if (typeof ConfigurableSwatchesList != 'undefined') {
        $j('#amscroll-page-' + page + ' .configurable-swatch-list li').each(function () {
            ConfigurableSwatchesList.initSwatch(this);
            var $swatch = $j(this);
            if ($swatch.hasClass('filter-match')) {
                ConfigurableSwatchesList.handleSwatchSelect($swatch);
            }
        });
        setTimeout(function () {
            $j(document).trigger('product-media-loaded-' + page, ConfigurableMediaImages);
        }, 1000);
    }
}
function mysetGridItemsEqualHeight($) {
    //add hover button
    var startHeight;
    var bpad;
    if ($('.category-products-grid .display-onhover')) {
        gridItemsEqualHeightApplied = true;
        $('.category-products-grid').on('mouseenter', '.item', function () {

            if ($(window).width() >= 320) {

                if (gridItemsEqualHeightApplied === false) {
                    //return false;
                }

                startHeight = $(this).height();
                $(this).css("height", "auto"); //Release height
                $(this).find(".display-onhover").fadeIn(400, "easeOutCubic"); //Show elements visible on hover
                var h2 = $(this).height();

                ////////////////////////////////////////////////////////////////
                var addtocartHeight = 0;
                var addtolinksHeight = 0;

                //addtocartHeight = $(this).find('.btn-cart').height(); //obsolete
                var buttonOrStock = $(this).find('.btn-cart');
                if (buttonOrStock.length == 0) buttonOrStock = $(this).find('.availability');
                addtocartHeight = buttonOrStock.height();


                var h3 = h2 + addtocartHeight + addtolinksHeight;
                var diff = 0;
                if (h3 < startHeight) {
                    $(this).height(startHeight);
                }
                else {
                    $(this).height(h3);
                    diff = h3 - startHeight;
                }
                ////////////////////////////////////////////////////////////////

                $(this).css("margin-bottom", "-78" + "px");
                //$(this).height("550px");

            }
        }).on('mouseleave', '.item', function () {

            if ($(window).width() >= 320) {

                //Clean up
                $(this).find(".display-onhover").stop(true).hide();
                $(this).css("height", "auto");
                $(this).css("margin-bottom", "0" + "px");
            }
        });
    }

    //configure sizes
    var $list = $('.category-products-grid');
    var $listItems = $list.children();

    var centered = $list.hasClass('centered');
    var gridItemMaxHeight = 0;
    $listItems.each(function () {

        $(this).css("height", "auto");
        var $object = $(this).find('.actions');

        if (centered) {
            var objectWidth = $object.width();
            var availableWidth = $(this).width();
            var space = availableWidth - objectWidth;
            var leftOffset = space / 2;
            $object.css("padding-left", leftOffset + "px");
        }

        var bottomOffset = parseInt($(this).css("padding-top"));
        if (centered) bottomOffset += 10;
        $object.css("bottom", bottomOffset + "px");

        if ($object.is(":visible")) {
            var objectHeight = $object.height();
            $(this).css("padding-bottom", (objectHeight + bottomOffset) + "px");
        }


        gridItemMaxHeight = Math.max(gridItemMaxHeight, $(this).height());
    });

    //Apply max height
    //$listItems.css("height", gridItemMaxHeight + "px");
    //gridItemsEqualHeightApplied = true;

}

function amscroll_test() {
    if (typeof amscroll_object == 'undefined') {
        console.debug('amscroll_object is not defined');
        console.debug('<------------------->');
    }

    console.debug('amscroll_params');
    console.debug(amscroll_params);
    console.debug('<------------------->');

    if (typeof amscroll_object != 'undefined') {
        console.debug('amscroll pages count');
        console.debug(amscroll_object.getPagesCount());
        console.debug($$('div.pager p.amount'));
        if (amscroll_object.getPagesCount() == 1) {
            console.debug('div.pager p.amount');
            console.debug($$('div.pager p.amount'));
            console.debug('<------->');

            console.debug('div.sorter p.amount');
            console.debug($$('div.pager p.amount'));
            console.debug('<------->');

            console.debug('is amount?');
            console.debug($$('.amount'));
            console.debug('<------->');
        }
        console.debug('<------------------->');
    }

    if (typeof setGridItemsEqualHeight != 'undefined') {
        console.debug('setGridItemsEqualHeight exits');
    }

    return 'test complete!'
}

function amscroll_correct_height() {
    //correct frameHeight after page load
    if (typeof amscroll_object == 'undefined') return;

    var orig = $$(amscroll_product_container_group).first();
    if (!orig) return;
    var clone = orig.clone(true);

    clone.select("[id^=amscroll]").each(function (element) {
        element.remove();
    });
    var parent = orig.parentNode;
    if (parent) {
        parent.appendChild(clone);
    }

    scrollHeight = clone.getHeight();
    if (scrollHeight > 0) {
        amscroll_object.frameHeight = scrollHeight;
    }

    clone.remove();
}
