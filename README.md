<h1>Image Carousel</h1>
<h2>Simple 2D Image Carousel for Mobile and Desktop</h2>
<h3>Config:</h3>
<ul>
	<h4>Parent element set to overflow hidden to hide panels</h4>
	<li>wrapper: null,</li>

	<h4>Unordered list of panels</h4>
    <li>panelContainer: null,</li>

    <h4>List elements from panelContainer</h4>
    <li>panels: null,</li>

    <h4>Number of panels in list (Could be refactored to dynamic number)</h4>
    <li>panelsX: 3,</li>       

    <h4>Size of wrapper and each panel</h4>
    <li>wrapperWidth: window.innerWidth,</li>
    <li>wrapperHeight: window.innerHeight,</li>
    <li>panelWidth: window.innerWidth,</li>
    <li>panelHeight: window.innerHeight,</li>

    <h4>Toggle for loop functionality</h4>
    <li>loop: true,</li>

    <h4>Speed of carousel to navigate between each panel</h4>
    <li>transitionSpeed: 300,</li>
</ul>

<h3>Default Element Structure:</h3>
<pre><code>
<div id='wrapper'>
    <ul id='panel-container'>
        <li id='panel-1'></li>
        <li id='panel-2'></li>
        <li id='panel-3'></li>
    </ul>
</div>
</code></pre>