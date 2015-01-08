<#include init />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js ${root_css_class}" dir="<@liferay.language key="lang.dir" />" lang="${w3c_language_id}"> <!--<![endif]-->


<#-- 

http://purecss.io/
https://github.com/fians/Waves
http://fian.my.id/marka/


MATERIAL DESIGN TYPOGRAPHY: http://codepen.io/zavoloklom/pen/IkaFL

MATERIAL DESIGN FONTS: http://zavoloklom.github.io/material-design-iconic-font/

MATERIAL DESIGN MORPHING ICONS: http://codepen.io/eredo/pen/kwLAK


MATERIAL DESIGN TABS: http://codepen.io/freeatnet/pen/aAzul





TODO: 
POLLYFILL THIS: https://github.com/closingtag/calc-polyfill


USE THIS: 
https://github.com/xoxco/breakpoints

Intressant:
http://codepen.io/tannerlinsley/pen/vEEZgZ




HÄR ÄR RAMVERKET VI SKA ANVÄNDA: http://codepen.io/emiloberg/pen/MYYLEV

-->

<head>
	<title>${the_title} - ${company_name}</title>


	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">

	<link href="http://localhost:6080/reklistan-theme/images/favicon.ico" rel="Shortcut Icon">
	<link class="lfr-css-file" href="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/css/custom.css?browserId=${browserId}&themeId=${themeDisplay.themeId}&languageId=${themeDisplay.languageId}&b=${liferayBuild}&t=${.now?datetime?iso_utc}" rel="stylesheet" type="text/css">


	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/lib/jquery/dist/jquery.min.js" type="text/javascript"></script>
	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/lib/modernizr/modernizr.js" type="text/javascript"></script>
	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/lib/handlebars/handlebars.min.js" type="text/javascript"></script>

	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/lib/svg4everybody/svg4everybody.ie8.min.js" type="text/javascript"></script>
	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/lib/fastclick/lib/fastclick.js" type="text/javascript"></script>

	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/js/main.js?browserId=${browserId}&languageId=${themeDisplay.languageId}&b=${liferayBuild}&t=${.now?datetime?iso_utc}" type="text/javascript"></script>

	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/lib/routie/dist/routie.min.js" type="text/javascript"></script>

	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/lib/lunr.js/lunr.min.js" type="text/javascript"></script>

	<link href='https://fonts.googleapis.com/css?family=Roboto:500,900italic,900,400italic,100,700italic,300,700,500italic,100italic,300italic,400' rel='stylesheet' type='text/css'>


</head>

<body class="${css_class}">

<#-- APP -->

<script id="search-results-template" type="text/x-handlebars-template">
	<div class="search-results-container">
		{{#each this}}
			<a href="#/{{link}}" class="list-item js-search-results-item item-{{@index}}">

				{{#eq type eq='drugs'}}
					<div class="list-item-icon">
						<i class="flaticon-biology icon-15x"></i>
					</div>
				{{/eq}}
				{{#eq type eq='advice'}}
					<div class="list-item-icon">
						<i class="flaticon-round52 icon-15x"></i>
					</div>
				{{/eq}}

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

<script id="main-menu-template" type="text/x-handlebars-template">

	<div class="search-wrapper view-topper">
		<div class="second-bar">
			<div class="search-input-container">
				<input type="text" class="search-input js-search-input" placeholder="Sök" autocorrect="off" autofocus="autofocus">
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


	{{#if news}}
	<div class="main-menu-news-container js-main-menu-news-container lt-medium">
		<div class="list-item list-item-heading">
			<div class="list-item-text">
				Nyheter
			</div>
		</div>
		{{#each news}}
			<div class="item-{{@index}} list-item news-item" data-item="{{slug}}">
				<div class="list-item-text">
					{{title}}
				</div>
			</div>
		{{/each}}
		<div class="list-item list-item-read-more news-item">
			<div class="list-item-icon">
				<i class="flaticon-keyboard53 icon-15x list-item-icon-body-color"></i> 
			</div>		
			<div class="list-item-text">
				Läs alla nyheter
			</div>		
		</div>
	</div>
	{{/if}}

	<div class="mainmenu-area-items">
		<div class="list-item list-item-heading lt-medium">
			<div class="list-item-text">
				Områden
			</div>
		</div>
		{{#each areas}}
			<div class="list-item js-mainmenu-item item-{{@index}}" data-chapter="{{_title}}" data-drugsdata="{{#eq heading.0.fieldValue eq=''}}none{{/eq}}">
				<div class="list-item-text">
					{{_title}}
				</div>
			</div>
		{{/each}}
	</div>
</script>

<script id="submenu-template" type="text/x-handlebars-template">
	<div class="view-topper">
		<div class="second-bar">
			<h2 class="second-bar-title">{{this.0._title}}</h2>
		</div>
		<div class="js-submenu-tabs tabs">
			<a href="#" class="tab js-tab-item js-tab-item-drugs" data-tabtype="submenu" data-tab="drugs">Läkemedel</a>
			<a href="#" class="tab js-tab-item js-tab-item-advice" data-tabtype="submenu" data-tab="advice">Terapiråd</a>
		</div>
	</div>
	{{#each this}}
		{{#each heading}}
			<div class="list-item submenu-item item-{{@index}} js-submenu-item" data-chapter="{{../_title}}" data-section="{{fieldValue}}">
				{{#eq body.0.type.0.fieldValue eq='is-header-less'}}
					<div class="list-item-icon">
						<i class="flaticon-round52 icon-15x"></i> 
					</div>
				{{/eq}}
				{{#eq body.0.type.0.fieldValue eq='physical-exercise'}}
					<div class="list-item-icon">
						<i class="flaticon-man460 icon-15x"></i> 
					</div>
				{{/eq}}
				{{#eq body.0.type.0.fieldValue eq='for-childs'}}
					<div class="list-item-icon">
						<i class="flaticon-round52 icon-15x"></i> 
					</div>
				{{/eq}}

				<div class="list-item-text submenu-item-text">{{fieldValue}}</div>
			</div>
		{{/each}}
	{{/each}}
</script>

<script id="details-advice-template" type="text/x-handlebars-template">
	<div class="view-topper">
		<div class="second-bar">
			<h2 class="second-bar-title">{{this.0.fieldValue}}</h2>
		</div>
		<div class="js-details-tabs details-tabs tabs">
			<a href="#" class="tab js-tab-item js-tab-item-drugs" data-tabtype="details" data-tab="drugs">Läkemedel</a>
			<a href="#" class="tab js-tab-item js-tab-item-advice" data-tabtype="details" data-tab="advice">Terapiråd</a>
		</div>
	</div>
	<div class="section-details section-details-advice">
	{{#each this}}
		{{#each body}}
			<div class="item-{{@index}} advice-{{type.0.fieldValue}} body">
				{{#if subheading.0.fieldValue}}
					<h3 class="advice-subheading">{{subheading.0.fieldValue}}</h2>
				{{/if}}
				{{{markdownify fieldValue}}}
				{{#each image}}
					{{#if fieldValue}}
						<div class="details-image">
							<a href="{{{fieldValue}}}" target="_blank"><img src="{{{fieldValue}}}" alt=""></a>
							<a href="{{{fieldValue}}}" target="_blank" class="fullscreen-link">Visa bild i fullskärm</a>
						</div>
					{{/if}}
				{{/each}}
			</div>
		{{/each}}		
	{{/each}}
	</div>
</script>

<script id="details-drugs-template" type="text/x-handlebars-template">
	<div class="view-topper">
		<div class="second-bar">
			<h2 class="second-bar-title">{{this.0.fieldValue}}</h2>
		</div>
		<div class="js-details-tabs details-tabs tabs">
			<a href="#" class="tab js-tab-item js-tab-item-drugs" data-tabtype="details" data-tab="drugs">Läkemedel</a>
			<a href="#" class="tab js-tab-item js-tab-item-advice" data-tabtype="details" data-tab="advice">Terapiråd</a>
		</div>
	</div>
	<div class="section-details section-details-drugs">
	{{#each this}}
		<#-- <div class="item-{{@index}} heading">{{fieldValue}}</div> -->
		{{#each subheading1}}
			{{#if fieldValue}}<div class="item-{{@index}} subheading">{{fieldValue}}</div>{{/if}}
			{{#each subheading2}}
				{{#if fieldValue}}<div class="item-{{@index}} subheading-2">{{fieldValue}}</div>{{/if}}
				{{#each area}}
					{{#if fieldValue}}<div class="item-{{@index}} area">{{fieldValue}}</div>{{/if}}
					{{#each recommendedFor}}
						{{#if fieldValue}}<div class="item-{{@index}} recommended-for">{{fieldValue}}</div>{{/if}}
						{{#each substance}}
							{{#if fieldValue}}
								<div class="item-{{@index}} substance">
									{{markdownify fieldValue}}
									{{#if replaceableSubstance.0.fieldValue}}
										<span class="replaceable">&#8860;</span>
									{{/if}}
								</div>
							{{/if}}
							{{#each drug}}
								{{#if fieldValue}}
									<div class="item-{{@index}} drug">
										{{fieldValue}}
										{{#if replaceableDrug.0.fieldValue}}
											<span class="replaceable">&#8860;</span>
										{{/if}}
									</div>
								{{/if}}
								{{#each infoboxDrug}}
									{{#if fieldValue}}
										<div class="item-{{@index}} infobox infobox-drug">
											{{markdownify fieldValue}}
										</div>
									{{/if}}
								{{/each}}
							{{/each}}					
						{{/each}}

					{{/each}}
				{{/each}}				
			{{/each}}
		{{/each}}
		{{#each infoboxHeading}}
			{{#if fieldValue}}
				<div class="item-{{@index}} infobox infobox-heading">
					{{#if infoboxHeadingHeading.0.fieldValue}}
						<h3>{{infoboxHeadingHeading.0.fieldValue}}</h3>
					{{/if}}
					{{markdownify fieldValue}}
				</div>
			{{/if}}
		{{/each}}
	{{/each}}
	</div>
</script>


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

<script id="resource-template" type="text/x-handlebars-template">
	{{#each this}}
		<div class="view-topper">
			<div class="second-bar">
				<h2 class="second-bar-title">{{_title}}</h2>
			</div>
		</div>
		<div class="section-details">
			{{{body.0.fieldValue}}}
		</div>
	{{/each}}
</script>

<script id="filler-template" type="text/x-handlebars-template">
	<div class="details-inner">

		<div class="vgr-logo">
			<img src="${images_folder}/theme/vgr-w400-c.png">
		</div>

		{{#if news}}
			<div class="link-list">
				<h2>Nyheter</h2>
				<ul>
					{{#each news}}
						<li><a href="#/news/{{slug}}">{{title}}</a></li>
					{{/each}}
				</ul>
			</div>
		{{/if}}

		{{#if resources}}
			<div class="link-list">
				<h2>Resurser</h2>
				<ul>
					{{#each resources.entries}}
						{{#if externallink.0.fieldValue}}
							<li><a href="{{externallink.0.fieldValue}}" target="_blank"><i class="flaticon-external1"></i> {{_title}}</a></li>
						{{/if}}
						{{#unless externallink.0.fieldValue}}
							<li><a href="#/resource/{{_entryId}}"><i class="flaticon-keyboard53"></i> {{_title}}</a></li>
						{{/unless}}
					{{/each}}
				</ul>
			</div>
		{{/if}}	

	</div>
</script>

<script id="fly-menu-template" type="text/x-handlebars-template">
	<div class="fly-menu-wrapper">
		<div class="fly-menu">
			<div class="logo">
				<img src="${images_folder}/theme/vgr-w400-c.png">	
			</div>
			{{#each resources.entries}}
				{{#if externallink.0.fieldValue}}
					<a href="{{externallink.0.fieldValue}}" target="_blank" class="list-item js-fly-menu-link">
						<div class="list-item-icon">
							<i class="flaticon-external1 icon-15x"></i>
						</div>
						<div class="list-item-text">{{_title}}</div>
					</a>
				{{/if}}
				{{#unless externallink.0.fieldValue}}
					<a href="#/resource/{{_entryId}}" class="list-item js-fly-menu-link">
						<div class="list-item-text">{{_title}}</div>
					</a>
				{{/unless}}
			{{/each}}
		</div>
	</div>
</script>

<div id="app-wrapper">
	<div class="blurrer js-menu-blurrer"></div>

	<div id="fly-menu-placeholder"></div>

	<div id="topbar">
		<div class="appbar">

			<div class="appbar-menu-title-wrapper">
				<div class="appbar-menu-title"><a class="js-appbar-title" href="#">REK<span class="thin">listan</span></a></div>
			</div>

			<div class="appbar-menu-sink-wrapper js-appbar-menu-sink-toggle">
				<div class="appbar-menu-sink-button">
					<span class="flaticon-menu55 icon-4x"></span> 
				</div>
			</div>

			<div class="appbar-menu-back-wrapper js-navigation-button">
				<div class="appbar-menu-back-button js-appbar-menu-button">
					<i class="flaticon-left216 icon-4x"></i> 
			    </div>
		    	<div class="appbar-menu-back-label mt-small">Tillbaka</div>
			</div>

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

<#-- /APP -->




<#--
<a href="/group/control_panel">log in</a>
-->

        <!-- TODO: Add Google Analytics-->
        <script>
        /*
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='//www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-XXXXX-X');ga('send','pageview');
            */
        </script>

		<div class="temp-hide">
		${portletDisplay.recycle()}
		${portletDisplay.setTitle(the_title)}
		${theme.wrapPortlet("portlet.ftl", content_include)}
		</div>

</body>

</html>