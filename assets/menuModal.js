fnMenuModal = {
  __constructor: function() {
    this.$link = $('.site-header__help');
  },
  init: function() {
    this.__constructor();
    var self = this;
    
    self.$link.on('click', function(event) {
      event.preventDefault();
      Swal.fire({
        title: '',       
        html: $('#modal-help').html(),
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,        
      })
    });
  }
};