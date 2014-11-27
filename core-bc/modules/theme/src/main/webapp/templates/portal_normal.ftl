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

	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/js/main.js?browserId=${browserId}&languageId=${themeDisplay.languageId}&b=${liferayBuild}&t=${.now?datetime?iso_utc}" type="text/javascript"></script>

	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/lib/routie/dist/routie.min.js" type="text/javascript"></script>

	<link href='https://fonts.googleapis.com/css?family=Roboto:500,900italic,900,400italic,100,700italic,300,700,500italic,100italic,300italic,400' rel='stylesheet' type='text/css'>


</head>

<body class="${css_class}">

<#-- APP -->



<script id="main-menu-template" type="text/x-handlebars-template">
	{{#each this}}
		<div class="list-item mainmenu-item item-{{@index}}" data-chapter="{{_title}}">
			<div class="list-item-text mainmenu-item-text">
				{{_title}}
			</div>
		</div>
	{{/each}}
</script>

<script id="submenu-template" type="text/x-handlebars-template">
	<div class="view-topper">
		<div class="second-bar">
			<h2 class="second-bar-title">{{this.0._title}}</h2>
		</div>
		<div class="js-submenu-tabs tabs">
			<a href="#" class="tab js-tab-item js-tab-item-drugs" data-tabtype="submenu" data-tab="drugs"><!--<span class="mt-small--inline">Rekommenderade </span>-->Läkemedel</a>
			<a href="#" class="tab js-tab-item js-tab-item-advice" data-tabtype="submenu" data-tab="advice">Terapiråd</a>
		</div>
	</div>
	{{#each this}}
		{{#each heading}}
			<div class="list-item submenu-item item-{{@index}} js-submenu-item" data-chapter="{{../_title}}" data-section="{{fieldValue}}">
				{{#eq body.0.type.0.fieldValue eq='is-header-less'}}
					<div class="list-item-icon">
						<i class="md md-info-outline md-15x"></i>
					</div>
				{{/eq}}
				{{#eq body.0.type.0.fieldValue eq='physical-exercise'}}
					<div class="list-item-icon">
						<i class="md md-directions-walk md-15x"></i>
					</div>
				{{/eq}}
				{{#eq body.0.type.0.fieldValue eq='for-childs'}}
					<div class="list-item-icon">
						<span class="medicon-i-pediatrics medicon-15x medicon"></span>
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
			<a href="#" class="tab js-tab-item js-tab-item-drugs" data-tabtype="details" data-tab="drugs"><!--<span class="mt-small--inline">Rekommenderade </span>-->Läkemedel</a>
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
			<a href="#" class="tab js-tab-item js-tab-item-drugs" data-tabtype="details" data-tab="drugs"><#--<span class="mt-small--inline">Rekommenderade </span>-->Läkemedel</a>
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
										{{#if replaceableDrug.0.fieldValue}}&#8860;{{/if}}
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





<div id="app-wrapper">
	<div id="topbar">
	<div class="appbar">
		<div class="appbar-menu-navigation-wrapper js-navigation-button">
			<div class="appbar-menu-button js-appbar-menu-button">
				<i class="md md-menu md-4x"></i>
		    </div>
	    	<div class="appbar-menu-navigation-label mt-small">Tillbaka</div>
		</div>
	</div>
	</div>
	<div class="app-body">
		<div id="mainmenu" class="screen active">
			<div id="main-menu-placeholder"></div>
		</div>

		<div id="submenu-drugs" class="screen anim-slided-right">
			<div id="submenu-drugs-placeholder" class="submenu"></div>
		</div>

		<div id="submenu-advice" class="screen anim-slided-right">
			<div id="submenu-advice-placeholder" class="submenu"></div>
		</div>    

		<div id="details-drugs" class="screen anim-slided-right">
			<div id="details-drugs-placeholder" class="section"></div>
		</div>

		<div id="details-advice" class="screen anim-slided-right">
			<div id="details-advice-placeholder" class="section"></div>
		</div>

		<div id="details-filler" class="screen-filler">

			<div class="meta-navigation">
				<#--<span class="placeholder-standout">REK-LISTAN</span>-->

				<ul>
					<li><a href="#">Kommunala akutläkemedelsförråd</a></li>
					<li><a href="#">Sjuksköterskor/barnmorskor med förskrivningsrätt</a></li>
					<li><a href="#">Regionala terapigrupperna/Läkemedelskommitten</a></li>
					<li><a href="#">Biverkningsrapportering</a></li>
					<li><a href="#">Dosexpedition/Substans</a></li>
				</ul>

			</div>

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