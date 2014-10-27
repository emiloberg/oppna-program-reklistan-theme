$(function() {
	registerHandlebarHelpers();
	doHandlebar(bigFatData, "#some-template", '#my-placeholder'); //Big fat everything
	doHandlebar(bigFatData, "#menu-template", '#menu-placeholder'); //Menu

});



function registerHandlebarHelpers() {
	Handlebars.registerHelper('check', function(thisEntry, options) {
		if(thisEntry === options.hash.eq) {
			return options.fn(this);
		}
	});
}

function doHandlebar(data, templateSelector, targetSelector) {
	var templateHTML = $(templateSelector).html();
	var target = $(targetSelector);
	var template = Handlebars.compile(templateHTML);
	target.html(template(data));
}
