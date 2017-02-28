import Layer from "./components/layer/layer.js";

const App = function () {
	// console.log('layer',layer);
	let app = document.getElementById('app');
	let layer = new Layer();
	app.innerHTML = layer.ele;
}

new App();