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
    "group": "group"
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
    
    $.ajax({
        type: "GET",
        url: `./candidate-data/datasheets/${param_dict['type']}_candidates.csv`,
        dataType: "text",
        success: function(data) {renderPage(data, param_dict);}
     });
});

function renderPage(rawdata, param_dict) {
    let data = $.csv.toObjects(rawdata)
    let cat = param_dict["cat"]

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
            let filepath = data[i][CSVHeader[param_dict["cat"]]];
            if (filepath === "") {
                $(`#picture`).attr("src","./assets/img/coming-soon.png");
            } else {
                $(`#picture`).attr("src",filepath);
            }
    
        } else {
            let videolink = `https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4`
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
        $(`#candidate-info`).text(`Error: Queried ID does not exist (please return to homepage)`);
    }
    



    
}