const weekNo = document.querySelector("#weekNoSelector div");

function weekSwitcher(forward) {
	var disassembledWeekNo = weekNo.innerText.split(" ");
	var wn = Number(disassembledWeekNo[1]);
	// messy double-ternary but its such a small function
	var newWeekNo = disassembledWeekNo[0] + " " + (wn + (forward ? wn<52?1:0 : wn>1?-1:0));
	weekNo.innerText = newWeekNo;
}