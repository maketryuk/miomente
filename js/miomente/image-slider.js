$j(document).ready(function() {
    var active   = 0;
    var size     = $j("#image-slider ul li").size();
    var durationOut = 1000;
    var durationIn = 2500;

    // add next button
    var next = $j(document.createElement('a')).addClass('next').html('[>]');
    next.attr('href', '#');
    $j("#is-nav").append(next);

    // and action for it
    next.click(function() {
        if (active >= (size-1)) {
            active = 0;
        } else {
            active = active + 1;
        }

        $j(this).attr('href', '#is-' + active);

        $j('#is-nav a').removeClass('active');
        $j('#is-nav a:eq(' + active + ')').addClass('active');

        $j('#image-slider ul li').fadeOut(durationOut);
        $j($j(this).attr('href')).fadeIn(durationIn);
        return false;
    });

    $j("#image-slider ul li").each(function(i) {
        // create link for each li item
        var nr = i+1;
        var a = $j(document.createElement('a')).html('[' + nr + ']');
        a.attr('href', '#is-' + i);
        next.before(a);

        // create action for it
        a.click(function() {
            var href = $j(this).attr('href');
            $j('#image-slider ul li').fadeOut(durationOut);
            $j(href).fadeIn(durationIn);

            $j('#is-nav a').removeClass('active');
            $j(this).addClass('active');

            // change active link number
            var parts = href.split('-');
            active = parseInt(parts[1]);

            return false;
        });
    });

    $j("#is-nav a:first").addClass('active');

    var rotation = setInterval(function() {
		next.click();
	}, 10000);

});