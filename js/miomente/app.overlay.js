$j(document).ready(function() {
    
    if($j('#overlay').length == 0) {
        var overlay = '<div id="overlay"></div>';
        
        $j(overlay).insertAfter('.std');
    }
   
    //$j(".std a").attr('rel', '#jq-overlay');
    $j(".std .thumb img").parent('a').attr('rel', '#overlay');

    var contentWrap = '<div class="contentWrap"></div>';
    $j('#overlay').attr('class', 'apple_overlay');
    $j('#overlay').append(contentWrap);
    
    $j("a[rel]").overlay({        
        mask: {
            color: '#000',
            loadSpeed: 200,
            opacity: 0.8
        },
        closeOnClick: true,
 
        onBeforeLoad: function() {
            // grab wrapper element inside content
            var wrap = this.getOverlay().find(".contentWrap");            
            var img = '<img src="' + this.getTrigger().attr("href") + '"/>';

            $(wrap).empty();
            $j(wrap).append(img);
        }
 
    });
});