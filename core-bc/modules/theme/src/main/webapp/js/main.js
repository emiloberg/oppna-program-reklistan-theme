/**
 * Initialize things
 *
 */
$(function() {
	registerEvents();
//	printTemplate(recDrugs, "#main-menu-template", '#main-menu-placeholder'); //Menu

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
	showNew(targetSelector);
}

/**
 * Register Events.
 *
 */
function registerEvents() {
	$( "body" ).on( "click", ".main-menu-link", function(e) {
		showRecDrugsMenu($(this).data("link"), this);
		e.preventDefault();
	}).on( "click", ".recdrugs-link", function(e) {
		showRecDrugsDetails($(this).data("link"), $(this).data("chapter"));
		e.preventDefault();
	}).on( "click", ".temp-go", function(e) {
		tempGo();
		e.preventDefault();
	}).on( "click", ".temp-reset", function(e) {
		tempResetClasses();
		e.preventDefault();
	});
}

function tempGo() {
	console.log('Going');
	$($('.list-item').get().reverse()).each(function () {
//	$('.list-item').each(function () {
		$(this)
			.css('position', 'absolute')
			.css('transform', 'translate(0, ' + $(this).offset().top + 'px) rotate(0deg)');
	});
}

function tempResetClasses() {
	$('*').each(function () {
		$(this)
			.removeClass('push-down')
			.removeClass('push-up');
	})
}

/**
 * Show Recommended Drugs Menu
 *
 * @param {string} chapter Name of the chapter to be shown.
 *
 */
function showRecDrugsMenu(clickedChapter, clickedEl) {



	var clickedElement = $(clickedEl);


// 	// Get height where submenu should start its transition
// 	var rowHeight = clickedElement.outerHeight(true);
// 	var clickedFieldNumber = clickedElement.data('fieldnumber') + 1;
// 	var startNextFrameAt = rowHeight * clickedFieldNumber;








// 	var clickedElementOffset = clickedElement.offset().top;
// 	var newMoveUp = clickedElementOffset + rowHeight + 10;
// 	var transitionTime = clickedFieldNumber * 0.05;
	

// 	console.dir(clickedElementOffset);
// 	console.dir(rowHeight);

// // 	$('#recdrugs-placeholder')
// // 		//.css('transform', 'translate(0, ' + startNextFrameAt + 'px) rotate(0deg)')
// // //		.addClass('move-up-menu');

// // 		.addClass('start-' + clickedFieldNumber);


// // 		window.setTimeout(function () {
// // 			$('#recdrugs-placeholder').addClass('ended');
// // 	}, 0);




// 	$('#recdrugs-placeholder')
// 		.css('transform', 'translate(0, ' + (startNextFrameAt) + 'px) rotate(0deg)');
// //		.addClass('move-up-menu');

// 	// Add .push-up or .push-down to each list element.
// 	var pushClass = 'push-up';
// 	$('.list-item').each(function () {
// 		var self = $(this);
// 		var thisChapter = self.data("link");

// 		if (pushClass === 'push-down') {
// 			self.addClass(pushClass);
// 		} else {
// 			self.css('transition', 'transform ' + transitionTime + 's linear 0s');
// 			self.css('transform', 'translate(0, -' + newMoveUp + 'px) rotate(0deg)');
// 			self.css('-webkit-transition', '-webkit-transform ' + transitionTime + 's linear 0s');
// 			self.css('-webkit-transform', 'translate(0, -' + newMoveUp + 'px) rotate(0deg)');			
// 			//
// 		}

// 		if (thisChapter === clickedChapter) {
// 			pushClass = 'push-down';
// 		}
// 	});












	// // Add .push-up or .push-down to each list element.
	// var pushClass = 'push-up';
	// $('.list-item').each(function () {
	// 	var self = $(this);
	// 	var thisChapter = self.data("link");
	// 	self.addClass(pushClass);
	// 	if (thisChapter === clickedChapter) {
	// 		pushClass = 'push-down';
	// 	}
	// });


//	hideMainMenu(chapter);
	var filtered = recDrugs.filter(function (entry) {
		return (entry.chapter[0].fieldValue === clickedChapter);
	});

	if (filtered.length === 1 ) {
		printTemplate(filtered, "#recdrugs-menu-template", '#recdrugs-placeholder');
//		printTemplate(filtered, "#recdrugs-menu-template", '#recdrugs-menu-placeholder-' + clickedElement.data('fieldnumber'));
	} else {
		// TODO: Add error handling
	}
}

/**
 * Show Recommended Drugs Details
 *
 * @param {string} section Name of the section to be shown.
 * @param {string} chapter Name of the chapter to be shown.
 *
 */
function showRecDrugsDetails(section, chapter) {
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

	printTemplate(filtered, "#recdrugs-details-template", '#recdrugs-details-placeholder');
}



/** ************************************************************************ *\
 * 
 *                             DOM MANIPULATIONS
 *
\* ************************************************************************* */

function showNew(selector) {
//	$(selector).slideDown();
}

// function hideMainMenu(clickedChapter) {

// 	var listItems = $('#main-menu').find('.list-item');

// 	var pushDirection = 'up';

// 	var listItemsAndPosition = $(listItems).map(function () {
// 		var self = $(this);
// 		var clicked = false;

// 		if (self.parent().data("link") === clickedChapter) {
// 			pushDirection = 'down';
// 			clicked = true;
// 		}

// 		var push;

// 		if (pushDirection === 'up') {
// 			push = self.position().top - 200;
// 		} else {
// 			push = self.position().top + 200;
// 		}

// 		return {
// 			element: self,
// 			top: self.position().top,
// 			left: self.position().left,
// 			width: self.width(),
// 			push: push,
// 			clicked: clicked
// 		};

// 	});


// 	$(listItemsAndPosition).each(function () {

// 		if (this.clicked) {
// 			$(this.element)
// 				.css('position', 'absolute')
// 				.css('top', this.top + 'px')
// 				.css('left', this.left + 'px')
// 				.css('width', this.width + 'px')
// 				.css('background-color', 'transparent')
// 				.animate({
// 					top: 0,
// 					opacity: 0.5
// 					}, 500, 'swing', function () {
// 					$(this).hide();
// 				});
// 		} else {
// 			$(this.element)
// 				.css('position', 'absolute')
// 				.css('top', this.top + 'px')
// 				.css('left', this.left + 'px')
// 				.css('width', this.width + 'px')
// 				.animate({ top: this.push, opacity: 0.9 }, 300, 'swing', function () {
// 					$(this).hide();
// 				});

// 		}
// 	});



// }






/**
 * CODEPEN
 *
 */

