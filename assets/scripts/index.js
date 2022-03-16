$( function() {
    var appendArea = $("#item-placeholder");

    for(var i  = 0; i < 3; i++) {
        contents = $('#template').html();
        copy = $(`<div id=item${i}></div>`);
        $('#item-placeholder').append(copy.append(contents));

        $(`#item${i} h1`).text(`ITEM${i}`);
        $(`#item${i} p`).text(`Hi! I am item number ${i}.`);
    }
});