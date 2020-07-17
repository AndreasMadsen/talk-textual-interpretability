var RevealMath = window.RevealMath || (function(){
	function processElement(element) {
		window.katex.render(element.getAttribute('latex'), element, {
			displayMode: element.hasAttribute('display-mode')
		});
	}

	function loadScript(url, callback) {
		var head = document.querySelector('head');
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = url;
		script.onload = callback;
		head.appendChild(script);
	}

	function loadStyle(url, callback) {
		var head = document.querySelector( 'head' );
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.href = url;
		link.onload = callback;
		head.appendChild(link);
	}

	function addStyleHack() {
		var head = document.querySelector( 'head' );
		var stylesheet = document.createElement( 'style' );
		stylesheet.innerHTML = [
			'.reveal math-latex, .reveal math-latex .katex { font: normal 100% KaTeX_Main; line-height: 1.2; text-rendering: geometricPrecision; }',
			'.reveal math-latex[display-mode] { display: block }',
		]
		.join( '\n' );
		head.appendChild(stylesheet);
	}

	return {
		id: 'math',
		init( deck ) {
			var options = deck.getConfig().math || {};
			options.katexScript     = options.katexScript     || 'plugin/math-katex/katex/katex.min.js';
			options.katexStylesheet = options.katexStylesheet || 'plugin/math-katex/katex/katex.min.css';

			var loads = 0;
			loadScript(options.katexScript, maybeLoaded);
			loadStyle(options.katexStylesheet, maybeLoaded);
			addStyleHack();

			function maybeLoaded() {
				loads += 1;
				if (loads == 2) loaded();
			}

			function loaded() {
				var elements = document.querySelectorAll('math-latex');
				Array.from(elements).forEach(processElement);
				deck.layout();
			}
		}
	}
})();
