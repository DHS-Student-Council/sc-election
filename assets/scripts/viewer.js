$( function() {
    params = new URLSearchParams(window.location.search);
    param_dict = {};
    for (const param of params) {
        param_dict[param[0]] = param[1];
    }
    
    $.ajax({
        type: "GET",
        url: "./assets/datasheets/jh_candidates_experimental.csv",
        dataType: "text",
        success: function(data) {renderPage(data, param_dict);}
     });
});

function renderPage(rawdata, param_dict) {
    let data = $.csv.toObjects(rawdata)
    let candidate = param_dict["id"]
    let successfulRender = false;
    for (var i = 0; i < data.length; i++) {
        if (data[i]["Candidate's ID"].toLowerCase() === candidate.toLowerCase()) {
            $(`#candidate-info`).text(`${data[i]["Candidate's ID"]} - ${data[i]["Candidate's Name"]}`);
            $(`#picture`).attr("src",`./assets/img/experimental/${data[i]["Catalog (Thumbnail)"]}`);
            successfulRender = true;
            break;
        }
    }

    if(!successfulRender) {
        $(`#candidate-info`).text("Error: The queried ID does not exist");
    }
}