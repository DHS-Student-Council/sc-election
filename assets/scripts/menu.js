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

const CSVHeader = {
    "catalog": "catalog",
    "profile": "profile",
    "introvid": "introvid-vid",
    "dtalk": "dtalk-vid",
    "group": "group"
}

let param_dict = {};

$( function() {
    // gets javascript object of search parameters
    params = new URLSearchParams(window.location.search);
    for (const param of params) {
        param_dict[param[0]] = param[1];
    }

    $.ajax({
        type: "GET",
        url: `./candidate-data/datasheets/${param_dict["type"]}_candidates.csv`,
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function processData(rawdata) {
    // converts csv data array of objects
    var data = $.csv.toObjects(rawdata);

    // only render valid cat and type queries
    if(param_dict["cat"] in taskname && (param_dict["type"]==="jh" || param_dict["type"]==="sh")) {
        // change text to match taskname (based on 'cat' in search params)
        $(`#taskname`).text(`${param_dict["type"].toUpperCase()}: ${taskname[param_dict["cat"]]}`);
        // change description to match taskname (based on 'cat' in search params)
        let description = taskdesc[param_dict["cat"]];
        if (description !== "") {
            $(`#taskdesc`).removeClass("d-none");
            $(`#taskname`).addClass("mb-3");
            $(`#taskdesc`).text(description);
        }
        // add class for different colouring (based on 'type' in search params)
        $(`#header`).addClass(param_dict["type"])
    } else {
        $(`#taskname`).text(`Error: Invalid parameters (please return to homepage)`);
    }
    

    for(var i  = 0; i < data.length; i++) {
        // get contents of template and duplicate (to generate all candidate items)
        contents = $('#template').html();
        copy = $(`<div id=item${i+1} class="col-lg-4 col-md-6"></div>`);
        $('#item-placeholder').append(copy.append(contents));

        // change text and attributes of template
        $(`#item${i+1} .identifier`).text(data[i]["id"]);
        let filepath = `./candidate-data/experimental/${data[i][CSVHeader[param_dict["cat"]]]}`;
        if (filepath === "./candidate-data/experimental/") {
            $(`#item${i+1} .picture`).attr("src","./assets/img/coming-soon.png");
        } else {
            $(`#item${i+1} .picture`).attr("src",filepath);
        }
        $(`#item${i+1} .picture`).attr("alt", `${data[i]["id"]} ${data[i]["name"]}`);
        $(`#item${i+1} a`).attr("href", `./viewer.html?type=${param_dict["type"]}&cat=${param_dict["cat"]}&id=${data[i]["id"]}`);
        $(`#item${i+1} .name`).text(data[i]["name"]);
    }
}