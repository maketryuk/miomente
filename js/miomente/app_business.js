$j(document).ready(function() {
    /* business-momente aside-box: why miomente */
    $j('#why-miomente-box.business-momente').click(function() {
        var img = $j(this).find('img')
        
        $imgSize = $j(img).height();
        $frameSize = $imgSize / 5;

        $j(img).animate({
            top: '-=' + $frameSize
        }, 'slow', 'linear', function() {
            if ($j(img).position().top == ($imgSize - $frameSize) * -1) {
                $j(img).css('top', 0);
            }
        });
    });

    setInterval(function() {
        if (!$j('#why-miomente .aside-box-wrapper').is(':hover')) {
            $j('#why-miomente li:first').trigger('click');
            $j('#why-miomente li').removeClass('current');
        }

        if ($j('#why-miomente-box.business-momente').length > 0 && !$j('#why-miomente-box.business-momente').is(':hover')) {
            $j('#why-miomente-box.business-momente').trigger('click');
        }
    }, 5000);
});