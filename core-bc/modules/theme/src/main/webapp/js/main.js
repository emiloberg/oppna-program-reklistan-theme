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
	 $( "body" ).on( "click", ".main-menu-link:not(.has-submenu)", function(e) {
	 	showRecDrugsMenu($(this).data("link"), this);
	 	e.preventDefault();
	})
	 .on( "click", ".recdrugs-link", function(e) {
	 	showRecDrugsDetails($(this).data("link"), $(this).data("chapter"), this);
	 	e.preventDefault();
	 });
	 //.on( "click", ".temp-go", function(e) {
	// 	tempGo();
	// 	e.preventDefault();
	// }).on( "click", ".temp-reset", function(e) {
	// 	tempResetClasses();
	// 	e.preventDefault();
	// });
}



/**
 * Show Recommended Drugs Menu
 *
 * @param {string} chapter Name of the chapter to be shown.
 *
 */
function showRecDrugsMenu(clickedChapter, clickedEl) {
	$('#main-menu-placeholder').addClass('submenu-visible');

	var filtered = recDrugs.filter(function (entry) {
		return (entry.chapter[0].fieldValue === clickedChapter);
	});

	console.dir(filtered);

	var jqClicked = $(clickedEl);

	jqClicked.addClass('has-submenu');
	printTemplate(filtered, "#recdrugs-menu-template", '#recdrugs-menu-placeholder-' + jqClicked.data('fieldnumber'));

	var clickedRect = clickedEl.getBoundingClientRect();
	jqClicked.css('transform','translateY(-' + clickedRect.top + 'px)');

}

/**
 * Show Recommended Drugs Details
 *
 * @param {string} section Name of the section to be shown.
 * @param {string} chapter Name of the chapter to be shown.
 *
 */
function showRecDrugsDetails(section, chapter, clickedEl) {
	$('#main-menu-placeholder').addClass('details-visible');

	var filtered = recDrugs.filter(function (entry) {
		return (entry.chapter[0].fieldValue === chapter);
	});
	
	if (filtered.length === 1 ) {
		filtered = filtered[0].heading.filter(function (entry) {
			return (entry.fieldValue === section);
		});
	} else {
		// TODO: Add error handling
	}

	var jqClicked = $(clickedEl);

	jqClicked.addClass('has-details');
	printTemplate(filtered, "#recdrugs-details-template", '#recdrugs-details-placeholder-' +  jqClicked.data('fieldnumber'));

	var clickedRect = clickedEl.getBoundingClientRect();
	jqClicked.css('transform','translateY(-' + clickedRect.top + 'px)');


}


