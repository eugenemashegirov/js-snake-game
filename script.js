let gP = document.getElementById('gP'),
	g = gP.getContext('2d'),
	sBody = null,
	d = 1,
	a = null,
	s = 25; 

let rand = function (min, max) {
	k = Math.floor(Math.random() * (max - min) + min);
	return (Math.round( k / s) * s);
}

let newA = function () {
		a = [rand(0, innerWidth), rand(0, innerHeight)];
	},
	newB = function () {
		sBody = [{x: 0, y: 0}];
	}

newB(); newA();
gP.width = innerWidth;
gP.height = innerHeight;

setInterval(() => {
	if (a[0] + s >= gP.width || a[1] + s >= gP.height) newA(); 
            
	g.clearRect(0, 0, gP.width, gP.height);
	g.fillStyle = "red";
	g.fillRect(...a, s, s);
	g.fillStyle = "#000";

	sBody.forEach(function(el, i) {
		if (el.x == sBody[sBody.length - 1].x && el.y == sBody[sBody.length - 1].y && i < sBody.length - 1) {
			sBody.splice(0, sBody.length - 1), sBody = [{x:0, y:0}], d = 1;
		}
	});

	let m = sBody[0], f = {x: m.x, y: m.y}, l = sBody[sBody.length - 1];
	if (d == 1)  f.x = l.x + s, f.y = Math.round(l.y / s) * s;
	if (d == 2) f.y = l.y + s, f.x = Math.round(l.x / s) * s;
	if (d == 3) f.x = l.x - s, f.y = Math.round(l.y / s) * s;
	if (d == 4) f.y = l.y - s, f.x = Math.round(l.x / s) * s;
	sBody.push(f);
	sBody.splice(0,1);

	sBody.forEach(function(pob, i) {
		if (d == 1) if (pob.x > Math.round(gP.width / s) * s) pob.x = 0;
		if (d == 2) if (pob.y > Math.round(gP.height / s) * s) pob.y = 0;
		if (d == 3) if (pob.x < 0) pob.x = Math.round(gP.width / s) * s;
		if (d == 4) if (pob.y < 0) pob.y = Math.round(gP.height / s) * s;
		if (pob.x == a[0] && pob.y == a[1]) newA(), sBody.unshift({x: f.x - s, y: l.y});

		g.fillRect(pob.x, pob.y, s, s);
	});
}, 1000 / 20);

window.onkeydown = function (e) {
	let k = e.keyCode;

	if ([38,39,40,37].indexOf(k) >= 0) e.preventDefault();

	if (k == 39 && d != 3) d = 1;
	if (k == 40 && d != 4) d = 2;
	if (k == 37 && d != 1) d = 3;
	if (k == 38 && d != 2) d = 4;
};