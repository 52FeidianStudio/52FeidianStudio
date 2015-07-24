$(".g-ma").hover(function(){
		$("#btn_prev,#btn_next").fadeIn()
		},function(){
		$("#btn_prev,#btn_next").fadeOut()
		})
	$dragBln = false;
	$(".g-img").touchSlider({
		flexible : true,
		speed : 200,
		btn_prev : $("#btn_prev"),
		btn_next : $("#btn_next"),
		paging : $(".g-fl a"),
		counter : function (e) {
			$(".g-fl a").removeClass("on").eq(e.current-1).addClass("on");
		}
	});
	$(".g-img").bind("mousedown", function() {
		$dragBln = false;
	})
	$(".g-img").bind("dragstart", function() {
		$dragBln = true;
	})
	$(".g-img a").click(function() {
		if($dragBln) {
			return false;
		}
	})
	timer = setInterval(function() { $("#btn_next").click();}, 5000);
	$(".g-ma").hover(function() {
		clearInterval(timer);
	}, function() {
		timer = setInterval(function() { $("#btn_next").click();}, 5000);
	})
	$(".g-img").bind("touchstart", function() {
		clearInterval(timer);
	}).bind("touchend", function() {
		timer = setInterval(function() { $("#btn_next").click();}, 5000);
	})

      $(function(){
            $("#product .item").mouseover(function(){
                    $(this).find('.f-over').css('display','block');
            });
            $("#product .item").mouseout(function(){
            	     $(this).find('.f-over').css('display','none');
            })
      });



