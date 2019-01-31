'use strict';

/**
 * Global variables
 */
// TODO: Add checks to see if the current view is already loaded, if so, only show the view, don't load the data
var navObj = {
    currentTab: 'drugs',
    currentView: '',
    currentChapter: '',
    currentDetails: '',
    isMobileView: true
};

var sizeMedium = 768;

var rekData = {
    mainMenuData: [],
    dataDrugs: [],
    dataAdvice: [],
    dataResources: [],
    dataNews: [],
    hbsDrugs: '',
    hbsAdvice: '',
    hbsResources: '',
    properties: {

        // Local Dev
        // companyId: 10155,
        // drugsStructureId: 11571,
        // adviceStructureId: 12602,
        // resourcesStructureId: 14304,
        // newsStructureId: 19302,

        // Stage
        // companyId: 1674701,
        // drugsStructureId: 1728835,
        // adviceStructureId: 1728833,
        // resourcesStructureId: 1728837,
        // newsStructureId: 1770002,

        // Live:
        companyId: 1712101,
        drugsStructureId: 1715233,
        adviceStructureId: 1715235,
        resourcesStructureId: 1715238,
        newsStructureId: 2080202,

        groupName: 'Guest',
        locale: 'sv_SE',
        secondsCacheData: 3600 //3600 == 1h.
    }
};


/* ************************************************************************* *\
 *
 * INITIALIZE
 *
\* ************************************************************************* */

$(function() {
    initApp();
});


function clearCache() {
    storage
        .remove('searchIndex')
        .remove('rekDataLastSaved')
        .remove('dataDrugs')
        .remove('dataAdvice')
        .remove('dataResources')
        //.remove('mainMenuData')
        .remove('dataNews')
        .remove('hbsDrugs')
        .remove('hbsAdvice')
        .remove('hbsResources');
}

/**
 * Init app by determine if we need to load data over json or if we can grab
 * cached data from local storage
 */
function initApp() {
    if (isSignedIn) {
        clearCache()
    }

    var timestampLastDl = storage.get('rekDataLastSaved');
    if (timestampLastDl === undefined) {
        downloadResources();
    } else {
        var timestampDiff = (new Date().getTime() - timestampLastDl) / 1000;
        if (window.isSignedIn || timestampDiff > rekData.properties.secondsCacheData) {
            downloadResources();
        } else {
            rekData = storage.get([
                'dataDrugs',
                'dataAdvice',
                'dataResources',
                //'mainMenuData',
                'dataNews',
                'hbsDrugs',
                'hbsAdvice',
                'hbsResources'
            ]);
            mangleData(false, rekData);
        }
    }
}

var temp;

/**
 * Download all articles as JSON from skinny-json,
 * also download all handlebar templates.
 */
function downloadResources(){
    // Only show loading indicator after X ms.
    // This way it doesn't flicker on fast connections.
    setTimeout(function () {
        $('.js-loading-indicator').addClass('on');
    }, 500);

    var urls = {
        drugs: '/api/jsonws/skinny-web.skinny/get-skinny-journal-articles/' +
        'company-id/' + rekData.properties.companyId +
        '/group-name/' + rekData.properties.groupName +
        '/ddm-structure-id/' + rekData.properties.drugsStructureId +
        '/locale/' + rekData.properties.locale,

        advice: '/api/jsonws/skinny-web.skinny/get-skinny-journal-articles/' +
        'company-id/' + rekData.properties.companyId +
        '/group-name/' + rekData.properties.groupName +
        '/ddm-structure-id/' + rekData.properties.adviceStructureId +
        '/locale/' + rekData.properties.locale,

        resources: '/api/jsonws/skinny-web.skinny/get-skinny-journal-articles/' +
        'company-id/' + rekData.properties.companyId +
        '/group-name/' + rekData.properties.groupName +
        '/ddm-structure-id/' + rekData.properties.resourcesStructureId +
        '/locale/' + rekData.properties.locale,

        news: '/api/jsonws/skinny-web.skinny/get-skinny-journal-articles/' +
        'company-id/' + rekData.properties.companyId +
        '/group-name/' + rekData.properties.groupName +
        '/ddm-structure-id/' + rekData.properties.newsStructureId +
        '/locale/' + rekData.properties.locale,

        hbsDrugs: '/reklistan-theme/handlebars/details-drugs.hbs',
        hbsAdvice: '/reklistan-theme/handlebars/details-advice.hbs',
        hbsResources: '/reklistan-theme/handlebars/resources.hbs'
    };

    $.when(
        $.ajax(urls.drugs),
        $.ajax(urls.advice),
        $.ajax(urls.resources),
        $.ajax(urls.hbsDrugs),
        $.ajax(urls.hbsAdvice),
        $.ajax(urls.hbsResources),
        $.ajax(urls.news)
    )
    .then(function(drugs, advice, resources, hbsDrugs, hbsAdvice, hbsResources, news) {
        rekData.dataDrugs = drugs[0];
        rekData.dataAdvice = advice[0];
        rekData.dataNews = news[0];
        rekData.dataResources = resources[0];

        rekData.hbsDrugs = hbsDrugs[0];
        rekData.hbsAdvice = hbsAdvice[0];
        rekData.hbsResources = hbsResources[0];

        // Old IE versions gives data as string and not as an object...
        if(typeof drugs[0] === 'string') {
            rekData.dataDrugs = jQuery.parseJSON(rekData.dataDrugs);
            rekData.dataAdvice = jQuery.parseJSON(rekData.dataAdvice);
            rekData.dataNews = jQuery.parseJSON(rekData.dataNews);
            rekData.dataResources = jQuery.parseJSON(rekData.dataResources);
        }

        mangleData(true, rekData);

    })
    .fail(function(err) {
        alert('Could not load all resources needed');
        // TODO Better error msg.
        // TODO Put this back to somewhere good. Also add timeout
        //$('#main-menu-placeholder').html('<div class="error-box"><h1>Något gick snett</h1><p>Tyvärr kunde datan inte hämtas från servern. <b>Försök ladda om sidan.</b></p><p>Fungerar det fortfarande inte? Skicka ett epost till Christer Printz <a href="mailto:christer.printz@vgregion.se">christer.printz@vgregion.se</a></p></div>');
    });
}

/**
 * YEAR STUFF
 */
function findUniqueYears(data) {
    var years = {};
    data.forEach(function(type) {
        type.forEach(function(item) {
            if(item.path[0]) {
                years[item.path[0]] = true;
            }
        })
    });
    return Object.keys(years).sort();
}

function filterYear(data, year) {
    return data.filter(function(item) {
       return item.path[0] === year
    });
}

function changeYear(year) {
    clearCache();
    storage
        .set({showYear: year});
    location.hash = '';
    location.reload(true);
}


/**
 * Mangle data
 */
function mangleData(isFreshDownload, rekData) {

    // Save all data to local storage
    if(isFreshDownload && !window.isSignedIn) {
        storage.set({
            dataDrugs: rekData.dataDrugs,
            dataAdvice: rekData.dataAdvice,
            dataResources: rekData.dataResources,
            //mainMenuData: rekData.dataMainMenu,
            dataNews: rekData.dataNews,
            hbsDrugs: rekData.hbsDrugs,
            hbsAdvice: rekData.hbsAdvice,
            hbsResources: rekData.hbsResources,
            rekDataLastSaved: new Date().getTime()
        });
    }

    // Find and filter years
    rekData.dataYears = {};
    rekData.dataYears.unique = findUniqueYears([rekData.dataDrugs, rekData.dataAdvice]);
    rekData.dataYears.hasMultiple = rekData.dataYears.unique.length > 1;
    rekData.dataYears.present = rekData.dataYears.unique[0];
    rekData.dataYears.show = storage.get('showYear') || rekData.dataYears.present;

    if (rekData.dataYears.hasMultiple) {
        rekData.dataDrugs = filterYear(rekData.dataDrugs, rekData.dataYears.show);
        rekData.dataAdvice = filterYear(rekData.dataAdvice, rekData.dataYears.show);
        rekData.dataResources = filterYear(rekData.dataResources, rekData.dataYears.show);
    }

    // Hack to hide a specific article in the web application only (and not the mobile app).
    var index = rekData.dataDrugs.findIndex(function (item) {
        return item.title.indexOf('Rek. läkemedel är numera inkluderade i Terapiråd') > -1
    });
    
    if (index > -1) {
        rekData.dataDrugs.splice(index, 1);        
    }

    // Create and sort main menu data
    rekData.mainMenuData = rekData.dataDrugs.map(function (entry) {
            return {
                _title: entry.title,
                hasDrugs: (entry.fields[0].value.length !== 0),
                tempDrugs: entry.fields[0].value
            };
        })
        .sort(function (a, b) {
            if (a._title > b._title) {
                return 1;
            }
            if (a._title < b._title) {
                return -1;
            }
            return 0;
        });

    var workingResources = rekData.dataResources.map(function(article) {
        var fieldOut = {
            uuid: article.uuid,
            title: article.title,
            body: '',
            externallink: '',
            medium: 'web',
            sortOrder: '0',
            id: makeUrlSafe(article.title)
        };
        article.fields.forEach(function (field) {
            fieldOut[field.name] = field.value;
        });

        if (fieldOut.medium.indexOf('both') > 0 || fieldOut.medium.indexOf('web') > 0) { // Only include news targeted to mobile.
            return fieldOut;
        } else {
            return undefined;
        }

    });

    workingResources = cleanArray(workingResources);

    rekData.dataResources = workingResources.sort(function (a, b) {
        if (a.sortOrder.value > b.sortOrder.value) {
            return 1;
        }
        if (a.sortOrder.value < b.sortOrder.value) {
            return -1;
        }
        return 0;
    });


    // Mangle News
    var newsArticles = rekData.dataNews.map(function(article) {
        var fieldOut = {
            uuid: article.uuid,
            title: article.title,
            body: '',
            externallink: '',
            medium: '',
            lead: '',
            date: '2010-01-01',
            id: makeUrlSafe(article.title)
        };
        article.fields.forEach(function (field) {
            fieldOut[field.name] = field.value;
        });

        if (fieldOut.medium.indexOf('both') > 0 || fieldOut.medium.indexOf('web') > 0) { // Only include news targeted to mobile.
            return fieldOut;
        } else {
            return undefined;
        }

    });

    newsArticles = cleanArray(newsArticles);
    newsArticles = newsArticles.sort(function (a, b) {
        if (a.date > b.date) {
            return 1;
        }
        if (a.date < b.date) {
            return -1;
        }
        return 0;
    });

    rekData.dataNews = newsArticles;

    startApp(isFreshDownload, rekData.mainMenuData, rekData.dataResources, rekData.dataNews, rekData.dataDrugs, rekData.dataAdvice, rekData.dataYears);
}

/**
 * Start the App
 *
 * @param isFreshDataDownload
 * @param dataMainMenu
 * @param dataResources
 * @param dataNews
 * @param dataDrugs
 * @param dataAdvice
 */
function startApp(isFreshDataDownload, dataMainMenu, dataResources, dataNews, dataDrugs, dataAdvice, dataYears) {
    registerHandlebarHelpers();
    Swag.registerHelpers(Handlebars);
    registerEvents();
    initializeRoute();
    createMenuesAndBigStartPage(dataMainMenu, dataResources, dataNews, dataYears);

    // Initialize FastClick to make it snappier on mobile browsers.
    FastClick.attach(document.body);

    // Create Search Index if it's a fresh set of data,
    // else load the existing searchIndex from local storage.
    // Only working in >IE10
    if(!($('html').hasClass('lt-ie10') || $('html').hasClass('lt-ie9') || $('html').hasClass('lt-ie8'))) {
        var searchIndex = storage.get('searchIndex');

        if (isFreshDataDownload || !searchIndex || searchIndex.version !== lunr.version) {
            wwMangleSearchData(dataDrugs, dataAdvice);
        } else {
            search.loadIndex(searchIndex);
        }
    }

    // Save if we're in mobile view or not (menu is a bit different)
    navObj.isMobileView = ($(window).width() < sizeMedium);
    $(window).resize(function() {
        navObj.isMobileView = ($(window).width() < sizeMedium);
    });
}

var navigationCounter = 0;

function initializeRoute() {

    routie({
        '/resource/:newsitem': function(resourceItem) {
            window.scrollTo(0, 0);
            showGeneric('resource', resourceItem);
            setBackButtonURL('#', navigationCounter++);
        },
        '/news/:newsitem': function(newsItem) {
            window.scrollTo(0, 0);
            showGeneric('news', newsItem);
            setBackButtonURL('#', navigationCounter++);
        },
        '/:tab/:chapter': function(tab, chapter) {
            window.scrollTo(0, 0);
            showSubmenu(chapter, '', tab);
            setBackButtonURL('#', navigationCounter++);
        },
        '/:tab/:chapter/:section': function(tab, chapter, section) {
            window.scrollTo(0, 0);
            showSubmenu(chapter, section, tab);
            showDetails(chapter, section, tab);
            setBackButtonURL('#/' + tab + '/' + chapter, navigationCounter++);

        },
        '/refresh': function() {
            clearCache();
            location.hash = '';
            location.reload(true);
        },
        '*': function () {
            window.scrollTo(0, 0);
            backToMainMenu();
        }
    });
}

// This method tries to achieve a behaviour where the webpage back button to behaves mainly like the browser back
// button, except when the user hasn't navigated on the site yet. If user e.g. hits
// https://reklistan.vgregion.se/#/advice/Barn_och_ungdom in the address bar we want the back button to go up a level
// instead of going back to the previous site the user visited. This algorithm works fairly well. If it turns out to be
// problematic, just replace with a behaviour where it always does history.back().
function setBackButtonURL(url, counter) {
    var body = $('body');

    body.off("click", ".appbar-menu-back-wrapper");

    if (counter > 0) {
        body.on("click", ".appbar-menu-back-wrapper", function (e) {
            history.back();
            navigationCounter -= 2; // Since it is incremented by the calling method we need to decrement by two.
            if (navigationCounter < 0) {
                navigationCounter = 0;
            }
            e.preventDefault();
        });
    }

    if (navObj.isMobileView) {
        $('.js-navigation-button')
            .attr("href", url)
            .addClass('on');
    } else {
        $('.js-navigation-button')
            .attr("href", '#')
            .addClass('on');
    }
}

/* ************************************************************************* *\
 *
 * EVENT LISTENERS
 *
\* ************************************************************************* */
function registerEvents() {
	$('body')
    .on( "click", ".news-item", function(e) {
        var jqSelf = $(this);
        var item = jqSelf.data('item');
        routie('/news/' + item);
        e.preventDefault();
    })
    .on( "click", ".js-search-clear", function() {
        $('.search-input').val('');
        search.search('');
    })
    .on("keyup", ".js-search-input", function() {
        search.search($.trim($('.js-search-input').val()));
    })
    .on("change", ".js-search-input", function() {
        search.search($.trim($('.js-search-input').val()));
    })
    .on( "click", ".js-fly-menu-link", function() {
        hideFlyOutMenu();
    })
    .on( "click", ".js-appbar-menu-sink-toggle", function() {
        var jqMenuFlyout = $('.fly-menu-wrapper');
        var jqBlurrer = $('.js-menu-blurrer');
        var jqBody = $('body');
        jqBody.addClass('no-scroll');
        jqMenuFlyout.addClass('active');
        jqBlurrer.fadeIn(250);
	})
    .on( "click", ".js-menu-blurrer", function() {
        hideFlyOutMenu();
    })
    .on("change", ".js-year-selector", function() {
        changeYear($('.js-year-selector').val());
    });

    var rememberedPositions = [];
    $( "#details-advice, #details-drugs" ).bind("scroll",function(e) {

        var appbarMenuTitleHeight = $('.appbar-menu-title').height() || 0;

        var target = $(e.target);
        var theads = target.find('table.fixed-head-enabled thead');

        var targetPosition = target[0].scrollTop;

        theads.each(function(i) {
            var thead = $(theads[i]);
            var table = thead.parents('table');
            var top = thead.position().top;

            if (top < appbarMenuTitleHeight && !table.hasClass('fixed-head')) {
                rememberedPositions[i] = targetPosition;
                var ths = thead.find('th');
                ths.each(function (e) {
                    var currentWidth = $(ths[e]).outerWidth();
                    $(ths[e]).css('width', currentWidth);
                });

                var thead = table.find('thead');
                $(thead[0]).css('width', $(thead[0]).outerWidth());
                $(thead[0]).css('height', $(thead[0]).outerHeight());

                table.addClass('fixed-head');
            }
        });

        rememberedPositions.forEach(function (remembered, i) {
            // var rememberedPosition = rememberedPositions[i];
            if (remembered && targetPosition < remembered) {
                // "Unfix" the relevant thead
                var thead = $(theads[i]);
                // thead.removeClass('fixed');
                var table = thead.parents('table');
                table.removeClass('fixed-head');
                rememberedPositions[i] = null;
            }
        });
    });
}

/**
 * Hide fly out menu
 */
function hideFlyOutMenu() {
    var jqMenuFlyout = $('.fly-menu-wrapper');
    var jqBlurrer = $('.js-menu-blurrer');
    var jqBody = $('body');
    jqBody.removeClass('no-scroll');
    jqMenuFlyout.removeClass('active');
    jqBlurrer.fadeOut(250);
}


/* ************************************************************************* *\
 *
 * CREATE MAIN MENU
 *
\* ************************************************************************* */
function createMenuesAndBigStartPage(mainMenuData, dataResources, dataNews, dataYears) {
    var nNewsToShow = 3;
    var data = {
        areas: mainMenuData,
        news: dataNews ? dataNews.slice(0, nNewsToShow) : [],
        resources: dataResources
    };

    if (dataYears.hasMultiple) {
        $('#app-wrapper').addClass('showing-adminbar');
        $('body').addClass(dataYears.present === dataYears.show ? 'adminmode-present-year' : 'adminmode-other-year');
        printTemplate(dataYears, "#admin-bar-template", '#admin-bar-placeholder');
    }
    printTemplate(data, "#main-menu-template", '#main-menu-placeholder');
    printTemplate(data, "#filler-template", '#details-filler-placeholder');
    printTemplate(data, "#fly-menu-template", '#fly-menu-placeholder');
    $('#main-menu-placeholder').addClass('on');
    $('#details-filler-placeholder').addClass('on');
    $('.js-loading-indicator').remove();
}


/* ************************************************************************* *\
 *
 * SHOW GENERIC
 *
\* ************************************************************************* */
function showGeneric(type, clickedItem) {
    var data = {};
    var templateSelector = '';
    var templateStr;

    // TODO FIX THIS, WE'VE REMOVED THE DOM TEMPLATES AND PUT THEM INTO HBS FILES
    // Filter
    if (type === 'news') {
        templateSelector = '#news-template';
        data = rekData.dataNews.filter(function (item) {
            return item.id === clickedItem;
        });
    } else if (type === 'resource') {
        templateStr = rekData.hbsResources;
        data = rekData.dataResources.filter(function (item) {
            return makeUrlSafe(item.title) === clickedItem;
        });
    }

    // Current View
    setCurrentView('generic', '', '');

    // Elements
    var jqMainMenu = $('#mainmenu');
    var jqDetailsGeneric = $('#details-generic');
    jqMainMenu.removeClass('active');
    jqDetailsGeneric.addClass('active');

    // Print
    printTemplate(data, templateSelector, '#details-generic-placeholder', templateStr);

    // Make responsive tables
    $('.section-details-generic table').stacktable({minColCount:2}); // Make responsive tables
}


/* ************************************************************************* *\
 *
 * SHOW SUBMENU
 *
\* ************************************************************************* */
function showSubmenu(chapter, section, tab) {
    // TODO - Add error handling to see if chapter exist

    backToSubmenu();

    // Elements
    var jqMainMenu = $('#mainmenu');
    var jqSubmenu = $('#submenu-' + tab);

    // Filter big fat data array to only show current chapter and print template
    var filteredArr = getActiveTabData(tab).filter(function (entry) {
        return (makeUrlSafe(entry.title, true) === chapter);
    });
    var filtered = filteredArr[0];

    // Set Current View
    setCurrentView('submenu', chapter, '');

    // Add type (drugs or advice) to object, to be able to use it in Handlebars
    // and create links with it.
    filtered.tab = tab;

    // Add information about the other tab to the object, to be able to use in Handlebars
    // to show/hide/active tabs
    if (isDataOnOtherTab(chapter, tab)) {
        if (tab === 'advice') {
            filtered.tabClassAdvice = 'selected';
            filtered.tabClassDrugs = '';
        } else if (tab === 'drugs') {
            filtered.tabClassAdvice = '';
            filtered.tabClassDrugs = 'selected';
        }
    } else {
        if (tab === 'advice') {
            filtered.tabClassAdvice = 'selected single';
            filtered.tabClassDrugs = 'disabled';
        } else if (tab === 'drugs') {
            filtered.tabClassAdvice = 'disabled';
            filtered.tabClassDrugs = 'selected single';
        }
    }

    // If the same section is available on both tabs then we re-write the tab links
    // so that a click on a tab takes the user directly to the same section but on the
    // other tab.
    filtered.sameSectionOnOtherTab = false;
    if (section.length > 0 ) {
        if (isSectionAvailableOnOtherTab(chapter, section, tab)) {
            filtered.sameSectionOnOtherTab = section;
        }
    }

    printTemplate(filtered, "#submenu-template", '#submenu-' + tab + '-placeholder');

    // Remove active classes for big screen
    if (tab === 'drugs') {
        $('#submenu-advice')
            .removeClass('active')
            .removeClass('active-submenu');
    } else {
        $('#submenu-drugs')
            .removeClass('active')
            .removeClass('active-submenu');
    }

    // Flip Active Classes
    jqMainMenu.removeClass('active');
    jqSubmenu.addClass('active');
    jqSubmenu.addClass('active-submenu');

    // Remove all previous highlights
    $('.js-submenu-item').removeClass('active-menu-item');

    // If there's a section showing as well
    if (section.length > 0 ) {
        // Set Highlight on current section if there is one.
        jqSubmenu.find('.js-submenu-item').each(function () {
            var jqSelf = $(this);
            if (section === makeUrlSafe(jqSelf.data('section'), false)) {
                jqSelf.addClass('active-menu-item');
            }

        });
    }
}


function setCurrentView(currentView, chapter, details) {
    navObj.currentView = currentView;
    navObj.currentChapter = chapter;
    navObj.currentDetails = details;

    var classesToRemove = 'showing-generic showing-details showing-mainmenu showing-submenu';
    classesToRemove.replace('showing-' + currentView, '');

    $('#app-wrapper')
        .removeClass(classesToRemove)
        .addClass('showing-' + currentView);
}

/**
 * Given a details object, returns an 'URL' if the article is a link to
 * another article or false if not,
 *
 * @param {object} content
 * @returns {string|boolean}
 */
function findLinkToArticle(content) {
    var foundLinkToArticle;
    var hasLinkToArticle = content.children.some(function (field) {
        if (field.name) {
            if (field.name === 'linktoarticle') {
                if (field.value.length > 0) {
                    foundLinkToArticle = field.value;
                    return true;
                }
            }
        }
        return false;
    });

    if (hasLinkToArticle) {
        return foundLinkToArticle;
    } else {
        return false;
    }
}


/* ************************************************************************* *\
 *
 * SHOW SECTION
 *
\* ************************************************************************* */
function showDetails(chapter, details, tab) {

    // TODO - Add error handling to see if chapter and details exist

    // Elements
    var jqDetails = $('#details-' + tab);
    var jqSubmenu = $('#submenu-' + tab);

    // Filter big fat data array to only show current details and print template
	var filtered = getActiveTabData(tab).filter(function (entry) {
		return (makeUrlSafe(entry.title, true) === chapter);
	});

	if (filtered.length === 1 ) {
		filtered = filtered[0].fields.filter(function (entry) {
			return (makeUrlSafe(entry.value, true) === details);
		});
	} else {
		// TODO: Add error handling
	}

    filtered = filtered[0];

    // Figure out if this article is a link to another article break
    // and redirect the user there if that's the case.
    var linkToArticle = findLinkToArticle(filtered);
    if(linkToArticle) {
        routie('/' + cleanInternalURL(linkToArticle));
        return;
    }

    // Adding chapter to object, to be able to pick it up from
    // handlebars. Used to create tab links.
    filtered._urlSafeChapter = chapter;

    // Add information about the other tab to the object, to be able to use in Handlebars
    // to show/hide/active tabs
    if (isSectionAvailableOnOtherTab(chapter, details, tab)) {
        if (tab === 'advice') {
            filtered.tabClassAdvice = 'selected';
            filtered.tabClassDrugs = '';
        } else if (tab === 'drugs') {
            filtered.tabClassAdvice = '';
            filtered.tabClassDrugs = 'selected';
        }
    } else {
        if (tab === 'advice') {
            filtered.tabClassAdvice = 'selected single';
            filtered.tabClassDrugs = 'disabled';
        } else if (tab === 'drugs') {
            filtered.tabClassAdvice = 'disabled';
            filtered.tabClassDrugs = 'selected single';
        }
    }

    filtered = {
        fields: [filtered], // Wrap in 'fields' as this is how we get the data when in preview mode.
        isWeb: true //Set variable to be able to determin if we're in web/preview/mobile app mode in hbs template.
    };

    var hbsTemplate = '';
    if (tab === 'drugs') {
        hbsTemplate = rekData.hbsDrugs;
    } else if (tab === 'advice') {
        hbsTemplate = rekData.hbsAdvice;
    }

	printTemplate(filtered, '', '#details-' + tab + '-placeholder', hbsTemplate);

    // Remove active classes for big screen
    if (tab === 'drugs') {
        $('#details-advice').removeClass('active');
    } else {
        $('#details-drugs').removeClass('active');
    }

    // Flip Active Classes
    jqSubmenu.removeClass('active');
    jqDetails.addClass('active');

    // Set Current View
    setCurrentView('details', chapter, details);

    $('.section-details-advice table').stacktable({minColCount:2}); // Make responsive tables

}


/* ************************************************************************* *\
 *
 * BACK TO
 *
\* ************************************************************************* */
function backToSubmenu() {
    var jqDetails = $('#details-' + navObj.currentTab);
    if (jqDetails.hasClass('active')) {

        // Elements
        var jqSubmenu = $('#submenu-' + navObj.currentTab);

        // Flip Active Classes
        jqSubmenu.addClass('active');
        jqSubmenu.addClass('active-submenu');
        jqDetails.removeClass('active');
    }
}

function backToMainMenu() {
    var jqSubmenu = $('#submenu-' + navObj.currentTab);

    // Elements
    var jqMainMenu = $('#mainmenu');

    // Flip Active Classes
    jqMainMenu.addClass('active');
    jqSubmenu.removeClass('active');
    jqSubmenu.removeClass('active-submenu');

    // Reset current tab to default
    navObj.currentTab = 'drugs';

    // Set currentView
    setCurrentView('mainmenu', '', '');
}


/* ************************************************************************* *\
 *
 * HELPERS
 *
\* ************************************************************************* */

/**
 * Clean user input of #/ and anything before that.
 * @param {string} url
 */
function cleanInternalURL(url) {
    if (url.indexOf('#/') > -1) {
        url = url.substring(url.indexOf('#/') + 2);
    }
    return url;
}

/**
 * Spawn a web worker which takes dataDrugs and dataAdvice and mangle the data
 * and turns the objects into two arrays ready to be feeded into lunr.js
 * search engine.
 *
 * @param dataDrugs
 * @param dataAdvice
 */
function wwMangleSearchData(dataDrugs, dataAdvice){
    // Check if webworker is available.
    if(!window.Worker) {
        return;
    }
    var worker = new Worker("/reklistan-theme/js/webworker-searchdata.js");
    worker.postMessage(JSON.stringify({
        dataDrugs: dataDrugs,
        dataAdvice: dataAdvice
    }));
    worker.onmessage = function(event) {
        var data = (JSON.parse(event.data));
        search.initialize(data.drugs, data.advice);
    };
}

/**
 * Handlebar helpers
 */
function registerHandlebarHelpers() {
    /**
     * Make URL safe URL
     *
     * Usage:
     * {{urlencode variable}}
     *
     */
    Handlebars.registerHelper('urlencode', function(context) {
        var ret = context || '';
        ret = ret.replace(/ /g, '_');
        ret = removeDiacritics(ret);
        ret = encodeURIComponent(ret);

        return new Handlebars.SafeString(ret);
    });

    Handlebars.registerHelper('findLinkToArticle', function(context) {
        var foundLinkToArticle = null;
        var hasLinkToArticle = context.some(function (field) {
            if (field.name) {
                if (field.name === 'linktoarticle') {
                    if (field.value.length > 0) {
                        foundLinkToArticle = field.value;
                        return true;
                    }
                }
            }
            return false;
        });

        if (hasLinkToArticle) {
            return foundLinkToArticle;
        } else {
            return false;
        }
    });

    /**
     * Parse the text and do some replacing
     *
     * Usage:
     * {{markdownify variable}}
     */
    Handlebars.registerHelper('markdownify', function(context) {
        var text = context || '';

        // Convert markdown links to html links
        text = text.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="\$2">\$1</a>');

        // Convert {{replaceable}} with icon
        text = text.replace(/\{\{replaceable\}\}/g, '<span class="replaceable">&#8860;</span>');
        text = text.replace(/\{\{child\}\}/g, '<img src="/reklistan-theme/images/theme/child.png" class="child-icon">');

        // Make sure external links open in new tab/window
        text = text.replace(/href=[\"\'](http[s]?\:\/\/[^\"\']+)[\"\']/gi, 'href="$1" target="_blank"');

        return new Handlebars.SafeString(text);
    });
}

/**
 * Determine if section is available on the other tab.
 * E.g. if on advice/Blod/Trombos, determine if there's a
 * drugs/Blod/Trombos available.
 *
 * @param chapter
 * @param details
 * @param tab
 * @returns {boolean}
 */
function isSectionAvailableOnOtherTab(chapter, details, tab) {
    var filtered = getNoneActiveTabData(tab).filter(function (entry) {
        return (makeUrlSafe(entry.title, true) === chapter);
    });

    if (details.length > 0) {
        if (filtered.length === 1 ) {
            filtered = filtered[0].fields.filter(function (entry) {
                return (makeUrlSafe(entry.value, true) === details);
            });
        } else {
            return false;
        }
    }
    return (filtered.length > 0);
}


/**
 * Checking if there's data available on the other tab.
 *
 * If we're currently seeing 'drugs', check that the first entry on
 * 'advice' actually contains a heading. If so, return true, else return false.
 *
 */
function isDataOnOtherTab(chapter, tab) {
    var filtered = getNoneActiveTabData(tab).filter(function (entry) {
        return (makeUrlSafe(entry.title, true) === chapter);
    });

    if (filtered.length > 0 ) {
        return (filtered[0].fields[0].value.length > 0);
    } else {
        return false;
    }
}


 /**
 * Print Handlebars template
 *
 * @param {Object} data JSON-data
 * @param {string} templateSelector Selector for the element holding the template
 * @param {string} targetSelector Selector for the element where finished DOM should be placed.
 * *@param {string} templateStr Template as HTML, use instead of templateSelector.
 */
function printTemplate(data, templateSelector, targetSelector, templateStr) {
    var templateHTML = '';
    if (templateStr) {
        templateHTML = templateStr;
    } else {
        templateHTML = $(templateSelector).html();
    }

    var target = $(targetSelector);
    var template = Handlebars.compile(templateHTML);
    target.html(template(data));
}

/**
 * Removes all HTML "unsafe" characters from a string.
 *
 * @param str
 * @param dontURIEncode
 * @returns {*|string}
 */
function makeUrlSafe(str, dontURIEncode) {
    var ret = str || '';
    ret = ret.replace(/ /g, '_');
    ret = removeDiacritics(ret);

    if (dontURIEncode === false) {
       ret = encodeURIComponent(ret);
    }

    return ret;
 }

function getActiveTabData(tab) {
    if (tab === 'drugs' ) {
        return rekData.dataDrugs;
    } else if (tab === 'advice') {
        return rekData.dataAdvice;
    }
}

function getNoneActiveTabData(tab) {
    if (tab === 'drugs' ) {
        return rekData.dataAdvice;
    } else if (tab === 'advice') {
        return rekData.dataDrugs;
    }
}

function cleanArray(actual){
    var newArray = [];
    for(var i = 0; i<actual.length; i++){
        if (actual[i]){
            newArray.push(actual[i]);
        }
    }
    return newArray;
}


/* ************************************************************************* *\
 *
 * REMOVE DIACRITICS
 *
\* ************************************************************************* */
 var defaultDiacriticsRemovalap = [
    {'base':'A', 'letters':'\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F'},
    {'base':'AA','letters':'\uA732'},
    {'base':'AE','letters':'\u00C6\u01FC\u01E2'},
    {'base':'AO','letters':'\uA734'},
    {'base':'AU','letters':'\uA736'},
    {'base':'AV','letters':'\uA738\uA73A'},
    {'base':'AY','letters':'\uA73C'},
    {'base':'B', 'letters':'\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181'},
    {'base':'C', 'letters':'\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E'},
    {'base':'D', 'letters':'\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779'},
    {'base':'DZ','letters':'\u01F1\u01C4'},
    {'base':'Dz','letters':'\u01F2\u01C5'},
    {'base':'E', 'letters':'\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E'},
    {'base':'F', 'letters':'\u0046\u24BB\uFF26\u1E1E\u0191\uA77B'},
    {'base':'G', 'letters':'\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E'},
    {'base':'H', 'letters':'\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D'},
    {'base':'I', 'letters':'\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197'},
    {'base':'J', 'letters':'\u004A\u24BF\uFF2A\u0134\u0248'},
    {'base':'K', 'letters':'\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2'},
    {'base':'L', 'letters':'\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780'},
    {'base':'LJ','letters':'\u01C7'},
    {'base':'Lj','letters':'\u01C8'},
    {'base':'M', 'letters':'\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C'},
    {'base':'N', 'letters':'\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4'},
    {'base':'NJ','letters':'\u01CA'},
    {'base':'Nj','letters':'\u01CB'},
    {'base':'O', 'letters':'\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C'},
    {'base':'OI','letters':'\u01A2'},
    {'base':'OO','letters':'\uA74E'},
    {'base':'OU','letters':'\u0222'},
    {'base':'OE','letters':'\u008C\u0152'},
    {'base':'oe','letters':'\u009C\u0153'},
    {'base':'P', 'letters':'\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754'},
    {'base':'Q', 'letters':'\u0051\u24C6\uFF31\uA756\uA758\u024A'},
    {'base':'R', 'letters':'\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782'},
    {'base':'S', 'letters':'\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784'},
    {'base':'T', 'letters':'\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786'},
    {'base':'TZ','letters':'\uA728'},
    {'base':'U', 'letters':'\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244'},
    {'base':'V', 'letters':'\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245'},
    {'base':'VY','letters':'\uA760'},
    {'base':'W', 'letters':'\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72'},
    {'base':'X', 'letters':'\u0058\u24CD\uFF38\u1E8A\u1E8C'},
    {'base':'Y', 'letters':'\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE'},
    {'base':'Z', 'letters':'\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762'},
    {'base':'a', 'letters':'\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250'},
    {'base':'aa','letters':'\uA733'},
    {'base':'ae','letters':'\u00E6\u01FD\u01E3'},
    {'base':'ao','letters':'\uA735'},
    {'base':'au','letters':'\uA737'},
    {'base':'av','letters':'\uA739\uA73B'},
    {'base':'ay','letters':'\uA73D'},
    {'base':'b', 'letters':'\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253'},
    {'base':'c', 'letters':'\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184'},
    {'base':'d', 'letters':'\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A'},
    {'base':'dz','letters':'\u01F3\u01C6'},
    {'base':'e', 'letters':'\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD'},
    {'base':'f', 'letters':'\u0066\u24D5\uFF46\u1E1F\u0192\uA77C'},
    {'base':'g', 'letters':'\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F'},
    {'base':'h', 'letters':'\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265'},
    {'base':'hv','letters':'\u0195'},
    {'base':'i', 'letters':'\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131'},
    {'base':'j', 'letters':'\u006A\u24D9\uFF4A\u0135\u01F0\u0249'},
    {'base':'k', 'letters':'\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3'},
    {'base':'l', 'letters':'\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747'},
    {'base':'lj','letters':'\u01C9'},
    {'base':'m', 'letters':'\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F'},
    {'base':'n', 'letters':'\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5'},
    {'base':'nj','letters':'\u01CC'},
    {'base':'o', 'letters':'\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275'},
    {'base':'oi','letters':'\u01A3'},
    {'base':'ou','letters':'\u0223'},
    {'base':'oo','letters':'\uA74F'},
    {'base':'p','letters':'\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755'},
    {'base':'q','letters':'\u0071\u24E0\uFF51\u024B\uA757\uA759'},
    {'base':'r','letters':'\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783'},
    {'base':'s','letters':'\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B'},
    {'base':'t','letters':'\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787'},
    {'base':'tz','letters':'\uA729'},
    {'base':'u','letters': '\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289'},
    {'base':'v','letters':'\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C'},
    {'base':'vy','letters':'\uA761'},
    {'base':'w','letters':'\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73'},
    {'base':'x','letters':'\u0078\u24E7\uFF58\u1E8B\u1E8D'},
    {'base':'y','letters':'\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF'},
    {'base':'z','letters':'\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763'}
];

var diacriticsMap = {};
for (var i=0; i < defaultDiacriticsRemovalap.length; i++){
    var letters = defaultDiacriticsRemovalap[i].letters.split("");
    for (var j=0; j < letters.length ; j++){
        diacriticsMap[letters[j]] = defaultDiacriticsRemovalap[i].base;
    }
}

function removeDiacritics (str) {
    return str.replace(/[^\u0000-\u007E]/g, function(a){
       return diacriticsMap[a] || a;
    });
}


/* ************************************************************************* *\
 *
 * SEARCH
 *
\* ************************************************************************* */
var search = {

    _prevSearch: '',
    _splitter: '|',

    initialize: function(searchDataDrugs, searchDataAdvice) {
        search.index = lunr(function () {
            this.field('chapter', { boost: 20 });
            this.field('section', { boost: 10 });
            this.field('body');
            this.ref('id');

            searchDataDrugs.forEach(function (item) {
                this.add({
                    id: 'drugs' + search._splitter + item.chapter + search._splitter + item.section,
                    chapter: item.chapter,
                    section: item.section,
                    body: item.content
                });
            }, this);

            searchDataAdvice.forEach(function (item) {
                this.add({
                    id: 'advice' + search._splitter + item.chapter + search._splitter + item.section,
                    chapter: item.chapter,
                    section: item.section,
                    body: item.content
                });
            }, this);
        });

        if (!window.isSignedIn) {
            storage.set({
                searchIndex: search.index
            });
        }

        $('.js-search-input-container').addClass('on');
    },

    loadIndex: function(searchIndex) {
        search.index = lunr.Index.load(searchIndex);
        $('.js-search-input-container').addClass('on');
    },

    search: function (searchFor) {

        var jqMainMenu = $('#mainmenu');
        var jqClearButton = $('.js-search-clear');
        var jqSearchResultsHeader = $('.jq-search-results-heading');

        if (searchFor.length > 0) {
            jqClearButton.fadeIn(250);

        } else {
            jqClearButton.fadeOut(250);
        }

        if (searchFor.length < 3) {
            search._prevSearch = searchFor;
            jqMainMenu.removeClass('showing-searchresults');
            jqSearchResultsHeader.slideUp();
        } else if((searchFor !== search._prevSearch)) {
            search._prevSearch = searchFor;

            jqSearchResultsHeader.slideDown(350);


            jqMainMenu.addClass('showing-searchresults');

            var unicodeNormalized = lunr.unicodeNormalizer(searchFor);
            var matches = search.index.search(unicodeNormalized + ' ' + '*' + unicodeNormalized + '*') // with or without asterisks
                .map(function (item) {
                    var fields = item.ref.split(search._splitter);
                    return {
                        type: fields[0],
                        link: fields[0] + '/' + makeUrlSafe(fields[1]) + '/' + makeUrlSafe(fields[2]),
                        chapter: fields[1],
                        section: fields[2]
                    };

            });

            printTemplate(matches, "#search-results-template", '#search-results-placeholder');

        }
    }
};

/* ************************************************************************* *\
 *
 * SEARCH
 * THIS IS A MODIFIER VERSION OF STACKTABLE.JS
 *
 * - Only prints content if there's an actual content, else print a divider
 * - added setting 'minColCount', for setting when responsive table should kick in.
 * - adding class 'stacktable-original' to the original table.
 *
 *
 * stacktable.js
 * Author & copyright (c) 2012: John Polacek
 * Dual MIT & GPL license
 *
 * Page: http://johnpolacek.github.com/stacktable.js
 * Repo: https://github.com/johnpolacek/stacktable.js/
 *
 * jQuery plugin for stacking tables on small screens
 *
 \* ************************************************************************* */
(function($) {

  $.fn.stacktable = function(options) {
    var $tables = this,
        defaults = {
            id:'stacktable',
            hideOriginal:false,
            minColCount: 0
        },
        settings = $.extend({}, defaults, options),
        stacktable;

    return $tables.each(function() {

        var $table = $(this);
        var $topRow = $table.find('tr').first();
        var columnCount = $topRow.find('td, th').length;

        if (columnCount > settings.minColCount && $table.hasClass('no-responsive') === false) {

            $table.addClass('stacktable-original');

            var $stacktable = $('<table class="'+settings.id+'"><tbody></tbody></table>');
            if (typeof settings.myClass !== undefined) $stacktable.addClass(settings.myClass);
            var markup = '';

            $table.find('tr').each(function(index) {
            markup += '<tr>';
            // for the first row, top left table cell is the head of the table
            if (index===0) {
              markup += '<tr><th class="st-head-row st-head-row-main" colspan="2">'+$(this).find('th,td').first().html()+'</th></tr>';
            }
            // for the other rows, put the left table cell as the head for that row
            // then iterate through the key/values
            else {
              $(this).find('td').each(function(index) {
                if (index===0) {

                  if ($(this).html().replace('&nbsp;', '').trim().length > 0) {
                    markup += '<tr><th class="st-head-row" colspan="2">'+ $(this).html() +'</th></tr>';
                  } else {
                    markup += '<tr><td class="st-divider" colspan="2"></td></tr>';
                  }

                } else {
                  if ($(this).html() !== ''){
                    markup += '<tr>';
                    if ($topRow.find('td,th').eq(index).html()){
                      markup += '<td class="st-key">'+$topRow.find('td,th').eq(index).html()+'</td>';
                    } else {
                      markup += '<td class="st-key"></td>';
                    }
                    markup += '<td class="st-val">'+$(this).html()+'</td>';
                    markup += '</tr>';
                  }
                }
              });
            }
            });
            $stacktable.append($(markup));
            $table.before($stacktable);
            if (settings.hideOriginal) $table.hide();

        }

    });
  };

}(jQuery));
