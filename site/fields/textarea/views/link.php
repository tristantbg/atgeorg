<div class="modal-content">
  <?php echo $form ?>
</div>

<script>
(function() {
  app.modal.root.on('setup', function () {
    var form      = $('.modal .form');
    var textarea  = $('#' + form.data('textarea'));
    var selection = textarea.getSelection();
    var urlField  = form.find('input[name=url]');
    var textField = form.find('input[name=text]');
    if(selection.length) {
      if(selection.match(/^http|s\:\/\//)) {
        urlField.val(selection);
      } else {
        textField.val(selection);
      }
    }
    form.on('submit', function() {
      var url  = urlField.val();
      var text = textField.val();
      var popupField = form.find('.field-name-popup input:checked');
      var popup = popupField.val();
      // make sure not to add invalid parenthesis
      text = text.replace('(', '[');
      text = text.replace(')', ']');
      
      var pop = "";
      if(popup == "true") pop = " popup: yes";
      
      if(!text.length) {
        if(url.match(/^http|s\:\/\//) && popup != "true") {
          var tag = '<' + url + '>';
        } else if(form.data('kirbytext')) {
          var tag = '(link: ' + url + pop + ')';
        } else {
          var tag = '<' + url + '>';
        }
      } else if(form.data('kirbytext')) {
        var tag = '(link: ' + url + ' text: ' + text + pop + ')';
      } else {
        var tag = '[' + text + '](' + url + ')';
      }
      textarea.insertAtCursor(tag);
      app.modal.close();
    });
    
    form.on("change", function() {
      console.log(popupField.attr("value"));
    });
  });
})();
</script>