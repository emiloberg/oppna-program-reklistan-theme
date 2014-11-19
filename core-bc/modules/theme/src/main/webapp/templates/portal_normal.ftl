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

	<link href='http://fonts.googleapis.com/css?family=Roboto:500,900italic,900,400italic,100,700italic,300,700,500italic,100italic,300italic,400' rel='stylesheet' type='text/css'>


</head>

<body class="${css_class}">

<#-- APP -->



<script id="main-menu-template" type="text/x-handlebars-template">
	{{#each this}}
		<div class="list-item mainmenu-item" data-chapter="{{chapter.0.fieldValue}}">
			<div class="list-item-text mainmenu-item-text">
				{{chapter.0.fieldValue}}
			</div>
		</div>
	{{/each}}
</script>

<script id="recdrugs-menu-template" type="text/x-handlebars-template">
	<div id="submenu-tabs" class="md-tabs">
		<a href="#" class="tab">Terapiråd</a>
		<a href="#" class="tab selected">Rek. läkemedel</a>
	</div>
	{{#each this}}
		{{#each heading}}
			<div class="list-item submenu-item" data-chapter="{{../chapter.0.fieldValue}}" data-section="{{fieldValue}}">
				<div class="list-item-text submenu-item-text">{{fieldValue}}</div>
			</div>
		{{/each}}
	{{/each}}
</script>

<script id="recdrugs-section-template" type="text/x-handlebars-template">
	<div id="section-tabs" class="md-tabs">
		<a href="#" class="tab">Terapiråd</a>
		<a href="#" class="tab selected">Rek. läkemedel</a>
	</div>
	<div class="section-details">
	{{#each this}}
		<div class="item-{{@index}} heading">{{fieldValue}}</div>
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
								<div class="substance">
									{{fieldValue}}
									{{#if replaceableSubstance.0.fieldValue}}(ersättningsbart){{/if}}
								</div>
							{{/if}}
							{{#each drug}}
								{{#if fieldValue}}
									<div class="item-{{@index}} drug">
										{{fieldValue}}
										{{#if replaceableDrug.0.fieldValue}}(ersättningsbart){{/if}}
									</div>
								{{/if}}
								{{#each infoboxDrug}}
									{{#if fieldValue}}<div class="item-{{@index}} infobox">{{fieldValue}}</div>{{/if}}
								{{/each}}
							{{/each}}						
						{{/each}}

					{{/each}}
				{{/each}}				
			{{/each}}
		{{/each}}
		{{#each infoboxHeading}}
			{{#if fieldValue}}<div class="item-{{@index}} infobox">{{fieldValue}}</div>{{/if}}
		{{/each}}
	{{/each}}
	</div>
</script>






<div id="app-wrapper">
  <header class="appbar">
    <div id="appbar-menu-button"><i class="md md-menu md-2x"></i></div>
    <h1 id="appHeadline" class="app-title">REK-listan</h1>
  </header>
  <div class="app-body">

    <div id="mainmenu" class="screen screen--list active">
    	<div id="main-menu-placeholder"></div>
    </div>

    <div id="submenu" class="screen screen--list">
		<div id="recdrugs-menu-placeholder" class="submenu"></div>
    </div>

    <div id="section" class="screen screen--body">
		<div id="recdrugs-section-placeholder" class="section"></div>
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