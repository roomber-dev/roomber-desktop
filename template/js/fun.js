$.getJSON("../assets/json/fun_facts.json", function(facts) {
	var index = getRandomInt(0,facts.length-1);
	$("#fun-fact").html(facts[index]);
});