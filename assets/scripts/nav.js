$( function() {
    $("#nav-placeholder").load("./templates/nav.html", function() {
        $("a[href*='" + location.pathname + location.search + "']").addClass("active");
        $("a[href*='" + location.pathname + location.search + "']").attr("aria-current", "page");

        if(location.pathname === "/index.html") {
            $("a[href*='/']").addClass("active");
            $("a[href*='/']").attr("aria-current", "page");
        }
    });
});