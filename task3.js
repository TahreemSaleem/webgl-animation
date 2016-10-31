
var timePrev = Date.now();

function main(speed) {
  	var canvas = document.getElementById('webgl');
	var gl = getWebGLContext(canvas);
	if (!gl){
		console.log('Failed to find context');
	}
	
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
	gl.useProgram (program);
	gl.program = program;


	var numberOfVertices = initVertices(program, gl,canvas);

	var currentangle = 0.0;
	var time, elapsed;
	var tick = function(){
		currentangle = animate(currentangle, time, elapsed,speed);
		render(gl,program, numberOfVertices, currentangle);
		requestAnimationFrame(tick)
	}
	tick();
	
	

}

var FizzyText = function() {
 
  this.speed = 5;

}

window.onload = function() {
 
  	var text = new FizzyText();
  	var gui = new dat.GUI();
  	
	var speed = gui.add(text, 'speed',0,10);
	speed.onFinishChange(function(value) {
		
		main(value);
	});
	main(5);

};


function initTransformations(gl, modelMatrix){
	var transformationMatrix = gl.getUniformLocation(gl.program, 'transformationMatrix');
	gl.uniformMatrix4fv(transformationMatrix, false, flatten(modelMatrix));	

}
function animate(currentangle, time, elapsed,speed){
	time = Date.now();
	elapsed = time - timePrev;
	timePrev = time;

	return (currentangle + (elapsed / 1000)*speed);
}

function render (gl, program,numberOfVertices,angle){
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT);


	var u_FragColor = gl.getUniformLocation(program, 'u_FragColor');
		if (u_FragColor < 0) { 
			console.log ("Failed to Get Color"); 
			return;	
		}
	c = 1.0/255;
	
	gl.uniform4f(u_FragColor,c*158 , c*11 ,c*15,1.0 );
	mat4.identity(mvMatrix);
	mat4.rotateZ(mvMatrix, mvMatrix, angle);
	mat4.translate(mvMatrix, mvMatrix, [0.7, 0, 0.0]);
	mat4.rotateZ(mvMatrix,mvMatrix,1.5708);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.TRIANGLES, 0, 3 );

	mvPushMatrix();

	mat4.translate(mvMatrix, mvMatrix, [0.3, 0.0, 0.0]);
		initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.TRIANGLES, 0, 3);

	mvPopMatrix();
	mvPushMatrix();

	mat4.translate(mvMatrix, mvMatrix, [-0.3, 0.0, 0.0]);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.TRIANGLES, 0, 3);

	mvPopMatrix();

	
	mat4.translate(mvMatrix, mvMatrix, [0,1.4, 0]);
	mat4.rotateZ(mvMatrix,mvMatrix,3.14);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.TRIANGLES, 0, 3);

	mvPushMatrix();


	mat4.translate(mvMatrix, mvMatrix, [0.3, 0, 0]);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.TRIANGLES, 0, 3);

	mvPopMatrix();
	mvPushMatrix();

	mat4.translate(mvMatrix, mvMatrix, [-0.3, 0, 0]);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.TRIANGLES, 0, 4);

	mvPopMatrix();

	mat4.translate(mvMatrix, mvMatrix, [0.7,0.7, 0]);
	mat4.rotateZ(mvMatrix,mvMatrix,1.5708);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.TRIANGLES, 0, 3);

	mvPushMatrix();

	mat4.translate(mvMatrix, mvMatrix, [0,1.4, 0]);
	mat4.rotateZ(mvMatrix,mvMatrix,3.14);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.TRIANGLES, 0, 3);
	
	gl.uniform4f(u_FragColor,c*66 , c*190 ,c*216,1.0 );

	mat4.translate(mvMatrix, mvMatrix, [0,0.7, 0]);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.TRIANGLE_FAN, 3, 4);
	
	gl.uniform4f(u_FragColor,c*65 , c*114 ,c*50,1.0 );
	mat4.identity(mvMatrix);
	mat4.rotateZ(mvMatrix, mvMatrix, angle);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.LINES, 7, 2);

	mvPushMatrix();
	mat4.rotateZ(mvMatrix,mvMatrix,1.5708);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.LINES, 7, 2);

	
	gl.uniform4f(u_FragColor,c*255 , c*255 ,c*0,1.0 );
	mat4.identity(mvMatrix);
	mat4.translate(mvMatrix, mvMatrix, [-0.7,0.8, 0]);
	initTransformations(gl, mvMatrix );

	gl.drawArrays(gl.TRIANGLE_FAN, 9, 4);

	mat4.translate(mvMatrix, mvMatrix, [1.4,-1.6, 0]);
	initTransformations(gl, mvMatrix );
	gl.drawArrays(gl.TRIANGLE_FAN, 9, 4);

	
		
}

function initVertices(program, gl,canvas){
	var vertices = [-0.1 , -0.1, 0.1, -0.1, 0, 0.1,-0.3,-0.3 ,-0.3,0.3,0.3,0.3,0.3,-0.3,-0.63,0,0.63,0 ,-0.1,-0.1,-0.1,0.1,0.1,0.1,0.1,-0.1];
	
	var noOfDim = 2;
	var numberOfVertices = vertices.length / noOfDim;
	
	var vertexBuffer = gl.createBuffer();
	if (!vertexBuffer){ console.log('Failed to create the buffer object ');	return -1;}
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
	
	var a_Position = gl.getAttribLocation(program, 'a_Position');
	if (a_Position < 0) { console.log ("Failed to Get Position"); return;	}
	
	gl.vertexAttribPointer(a_Position, noOfDim, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(a_Position);
	
	return numberOfVertices;
}

