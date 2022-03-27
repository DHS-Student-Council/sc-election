const taskname = {
    "catalog": "Candidates Catalog",
    "profile": "Candidates Profile",
    "introvid": "Introductory Videos",
    "dtalk": "D'TALK",
    "group": "Group Infographic"
}

const taskdesc = {
    "catalog": "",
    "profile": "Candidates to design an individual poster to introduce themselves, letting the student body learn more about themselves, their goals, visions and reasons for running for SC.",
    "introvid": "Candidates to come up with a short 15-30s video that helps with self introduction. This platform allows candidates to unleash their creativity and let the student population see more of the candidate's personalities.",
    "dtalk": "Candidates are forced to think on their feet one of two questions, showing candidate’s creativity and adaptability.",
    "group": "Groups create initiatives based off SC related keywords"
}


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
        params = new URLSearchParams(window.location.search);
        param_dict = {};
        for (const param of params) {
            param_dict[param[0]] = param[1];
        }

        $(`#taskname`).text(`${param_dict["type"].toUpperCase()}: ${taskname[param_dict["cat"]]}`);
        let description = taskdesc[param_dict["cat"]];
        if (description !== "") {
            $(`#taskdesc`).removeClass("d-none");
            $(`#taskname`).addClass("mb-3");
            $(`#taskdesc`).text(description);
        }

        $(`#header`).addClass(param_dict["type"])


        contents = $('#template').html();
        copy = $(`<div id=item${i+1} class="col-lg-4 col-md-6"></div>`);
        $('#item-placeholder').append(copy.append(contents));

        $(`#item${i+1} .identifier`).text(data[i]["id"]);
        $(`#item${i+1} .picture`).attr("src",`./candidate-data/experimental/${data[i]["catalog-thumbnail"]}`);
        $(`#item${i+1} .picture`).attr("alt", `${data[i]["id"]} ${data[i]["name"]}: Catalog`);
        $(`#item${i+1} a`).attr("href", `./viewer.html?id=${data[i]["id"]}`);
        $(`#item${i+1} .name`).text(data[i]["name"]);
    }
}