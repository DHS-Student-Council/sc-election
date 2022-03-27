$( function() {
    $.ajax({
        type: "GET",
        url: "./candidate-data/datasheets/jh_candidates.csv",
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function processData(rawdata) {
    var data = $.csv.toObjects(rawdata)
    console.log(data)
    for(var i  = 0; i < data.length; i++) {
        contents = $('#template').html();
        copy = $(`<div id=item${i+1} class="col-lg-4 col-md-6"></div>`);
        $('#item-placeholder').append(copy.append(contents));

        $(`#item${i+1} .identifier`).text(data[i]["id"]);
        $(`#item${i+1} .picture`).attr("src",`./candidate-data/experimental/${data[i]["catalog-thumbnail"]}`);
        $(`#item${i+1} a`).attr("href", `./viewer.html?id=${data[i]["id"]}`);
        $(`#item${i+1} .name`).text(data[i]["name"]);
    }
}