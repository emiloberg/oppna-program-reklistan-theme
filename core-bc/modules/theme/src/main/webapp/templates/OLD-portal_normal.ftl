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
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link href="http://localhost:6080/reklistan-theme/images/favicon.ico" rel="Shortcut Icon">
	<link class="lfr-css-file" href="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/css/custom.css?browserId=${browserId}&themeId=${themeDisplay.themeId}&languageId=${themeDisplay.languageId}&b=${liferayBuild}&t=${.now?datetime?iso_utc}" rel="stylesheet" type="text/css">


	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/lib/jquery/dist/jquery.min.js" type="text/javascript"></script>
	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/lib/modernizr/modernizr.js" type="text/javascript"></script>
	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/lib/handlebars/handlebars.min.js" type="text/javascript"></script>

	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/lib/svg4everybody/svg4everybody.ie8.min.js" type="text/javascript"></script>

	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/js/main.js?browserId=${browserId}&languageId=${themeDisplay.languageId}&b=${liferayBuild}&t=${.now?datetime?iso_utc}" type="text/javascript"></script>

	<link href='http://fonts.googleapis.com/css?family=Roboto:500,900italic,900,400italic,100,700italic,300,700,500italic,100italic,300italic,400' rel='stylesheet' type='text/css'>


</head>

<body class="${css_class}">


<style>
	body {
		font-family: 'Roboto', sans-serif;
		font-weight: 400;
	}

	.heading {
		color: #0000CC;
		text-transform: uppercase;
		font-weight: bold;
	}

	.subheading {
		color: #0000CC;
		font-weight: bold;	
	}

	.subheading-2 {
		color: #0000CC;
	}

	.area {
		font-weight: bold;
	}

	.substance {

	}

	.drug {
		padding-left: 10px;
	}

	.infobox {
		width: 200px;
		background-color: #fff;
		border-left: 5px solid #00C;
		padding: 10px;
		margin-top: 10px;
	}

	/* paddings */
	.area,
	.subheading-2 {
		padding-top: 15px;
	}

	.area.item-0,
	.subheading-2.item-0 {
		padding-top: 0;
	}

	.heading {
		padding-top: 45px;
	}

	.heading.item-0 {
		padding-top: 0;
	}

	.temp-spacer {
		width: 350px;
		float: left;
		padding: 20px;
		margin: 20px;
		background-color: #eee;
	}

	.temp-hide {
		display: none;
	}


</style>


<div class="wrapper">
	<div id="main-menu-placeholder"></div>
</div>

<script id="main-menu-template" type="text/x-handlebars-template">
	<div class="appbar shadow-z-2">
		<div class="inner">
			<span class="title">REK-listan</span>
		</div>
	</div>
	{{#each this}}
		<div href="#" class="main-menu-link menu-link list-item" data-link="{{chapter.0.fieldValue}}" data-fieldnumber="{{@index}}">
			<div class="list-text appbarable">
				<#--
				<div class="custom-appbar">
					<div class="appbar-left">
						<a href="#" class="menu-back" data-backto='main-menu'><i class="md md-arrow-back md-2x"></i></a>
					</div>
					REK-listan
				</div>
				-->
				{{chapter.0.fieldValue}}
			</div>
			<div id="recdrugs-menu-placeholder-{{@index}}" class="submenu" ></div>
		</div>
	{{/each}}

</script>

<script id="recdrugs-menu-template" type="text/x-handlebars-template">
	{{#each this}}
		{{#each heading}}
			<div href="#" class="recdrugs-link menu-link list-item" data-chapter="{{../chapter.0.fieldValue}}" data-link="{{fieldValue}}" data-fieldnumber="{{@index}}">
				<div class="list-text appbarable">
					{{fieldValue}}
				</div>
				<div id="recdrugs-details-placeholder-{{@index}}" class="details" ></div>
			</div>
		{{/each}}
	{{/each}}
</script>

<script id="recdrugs-details-template" type="text/x-handlebars-template">
	{{#each this}}
		<div class="item-{{@index}} heading">{{fieldValue}}</div>
		{{#each subheading1}}
			{{#if fieldValue}}<div class="item-{{@index}} subheading">{{fieldValue}}</div>{{/if}}
			{{#each subheading2}}
				{{#if fieldValue}}<div class="item-{{@index}} subheading-2">{{fieldValue}}</div>{{/if}}
				{{#each area}}
					{{#if fieldValue}}<div class="item-{{@index}} area">{{fieldValue}}</div>{{/if}}
					{{#each substance}}
						{{#if fieldValue}}
							<div class="substance">
								{{fieldValue}}
								{{#if replaceable.0.fieldValue}}(ersättningsbart){{/if}}
							</div>
						{{/if}}
						{{#each drug}}
							{{#if fieldValue}}<div class="item-{{@index}} drug">{{fieldValue}}</div>{{/if}}
						{{/each}}						
					{{/each}}					
				{{/each}}				
			{{/each}}
		{{/each}}
		{{#each infobox}}
			{{#if fieldValue}}<div class="item-{{@index}} infobox">{{fieldValue}}</div>{{/if}}
		{{/each}}
	{{/each}}
</script>





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