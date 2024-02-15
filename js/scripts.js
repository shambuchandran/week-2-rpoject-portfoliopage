/* Description: Custom JS file */


(function ($) {
    "use strict";

    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function () {
        if ($(".navbar").offset().top > 60) {
            $(".fixed-top").addClass("top-nav-collapse");
        } else {
            $(".fixed-top").removeClass("top-nav-collapse");
        }
    });

    // jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function () {
        $(document).on('click', 'a.page-scroll', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 600, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    // offcanvas script from Bootstrap + added element to close menu on click in small viewport
    $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    // hover in desktop mode
    function toggleDropdown(e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function () {
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    $('body')
        .on('mouseenter mouseleave', '.dropdown', toggleDropdown)
        .on('click', '.dropdown-menu a', toggleDropdown);


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function () {
        if ($(this).val() != '') {
            $(this).addClass('notEmpty');
        } else {
            $(this).removeClass('notEmpty');
        }
    });


    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function () {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


    /* Removes Long Focus On Buttons */
    $(".button, a, button").mouseup(function () {
        $(this).blur();
    });

})(jQuery);


// for form validation

function validate() {
    let flag = false;
    let mailFormate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    let name = $(".form-name").val();

    if (name == "" || name == undefined) {
        $(".form-name-msg").html("name is required").addClass("text-danger");
        flag = false;
    } else {
        $(".form-name-msg").html("ok").removeClass("text-danger").addClass("text-success");
        flag = true;
    }

    let email = $(".form-email").val();

    if (email == "" || email == undefined) {
        $(".form-email-msg").html("email is required").addClass("text-danger");
        flag = false;
    } else if (mailFormate.test(email) == false) {
        $(".form-email-msg").html("email is invalid must be in (fake@email.com)").addClass("text-danger");
        flag = false;
    } else {
        $(".form-email-msg").html("ok").removeClass("text-danger").addClass("text-success");
        flag = true;
    }

    let message=$(".form-message").val();
    
    if(message==""||message==undefined){
        $(".form-message-msg").html("message is required").addClass("text-danger");
        flag = false;
    }else if(message.length <=10){
        $(".form-message-msg").html("more than 10 char required").addClass("text-danger");
        flag = false;
    }else{
        $(".form-message-msg").html("ok").removeClass("text-danger").addClass("text-success");
        flag = true;

    }

    return flag;
}


//for form submission

const scriptURL = 'https://script.google.com/macros/s/AKfycbySga4wKgone5kgV71i7JxJfP4kDO5xf3iG8b7tBypVmSIexzT40kboxFp2GXMms-_R9g/exec'
const form = document.forms['contact-form']

form.addEventListener('submit', e => {
    e.preventDefault()
    if (validate()) {
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => alert("Thank you! your form is submitted successfully."))
        .then(() => { window.location.reload(); })
        .catch(error => console.error('Error!', error.message))
    }
})
