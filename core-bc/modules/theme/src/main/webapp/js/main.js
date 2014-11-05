/**
 * Initialize things
 *
 */
$(function() {
	registerEvents();
	printTemplate(recDrugs, "#main-menu-template", '#main-menu-placeholder'); //Menu

});

/**
 * Mangle data + template and create output
 *
 * @param {string} data JSON-data
 * @param {string} templateSelector Selector for the element holding the template
 * @param {string} targetSelector Selector for the element where finished DOM should be placed.
 */
function printTemplate(data, templateSelector, targetSelector) {
	var templateHTML = $(templateSelector).html();
	var target = $(targetSelector);
	var template = Handlebars.compile(templateHTML);
	target.html(template(data));
//	showNew(targetSelector);
}

/**
 * Register Events.
 *
 */
function registerEvents() {

	$('body')
	.on( "click", ".mainmenu-item", function(e) {
		showSubmenu(this);
		e.preventDefault();
	})
	.on( "click", ".submenu-item", function(e) {
		showSection(this);
		e.preventDefault();
	})
	.on( "click", "#appbar-menu-button", function(e) {
		backMenu();
		e.preventDefault();
	});
}



/**
 * SHOW SUBMENU
 *
 */
function showSubmenu(elClicked) {

    // Elements
    var jqSubmenu = $('#submenu');
    var jqAppBody = $('.app-body');
    var jqClicked = $(elClicked);
    var jqMenuButton = $('#appbar-menu-button');

	// Filter big fat data array to only show current chapter and print template
	var clickedChapter = jqClicked.data('chapter');
	var filtered = recDrugs.filter(function (entry) {
		return (entry.chapter[0].fieldValue === clickedChapter);
	});
	printTemplate(filtered, "#recdrugs-menu-template", '#recdrugs-menu-placeholder');

    // Add classes
    jqClicked.addClass('selected-mainmenu-item');
    jqAppBody.addClass('hide-mainmenu');
    jqSubmenu.addClass('visible');

    // Calculate translation
    var clickedTop = jqClicked.offset().top;
    var appBodyTop = jqAppBody.offset().top;
    var translateClicked = appBodyTop - clickedTop + 60;

    // Translate clicked element
    jqClicked.css('-webkit-transform', 'translateY(' + translateClicked +'px)'); // TODO: add support for other browsers
    jqClicked.css('transform', 'translateY(' + translateClicked +'px)');

    jqClicked.offsetHeight; // Force a redraw so the animation works

    // Add translation as data attributes because if user clicks on a submenu item and we remove the translate
    // if the user later want's to return back to the submenu, we need to re-set it. Therefor we save it here.
    jqClicked.data('translate', translateClicked);

    // Change menu icon
    var jqMenuIcon = $('#appbar-menu-button i');

    // Add data to menu button (to be able to navigate back)
    jqMenuButton.data('navbackfrom', 'submenu');

    jqMenuIcon.removeClass('md-menu');
    jqMenuIcon.addClass('md-close');
}

/**
 * SHOW SECTION
 *
 */
function showSection(elClicked) {
    // Elements
    var jqAppBody = $('.app-body');
    var jqClicked = $(elClicked);
    var jqSection = $('#section');
    var jqSelectedMainMenuItem = $('.selected-mainmenu-item');
    var jqMenuButton = $('#appbar-menu-button');


    // Filter big fat data array to only show current section and print template
    var curChapter = jqClicked.data('chapter');
    var curSection  = jqClicked.data('section');

	var filtered = recDrugs.filter(function (entry) {
		return (entry.chapter[0].fieldValue === curChapter);
	});
	
	if (filtered.length === 1 ) {
		filtered = filtered[0].heading.filter(function (entry) {
			return (entry.fieldValue === curSection);
		});
	} else {
		// TODO: Add error handling
	}
	printTemplate(filtered, "#recdrugs-section-template", '#recdrugs-section-placeholder');


    // Add classes
    jqClicked.addClass('selected-submenu-item');
    jqAppBody.addClass('hide-submenu');
    jqSection.addClass('visible');

    // Calculate offset
    var clickedTop = jqClicked.offset().top;
    var appBodyTop = jqAppBody.offset().top;
    var translateClicked = appBodyTop - clickedTop + 60;

    // Translate clicked element
    jqClicked.css('-webkit-transform', 'translateY(' + translateClicked +'px)'); // TODO: add support for other browsers
    jqClicked.css('transform', 'translateY(' + translateClicked +'px)');


    // Hide selected main menu item (which is used as title now)
    jqSelectedMainMenuItem.css('-webkit-transform', ''); // TODO: add support for other browsers
    jqSelectedMainMenuItem.css('transform', '');
    jqSelectedMainMenuItem.addClass('placeholder-selected-mainmenu-item');
    jqSelectedMainMenuItem.removeClass('selected-mainmenu-item');

    // Add data to menu button (to be able to navigate back)
    jqMenuButton.data('navbackfrom', 'section');

}


/**
 * Go back in menu
 *
 */
function backMenu() {
	// Elements
	var jqMenuButton = $('#appbar-menu-button');
	var backFrom = jqMenuButton.data('navbackfrom');

	if (backFrom === 'section') {
		reverToSubMenu();
	} else if (backFrom === 'submenu') {
		revertToMainMenu();
	}
}

function reverToSubMenu() {
	var jqMenuButton = $('#appbar-menu-button');
	var jqSelectedSubMenuItem = $('.selected-submenu-item');
	var jqSection = $('#section');
	var jqAppBody = $('.app-body');

	var jqSelectedMainMenuItem = $('.placeholder-selected-mainmenu-item');

	// Remove Classes
	jqSection.removeClass('visible');

	// Re-set the correct class on the selected submenu item
	jqSelectedMainMenuItem.addClass('selected-mainmenu-item');
	jqSelectedMainMenuItem.removeClass('placeholder-selected-mainmenu-item');

	// Re-set the translation on the main menu
	var translateMainMenu = jqSelectedMainMenuItem.data('translate');
	jqSelectedMainMenuItem.css('-webkit-transform', 'translateY(' + translateMainMenu +'px)'); // TODO: add support for other browsers
	jqSelectedMainMenuItem.css('transform', 'translateY(' + translateMainMenu +'px)');

	// Remove Transform
    jqSelectedSubMenuItem.css('-webkit-transform', ''); // TODO: add support for other browsers
    jqSelectedSubMenuItem.css('transform', '');
    jqSelectedSubMenuItem.offsetHeight; // Force a redraw so the browser doesn't skip the animation	

	// Set data to menu button (to be able to navigate back)
	jqMenuButton.data('navbackfrom', 'submenu');


    setTimeout(function() {
        jqAppBody.removeClass('hide-submenu');
        jqSelectedSubMenuItem.removeClass('selected-submenu-item');
    }, 250);
}

/**
 * RETURN FROM SUB MENU TO MAIN MENU
 *
 */
function revertToMainMenu() {
	var jqMenuButton = $('#appbar-menu-button');

    // Remove classes
    var jqCurrentSelectMainmenuItem = $(".selected-mainmenu-item");
    jqCurrentSelectMainmenuItem.css('-webkit-transform', ''); // TODO: add support for other browsers
    jqCurrentSelectMainmenuItem.css('transform', '');
    jqCurrentSelectMainmenuItem.offsetHeight; // Force a redraw so the browser doesn't skip the animation

    // Change menu icon
    var jqMenuIcon = $('#appbar-menu-button i');
    jqMenuIcon.removeClass('md-close');
    jqMenuIcon.addClass('md-menu');
    
    var jqSubmenu = $('#submenu');
    jqSubmenu.removeClass('visible');

    // Add data to menu button (to be able to navigate back)
    jqMenuButton.data('navbackfrom', '');

    setTimeout(function() {
        var jqAppBody = $('.app-body');
        jqAppBody.removeClass('hide-mainmenu');
        jqCurrentSelectMainmenuItem.removeClass('selected-mainmenu-item');
    }, 250);
}