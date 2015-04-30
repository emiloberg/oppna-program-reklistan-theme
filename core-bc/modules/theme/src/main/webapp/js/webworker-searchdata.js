'use strict';
self.onmessage = function(event) {
	var data = JSON.parse(event.data);
	self.postMessage(JSON.stringify({
		drugs: flattenArticles(data.dataDrugs),
		advice: flattenArticles(data.dataAdvice)
	}));
	self.close();
};

function flattenArticles(data) {
	var searchIndex = data.map(function (chapter) {
		return chapter.fields.map(function (section) {
			if (section.value) {
				return {
					chapter: chapter.title,
					section: section.value,
					content: concatenateChildren(section, true).join(' ')
				};
			}
		})
	});

	// Flatten Array
	searchIndex = searchIndex.reduce(function(a, b) {
		return a.concat(b);
	});

	// Remove null entries (articles without data)
	searchIndex = searchIndex.filter(function (entry) {
		return entry;
	});

	return searchIndex;
}

function concatenateChildren(node, isFirst, tokens) {
	if (tokens === undefined) {
		tokens = [];
	}

	if (node.value && node.value !== 'true' && isFirst !== true) {
		tokens.push(cleanHTML(node.value));
	}
	node.children.forEach(function(child) {
		concatenateChildren(child, false, tokens);
	});
	return tokens;
}

function cleanHTML(str) {
	return str.replace(/(<([^>]+)>)/ig, '');
}
