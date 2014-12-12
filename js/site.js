(function($){

	$(document).ready(function(){
	
		$('.gallery a, .post a').fluidbox({immediate:true})
		
		$(".packery").each(function(){
			var $packery = $(this);
			var $imgs = $packery.find('img');
			$imgs.css('opacity',0);
			$packery.imagesLoaded(function(){

				$packery.packery({
					itemSelector: '.pack',
					gutter: 5
				})
				$imgs.css('opacity',1)

			});

		});
		

		$packPosts = $(".packery-posts");
		$packPosts.imagesLoaded(function(){
			$packPosts.packery({
				itemSelector: 'li.post'
			})
		});

	});

})(jQuery);