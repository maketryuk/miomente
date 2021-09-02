$j(document).ready(function() {

    $j('#simple_product_dates').datepicker({
        onSelect: function(dateText, inst) {
            return false;
        },
        dateFormat: 'yy-mm-dd'
    });

    $j('#name').change(function() {                  
        createUrlKey();
    });   
    $j('#keyword').change(function() {                  
        createUrlKey();
    });  
    $j('#url_key').change(function() {     
        var value = $j(this).val();

        if(value === "") {
           createUrlKey();
        }
    }); 
    
    function createUrlKey() {
        /*
        $j.post(generateUrlKeyAjaxUrl,
        {
            'url_part[]': [$j('#keyword').val(), $j('#name').val()]
        },
        function(data) {
            $j('#url_key').val(data);
        });
        */
    }
});