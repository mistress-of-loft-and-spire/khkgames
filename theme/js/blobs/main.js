
tdl.require('tdl.fast');
tdl.require('tdl.primitives');
tdl.require('tdl.programs');
tdl.require('tdl.models');
tdl.require('tdl.buffers');
tdl.require('tdl.framebuffers');

var gl;
var canvas;
var aspect;

// Use this to refer to the backbuffer as if it were another framebuffer
var backbuffer;
var quad;
var imm;
var g_numBlobs;
var g_resolution;
var g_requestId;

if (!window.Float32Array) {
  // This just makes some errors go away when there is no WebGL.
  window.Float32Array = function() { };
}

// Useful global math constants
var up = new Float32Array([0, 1, 0])

var output = alert

var singleEffect = null

function mainloop() {
  var timer = 0.0;

  var BPM = 60.0;
  var frameCount = 0;

  function render() 
  {
	timer += 0.015;

    aspect = canvas.clientWidth / canvas.clientHeight
    singleEffect.render(null, timer, g_numBlobs)
    frameCount++;
    g_requestId = tdl.webgl.requestAnimationFrame(render, canvas);
	
  }

  // Repeatedly run render(), attempt to hold 60 but the demo is
  // framerate independent so we will still keep sync even if we
  // lose frames.
  render();
  
  
}

function initializeGraphics() {
  canvas = document.getElementById('render_area');
  gl = tdl.webgl.setupWebGL(canvas);
  if (!gl) {
    return false;
  }

  aspect = canvas.clientWidth / canvas.clientHeight
  backbuffer = tdl.framebuffers.getBackBuffer(canvas)
  imm = new ImmSim()

  // Set some sane defaults.
  gl.disable(gl.BLEND);
  gl.depthFunc(gl.LEQUAL);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  return true;
}


function setup() {
	if (initializeGraphics())
	{
		g_numBlobs = 12;
		singleEffect = new MarchingCubesEffect(16);
		
		mainloop()
	}
}

window.onload = function() {
  setup();
  stickyNav()
}
