Ext.define('AM.controller.Users', {
  extend: 'Ext.app.Controller',

  views: [
  'user.List'
  ],

  init: function() {
    this.control({
      'userlist': {
        itemdblclick: this.editUser
      }
    });
  },

  editUser: function(grid, record) {
    console.log('Double clicked on ' + record.get('name'));
  }
});