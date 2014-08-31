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

   
    
    // 管理员管理列表
    var cs = Ext.create('Ext.grid.Panel', {
	  renderTo: document.body,
      title: '管理员列表',
      store: Ext.data.StoreManager.lookup('managerList'),
      columns: [{
        text: '编号',
        dataIndex: 'id',
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
           fieldLabel: "登录账号",
           name: "username",
          
           labelAlign: "right"
         }, {
          fieldLabel: '真实姓名',
          name: "realname",
          labelAlign: "right"
        },  {
          fieldLabel: '登录密码',
          name: "password",
          labelAlign: "right"
        }, {
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
              var form = managerAdd.getComponent("form").getForm();
              form.url = env.services.web + env.api.manager.add;
              if (form.isValid()) {
                form.submit({
                  success: function(form, action) {
                     Ext.Msg.alert("新增管理员", action.result.msg, function() {
						 managerAdd.hide();
						 managerList.load();
					  });
                  },
                  failure: function(form, action) {
                    Ext.Msg.alert("新增管理员", action.result.msg);
                  }
                });
              }
            }
          }, {
            xtype:'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">E</span> 返回",
            handler: function() {
              managerAdd.hide();
            }
          }]
        }]
        }
      ],
      closeAction: 'hide',
    });
	
	var managerEdit = new Ext.create("Ext.window.Window", {
      title: "编辑管理员",
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
          fieldLabel: "登录账号",
          name: "username",

          labelAlign: "right"
        }, {
          fieldLabel: '真实姓名',
          name: "realname",
          labelAlign: "right"
        },  {
          fieldLabel: '登录密码',
          name: "password",
          labelAlign: "right"
        }, {
          fieldLabel: '备注说明',
          name: "remark",
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
              var form = managerEdit.getComponent("form").getForm();
              form.url = env.services.web + env.api.manager.change;
              if (form.isValid()) {
                form.submit({
                  success: function(form, action) {
                     Ext.Msg.alert("修改管理员", action.result.msg, function() {
						 managerEdit.hide();
						 managerList.load();
					  });
                  },
                  failure: function(form, action) {
                    Ext.Msg.alert("修改管理员", action.result.msg);
                  }
                });
              }
            }
          }, {
            xtype:'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">E</span> 返回",
            handler: function() {
              managerAdd.hide();
            }
          }]
        }]
        }
      ],
      closeAction: 'hide'
    });
  }
});
