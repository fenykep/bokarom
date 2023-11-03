const weekNoText = document.querySelector("#weekNoSelector div");

function weekSwitcher(forward) {
	var disassembledWeekNoText = weekNoText.innerText.split(" ");
	var wn = Number(disassembledWeekNoText[1]);
	wn = wn + (forward ? wn<52?1:0 : wn>1?-1:0);
	// messy double-ternary but its such a small function
	var newWeekNoText = disassembledWeekNoText[0] + " " + (wn);
	weekNoText.innerText = newWeekNoText;
	console.log('Change weekNo to '+wn);
}