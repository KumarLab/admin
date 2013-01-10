<!DOCTYPE HTML>
<html lang="en">
<head>
  <meta charset="utf-8">
    <title>KumarLab/Administration Panel</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="credit" content="Prabhat Kumar">
    <link href="assets/css/main.css" rel="stylesheet" type="text/css" media="screen"/>
    <link href="favicon.ico" rel="icon" type="image/icon">
	<script type="text/javascript" src="assets/js/script.min.js"></script>
	<script type="text/javascript">
	// Inline script to show nicecon.
		(function(){
			var count = 0;
			Nicecon.setOptions({fallback:'force'});
			var i = setInterval(function(){
				if(++count > 100){
					Nicecon.reset();
					clearInterval(i);
					return false;
				}
				Nicecon.setProgress(count);
			},180);
		})();
    </script>
</head>

<body>
<div class="admin">
  <header id="header">
    <h1><span>Future home of something quite cool</span></h1>
  </header>
  <div class="container">
    <div class="innerborder clearfix">
      <h2 class="siteowner">If you're the <strong>site owner</strong>, <a rel="external" href="https://hostingmanager.secureserver.net" title="Hosting Manager">log in</a> to launch this site.</h2>
      <h3 class="cmslogin">If you are a <strong>Administrator</strong>, please <a rel="external" href="assets/en/index.php" title="Content Management System">login</a> here.</h3>
    </div>
  </div>
  <footer class="container" id="footer">
    <h4>Owner is <a href="http://kumarlab.org/">http://kumarlab.org/</a></h4>
    <h5>Copyright © 2012-13. All rights reserved.</h5>
  </footer>
</div>
</body>
</html>
