var fr = 30;
var hei = 526;
var len = 526;
var h = len;
var l = len*Math.sqrt(3)/2;
var xcount = 4;
var ycount = 4;
var scaleFactor = 1/4;

function setup() {
	createCanvas(len+1, hei+1);
	frameRate(fr);
	background(200);
	//noLoop();
}

function draw() {
	translate((h-l)/2,0); //alignment
	scale(scaleFactor);
	for(var x = 0; x < xcount; x++)
	{
		push();
		translate(x*l,0); //tiling
		for(var y = 0; y < ycount; y++)
		{
			push();
			translate(0,y*h); //tiling
			drawCube();
			pop();
		}
		pop();
	}
}

function drawCube()
{
	// point(l/2,h/2); //middle
	// point(0, h/4); //upper-left
	// point(0, h-h/4); //lower-left
	// point(l, h/4); //upper-right
	// point(l, h-h/4); //lower-right
	// point(l/2, 0); //upper-middle
	// point(l/2, h); //lower-middle

	line(0,h/4,0,h-h/4); //ul-ll
	line(l,h/4,l,h-h/4); //ur-lr
	line(0,h/4,l/2, 0); //ul-um
	line(l,h/4,l/2, 0); //ur-um
	line(l, h-h/4,l/2, h); //ll-lm
	line(0, h-h/4,l/2, h); //lr-lm
	line(0,h/4,l/2,h/2); //ul-m
	line(l,h/4,l/2,h/2); //ur-m
	line(l/2,h,l/2,h/2); //lm-m
}
