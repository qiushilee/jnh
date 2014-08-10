Ext.application({
  name: "JNH",
  launch: function() {

      var dataList = Ext.create('Ext.data.Store', {
        storeId: 'dataList',
        fields: ['id', 'action', 'userName',  "logDate"],
        layout: "fit",
        autoLoad: true,
        proxy: {
          type: 'ajax',
          url: env.services.web + env.api.actionlog.list,
          reader: {
            type: 'json',
            root: 'list'
          }
        }
      });
	  
	  
    var cs = Ext.create('Ext.grid.Panel', {
		 xtype: "form",
      title: '操作日志列表',
      store: Ext.data.StoreManager.lookup('dataList'),
      columns: [{
        text: 'ID',
        dataIndex: 'id'
      }, {
        text: '操作行为',
        dataIndex: 'action',
        flex: 1
      }, {
        text: '操作人',
        dataIndex: 'userName',
        flex: 1
      }, {
        text: '操作时间',
        dataIndex: 'logDate',
        flex: 1
      }],
      renderTo: Ext.getBody()
    });
	
	
	Ext.create("Ext.Panel", {
      layout: "hbox",
      border: 0,
      defaultType: 'textfield',
      margin: "10 0 0 0",
      renderTo: Ext.getBody(),
      items: [{
        xtype: "button",
        text: "清除30天前日志",
        handler: function() {
              var form = cs.getComponent("form").getForm();
              form.url = env.services.web + env.api.actionlog.del;
              if (form.isValid()) {
                form.submit({
                  success: function(form, action) {
                    dataList.load();
                  },
                  failure: function(form, action) {
                    console.log(action.result)
                  }
                });
              }
			}  
      }]
    });
	
	
 }
});