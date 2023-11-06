const searchBar = document.querySelector("#searchBar");

//This obviously has to be better
searchBar.addEventListener("input", () => {
	console.log(searchBar.value);
	document.querySelectorAll(".personBubble").forEach((bubble) => {
		console.log(
			bubble.getAttribute("name").slice(0, searchBar.value.length),
		);
		console.log(searchBar.value);
		if (
			bubble.getAttribute("name").slice(0, searchBar.value.length) !=
			searchBar.value
		) {
			bubble.style.display = "none";
		} else {
			bubble.style.display = "block";
		}
	});
});

document.querySelectorAll(".personBubble").forEach((bubble) => {
	bubble.addEventListener("click", () => {
		console.log("goto this pers: "+bubble.getAttribute('name'));
		console.log("goto this hexID: "+bubble.getAttribute('hexID'));
		app.setID(bubble.getAttribute('hexID'));
		jank("p");
	});
});