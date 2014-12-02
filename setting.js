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
      fields: ['key','id','roleId','roleName', 'username', 'realname','lastLoginDate','state','remark','permissions'],
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
      fields: ['id','key','rolename','remark','permissions','addDate'],
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

    //地区列表
    var areaList =  Ext.create('Ext.data.Store', {
      storeId: 'areaList',
      fields: ['id','key','regionName','zipcode','addDate'],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.areaList.list,
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
            },
            {
              xtype: "button",
              text: "<span class=\"key\">A</span> 增加",
              margin: "20 0 0 0",
              scale: "medium",
              handler: function () {
                var form = periodicalEdit.getComponent("form").getForm();
                periodicalEdit.setTitle("新增期数");
                form.reset();
                form.url = env.services.web + env.api.periodical.save;
                periodicalEdit.show();
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
            },
            {
              xtype: "button",
              text: "<span class=\"key\">A</span> 增加",
              margin: "20 0 0 0",
              scale: "medium",
              handler: function () {
                var form = sendmethordEdit.getComponent("form").getForm();
                sendmethordEdit.setTitle("新增配送方式");
                form.reset();
                form.url = env.services.web + env.api.sendmethord.save;
                sendmethordEdit.show();
              }
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
            {
              xtype: "button",
              text: "<span class=\"key\">A</span> 增加",
              margin: "20 0 0 0",
              scale: "medium",
              handler: function () {
                var form = managerEdit.getComponent("form").getForm();
                managerEdit.setTitle("新增管理员");
                form.reset();
                form.url = env.services.web + env.api.manager.save;
                managerEdit.show();
              }
            }
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
            },
            {
              xtype: "button",
              text: "<span class=\"key\">A</span> 增加",
              margin: "20 0 0 0",
              scale: "medium",
              handler: function () {
                var form = roleEdit.getComponent("form").getForm();
                roleEdit.setTitle("新增管理角色");
                form.reset();
                form.url = env.services.web + env.api.managerrole.save;
                roleEdit.show();
              }
            }
          ]
        },
        {
          title: '区域邮资配置',
          padding: 15,
          items: [
            {
              xtype: "grid",
              height: 355,
              margin: "20 0 0 0",
              store: Ext.data.StoreManager.lookup("areaList"),
              columns: [
                {
                  text: '序号',
                  dataIndex: 'key',
                  flex: 1
                },
                {
                  text: '地区名称',
                  dataIndex: 'name',
                  flex: 2
                },
                {
                  text: '邮编',
                  dataIndex: 'zipcode',
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
                  areaEdit.show();
                  window.updateForm(roleEdit.getComponent("form").getForm(), record.data);
                } }
            },
            {
              xtype: "button",
              text: "<span class=\"key\">A</span> 增加",
              margin: "20 0 0 0",
              scale: "medium",
              handler: function () {
                var form = areaEdit.getComponent("form").getForm();
                areaEdit.setTitle("新增地区");
                form.reset();
                form.url = env.services.web + env.api.area.save;
                areaEdit.show();
              }
            }
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
        url: env.services.web + env.api.periodical.save,
        items: [ {
          fieldLabel: "编号",
          name: "code",
          labelAlign: "right",
          readOnly:true
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
              form.url = env.services.web + env.api.periodical.save;
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
              periodicalEdit.hide();
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
        url: env.services.web + env.api.sendmethord.save,
        items: [{
          fieldLabel: "名称",
          name: "name",
          labelAlign: "right"
        }, {
          fieldLabel: "KEY",
          name: "key",
          labelAlign: "right"
        }, {
          xtype : 'checkbox',
          checked : true,
          fieldLabel: "状态",
          name: "status",
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
              var form = sendmethordEdit.getComponent("form").getForm();
              form.url = env.services.web + env.api.sendmethord.save;
              if (form.isValid()) {
                form.submit({
                  success: function(form, action) {
                    Ext.Msg.alert("修改配送方式", action.result.msg, function() {
                      sendmethordEdit.hide();
                      sendmethordList.load();
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
              sendmethordEdit.hide();
            }
          }]
        }]
      }
      ],
      closeAction: 'hide'
    });

    //管理员编辑
    var managerEdit= new Ext.create("Ext.window.Window", {
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
        url: env.services.web + env.api.manager.save,
        items: [
          Ext.create('managerRoles'),
        {
          fieldLabel: "用户名",
          name: "username",
          labelAlign: "right"
        }, {
          fieldLabel: "真实姓名",
          name: "realname",
          labelAlign: "right"
        }, {
          fieldLabel: "密码",
          name: "password",
          labelAlign: "right"
         }, {
          fieldLabel: "备注",
          name: "remark",
          labelAlign: "right"
        }, {
          xtype : 'checkbox',
          checked : true,
          fieldLabel: "状态",
          name: "status",
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
              form.url = env.services.web + env.api.manager.save;
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
              managerEdit.hide();
            }
          }]
        }]
      }
      ],
      closeAction: 'hide'
    });


    //管理角色编辑
    var  roleEdit= new Ext.create("Ext.window.Window", {
      title: "编辑管理角色",
      layout: "column",

      items: [{
        itemId: "form",
        xtype: "form",
        columnWidth: 0.41,
        layout: 'vbox',
        width: 500,
        bodyPadding: 5,
        defaultType: 'textfield',
        url: env.services.web + env.api.managerrole.save,
        items: [
          {
            fieldLabel: "角色名称",
            name: "rolename",
            labelAlign: "right"
          }, {
            fieldLabel: "备注",
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
                var form = roleEdit.getComponent("form").getForm();
                form.url = env.services.web + env.api.managerrole.save;
                if (form.isValid()) {
                  form.submit({
                    success: function(form, action) {
                      Ext.Msg.alert("修改管理角色", action.result.msg, function() {
                        roleEdit.hide();
                        roleList.load();
                      });
                    },
                    failure: function(form, action) {
                      Ext.Msg.alert("修改管理角色", action.result.msg);
                    }
                  });
                }
              }
            }, {
              xtype:'button',
              margin: "0 0 0 10",
              text: "<span class=\"key\">E</span> 返回",
              handler: function() {
                roleEdit.hide();
              }
            }]
          }]
      }
      ],
      closeAction: 'hide'
    });



    //区域邮资配置
    var areaList = Ext.create('Ext.data.Store', {
      storeId: 'areaList',
      fields: ['id','name', 'key', 'state'],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.area.list,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });
  }
});
