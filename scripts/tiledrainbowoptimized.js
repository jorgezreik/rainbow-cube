var SQRT3 = Math.sqrt(3);

var fr = 30;
var hei = 526;
var len = 526;
var h = len;
var l = len*SQRT3/2;
var xcount = 6;
var ycount = 6;
var rainbowSplit = 4;
var colorAdj = 0;
var colors = [	'#70C24A',
				'#09A691',
				'#1969BA',
				'#6D3192',
				'#D21787',
				'#E62748',
				'#EA6834',
				'#F1C821',
			];
var scaleFactor = 1/4;
var xSpeed = l/2 * 1/4; //per sec
var adj = 0;
var tileAdj = 0;
var timeStore = 0;

//points
var ulx = 0;
var uly = h/4;
var llx = 0;
var lly = h-h/4;
var umx = l/2;
var umy = 0;
var urx = l;
var ury = h/4;
var lrx = l;
var lry = h-h/4;
var lmx = l/2;
var lmy = h;
var mmx = l/2;
var mmy = h/2;

function setup() {
	createCanvas(len, hei);
	frameRate(fr);
	noStroke();
	//noLoop();
}

function draw() {
	timeStore = millis()/1000;

	translate(-l/8,-h/8); //alignment

	scale(scaleFactor); //scaling


	for(var y = 0; y < ycount; y++)
	{
		tileAdj = - y - 1 - y%2; //colorAdj
		push();
		translate(((y%2)*2-1)*l/4,0); //tiling
		for(var x = 0; x < xcount; x++)
		{
			tileAdj -= 2;
			push();
			translate(x*l,y*h*3/4); //tiling
			drawCube();
			pop();
		}
		pop();
	}

	for(var y = 0; y < ycount; y++)
	{
		push();
		translate(((y%2)*2-1)*l/4,0); //tiling
		for(var x = 0; x < xcount; x++)
		{
			push();
			translate(x*l,0); //tiling
			translate(0,y*h*3/4); //tiling
			stroke(16);
			strokeWeight(len/40);
			line(ulx, uly, llx, lly); //ul-ll
			line(ulx, uly, umx, umy); //ul-um
			line(urx, ury, umx, umy); //ur-um
			pop();
		}
		pop();
	}
}

function drawCube()
{
	drawRainbow();
}

//First point is upper, dir is pos or neg 1
function rainbowHelper(i,xDir,yDir,px1,py1,px2,py2)
{
	var xDisp = xSpeed*timeStore - adj;
	push();

	var x1 = px1 + xDir*i*l/rainbowSplit/2;
	var y1 = py1 + yDir*i*h/rainbowSplit/4;
	var x2 = px2 + xDir*i*l/rainbowSplit/2;
	var y2 = py2 + yDir*i*h/rainbowSplit/4;
	var x3 = px2 + xDir*(i+1)*l/rainbowSplit/2;
	var y3 = py2 + yDir*(i+1)*h/rainbowSplit/4;
	var x4 = px1 + xDir*(i+1)*l/rainbowSplit/2;
	var y4 = py1 + yDir*(i+1)*h/rainbowSplit/4;

	
	x1 += xDir*xDisp;
	y1 += yDir*xDisp/SQRT3;
	x2 += xDir*xDisp;
	y2 += yDir*xDisp/SQRT3;
	x3 += xDir*xDisp;
	y3 += yDir*xDisp/SQRT3;
	x4 += xDir*xDisp;
	y4 += yDir*xDisp/SQRT3;
	
	var xDirN = xDir*l/2;
	var yDirN = yDir*h/4;
	var x3Max = px2 + xDirN;
	var y3Max = py2 + yDirN;
	var x4Max = px1 + xDirN;
	var y4Max = py1 + yDirN;

	if(xDir*x3 > xDir*x3Max)
	{
		x3 = x3Max;
		y3 = y3Max;
		x4 = x4Max;
		y4 = y4Max;
	}

	if(xDir*x1 < xDir*px1)
	{
		x1 = px1;
		y1 = py1;
		x2 = px2;
		y2 = py2;
	}

	if(xDir*x1 > xDir*x3Max && px1==l)
	{
		adj -= xDir*l/8;
		colorAdj++;
	}

	quad(x1,y1,x2,y2,x3,y3,x4,y4);

	pop();
}

function drawRainbow()
{
	for(var i = 0; i <= rainbowSplit; i++)
	{
		push();
		fill(colors[(i+8-(colorAdj-tileAdj)%colors.length)%colors.length]);

		rainbowHelper(i-1,1,1,ulx,uly,umx,umy);
		rainbowHelper(i-1,-1,-1,lmx,lmy,mmx,mmy);
		rainbowHelper(i-1,-1,1,lrx,lry,urx,ury);
		
		pop();
	}
}