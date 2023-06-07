function islamic_center_mosque_menu_open_nav() {
	window.islamic_center_mosque_responsiveMenu=true;
	jQuery(".sidenav").addClass('show');
}
function islamic_center_mosque_menu_close_nav() {
	window.islamic_center_mosque_responsiveMenu=false;
 	jQuery(".sidenav").removeClass('show');
}

jQuery(function($){
 	"use strict";
 	jQuery('.main-menu > ul').superfish({
		delay: 500,
		animation: {opacity:'show',height:'show'},  
		speed: 'fast'
 	});
});

jQuery(document).ready(function () {
	window.islamic_center_mosque_currentfocus=null;
  	islamic_center_mosque_checkfocusdElement();
	var islamic_center_mosque_body = document.querySelector('body');
	islamic_center_mosque_body.addEventListener('keyup', islamic_center_mosque_check_tab_press);
	var islamic_center_mosque_gotoHome = false;
	var islamic_center_mosque_gotoClose = false;
	window.islamic_center_mosque_responsiveMenu=false;
 	function islamic_center_mosque_checkfocusdElement(){
	 	if(window.islamic_center_mosque_currentfocus=document.activeElement.className){
		 	window.islamic_center_mosque_currentfocus=document.activeElement.className;
	 	}
 	}
 	function islamic_center_mosque_check_tab_press(e) {
		"use strict";
		// pick passed event or global event object if passed one is empty
		e = e || event;
		var activeElement;

		if(window.innerWidth < 999){
		if (e.keyCode == 9) {
			if(window.islamic_center_mosque_responsiveMenu){
			if (!e.shiftKey) {
				if(islamic_center_mosque_gotoHome) {
					jQuery( ".main-menu ul:first li:first a:first-child" ).focus();
				}
			}
			if (jQuery("a.closebtn.mobile-menu").is(":focus")) {
				islamic_center_mosque_gotoHome = true;
			} else {
				islamic_center_mosque_gotoHome = false;
			}

		}else{

			if(window.islamic_center_mosque_currentfocus=="responsivetoggle"){
				jQuery( "" ).focus();
			}}}
		}
		if (e.shiftKey && e.keyCode == 9) {
		if(window.innerWidth < 999){
			if(window.islamic_center_mosque_currentfocus=="header-search"){
				jQuery(".responsivetoggle").focus();
			}else{
				if(window.islamic_center_mosque_responsiveMenu){
				if(islamic_center_mosque_gotoClose){
					jQuery("a.closebtn.mobile-menu").focus();
				}
				if (jQuery( ".main-menu ul:first li:first a:first-child" ).is(":focus")) {
					islamic_center_mosque_gotoClose = true;
				} else {
					islamic_center_mosque_gotoClose = false;
				}
			
			}else{

			if(window.islamic_center_mosque_responsiveMenu){
			}}}}
		}
	 	islamic_center_mosque_checkfocusdElement();
	}
});

jQuery('document').ready(function($){
  setTimeout(function () {
		jQuery("#preloader").fadeOut("slow");
  },1000);
});

jQuery(document).ready(function () {
	jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() > 100) {
      jQuery('.scrollup i').fadeIn();
    } else {
      jQuery('.scrollup i').fadeOut();
    }
	});
	jQuery('.scrollup i').click(function () {
    jQuery("html, body").animate({
      scrollTop: 0
    }, 600);
    return false;
	});
});

// tabcontent

jQuery(document).ready(function () {
	jQuery( ".nav-link" ).first().addClass( "active" );
});

function islamic_center_mosque_tab_open(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tab-pane");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("nav-link");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  jQuery(cityName).show()
  evt.currentTarget.className += " active";
}

jQuery(document).ready(function () {
	jQuery('.tab-pane').hide();
	jQuery('.tab-pane:first').show();
});

// tabend

jQuery(document).ready(function(){
	jQuery(".event-cat").hide(); 
    jQuery("button.event-btn").click(function(){
        jQuery(".event-cat").toggle();
    });

    var islamic_center_mosque_mydate =jQuery('.date').val();
  	jQuery(".countdown").each(function(){
      	islamic_center_mosque_countdown(jQuery(this),islamic_center_mosque_mydate);
  	});
});

function islamic_center_mosque_countdown($timer,islamic_center_mosque_mydate){
    // Set the date we're counting down to
    var islamic_center_mosque_countDownDate = new Date(islamic_center_mosque_mydate).getTime();
    // Update the count down every 1 second
    var x = setInterval(function() {
        // Get todays date and time
        var now = new Date().getTime();
        // Find the distance between now an the count down date
        var distance = islamic_center_mosque_countDownDate - now;
        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        // Output the result in an element with id="timer"
        $timer.html( "<div class='numbers'><span class='count'>" + days + "</span><br><span class='text'>Days</span>" + "</div>" + "   " +"<div class='numbers'><span class='count'>" + hours + "</span><br><span class='text'>Hrs</span>" + "</div>" + "   " + "<div class='numbers'><span class='count'>" + minutes + "</span><br><span class='text'>Mins</span>" + "</div>" + "   " + "<div class='numbers'><span class='count'>" + seconds + "</span><br><span class='text'>Sec</spn" + "</div>");

        // If the count down is over, write some text
        if (distance < 0) {
            clearInterval(x);
            $timer.html("EXPIRED");
        }
    }, 1000);
}
