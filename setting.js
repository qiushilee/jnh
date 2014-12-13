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
      fields: ['id', 'code', 'title', 'startDate', 'endDate'],
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
      fields: ['id', 'name', 'key', 'state'],
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
    var managerList = Ext.create('Ext.data.Store', {
      storeId: 'managerList',
      fields: ['key', 'id', 'roleId', 'roleName', 'username', 'realname', 'lastLoginDate', 'state', 'remark', 'permissions'],
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
    var roleList = Ext.create('Ext.data.Store', {
      storeId: 'roleList',
      fields: ['id', 'key', 'rolename', 'remark', 'permissions', 'addDate'],
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
    var provinceList = Ext.create('Ext.data.Store', {
      storeId: 'provinceList',
      fields: ['id', 'key', 'name', 'parentId', 'type', 'zipCode', 'addDate'],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.areaList.province,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });
    var cityList = Ext.create('Ext.data.Store', {
      storeId: 'cityList',
      fields: ['id', 'key', 'name', 'parentId', 'type', 'zipCode', 'addDate'],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.areaList.city,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });
    var districtList = Ext.create('Ext.data.Store', {
      storeId: 'districtList',
      fields: ['id', 'key', 'name', 'parentId', 'type', 'zipCode', 'cost'],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.areaList.district,
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
              }, {
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
                itemdblclick: function (that, record, item, index, e, eOpts) {
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
                itemdblclick: function (that, record, item, index, e, eOpts) {
                  sendmethordEdit.show();
                  window.updateForm(sendmethordEdit.getComponent("form").getForm(), record.data);
                }
              }
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
                itemdblclick: function (that, record, item, index, e, eOpts) {
                  managerEdit.show();
                  window.updateForm(managerEdit.getComponent("form").getForm(), record.data);
                }
              }
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
                itemdblclick: function (that, record, item, index, e, eOpts) {
                  roleEdit.show();
                  window.updateForm(roleEdit.getComponent("form").getForm(), record.data);
                }
              }
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
          title: '地区邮资设置',
          padding: 15,
          border: 0,
          items: [
            {
              xtype: "panel",
              layout: "column",
              border: 0,
              items: [
                {
                  xtype: "panel",
                  columnWidth: 0.3,
                  border: 0,
                  height: 290,
                  items: [
                    {
                      xtype: "grid",
                      height: 300,
                      margin: "20 0 0 0",
                      store: Ext.data.StoreManager.lookup("provinceList"),
                      columns: [
                        {
                          text: '序号',
                          dataIndex: 'key',
                          flex: 1
                        },
                        {
                          text: '省份名称',
                          dataIndex: 'name',
                          flex: 2
                        }, {
                          xtype: "hiddenfield",
                          name: "id",
                        }
                      ],
                      listeners: {
                        itemclick: function (that, record, item, index, e, eOpts) {
                          showAreas(record.data.id, 2, cityList);
                          Ext.ComponentQuery.query("[itemId=setting-post]")[0].setDisabled(true);
                        }
                      }
                    }
                  ]
                },
                {
                  xtype: "panel",
                  columnWidth: 0.35,
                  border: 0,
                  height: 290,
                  margin: "0 10",
                  items: [
                    {
                      itemId: "city-list",
                      xtype: "grid",
                      height: 215,
                      margin: "20 0 0 0",
                      store: Ext.data.StoreManager.lookup("cityList"),
                      columns: [
                        {
                          text: '序号',
                          dataIndex: 'key',
                          flex: 1
                        },
                        {
                          text: '城市名称',
                          dataIndex: 'name',
                          flex: 2
                        }, {
                          xtype: "hiddenfield",
                          name: "id",
                        }
                      ],
                      listeners: {
                        itemclick: function (that, record, item, index, e, eOpts) {
                          showAreas(record.data.id, 3, districtList);
                          Ext.ComponentQuery.query("[itemId=setting-post]")[0].setDisabled(false);
                          Ext.ComponentQuery.query("[name=name2]")[0].setValue(record.data.name);
                          Ext.ComponentQuery.query("[name=cityId]")[0].setValue(record.data.id);
                        }
                      }
                    },
                    {
                      itemId: "setting-post",
                      xtype: "button",
                      text: "<span class=\"key\">A</span> 设置邮费",
                      margin: "20 0 0 0",
                      disabled: true,
                      scale: "medium",
                      handler: function () {
                        costSetting.show();
                      }
                    }
                  ]
                },
                {
                  xtype: "panel",
                  columnWidth: 0.35,
                  border: 0,
                  height: 290,
                  items: [
                    {
                      xtype: "grid",
                      height: 300,
                      margin: "20 0 0 0",
                      store: Ext.data.StoreManager.lookup("districtList"),
                      columns: [
                        {
                          text: '序号',
                          dataIndex: 'key',
                          flex: 1
                        },
                        {
                          text: '区域名称',
                          dataIndex: 'name',
                          flex: 2
                        },
                        {
                          text: '邮编',
                          dataIndex: 'zipCode',
                          flex: 1
                        },
                        {
                          text: '邮费',
                          dataIndex: 'cost',
                          flex: 1
                        }, {
                          xtype: "hiddenfield",
                          name: "id",
                        }
                      ],
                      listeners: {
                        itemdblclick: function (that, record, item, index, e, eOpts) {
                          areaEdit.show();
                          window.updateForm(areaEdit.getComponent("form").getForm(), record.data);
                        }
                      }
                    }
                  ]
                },
              ]
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
        items: [{
          fieldLabel: "编号",
          name: "code",
          labelAlign: "right",
          readOnly: true
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
          xtype: 'panel',
          layout: "hbox",
          border: 0,
          margin: "0 0 0 53",
          items: [{
            xtype: 'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">A</span> 保存",
            handler: function () {
              var form = periodicalEdit.getComponent("form").getForm();
              form.url = env.services.web + env.api.periodical.save;
              if (form.isValid()) {
                form.submit({
                  success: function (form, action) {
                    Ext.Msg.alert("修改期数", action.result.msg, function () {
                      periodicalEdit.hide();
                      periodicalList.load();
                    });
                  },
                  failure: function (form, action) {
                    Ext.Msg.alert("修改期数", action.result.msg);
                  }
                });
              }
            }
          }, {
            xtype: 'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">E</span> 返回",
            handler: function () {
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
          xtype: 'checkbox',
          checked: true,
          fieldLabel: "状态",
          name: "status",
          labelAlign: "right"
        }, {
          xtype: "hiddenfield",
          name: "id",
        }, {
          xtype: 'panel',
          layout: "hbox",
          border: 0,
          margin: "0 0 0 53",
          items: [{
            xtype: 'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">A</span> 保存",
            handler: function () {
              var form = sendmethordEdit.getComponent("form").getForm();
              form.url = env.services.web + env.api.sendmethord.save;
              if (form.isValid()) {
                form.submit({
                  success: function (form, action) {
                    Ext.Msg.alert("修改配送方式", action.result.msg, function () {
                      sendmethordEdit.hide();
                      sendmethordList.load();
                    });
                  },
                  failure: function (form, action) {
                    Ext.Msg.alert("修改配送方式", action.result.msg);
                  }
                });
              }
            }
          }, {
            xtype: 'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">E</span> 返回",
            handler: function () {
              sendmethordEdit.hide();
            }
          }]
        }]
      }
      ],
      closeAction: 'hide'
    });

    //管理员编辑
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
            xtype: 'checkbox',
            checked: true,
            fieldLabel: "状态",
            name: "status",
            labelAlign: "right"
          }, {
            xtype: "hiddenfield",
            name: "id",
          }, {
            xtype: 'panel',
            layout: "hbox",
            border: 0,
            margin: "0 0 0 53",
            items: [{
              xtype: 'button',
              margin: "0 0 0 10",
              text: "<span class=\"key\">A</span> 保存",
              handler: function () {
                var form = managerEdit.getComponent("form").getForm();
                form.url = env.services.web + env.api.manager.save;
                if (form.isValid()) {
                  form.submit({
                    success: function (form, action) {
                      Ext.Msg.alert("修改管理员", action.result.msg, function () {
                        managerEdit.hide();
                        managerList.load();
                      });
                    },
                    failure: function (form, action) {
                      Ext.Msg.alert("修改管理员", action.result.msg);
                    }
                  });
                }
              }
            }, {
              xtype: 'button',
              margin: "0 0 0 10",
              text: "<span class=\"key\">E</span> 返回",
              handler: function () {
                managerEdit.hide();
              }
            }]
          }]
      }
      ],
      closeAction: 'hide'
    });

    /**
     * 载入角色权限菜单
     */
    Ext.Ajax.request({
      url: env.services.web + env.api.privaction.list,
      success: function (resp) {
        var data = Ext.JSON.decode(resp.responseText);
        var panel = Ext.create('Ext.panel.Panel', {
          margin: '25 0 0 0',
          bodyPadding: 5,
          border: 0,
          defaultType: 'textfield'
        });

        roleEdit.getComponent("form").add(panel);

        Ext.Array.each(data.list, function (item) {
          var text = Ext.create('Ext.form.FieldSet', {
            padding: '5 5 15 15',
            defaultType: 'checkboxfield',
            layout: 'hbox',
            title: item.name,
            name: item.action,
            items: [
              {
                itemId: 'rol-edit-select-all',
                margin: '0 15 0 0',
                boxLabel: '全选',
                listeners: {
                  change: function(that, status) {
                    Ext.Array.each(Ext.ComponentQuery.query("[xtype=checkbox]", text), function(item) {
                      item.setValue(status);
                    });
                  }
                }
              }
            ]
          });

          Ext.Array.each(item.actions, function (actionItem) {
            console.log(actionItem)
            var checkbox = Ext.create('Ext.form.field.Checkbox', {
              margin: '0 15 0 0',
              boxLabel: actionItem.name,
              name: 'action-' + actionItem.id,
              inputValue: actionItem.action
            });
            text.add(checkbox);
          });

          panel.add(text);
        });
      },
      failure: function (resp) {
        Ext.Msg.alert("系统角色权限菜单载入失败", resp.statusText);
        console.error(resp.statusText);
      }
    });

    //管理角色编辑
    var roleEdit = new Ext.create("Ext.window.Window", {
      title: "编辑管理角色",
      height: 550,
      autoScroll: true,
      items: [{
        itemId: "form",
        xtype: "form",
        layout: 'vbox',
        bodyPadding: 5,
        defaultType: 'textfield',
        url: env.services.web + env.api.managerrole.save,
        items: [
          {
            fieldLabel: "角色名称",
            name: "rolename",
            labelWidth: 60,
            labelAlign: "left"
          }, {
            width: 300,
            margin: '5 0 0 0',
            fieldLabel: "备注",
            name: "remark",
            labelWidth: 60,
            labelAlign: "left"
          }, {
            xtype: "hiddenfield",
            name: "id"
          }, {
            margin: '10 0 0 0',
            xtype: 'panel',
            layout: "hbox",
            border: 0,
            items: [{
              xtype: 'button',
              margin: "0 0 0 10",
              text: "<span class=\"key\">A</span> 保存",
              handler: function () {
                var form = roleEdit.getComponent("form").getForm();
                form.url = env.services.web + env.api.managerrole.save;
                if (form.isValid()) {
                  form.submit({
                    success: function (form, action) {
                      Ext.Msg.alert("修改管理角色", action.result.msg, function () {
                        roleEdit.hide();
                        roleList.load();
                      });
                    },
                    failure: function (form, action) {
                      Ext.Msg.alert("修改管理角色", action.result.msg);
                    }
                  });
                }
              }
            }, {
              xtype: 'button',
              margin: "0 0 0 10",
              text: "<span class=\"key\">E</span> 返回",
              handler: function () {
                roleEdit.hide();
              }
            }]
          }]
      }
      ],
      closeAction: 'hide'
    });


    //编辑地区
    var areaEdit = new Ext.create("Ext.window.Window", {
      title: "编辑地区",
      layout: "column",
      items: [{
        itemId: "form",
        xtype: "form",
        columnWidth: 0.41,
        layout: 'vbox',
        width: 500,
        bodyPadding: 5,
        defaultType: 'textfield',
        url: env.services.web + env.api.areaList.save,
        items: [{
          fieldLabel: "地区名称",
          name: "name",
          labelAlign: "right"
        }, {
          fieldLabel: "邮编",
          name: "zipCode",
          labelAlign: "right"
        }, {
          fieldLabel: "邮费",
          name: "cost",
          labelAlign: "right"
        }, {
          xtype: "hiddenfield",
          name: "id",
        }, {
          xtype: 'panel',
          layout: "hbox",
          border: 0,
          margin: "0 0 0 53",
          items: [{
            xtype: 'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">A</span> 保存",
            handler: function () {
              var form = areaEdit.getComponent("form").getForm();
              var record = Ext.ComponentQuery.query("grid[itemId=city-list]")[0].getSelectionModel().getSelection()[0].data;
              form.url = env.services.web + env.api.areaList.save;
              if (form.isValid()) {
                form.submit({
                  success: function (form, action) {
                    Ext.Msg.alert("修改", action.result.msg, function () {
                      areaEdit.hide();
                      showAreas(record.id, 3, districtList);
                    });
                  },
                  failure: function (form, action) {
                    Ext.Msg.alert("修改", action.result.msg);
                  }
                });
              }
            }
          }, {
            xtype: 'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">E</span> 返回",
            handler: function () {
              areaEdit.hide();
            }
          }]
        }]
      }
      ],
      closeAction: 'hide'
    });

    //批量设置邮资
    var costSetting = new Ext.create("Ext.window.Window", {
      title: "批量设置邮资",
      layout: "column",
      items: [{
        itemId: "form",
        xtype: "form",
        columnWidth: 0.41,
        layout: 'vbox',
        width: 500,
        bodyPadding: 5,
        defaultType: 'textfield',
        url: env.services.web + env.api.areaList.setting,
        items: [{
          fieldLabel: "地区名称",
          name: "name2",
          labelAlign: "right",
          readOnly: true
        }, {
          fieldLabel: "邮费",
          name: "cost",
          labelAlign: "right"
        }, {
          xtype: "hiddenfield",
          name: "cityId",
        }, {
          xtype: 'panel',
          layout: "hbox",
          border: 0,
          margin: "0 0 0 53",
          items: [{
            xtype: 'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">A</span> 保存",
            handler: function () {
              var form = costSetting.getComponent("form").getForm();
              var record = Ext.ComponentQuery.query("grid[itemId=city-list]")[0].getSelectionModel().getSelection()[0].data;
              form.url = env.services.web + env.api.areaList.setting;
              if (form.isValid()) {
                form.submit({
                  success: function (form, action) {
                    Ext.Msg.alert("修改", action.result.msg, function () {
                      costSetting.hide();
                      showAreas(record.id, 3, districtList);
                    });
                  },
                  failure: function (form, action) {
                    Ext.Msg.alert("修改", action.result.msg);
                  }
                });
              }
            }
          }, {
            xtype: 'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">E</span> 返回",
            handler: function () {
              costSetting.hide();
            }
          }]
        }]
      }
      ],
      closeAction: 'hide'
    });


    function showAreas(id, type, domList) {
      var _url = env.services.web + env.api.areaList.city + '/parentId/' + id;
      if (type == 3) {
        _url = env.services.web + env.api.areaList.district + '/parentId/' + id;
      }
      Ext.Ajax.request({
        url: _url,
        success: function (response) {
          domList.loadData(Ext.JSON.decode(response.responseText).list);
        },
        failure: function (form, action) {
          Ext.Msg.alert("查询失败", "服务器无响应，请稍后再试");
        }
      });
    }

  }
});
