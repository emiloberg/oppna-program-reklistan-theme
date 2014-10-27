<#include init />
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js ${root_css_class}" dir="<@liferay.language key="lang.dir" />" lang="${w3c_language_id}"> <!--<![endif]-->


<#-- 

http://purecss.io/

-->

<head>
	<title>${the_title} - ${company_name}</title>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<link href="http://localhost:6080/reklistan-theme/images/favicon.ico" rel="Shortcut Icon">
	<link class="lfr-css-file" href="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/css/custom.css?browserId=${browserId}&themeId=${themeDisplay.themeId}&languageId=${themeDisplay.languageId}&b=${liferayBuild}&t=${.now?datetime?iso_utc}" rel="stylesheet" type="text/css">


	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/js/lib/jquery/dist/jquery.min.js" type="text/javascript"></script>
	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/js/lib/modernizr/modernizr.js" type="text/javascript"></script>
	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/js/lib/x2js/xml2json.min.js" type="text/javascript"></script>
	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/js/lib/bluebird/js/browser/bluebird.js" type="text/javascript"></script>

	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/js/lib/superagent/superagent.js" type="text/javascript"></script>

	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/js/lib/handlebars/handlebars.min.js" type="text/javascript"></script>

	<script src="${themeDisplay.portalURL}${themeDisplay.pathThemeRoot}/js/main.js?browserId=${browserId}&languageId=${themeDisplay.languageId}&b=${liferayBuild}&t=${.now?datetime?iso_utc}" type="text/javascript"></script>

</head>

<body class="${css_class}">


<style>
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
		background-color: #eee;
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

</style>


Hello World

<div id="menu-placeholder"></div>

<script id="menu-template" type="text/x-handlebars-template">
<h2>Meny</h2>
<ul>
{{#each this}}
	{{#each heading}}
		<li>{{fieldValue}}</li>
	{{/each}}
{{/each}}	
</ul>
</script>






<div id="my-placeholder"></div>


<script id="some-template" type="text/x-handlebars-template">
<h2>Rekommenderade läkemedel</h2>
{{#each this}}
	<h3>{{fieldValue}}</h3>
	{{#each heading}}
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
								{{#check replaceable eq="true"}}
									(ERSÄTTNINGSBART)
								{{/check}}
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
{{/each}}
</script>






<a href="/group/control_panel">log in</a>

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

		${portletDisplay.recycle()}
		${portletDisplay.setTitle(the_title)}
		${theme.wrapPortlet("portlet.ftl", content_include)}

</body>

</html>