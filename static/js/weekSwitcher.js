const weekNoText = document.querySelector("#weekNoSelector div");

function weekSwitcher(forward) {
	var disassembledWeekNoText = weekNoText.innerText.split(" ");
	var wn = Number(disassembledWeekNoText[1]);
	// messy double-ternary but its such a small function
	wn = wn + (forward ? wn<52?1:0 : wn>1?-1:0);
	app.setWeek(wn);
	var newWeekNoText = disassembledWeekNoText[0] + " " + (wn);
	weekNoText.innerText = newWeekNoText;
	console.log('Change weekNo to '+wn);
}