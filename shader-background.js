// Get the canvas and WebGL context
const canvas = document.getElementById("shaderCanvas");
const gl = canvas.getContext("webgl");

// Resize the canvas to fit the window
function resizeCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	gl.viewport(0, 0, canvas.width, canvas.height);
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Vertex Shader
const vertexShaderSource = `
    attribute vec4 a_position;
    void main() {
        gl_Position = a_position;
    }
`;

// Fragment Shader
const fragmentShaderSource = `
    precision mediump float;
    uniform vec2 iResolution;
    uniform float iTime;

    void mainImage(out vec4 fragColor, in vec2 fragCoord) {
        float aspect_ratio = iResolution.y / iResolution.x;
        vec2 uv = fragCoord.xy / iResolution.x;
        uv -= vec2(0.5, 0.5 * aspect_ratio);
        float rot = radians(-30.0 - iTime);
        mat2 rotation_matrix = mat2(cos(rot), -sin(rot), sin(rot), cos(rot));
        uv = rotation_matrix * uv;
        vec2 scaled_uv = 20.0 * uv; 
        vec2 tile = fract(scaled_uv);
        float tile_dist = min(min(tile.x, 1.0 - tile.x), min(tile.y, 1.0 - tile.y));
        float square_dist = length(floor(scaled_uv));
        
        float edge = sin(iTime - square_dist * 20.0);
        edge = mod(edge * edge, edge / edge);

        float value = mix(tile_dist, 1.0 - tile_dist, step(1.0, edge));
        edge = pow(abs(1.0 - edge), 2.2) * 0.5;
        
        value = smoothstep(edge - 0.05, edge, 0.95 * value);
        
        value += square_dist * 0.1;
        value *= 0.8 - 0.2;
        fragColor = vec4(pow(value, 2.0), pow(value, 1.5), pow(value, 1.2), 1.0);
    }

    void main() {
        mainImage(gl_FragColor, gl_FragCoord.xy);
    }
`;

// Helper function to create and compile a shader
function createShader(gl, type, source) {
	const shader = gl.createShader(type);
	gl.shaderSource(shader, source);
	gl.compileShader(shader);
	if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		console.error("Shader compile error: ", gl.getShaderInfoLog(shader));
		gl.deleteShader(shader);
		return null;
	}
	return shader;
}

// Helper function to create the shader program
function createProgram(gl, vertexShader, fragmentShader) {
	const program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error("Program link error: ", gl.getProgramInfoLog(program));
		gl.deleteProgram(program);
		return null;
	}
	return program;
}

// Create shaders and program
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
const program = createProgram(gl, vertexShader, fragmentShader);

// Look up uniforms and attributes
const positionLocation = gl.getAttribLocation(program, "a_position");
const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
const iTimeLocation = gl.getUniformLocation(program, "iTime");

// Create a buffer for the rectangle that covers the canvas
const positionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(
	gl.ARRAY_BUFFER,
	new Float32Array([
		-1,
		-1, // Bottom-left corner
		1,
		-1, // Bottom-right corner
		-1,
		1, // Top-left corner
		-1,
		1, // Top-left corner
		1,
		-1, // Bottom-right corner
		1,
		1, // Top-right corner
	]),
	gl.STATIC_DRAW
);

// Tell WebGL how to pull data from the position buffer
gl.useProgram(program);
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

// Render loop
function render(time) {
	time *= 0.001; // Convert to seconds

	// Pass uniforms to the shader
	gl.uniform2f(iResolutionLocation, canvas.width, canvas.height);
	gl.uniform1f(iTimeLocation, time);

	// Draw the rectangle
	gl.clear(gl.COLOR_BUFFER_BIT);
	gl.drawArrays(gl.TRIANGLES, 0, 6);

	requestAnimationFrame(render);
}
requestAnimationFrame(render);
