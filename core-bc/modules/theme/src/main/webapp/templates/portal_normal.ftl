<#include init />

<#assign txtDrugs="Rek. läkemedel" />
<#assign txtAdvice="Terapiråd" />
<#assign txtResources="Övrigt" />
<#assign txtNews="Nyheter" />

<#assign txtFeedback="Tyck till" />
<#assign txtFeedbackURL="#/resource/Tyck_till_om_REK-Appen" />

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7 ${root_css_class}" dir="<@liferay.language key="lang.dir" />" lang="${w3c_language_id}"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8 ${root_css_class}" dir="<@liferay.language key="lang.dir" />" lang="${w3c_language_id}"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9 ${root_css_class}" dir="<@liferay.language key="lang.dir" />" lang="${w3c_language_id}"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js ${root_css_class}" dir="<@liferay.language key="lang.dir" />" lang="${w3c_language_id}"> <!--<![endif]-->

<head>
	<title>${the_title}</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

	<link href="/reklistan-theme/images/favicon.ico" rel="Shortcut Icon">
	<link class="lfr-css-file" href="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/css/custom.css?browserId=${browserId}&themeId=${themeDisplay.themeId}&languageId=${themeDisplay.languageId}&b=${liferayBuild}&t=${.now?datetime?iso_local}" rel="stylesheet" type="text/css">

	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/lib/respond/dest/respond.min.js" type="text/javascript"></script>
	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/lib/es5-shim/es5-shim.min.js" type="text/javascript"></script>
	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/custom-lib/jquery/jquery-1.11.2.min.js" type="text/javascript"></script>
	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/lib/modernizr/modernizr.js" type="text/javascript"></script>
	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/lib/handlebars/handlebars.min.js" type="text/javascript"></script>
	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/lib/svg4everybody/svg4everybody.ie8.min.js" type="text/javascript"></script>
	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/lib/fastclick/lib/fastclick.js" type="text/javascript"></script>
	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/js/main.js?browserId=${browserId}&languageId=${themeDisplay.languageId}&b=${liferayBuild}&t=${.now?datetime?iso_local}" type="text/javascript"></script>
	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/lib/routie/dist/routie.min.js" type="text/javascript"></script>
	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/lib/lunr.js/lunr.min.js" type="text/javascript"></script> 
	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/custom-lib/swag/swag.min.js" type="text/javascript"></script>

	<link href='https://fonts.googleapis.com/css?family=Roboto:500,900italic,900,400italic,100,700italic,300,700,500italic,100italic,300italic,400' rel='stylesheet' type='text/css'>
</head>

<body class="${css_class}">


<#-- HBS SEARCH RESULTS -->
<script id="search-results-template" type="text/x-handlebars-template">
	<div class="search-results-container">
		{{#each this}}
			<a href="#/{{link}}" class="list-item js-search-results-item item-{{@index}}">

				{{#is type 'drugs'}}
					<div class="list-item-icon">
						<span class="icomoon-drug icomoon-list-icon icon-15x"></span>
					</div>
				{{/is}}

				<div class="list-item-text">
					{{section}} <span class="search-chapter">({{chapter}})</span>
				</div>

			</a>
		{{/each}}
	  {{#unless this}}
	  <div class="list-item item-0">
  		<div class="list-item-text search-no-mathes-text">
  			Din sökning matchade inga dokument
  		</div>
	  </div>
	  {{/unless}}		
	</div>
</script>


<#-- HBS MAIN MENU -->
<script id="main-menu-template" type="text/x-handlebars-template">
	<div class="search-wrapper view-topper">
		<div class="second-bar">
			<div class="search-input-container js-search-input-container">
				<input type="text" class="search-input js-search-input" placeholder="Sök" autocorrect="off">
				<a href="#" class="search-clear js-search-clear">Rensa <i class="flaticon-close47"></i></a>
			</div>

			<div class="search-results-heading jq-search-results-heading">
				<div class="tabs tabs">
					<a href="#" class="tab single">Sökresultat</a>
				</div>
			</div>
		</div>
	</div>
	<div id="search-results-placeholder"></div>
	<div class="main-menu-logo">
		<img src="${images_folder}/theme/vgr-w400-c.png">
	</div>
	{{#if news}}
		<div class="main-menu-news-container js-main-menu-news-container lt-medium">
			<div class="list-item list-item-heading">
				<div class="list-item-text">
					${txtNews}
				</div>
			</div>
			{{#each news}}
				{{#if externallink.0.fieldValue}}
					<a href="{{externallink.0.fieldValue}}" target="_blank" class="list-item item-{{@index}}">
					<div class="list-item-icon">
						<i class="flaticon-external1"></i>
					</div>
				{{/if}}
				{{#unless externallink.0.fieldValue}}
					<a href="#/news/{{_entryId}}" class="list-item item-{{@index}}">
				{{/unless}}
				<div class="list-item-text">
					{{_title}}
				</div>
				</a>
			{{/each}}
		</div>
	{{/if}}
	<div class="mainmenu-area-items">
		<div class="list-item list-item-heading lt-medium">
			<div class="list-item-text">
				Områden
			</div>
		</div>
		{{#each areas}}
			<a href="#/{{#isnt hasDrugs true}}advice{{/isnt}}{{#is hasDrugs true}}drugs{{/is}}/{{urlencode _title}}" class="list-item js-mainmenu-item item-{{@index}}">
				<div class="list-item-text">
					{{_title}}
				</div>
			</a>
		{{/each}}
	</div>
</script>


<#-- HBS SUBMENU -->
<script id="submenu-template" type="text/x-handlebars-template">
	<div class="view-topper">
		<div class="second-bar">
			<h2 class="second-bar-title">{{title}}</h2>
		</div>
		<div class="js-submenu-tabs tabs">
			<a href="#/drugs/{{urlencode title}}" class="tab js-tab-item js-tab-item-drugs {{tabClassDrugs}}">${txtDrugs}</a>
			<a href="#/advice/{{urlencode title}}" class="tab js-tab-item js-tab-item-advice {{tabClassAdvice}}">${txtAdvice}</a>
		</div>
	</div>
	{{#each fields}}
		<a href="#/{{@root/tab}}/{{urlencode @root/title}}/{{urlencode value}}" class="list-item submenu-item item-{{@index}} js-submenu-item">
			{{#is children.0.children.0.value 'physical-exercise'}}
				<div class="list-item-icon">
					<i class="flaticon-man460 icon-15x"></i>
				</div>
			{{/is}}
			<div class="list-item-text submenu-item-text">{{value}}</div>
		</a>
	{{/each}}
</script>


<#-- HBS NEWS -->
<script id="news-template" type="text/x-handlebars-template">
	{{#each this}}
		<div class="view-topper">
			<div class="second-bar">
				<h2 class="second-bar-title">{{title}}</h2>
			</div>
		</div>
		<div class="section-details">
			{{{content}}}
		</div>
	{{/each}}
</script>


<#-- HBS FILLER -->
<script id="filler-template" type="text/x-handlebars-template">
	<div class="details-inner">
		<div class="vgr-logo">
			<img src="${images_folder}/theme/vgr-w400-c.png">
		</div>
		{{#if news}}
			<div class="link-list">
				<h2>${txtNews}</h2>
				<ul>
					{{#each news}}
						{{#if externallink.0.fieldValue}}
							<li><a href="{{externallink.0.fieldValue}}" target="_blank"><i class="flaticon-external1"></i> {{_title}}</a></li>
						{{/if}}
						{{#if internallink.0.fieldValue}}
							<li><a href="{{internallink.0.fieldValue}}"><i class="flaticon-keyboard53"></i> {{_title}}</a></li>
						{{/if}}						
						{{#unless externallink.0.fieldValue}}
							{{#unless internallink.0.fieldValue}}
								<li><a href="#/news/{{_entryId}}"><i class="flaticon-keyboard53"></i> {{_title}}</a></li>
							{{/unless}}
						{{/unless}}
					{{/each}}
				</ul>

			</div>
		{{/if}}
		{{#if resources}}
			<div class="link-list">
				<h2>${txtResources}</h2>
				<ul>
					{{#each resources}}
						{{#if fields.1.value}}
							<li><a href="{{fields.1.value}}" target="_blank"><i class="flaticon-external1"></i> {{title}}</a></li>
						{{/if}}
						{{#unless fields.1.value}}
							<li><a href="#/resource/{{urlencode title}}"><i class="flaticon-keyboard53"></i> {{title}}</a></li>
						{{/unless}}
					{{/each}}
				</ul>
			</div>
		{{/if}}	

	</div>
</script>


<#-- HBS FLY OUT MENU -->
<script id="fly-menu-template" type="text/x-handlebars-template">
	<div class="fly-menu-wrapper">
		<div class="fly-menu">
			{{#each resources}}
				{{#if fields.1.value}}
					<a href="{{fields.1.value}}" target="_blank" class="list-item js-fly-menu-link">
						<div class="list-item-icon">
							<i class="flaticon-external1 icon-15x"></i>
						</div>
						<div class="list-item-text">{{title}}</div>
					</a>
				{{/if}}
				{{#unless fields.1.value}}
					<a href="#/resource/{{urlencode title}}" class="list-item js-fly-menu-link">
						<div class="list-item-text">{{title}}</div>
					</a>
				{{/unless}}
			{{/each}}
		</div>
	</div>
</script>



<#-- HTML -->
<div id="app-wrapper">
	<div class="blurrer js-menu-blurrer"></div>
	<div class="loading-indicator js-loading-indicator">
		<div class="loading-indicator-inner">
			<div id="details-filler-placeholder">
				<div class="spinner"></div>
				<div class="spinner-text">Ett ögonblick, laddar all data</div>
			</div>
		</div>
	</div>
	<div id="fly-menu-placeholder"></div>
	<div id="topbar">
		<div class="appbar">
			<div class="appbar-menu-title-wrapper">
				<div class="appbar-menu-title"><a href="#">REK<span class="thin">listan</span></a></div>
			</div>
			<a href="${txtFeedbackURL}" class="appbar-menu-feedback">
				${txtFeedback}
			</a>
			<div class="appbar-menu-sink-wrapper js-appbar-menu-sink-toggle">
				<div class="appbar-menu-sink-button">
					<span class="flaticon-menu55 icon-4x"></span> 
				</div>
			</div>
			<a class="appbar-menu-back-wrapper js-navigation-button">
				<div class="appbar-menu-back-button">
					<i class="flaticon-left216 icon-4x"></i> 
			    </div>
		    	<div class="appbar-menu-back-label mt-small">Tillbaka</div>
			</a>
		</div>
	</div>
	<div class="app-body">
		<div id="mainmenu" class="screen active">
			<div id="main-menu-placeholder"></div>
		</div>
		<div id="submenu-drugs" class="screen">
			<div id="submenu-drugs-placeholder" class="submenu"></div>
		</div>
		<div id="submenu-advice" class="screen">
			<div id="submenu-advice-placeholder" class="submenu"></div>
		</div>
		<div id="details-drugs" class="screen">
			<div id="details-drugs-placeholder" class="section"></div>
		</div>
		<div id="details-advice" class="screen">
			<div id="details-advice-placeholder" class="section"></div>
		</div>
		<div id="details-generic" class="screen">
			<div id="details-generic-placeholder"></div>
		</div>
		<div id="details-filler" class="screen">
			<div id="details-filler-placeholder"></div>
		</div>
	</div>
</div>

<#-- Tracking -->
<script type="text/javascript">
  var _paq = _paq || [];
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//piwik.vgregion.se/";
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['setSiteId', 162]);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<noscript><p><img src="//piwik.vgregion.se/piwik.php?idsite=162" style="border:0;" alt="" /></p></noscript>
<#-- /Tracking -->

		<#-- TODO, does this need to be here? -->
		<div class="temp-hide">
		${portletDisplay.recycle()}
		${portletDisplay.setTitle(the_title)}
		${theme.wrapPortlet("portlet.ftl", content_include)}
		</div>

</body>

</html>