var fr = 30;
var hei = 526;
var len = 526;
var h = len;
var l = len*Math.sqrt(3)/2;
var xcount = 4;
var ycount = 4;
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
var scaleFactor = 1;
var xSpeed = l/2*scaleFactor / 2; //per sec
var adj = 0;

function setup() {
	createCanvas(len+1, hei+1);
	frameRate(fr);
	background(200);
	noStroke();
	//noLoop();
}

function draw() {
	translate((h-l)/2,0); //alignment
	drawCube();
}

function drawCube()
{
	drawRainbow();
	push();
	stroke(0);
	strokeWeight(len/100*scaleFactor);
	line(0,   h/4,   0,   h-h/4); //ul-ll
	line(l,   h/4,   l,   h-h/4); //ur-lr
	line(0,   h/4,   l/2, 0); //ul-um
	line(l,   h/4,   l/2, 0); //ur-um
	line(l,   h-h/4, l/2, h); //lr-lm
	line(0,   h-h/4, l/2, h); //ll-lm
	//line(0,   h/4,   l/2, h/2); //ul-m
	//line(l,   h/4,   l/2, h/2); //ur-m
	//line(l/2, h,     l/2, h/2); //lm-m
	pop();
}

//First point is upper, dir is pos or neg 1
function rainbowHelper(i,xDir,yDir,px1,py1,px2,py2)
{
	var xDisp = xSpeed*millis()/1000 - adj;
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
	y1 += yDir*xDisp/Math.sqrt(3);
	x2 += xDir*xDisp;
	y2 += yDir*xDisp/Math.sqrt(3);
	x3 += xDir*xDisp;
	y3 += yDir*xDisp/Math.sqrt(3);
	x4 += xDir*xDisp;
	y4 += yDir*xDisp/Math.sqrt(3);
	
	var x1Min = px1 + xDir*l/2;
	var y1Min = py1 + yDir*h/4;
	var x2Min = px2 + xDir*l/2;
	var y2Min = py2 + yDir*h/4;
	var x3Max = px2 + xDir*l/2;
	var y3Max = py2 + yDir*h/4;
	var x4Max = px1 + xDir*l/2;
	var y4Max = py1 + yDir*h/4;

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
		adj -= xDir*l/2*scaleFactor/4;
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
		fill(colors[(i+8-colorAdj%colors.length)%colors.length]);

		rainbowHelper(i-1,1,1,0,h/4,l/2,0);
		rainbowHelper(i-1,-1,-1,l/2,h,l/2,h/2);
		rainbowHelper(i-1,-1,1,l,h-h/4,l,h/4);
		
		pop();
	}
}