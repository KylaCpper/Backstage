var loadScript=window.loadScript=function(src, callback) {
	jQuery.ajax({
		crossDomain: true,
		dataType: "script",
		url: src,
		cache:true,
		success: function(){
			typeof callback === 'function' && callback();
		},
		error: function(e){
			typeof callback === 'function' && callback(e);
		}
	})
}