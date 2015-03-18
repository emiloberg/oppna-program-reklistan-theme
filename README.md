# oppna-program-reklistan-theme

**This is a WIP readme.**

This theme is used by [reklistan.vgregion.se](http://reklistan.vgregion.se). However, it's a little bit more than your average theme. The site is a ["headless website"](https://pantheon.io/blog/headless-websites-whats-big-deal), meaning that Liferay serves all data as JSON and the actual rendering is done client side.

Currently "JSON" is served by placing a few Asset Publishers on the page, set to display the entries with an ADT which outputs `<script>var data = { ... }</script>`. This will be changed to be fetched from an actual portlet (which outputs JSON).