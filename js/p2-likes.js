function p2Likes( type, id) {
	
	if ( id != '' ) {
		
		jQuery.post( p2LikesURL + '/wp-admin/admin-ajax.php',
			{ action: 'p2_likes_like', type: type, id: id },
			function(data) {
				
				var parsedJSON = jQuery.parseJSON(data);
				
				var typeslug = 'post';
				if ( type == 1 ) typeslug = 'comment';
				
				var likeText = jQuery('.p2-likes-' + typeslug + '-' + id + ' .p2-likes-like').html();
				switch (likeText) {
					case 'Like':
					  jQuery('.p2-likes-' + typeslug + '-' + id + ' .p2-likes-like').html('Unlike');
					  break;
					case 'Unlike':
					  jQuery('.p2-likes-' + typeslug + '-' + id + ' .p2-likes-like').html('Like');
					  break;
				}
				
				jQuery('.p2-likes-' + typeslug + '-' + id + ' .p2-likes-count').html(parsedJSON[0]);
				jQuery('.p2-likes-' + typeslug + '-' + id).next('.p2-likes-box').html(parsedJSON[1]).fadeIn();
				
			}	
		);
		
	}
}

jQuery(function() {
	
	var p2BoxFocus = false;
	
	jQuery('.p2-likes-link').live({
		mouseenter:
		function() {
			jQuery('.p2-likes-box:not(:empty)', this).fadeIn();
		},
		mouseleave:
		function() {
			if (p2BoxFocus)
			 jQuery('.p2-likes-box', this).fadeOut();
		}
	});
	
	jQuery('.p2-likes-box').live({
		mouseenter:
		function() {
			p2BoxFocus = true;
		},
		mouseleave:
		function() {
			p2BoxFocus = false;
			jQuery('.p2-likes-box').fadeOut();
		}
	});
	
	jQuery('body').hover(function() {
		if (p2BoxFocus)
			jQuery('.p2-likes-box').fadeOut();
	});

});