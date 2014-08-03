Ext.application({
  name: "JNH",
  launch: function() {


      // 期数管理
      var periodicalList = Ext.create('Ext.data.Store', {
        storeId: 'periodicalList',
        fields: ['id','code', 'title', 'startDate', 'endDate'],
        layout: "fit",
        autoLoad: true,
        proxy: {
          type: 'ajax',
          url: env.services.web + env.api.periodical.list,
          reader: {
            type: 'json',
            root: 'list'
          }
        }
      });

   
    
    // 期数管理列表
    var cs = Ext.create('Ext.grid.Panel', {
	  renderTo: document.body,
      title: '期数管理列表',
      store: Ext.data.StoreManager.lookup('periodicalList'),
      columns: [{
        text: '编号',
        dataIndex: 'code',
        flex: 1
      },  {
        text: '名称',
        dataIndex: 'title',
        flex: 1
      }, {
        text: '开始日期',
        dataIndex: 'startDate',
        flex: 1
      }, {
        text: '结束日期',
        dataIndex: 'endDate',
        flex: 1
      }],
	  listeners: {
            itemdblclick: function( that, record, item, index, e, eOpts) {
              periodicalEdit.show();
              window.updateForm(periodicalEdit.getComponent("form").getForm(), record.data);
            }
          }
    });

    Ext.create("Ext.Panel", {
      layout: "hbox",
      border: 0,
      defaultType: 'textfield',
      margin: "10 0 0 0",
      renderTo: Ext.getBody(),
      items: [{
        xtype: "button",
        text: "<span class=\"key\">A</span> 增加",
        handler: function() {
          periodicalAdd.show();
        }
      }]
    });

    var periodicalAdd = new Ext.create("Ext.window.Window", {
      title: "添加期数",
      layout: "column",
     
      items: [{
        itemId: "form",
        xtype: "form",
        columnWidth: 0.41,
        layout: 'vbox',
        width: 500,
        bodyPadding: 5,
        defaultType: 'textfield',
        url: env.services.web + env.api.periodical.add,
        items: [ {
           fieldLabel: "名称",
           name: "title",
          
           labelAlign: "right"
         }, {
          fieldLabel: '开始日期',
          name: "startDate",
          xtype: "datefield",
          labelAlign: "right"
        }, {
          fieldLabel: '结束日期',
          name: "endDate",
         xtype: "datefield",
          labelAlign: "right"
        }, {
          xtype:'panel',
          layout: "hbox",
          border: 0,
          margin: "0 0 0 53",
          items: [{
            xtype:'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">A</span> 增加",
            handler: function() {
              var form = periodicalAdd.getComponent("form").getForm();
              form.url = env.services.web + env.api.periodical.add;
              if (form.isValid()) {
                form.submit({
                  success: function(form, action) {
                     Ext.Msg.alert("新增期数", action.result.msg, function() {
						 periodicalAdd.hide();
						 periodicalList.load();
					  });
                  },
                  failure: function(form, action) {
                    Ext.Msg.alert("新增期数", action.result.msg);
                  }
                });
              }
            }
          }, {
            xtype:'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">E</span> 返回",
            handler: function() {
              periodicalAdd.hide();
            }
          }]
        }]
        }
      ],
      closeAction: 'hide',
    });
	
	var periodicalEdit = new Ext.create("Ext.window.Window", {
      title: "编辑期数",
      layout: "column",
     
      items: [{
        itemId: "form",
        xtype: "form",
        columnWidth: 0.41,
        layout: 'vbox',
        width: 500,
        bodyPadding: 5,
        defaultType: 'textfield',
        url: env.services.web + env.api.periodical.add,
        items: [ {
           fieldLabel: "编号",
           name: "code",
           labelAlign: "right",
         }, {
           fieldLabel: "名称",
           name: "title",
          
           labelAlign: "right"
         }, {
          fieldLabel: '开始日期',
          name: "startDate",
          xtype: "datefield",
          labelAlign: "right"
        }, {
          fieldLabel: '结束日期',
          name: "endDate",
         xtype: "datefield",
          labelAlign: "right"
        }, {
          xtype: "hiddenfield",
          name: "id",
        }, {
          xtype:'panel',
          layout: "hbox",
          border: 0,
          margin: "0 0 0 53",
          items: [{
            xtype:'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">A</span> 保存",
            handler: function() {
              var form = periodicalEdit.getComponent("form").getForm();
              form.url = env.services.web + env.api.periodical.change;
              if (form.isValid()) {
                form.submit({
                  success: function(form, action) {
                     Ext.Msg.alert("修改期数", action.result.msg, function() {
						 periodicalEdit.hide();
						 periodicalList.load();
					  });
                  },
                  failure: function(form, action) {
                    Ext.Msg.alert("修改期数", action.result.msg);
                  }
                });
              }
            }
          }, {
            xtype:'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">E</span> 返回",
            handler: function() {
              periodicalAdd.hide();
            }
          }]
        }]
        }
      ],
      closeAction: 'hide',
    });
  }
});
