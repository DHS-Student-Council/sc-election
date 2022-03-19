$( function() {
    $.ajax({
        type: "GET",
        url: "./assets/datasheets/jh_candidates_experimental.csv",
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

        $(`#item${i+1} .identifier`).text(data[i]["Candidate's ID"]);
        $(`#item${i+1} .picture`).attr("src",`./assets/img/experimental/${data[i]["Catalog (Thumbnail)"]}`);
        $(`#item${i+1} .name`).text(data[i]["Candidate's Name"]);
    }
}