$j(document).ready(function() {
	var dates = null;

    $j.get('/ajax/dates/', function(data) {
      dates = eval(data);
      $j('#search-calendar').datepicker({
          onSelect: function(dateText, inst) {
              var url = '/catalogsearch/advanced/result/?dates[]=';
              window.location.href = url + dateText;
              return false;
          },
          dateFormat: 'yy-mm-dd',
          beforeShowDay: highlightDays
      });
      dispDate = $j('#calendar-display-date').html();
      if (dispDate && dispDate.length == 10) {
          $j('#search-calendar').datepicker('setDate', dispDate);
      }
    });

    $j('#simple_product_dates').datepicker({
        onSelect: function(dateText, inst) {
            //var url = '/catalogsearch/advanced/result/?dates[]=';
            //window.location.href = url + dateText;
            //alert(dateText);
            return false;
        },
        dateFormat: 'yy-mm-dd'
    });

    function highlightDays(date) {
       if (dates) {
            for (var i = 0; i < dates.length; i++) {
                    if (dates[i] - date == 0) {
                            return [true, 'ui-state-active'];
                    }
            }
            return [true, ''];
       }
       return [true, ''];
    }
});