$(document).ready(function(){
    
    // Make images undragable
    $('img').attr('draggable', false);

    // Dom events
    $('.navbar form input').on('focus', function(){
        $('.navbar form .lg-search-btn').addClass('active');
        $('.navbar form .btn-slash').css('opacity', '0');
    })

    $('.navbar form input').on('blur', function(){
        $('.navbar form .lg-search-btn').removeClass('active');
        $('.navbar form .btn-slash').css('opacity', '1');
    })

    $('.btn-slash').on('click', null, false) //? Make the click event bubbling

    $('.navbar form').on('submit', function(event){
        if ($('.navbar form input').val().length == 0){
            event.preventDefault();
        }
    })

    $('.navbar form').on('keyup', function(){
        // For big screen
        if ($('.navbar form input')[0].value.length == 0){
            $('.navbar form .lg-search-btn').addClass('disable');
        }else{
            $('.navbar form .lg-search-btn').removeClass('disable');
        }
        // For small screen
        if ($('.navbar form input')[1].value.length == 0){
            $('.navbar form .sm-search-btn').addClass('disable');
        }else{
            $('.navbar form .sm-search-btn').removeClass('disable');
        }
    })

    $(document).on('keyup', function(event){
        if (event.keyCode == 191){
            $('.navbar form input').focus();
        }
    })

})