
/* 
* Open Case Studies
*/
$('.link').on('click', function() {
    var resu = $(this).attr('data-project');
    var elm = document.getElementById(resu);
  
    $(elm).css('display', 'block');
    elm.style.height = '98vh';
    $('.animator').addClass('animato');
  
  });
  
  /*
  * Close Case Studies
  */
  $('.close-cs').on('click', function() {
    $('.case-study').css('height', '0vh');
    $('.case-study-right').scrollTop(0);
    setTimeout(() => {
      $('.case-study').css('display', 'none')
    }, 1000);
  });