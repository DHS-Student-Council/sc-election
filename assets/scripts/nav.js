function loadNavBar (pageID) {
    $("#nav-placeholder").load("./templates/nav.html", function() {
        $(`#${pageID}`).addClass("active");
        $(`#${pageID}`).attr("aria-current", "page");
    });
}