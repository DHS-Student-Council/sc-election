$( function() {
    $("#nav-placeholder").load("./templates/nav.html", function() {
        path = location.pathname.replace("/sc-election", "")

        $("a[href*='" + path + location.search + "']").addClass("active");
        $("a[href*='" + path + location.search + "']").attr("aria-current", "page");

        if(path === "/index.html") {
            $("a[href*='/']").addClass("active");
            $("a[href*='/']").attr("aria-current", "page");
        }
    });
});