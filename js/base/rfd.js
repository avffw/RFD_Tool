$(function() {

    $("button[name=newRfd]").click(function (e) {

        $('.rfdForm').toggleClass('hidden');
        $('.rfdTable').addClass('hidden')
    });

    $('.saveRfd').click(function (e) {
e.preventDefault();

        $('.rfdTable').removeClass('hidden');
        $('.tableButtons').removeClass('hidden');
        $('.rfdForm').addClass('hidden');

    });


});
