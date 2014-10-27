


<#--
 #
 # We're adding the script and css-import tags ourselves in portal_normal.ftl.
 # To do that, we need to create the URL ourselves and therefor need some variables.
 #
 # -->


<#assign browserId = 'other'>
<#assign ReleaseLocalService = serviceLocator.findService("com.liferay.portal.service.ReleaseLocalService") />
<#assign liferayBuild = ReleaseLocalService.getBuildNumberOrCreate() />