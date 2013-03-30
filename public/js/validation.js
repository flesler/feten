(function(){
	
	var form = document.getElementsByTagName('form')[0];
	if (!form)
		return;
	
	var isIE = !!document.all,
		labels = form.getElementsByTagName('label'),
		submit = $('submit');
	
	submit.onmouseover = onOver;
	submit.onmouseout = onOut;
	submit.onclick = validate;
	
	function $(id){ 
		return document.getElementById(id); 
	};
	
	function onOver(){
		submit.src = submit.src.replace('.png', '_2.png');
	};
	function onOut(){
		submit.src = submit.src.replace('_2.png', '.png');
	};

	function validate(){
		for (var i = 0; i < labels.length; i++) {
			var label = labels[i];
			if (label.innerHTML.indexOf('*') === -1)
				continue;

			var elem = label.nextSibling,
				ok = !!elem.value;

			label.className = ok ? '' : 'error';
				
			if (!ok) {
				return false;
			}
		}
		
		return true;
	}
})();

