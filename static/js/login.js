$(document).ready(function () {
    var panelOne = $('.form-panel.two').height(),
        panelTwo = $('.form-panel.two')[0].scrollHeight;

    $('.form-panel.two').not('.form-panel.two.active').on('click', function (e) {

        $('.form-toggle').addClass('visible');
        $('.form-panel.one').addClass('hidden');
        $('.form-panel.two').addClass('active');
        $('.form').animate({
            'height': panelTwo
        }, 200);
        $("html, body").animate({ scrollTop: "95" }, 300);
    });

    $('.form-toggle').on('click', function (e) {
        e.preventDefault();
        $(this).removeClass('visible');
        $('.form-panel.one').removeClass('hidden');
        $('.form-panel.two').removeClass('active');
        $('.form').animate({
            'height': panelOne
        }, 200);
    });

    // Validitation

    // Login form
    $('#login-form').on('submit', function (event) {
        if (!$('#username-login').val() || !$('#password-login').val()) {
            console.log('fack');
            event.preventDefault();
            $('#login-alert').html('Please fill out the field below!').css('display', 'flex');
        }
    });

    // Sign In form
    let eRGX = /[0-9a-zA-Z]+\@+[a-z]+\.+['com']/;
    $('#signin-form').on('submit', function (event) {
        if (!$('#username-signin').val() || !$('#password-signin') //? Continuation of condition in the nex line
            || !$('#cpassword-signin') || !$('#email-signin')) {
            event.preventDefault();
            $('#signin-alert').html('Please fill out the field below!').css('display', 'flex');
        } else if ($('#password-signin').val().length < 8) {
            event.preventDefault();
            $('#signin-alert').html('Please enter a password longer than 8 characters!').css('display', 'flex');
        } else if ($('#password-signin').val() !== $('#cpassword-signin').val()) {
            event.preventDefault();
            $('#signin-alert').html('Please confirm the password correctly!').css('display', 'flex');
        } else if (!eRGX.test($('#email-signin').val())) {
            event.preventDefault();
            $('#signin-alert').html('Please enter a valid email!').css('display', 'flex');
        }
    });

});