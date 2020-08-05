var fr = 30;
var boxl = 10;
var boxspace = 5;

function setup() {
	createCanvas(640, 480, WEBGL);
	frameRate(fr);
	strokeWeight(0);
	ambientLight(80,50,100);
	ambientMaterial(150);
	//camera(-120,-120,120,0,0,0,1,-1,-1);
}

function draw() {
	background(200);
	directionalLight(230,180,255,1,-1,1);
	push();
	scale(2);
	rotateY(-PI/4 + frameCount*(PI/60));
	rotateX(-PI/4);
	rotateZ(-PI/4);
	translate(-3*(boxl+boxspace),-3*(boxl+boxspace),3*(boxl+boxspace));
	for(var i = 0; i < 5; i++) // y
	{
		translate(0,boxl+boxspace,0);
		push();
		for(var j = 0; j < 5; j++) // z
		{
			translate(0,0,-(boxl+boxspace));
			push();
			for(var k = 0; k < 5; k++) // x
			{
				translate(boxl+boxspace,0,0);
				if(i == 0 && j == 0 && k == 4 
					|| i == 4 && j == 0 && k == 0 
					|| i == 0 && j == 4 && k == 0 )
				{

					ambientMaterial(0);
					box(boxl,boxl,boxl);
					ambientMaterial(150);
				}
				else
					box(boxl,boxl,boxl);
			}
			pop();
		}
		pop();
	}
	pop();
}