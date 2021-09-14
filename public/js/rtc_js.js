
    function startTime() {
	let today = new Date();
	let date = today.getDate();
	let daynames = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
	let monthnames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
	    "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
	let day = daynames[today.getDay()];
	let month = monthnames[today.getMonth()];
	let year = today.getFullYear();
	let h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();
	date = checkTime(date);
	h = checkTime(h);
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('rtc_js').innerHTML = day + " " + date + " " + month + " " +
	year + " " + h + ":" + m + ":" + s;
	let t = setTimeout(startTime, 500);
    }
    function checkTime(i) {
	if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
	return i;
    }
