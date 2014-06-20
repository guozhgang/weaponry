<%@ page contentType="text/html" pageEncoding="utf-8"%>
<%@ page
	import="com.cce.modules.security.springsecurity.SpringSecurityUtils"%>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" type="text/css"
			href="js/ext/resources/css/ext-all.css" />
		<link rel="stylesheet" type="text/css" href="css/forum.css" />
		<link rel="stylesheet" type="text/css" href="css/data-view.css" />
		<link rel="stylesheet" type="text/css" href="css/search.css" />
		<link rel="stylesheet" type="text/css" href="css/layout.css" />
		<link rel="stylesheet" type="text/css" href="css/icon.css" />
		<link rel="stylesheet" type="text/css"
			href="js/ext/ux/css/fileuploadfield.css"></link>
		<!-- <link rel="stylesheet" type="text/css" href="js/ext/ux/css/DateTimePicker.css"></link> -->
		<link rel="stylesheet" type="text/css"
			href="js/ext/ux/css/MultiSelect.css"></link>
		<link rel="stylesheet" type="text/css"
			href="js/ext/ux/css/RowEditor.css"></link>

		<script type="text/javascript" src="js/ext/adapter/ext/ext-base.js">
</script>
		<script type="text/javascript" src="js/ext/ext-all.js">
</script>
		<script type="text/javascript"
			src="js/ext/adapter/ext/ext-basex-debug.js">
</script>

		<script type="text/javascript" src="js/ext/jquery-1.4.2.min.js">
</script>
		<script type="text/javascript" src="js/ext/locale/ext-lang-zh_CN.js">
</script>

		<script type="text/javascript" src="js/ext/ux/FileUploadField.js">
</script>
		<script type="text/javascript" src="js/ext/ux/Spinner.js">
</script>
		<script type="text/javascript" src="js/ext/ux/SpinnerField.js">
</script>
		<!--<script type="text/javascript" src="js/ext/ux/DateTimeField.js"></script>-->
		<script type="text/javascript" src="js/ext/ux/tiny_mce/tiny_mce.js">
</script>


		<script type="text/javascript" src="javascript/utils/ExtJsUtils.js" ></script>
<script type="text/javascript" src="javascript/utils/LovCombo.js" ></script>
		<script type="text/javascript" src="javascript/Components.js">
</script>
		<script type="text/javascript"
			src="javascript/utils/FormTableLayout.js" />

<script type="text/javascript" src="javascript/MainPage.js">
</script>
		<script type="text/javascript" src="javascript/Main.js">
</script>
		<script type="text/javascript" src="javascript/utils/SharedObj.js">
</script>
		<!-- <script type="text/javascript" src="My97DatePicker/WdatePicker.js"></script> -->

		<!-- http://code.google.com/intl/zh-CN/apis/maps/signup.html 
		<script
			src="http://ditu.google.cn/maps?file=api&amp;v=2&amp;sensor=false&amp;key=ABQIAAAAimPvgnxdJ9J30PwBZXWBShSVQr7_aPKfpaA7wvUlnTQ62Sw6GxQTYA_whBe-d2W8Rl9bfiwj3mHumg&hl=zh-CN"
			type="text/javascript">
</script>-->


		<title>全军武器装备业务管理系统</title>
	</head>
	<body>
		<div id="header">
			<div>
				<img src="images/layout-browser-hd-bg-title.gif"
					style="height: 45px; left: 0px; top: 0px" />
			</div>
			<span
				style="position: absolute; bottom: 0; width: 100%; float: right;">
				<span
				style="font-family: Tahoma; font-size: 12px; float: right; margin: 0px; color: #3f5f7f;">
					当前用户: <%=SpringSecurityUtils.getCurrentUserName()%>（<%=SpringSecurityUtils.getCurrentUserRegion()%>）
					<a id='inboxNew' href='#'></a>| <!--  <a href='upload/loadhelp.action'></a>-->系统帮助
					| <a href='j_spring_security_logout'><font color=#3f5f7f>退出登录</font>
				</a> </span> </span>
		</div>

		<!-- Start page content -->
		<div id="start-div"
			style="margin-top: 0px; margin-bottom: 0px; margin-left: 0px; width: 100%; height: 100%; overflow: auto">
			<!--
          <div style="float:left;" ><img src="images/layout-icon.gif" /></div>
          <div style="margin-left:100px;">
              <h2>欢迎使用!</h2>
              <p></p>
              <p>从左边的菜单中选择想要执行的功能.</p>
          </div> 
     -->
		</div>

		<div id="footer">
			<span
				style="position: absolute; bottom: 5; width: 100%; text-align: center;">@2013-2015
				北京索克赛思</span>
		</div>
	</body>

</html>
