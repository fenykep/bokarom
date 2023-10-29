const searchBar = document.querySelector('#searchBar');

searchBar.addEventListener("input" , () => {
	console.log(searchBar.value);
	document.querySelectorAll('.personBubble').forEach(bubble => {
		console.log(bubble.getAttribute('name').slice(0,searchBar.value.length));
		console.log(searchBar.value);
		if (bubble.getAttribute('name').slice(0,searchBar.value.length) != searchBar.value) {
			bubble.style.display="none";
		} else {
			bubble.style.display="block";
		}
	});
});