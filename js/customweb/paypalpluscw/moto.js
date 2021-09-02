document.observe("dom:loaded", function(){
	$$('.paypalpluscw-button.cancel').each(function(element){
		element.writeAttribute('onclick', false);
		element.stopObserving('click');
		element.observe('click', function(event){
			window.location.href = $$('[name="cancelUrl"]')[0].value;
			Event.stop(event);
		});
	});
});