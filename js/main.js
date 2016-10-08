 $.material.init();
 $.material.ripples();

 $(window).scroll(function () {
     var x = $(window).scrollTop();
     if (x >= 50) {
         $('.subHeader').slideUp();
     } else {
         $('.subHeader').slideDown();
     }
 });

$(document).ready(function(){
    $('#searchIcon').click(function(){
        $('#searchBar').slideToggle();
    });
//    $('#closeSearchBtn').click(function(){
//             
//    });
});