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
    "dtalk": "Candidates are required to answer one out of two questions on the spot, showcasing their creativity and adaptability.",
    "group": "Candidates are grouped and tasked to propose an initiative based off a SC related keyword to enhance the experiences for the student population in Dunman High."
}

const CSVHeader = {
    "catalog": "catalog",
    "profile": "profile",
    "introvid": "introvid-thumbnail",
    "dtalk": "dtalk-thumbnail",
    "group": "infographic"
}

let param_dict = {};

$( function() {
    // gets javascript object of search parameters
    params = new URLSearchParams(window.location.search);
    for (const param of params) {
        param_dict[param[0]] = param[1];
    }

    // only render valid cat and type queries
    if(param_dict["cat"] in taskname && (param_dict["type"]==="jh" || param_dict["type"]==="sh")) {
        if (param_dict["cat"] != "group") {
            $.ajax({
                type: "GET",
                url: `./candidate-data/datasheets/${param_dict["type"]}_candidates.csv`,
                dataType: "text",
                success: function(data) {processData(data, true);}
            });
        } else {
            $.ajax({
                type: "GET",
                url: `./candidate-data/datasheets/group_${param_dict["type"]}_data.csv`,
                dataType: "text",
                success: function(data) {processData(data, false);}
            });
        }
    } else {
        $(`#taskname`).text(`Error: Invalid parameters (please return to homepage)`);
    }

});

function processData(rawdata, isIndividual) {
    // converts csv data array of objects
    var data = $.csv.toObjects(rawdata);
    console.log(data)

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
  
    for(var i  = 0; i < data.length; i++) {
        // get contents of template and duplicate (to generate all candidate items)
        contents = $('#template').html();
        copy = $(`<div id=item${i+1} class="col-lg-4 col-md-6 text-center my-2"></div>`);
        $('#item-placeholder').append(copy.append(contents));

        // change text and attributes of template
        let filepath = data[i][CSVHeader[param_dict["cat"]]];
        if (filepath === "") {
            $(`#item${i+1} .picture`).attr("src","./assets/img/coming_soon.png");
        } else {
            $(`#item${i+1} .picture`).attr("src",filepath);
        }

        if (isIndividual) {
            $(`#item${i+1} .identifier`).text(data[i]["id"]);
            $(`#item${i+1} .picture`).attr("alt", `${data[i]["id"]} ${data[i]["name"]}`);
            $(`#item${i+1} a`).attr("href", `./viewer.html?type=${param_dict["type"]}&cat=${param_dict["cat"]}&id=${data[i]["id"]}`);
            $(`#item${i+1} .name`).text(data[i]["name"]);
        } else {
            $(`#item${i+1} .identifier`).text(data[i]["group_id"]);
            $(`#item${i+1} .picture`).attr("alt", `${data[i]["group_id"]}`);
            $(`#item${i+1} a`).attr("href", `./viewer.html?type=${param_dict["type"]}&cat=${param_dict["cat"]}&id=${data[i]["group_id"]}`);
            $(`#item${i+1} .name`).text(data[i]["members"]);
            $(`#item${i+1} .name`).removeClass("h3");
            $(`#item${i+1} .name`).addClass("groupmembers");
            $(`#item${i+1} .name`).addClass("mt-2");
        }
    }
}