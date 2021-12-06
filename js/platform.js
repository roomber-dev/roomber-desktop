
const serverUrl = "https://roomber-dev.herokuapp.com";

maximized = false;

$("#close-app").click(function() {
	api.send("close");
})

$("#size-app").click(function() {
	maximized = !maximized;
	if(maximized) {
		api.send("maximize");
		$("#size-app i").html("filter_none");
	} else {
		api.send("restore");
		$("#size-app i").html("crop_square");
	}
})

$("#minimize-app").click(function() {
	api.send("minimize");
})

