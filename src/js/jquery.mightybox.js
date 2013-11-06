(function ($) {

  var mightybox, isOpen;

  isOpen = false;

  mightybox = function (userOptions) {
    var defaults, options, data, $mightybox, $content, $close, instance;

    // defaults
    defaults = {
      type: 'html', // eventually should support: html, ajax, photo, video, iframe
      data: ''
    };

    // extend defaults with user options
    options = $.extend(defaults, userOptions);

    // set data based on whether this is a jquery object or not, if so, set data to inner html of selected element
    data = ((this == undefined) || (this.fn && this.fn.jquery)) ? options.data : $(this).html();

    // create elements
    $mightybox = $('<div/>').attr('class', 'mightybox');
    $content = $('<div/>').attr('class', 'mb-content');
    $close = $('<div/>').attr('class', 'mb-close');

    // create structure
    $content.appendTo($mightybox);
    $close.appendTo($mightybox);

    // populate content
    switch (options.type) {
      case 'html':
        $content.html(data);
        break;
      case 'ajax':
        $.get(data, function (response) {
          $content.html(response);
        });
        break;
    }


    // define instance
    instance = {
      open: function () {
        if (isOpen) {
          $('.mightybox').detach();
        } else {
          isOpen = true;
        }
        $mightybox.appendTo('body');
      },
      close: function () {
        if (isOpen) {
          $mightybox.detach();
          isOpen = false;
        }
      }
    };

    // add events
    $close.on('click', instance.close);

    // export instance
    return instance;
  };

  // create as selector method
  $.fn.mightybox = mightybox;

  // also create as stand-alone method
  $.mightybox = mightybox;

})(jQuery);
