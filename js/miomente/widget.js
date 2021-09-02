var widget = new function() {
    this.url    = 'http://www.miomente.de/';
    this.path = 'http://www.miomente.de/skin/frontend/default/miomente/images/';
    this.size    = '';
    this.width = 250;
    this.height = 125;
    this.hover = true;
    var suffix = '';

    this.print = function () {
        this.style();

        document.write(
        '<div class="miomente">',
        '<a href="' + this.url + '">',
        this.url,
        '</a>',
        '</div>'
        );
    }

    this.style = function () {

    if (this.size == 'mini') {
       this.width = 150; 
       this.height = 75;
       suffix = '-mini';
       this.hover = false;
    }

        document.write(
'<style type="text/css">',
'.miomente a {',
'    margin: 0;',
'    padding: 0;',
'    border: 0;',
'    text-decoration: none;',
'    display: block;',
'    width: '+this.width+'px;',
'    height: '+this.height+'px;',
'    text-indent: -9999px;',
'    background: url('+this.path+'widget'+suffix+'.jpg) no-repeat 0 0;',
'}');

    if (this.hover == true) {
        document.write(
'.miomente a:hover {',
'    background: url('+this.path+'widget'+suffix+'-hover.jpg) no-repeat 0 0;',
'}');
    }

document.write(
'</style>'
);
    }
}