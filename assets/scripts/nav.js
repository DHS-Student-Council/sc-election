$( function() {
    params = new URLSearchParams(window.location.search);
    param_dict = {};
    for (const param of params) {
        param_dict[param[0]] = param[1];
    }


    $("#nav-placeholder").load("./templates/nav.html", function() {
        path = location.pathname.replace("/sc-election", "")

        if(path === "/index.html" || path === "/") {
            $("a#homepage").addClass("active");
            $("a#homepage").attr("aria-current", "page");
        } else {
            $("a[href*='" + path + location.search + "']").addClass("active");
            $("a[href*='" + path + location.search + "']").attr("aria-current", "page");
        }

        if ("type" in param_dict) {
            $("a[data-headertype*='" + param_dict["type"] + "']").addClass("active");
        }
    });
});