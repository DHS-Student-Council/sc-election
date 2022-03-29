const enableDiv = {
    "catalog": "displayimage",
    "profile": "displayimage",
    "introvid": "displayvideo",
    "dtalk": "displayvideo",
    "group": "displayimage"
}
const CSVHeader = {
    "catalog": "catalog",
    "profile": "profile",
    "introvid": "introvid-vid",
    "dtalk": "dtalk-vid",
    "group": "infographic"
}
const taskname = {
    "catalog": "Candidates Catalog",
    "profile": "Candidates Profile",
    "introvid": "Introductory Videos",
    "dtalk": "D'TALK",
    "group": "Group Infographic"
}

let param_dict = {};

$( function() {
    params = new URLSearchParams(window.location.search);
    for (const param of params) {
        param_dict[param[0]] = param[1];
    }
    
    if(param_dict["cat"] in taskname && (param_dict["type"]==="jh" || param_dict["type"]==="sh")) {
        if(param_dict["cat"] != "group") {
            $.ajax({
                type: "GET",
                url: `./candidate-data/datasheets/${param_dict['type']}_candidates.csv`,
                dataType: "text",
                success: function(data) {renderIndivPage(data);}
            });
        } else {
            $.ajax({
                type: "GET",
                url: `./candidate-data/datasheets/group_${param_dict["type"]}_data.csv`,
                dataType: "text",
                success: function(data) {renderGroupPage(data);}
            });
        }
    } else {   
        $(`#candidate-info`).text(`Error: Invalid parameters (please return to homepage)`);
    }
});

function renderIndivPage(rawdata) {
    let data = $.csv.toObjects(rawdata)
    let cat = param_dict["cat"]

    $(`#header`).addClass(param_dict["type"])

    let candidate = param_dict["id"]
    let fullCandidateInfo = {}
    let successfulRender = false;

    for (var i = 0; i < data.length; i++) {
        if (data[i]["id"].toLowerCase() === candidate.toLowerCase()) {
            fullCandidateInfo = data[i]
            $(`#candidate-info`).text(`${fullCandidateInfo["id"]} - ${fullCandidateInfo["name"]}`);
            successfulRender = true;
            break;
        }
    }

    if (successfulRender) {
        $(`#${enableDiv[cat]}`).removeClass('d-none')
        if (enableDiv[cat] === "displayfullprofile") {

        } else if (enableDiv[cat] === "displayimage") {
            let CSVHeaderName = CSVHeader[param_dict["cat"]];
            let filepath = data[i][CSVHeaderName];
            if (filepath === "") {
                $(`#picture`).attr("src","./assets/img/coming-soon.png");
            } else {
                $(`#picture`).attr("src",filepath);
            }
    
        } else {
            let CSVHeaderName = CSVHeader[param_dict["cat"]];
            let videolink = data[i][CSVHeaderName];
            const videohtml = `
            <video id="player" playsinline controls data-poster="">
                <source id="vidsrc" src="${videolink}" type="video/mp4" />
            </video>
            `;
            $("#displayvideo").append(videohtml);
            const player = new Plyr('#player', {
                controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen']
            });
            window.player = player;  
        }
    } else {
        $(`#header`).removeClass(param_dict["type"])
        $(`#candidate-info`).text(`Error: Queried ID does not exist (please return to homepage)`);
    }
}

function renderGroupPage(rawdata) {
    let data = $.csv.toObjects(rawdata)
    let cat = param_dict["cat"]

    $(`#header`).addClass(param_dict["type"])

    let group = param_dict["id"]
    let fullCandidateInfo = {}
    let successfulRender = false;

    for (var i = 0; i < data.length; i++) {
        if (data[i]["group_id"].toLowerCase() === group.toLowerCase()) {
            fullCandidateInfo = data[i];
            $(`#candidate-info`).text(`Group ${fullCandidateInfo["group_id"]}`);
            $(`#group_member_details`).text(fullCandidateInfo["members"]);
            $(`#group_member_details`).removeClass("d-none");
            successfulRender = true;
            break;
        }
    }

    if (successfulRender) {
        $(`#displayimage`).removeClass('d-none')
        let CSVHeaderName = CSVHeader[param_dict["cat"]];
        let filepath = data[i][CSVHeaderName];
        if (filepath === "") {
            $(`#picture`).attr("src","./assets/img/coming-soon.png");
        } else {
            $(`#picture`).attr("src",filepath);
        }
    } else {
        $(`#header`).removeClass(param_dict["type"])
        $(`#candidate-info`).text(`Error: Queried ID does not exist (please return to homepage)`);
    }

}