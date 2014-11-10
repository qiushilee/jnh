Ext.require([
  "Ext.data.*",
  "Ext.ux.grid.Printer"
]);

Ext.application({
  name: "setting",
  launch: function () {

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

    //寄送方式
    var sendmethordList = Ext.create('Ext.data.Store', {
      storeId: 'sendmethordList',
      fields: ['id','name', 'key', 'state'],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.sendmethord.list,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    //管理员列表
    var managerList =  Ext.create('Ext.data.Store', {
      storeId: 'managerList',
      fields: ['id','roleId','roleName', 'username', 'realname','lastLoginDate','state','remark','permissions'],
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

    //角色列表
    var roleList =  Ext.create('Ext.data.Store', {
      storeId: 'roleList',
      fields: ['id','rolename','remark','permissions','addDate'],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.managerrole.list,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    var panel = Ext.create('Ext.tab.Panel', {
      renderTo: window.$bd,
      layout: "fit",
      activeItem: 0,
      items: [
        {
          title: '期数管理列表',
          padding: 15,
          items: [
            {
              itemId: "purchase-grid",
              xtype: "grid",
              height: 455,
              margin: "20 0 0 0",
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
            }
          ]
        },
        {
          title: '配送方式管理',
          padding: 15,
          items: [
            {
              itemId: "shipment-grid",
              xtype: "grid",
              height: 455,
              margin: "20 0 0 0",
              store: Ext.data.StoreManager.lookup("sendmethordList"),
              columns: [
                {
                  text: '名称',
                  dataIndex: 'name',
                  flex: 1
                },
                {
                  text: 'KEY',
                  dataIndex: 'key',
                  flex: 1
                },
                {
                  text: '状态',
                  dataIndex: 'state',
                  flex: 1
                }
              ],
              listeners: {
                itemdblclick: function( that, record, item, index, e, eOpts) {
                  sendmethordEdit.show();
                  window.updateForm(sendmethordEdit.getComponent("form").getForm(), record.data);
                } }
            }
          ]
        },
        {
          title: '管理员管理',
          padding: 15,
          items: [
            {
              itemId: "estimatepurchase-grid",
              xtype: "grid",
              height: 455,
              margin: "20 0 0 0",
              store: Ext.data.StoreManager.lookup('managerList'),
              columns: [
                {
                  text: '序号',
                  dataIndex: 'key',
                  flex: 1
                },
                {
                  text: '角色',
                  dataIndex: 'roleName',
                  flex: 1
                },
                {
                  text: '用户名',
                  dataIndex: 'username',
                  flex: 1
                },
                {
                  text: '真实姓名',
                  dataIndex: 'realname',
                  flex: 2
                },
                {
                  text: '最后登录',
                  dataIndex: 'lastLoginDate',
                  flex: 2
                },
                {
                  text: '状态',
                  dataIndex: 'state',
                  flex: 2
                },
                {
                  text: '备注',
                  dataIndex: 'remark',
                  flex: 2
                }
              ],
              listeners: {
                itemdblclick: function( that, record, item, index, e, eOpts) {
                  managerEdit.show();
                  window.updateForm(managerEdit.getComponent("form").getForm(), record.data);
                } }
            },
          ]
        },
        {
          title: '系统角色管理',
          padding: 15,
          items: [
            {
              xtype: "grid",
              height: 355,
              margin: "20 0 0 0",
              store: Ext.data.StoreManager.lookup("roleList"),
              columns: [
                {
                  text: '序号',
                  dataIndex: 'key',
                  flex: 1
                },
                {
                  text: '角色名称',
                  dataIndex: 'rolename',
                  flex: 2
                },
                {
                  text: '备注',
                  dataIndex: 'remark',
                  flex: 1
                },
                {
                  text: '创建日期',
                  dataIndex: 'addDate',
                  flex: 1
                }
              ],
              listeners: {
                itemdblclick: function( that, record, item, index, e, eOpts) {
                  roleEdit.show();
                  window.updateForm(roleEdit.getComponent("form").getForm(), record.data);
                } }
            }
          ]
        },
        {
          title: '邮资配置',
          padding: 15,
          items:[
          ]
        }
      ]
    });



    //期数
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

    //配送方式
    var sendmethordEdit = new Ext.create("Ext.window.Window", {
      title: "编辑配送方式",
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
        items: [{
          fieldLabel: "名称",
          name: "name",
          labelAlign: "right"
        }, {
          fieldLabel: "KEY",
          name: "key",
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
              form.url = env.services.web + env.api.sendmethord.save;
              if (form.isValid()) {
                form.submit({
                  success: function(form, action) {
                    Ext.Msg.alert("修改配送方式", action.result.msg, function() {
                      periodicalEdit.hide();
                      periodicalList.load();
                    });
                  },
                  failure: function(form, action) {
                    Ext.Msg.alert("修改配送方式", action.result.msg);
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
