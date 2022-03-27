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

$( function() {
    params = new URLSearchParams(window.location.search);
    param_dict = {};
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
    $(`#${enableDiv[cat]}`).removeClass('d-none')
    if (enableDiv[cat] === "displayfullprofile") {

    } else if (enableDiv[cat] === "displayimage") {
        let candidate = param_dict["id"]
        let successfulRender = false;
        for (var i = 0; i < data.length; i++) {
            if (data[i]["id"].toLowerCase() === candidate.toLowerCase()) {
                $(`#candidate-info`).text(`${data[i]["id"]} - ${data[i]["name"]}`);
                let CSVHeaderName = CSVHeader[param_dict["cat"]]
                console.log(param_dict["cat"])
                console.log(CSVHeaderName)
                $(`#picture`).attr("src",`./candidate-data/experimental/${data[i][CSVHeaderName]}`);
                successfulRender = true;
                break;
            }
        }
        if(!successfulRender) {
            $(`#candidate-info`).text("Error: The queried ID does not exist");
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



    
}