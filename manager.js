Ext.application({
  name: "JNH",
  launch: function() {


      // 管理员管理
      var managerList = Ext.create('Ext.data.Store', {
        storeId: 'managerList',
        fields: ['id','key','roleId', 'username', 'realname', 'remark','lastLoginDate'],
        layout: "fit",
        autoLoad: true,
        proxy: {
          type: 'ajax',
          url: env.services.web + env.api.manager.list,
          reader: {
            type: 'json',
            root: 'list'
          }
        }
      });

   
    
    // 期数管理列表
    var cs = Ext.create('Ext.grid.Panel', {
	  renderTo: document.body,
      title: '管理员列表',
      store: Ext.data.StoreManager.lookup('managerList'),
      columns: [{
        text: '编号',
        dataIndex: 'key',
        flex: 1
      },  {
        text: '账号',
        dataIndex: 'username',
        flex: 1
      }, {
        text: '真实姓名',
        dataIndex: 'realname',
        flex: 1
      }, {
        text: '备注说明',
        dataIndex: 'remark',
        flex: 1
      }, {
        text: '最近登录时间',
        dataIndex: 'lastLoginDate',
        flex: 1
      }],
	  listeners: {
            itemdblclick: function( that, record, item, index, e, eOpts) {
              managerEdit.show();
              window.updateForm(managerEdit.getComponent("form").getForm(), record.data);
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
          managerAdd.show();
        }
      }]
    });

    var managerAdd = new Ext.create("Ext.window.Window", {
      title: "添加管理员",
      layout: "column",
     
      items: [{
        itemId: "form",
        xtype: "form",
        columnWidth: 0.41,
        layout: 'vbox',
        width: 500,
        bodyPadding: 5,
        defaultType: 'textfield',
        url: env.services.web + env.api.manager.add,
        items: [ {
           fieldLabel: "账号",
           name: "username",
          
           labelAlign: "right"
         }, {
          fieldLabel: '真实姓名',
          name: "realname",
          labelAlign: "right"
        },  {
          fieldLabel: '备注说明',
          name: "remark",
          labelAlign: "right"
        },{
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
