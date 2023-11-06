function getTodayWeekNo(){
	currentDate = new Date();
	startDate = new Date(currentDate.getFullYear(), 0, 1);
	let days = Math.floor((currentDate - startDate) /
	    (24 * 60 * 60 * 1000));

	return Math.ceil(days / 7);
}

var todayWeekNo = getTodayWeekNo();