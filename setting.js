Ext.require([
  "Ext.data.*",
  "Ext.ux.grid.Printer"
]);

Ext.application({
  name: "setting",
  launch: function () {
    var sm = Ext.create('Ext.selection.CheckboxModel', {
      checkOnly: true
    });

    // 期数管理
    var periodicalList = Ext.create('Ext.data.Store', {
      storeId: 'periodicalList',
      fields: ['id', 'code', 'title', 'startDate', 'endDate', 'status', 'state'],
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
      fields: ['id', 'name', 'key', 'state', 'image','setting', 'sort'],
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
      fields: ['id', 'roleId', 'key', 'rolename', 'remark', 'permissions', 'addDate'],
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
      fields: ['id', 'key', 'name', 'parentId', 'type', 'zipCode', 'addDate', 'cost','firstWeight','renewalWeight','fee'],
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
      fields: ['id', 'key', 'name', 'parentId', 'type', 'zipCode', 'addDate', 'cost','firstWeight','renewalWeight','fee'],
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
      fields: ['id', 'key', 'name', 'parentId', 'type', 'zipCode', 'cost','firstWeight','renewalWeight','fee'],
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

    // 折扣列表
    Ext.create('Ext.data.Store', {
      storeId: 'discountList',
      fields: ["id", 'type', "typeName", 'minAmount','maxAmount', 'discount', 'addDate'],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.discount.list,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    // 商品列表
    Ext.create('Ext.data.Store', {
      storeId: 'product',
      fields: ["key", 'addDate', "averageCost", 'bagShape', 'foreignCurrency', 'id', 'isBelowInventory', 'name', 'number', 'price', 'productCode', "purchasePrice", "receiptId", "safetyStock", "specification", "status", "weight", "cardinalNumber", "content","safetyStock", "companyCode", "address", "companyId"],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.discount.product,
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
                text: 'ID',
                dataIndex: 'id',
                flex: 1
              },{
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
              }, {
                text: '状态',
                dataIndex: 'state',
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
            },
            {
              xtype: "button",
              text: "删除",
              margin: "20 0 0 20",
              scale: "medium",
              handler: function () {
                window.removeGridRow({
                  grid: Ext.ComponentQuery.query("[itemId=purchase-grid]")[0],
                  api: env.services.web + env.api.periodical.del,
                  success: function() {
                    Ext.data.StoreManager.lookup('periodicalList').load();
                  }
                })
              }
            }
          ]
        },
        {
          title: '配送方式管理',
          padding: 15,
          items: [
            {
              xtype:'panel',
              layout: "column",
              border: 0,
              bodyStyle: {
                background:'transparent'
              },
              items: [
                {
                  xtype:'panel',
                  title: '面单设置',
                  columnWidth: 0.55,
                  items: [
                    {
                      itemId: "shipment-grid",
                      xtype: "grid",
                      height: 255,
                      margin: "20 20 0 20",
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
                        },
                        {
                          text: '排序',
                          dataIndex: 'sort',
                          flex: 1
                        },
                        {
                          text:'面单设置',
                          dataIndex:'setting',
                          flex:1
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
                        margin: "20 0 20 20",
                        scale: "medium",
                        handler: function () {
                          var form = sendmethordEdit.getComponent("form").getForm();
                          sendmethordEdit.setTitle("新增配送方式");
                          form.reset();
                          form.url = env.services.web + env.api.sendmethord.save;
                          sendmethordEdit.show();
                        }
                      },
                      {
                        xtype: "button",
                        text: "<span class=\"key\">D</span> 删除",
                        margin: "20 0 20 20",
                        scale: "medium",
                        handler: function () {
                          window.removeGridRow({
                            grid: Ext.ComponentQuery.query("[itemId=shipment-grid]")[0],
                            api: env.services.web + env.api.sendmethord.del,
                            success: function() {
                              Ext.data.StoreManager.lookup('sendmethordList').load();
                            }
                          })
                        }
                      }
                  ]
                },
                {
                  xtype:'panel',
                  title: '通用设置',
                  columnWidth: 0.3,
                  margin: "0 0 0 10",
                  items: [
                    {
                      xtype: "form",
                      url: env.services.web + env.api.telorder.list.order,
                      margin: "20 0 0 0",
                      bodyPadding: 10,
                      border: 0,
                      defaultType: 'textfield',
                      bodyStyle: {
                        "background-color": "transparent"
                      },
                      listeners: {
                        render: function(that) {
                          Ext.Ajax.request({
                            url: env.services.web + env.api.weight.get,
                            params: {
                              type: 2
                            },
                            success: function (resp) {
                              var data = Ext.JSON.decode(resp.responseText);
                              Ext.Array.each(data.list, function (item) {
                                that.getForm().findField(item.name).setValue(item.value);
                              });
                            }
                          });
                        }
                      },
                      items: [
                        {
                          fieldLabel: "公司名称",
                          name: 'companyTitle',
                          labelAlign: "right",
                          labelWidth: 60
                        },
                        {
                          fieldLabel: "公司地址",
                          name: 'companyAddress',
                          labelAlign: "right",
                          margin: "10 0 0 0",
                          labelWidth: 60
                        },
                        {
                          fieldLabel: "公司电话",
                          name: 'companyTel',
                          labelAlign: "right",
                          margin: "10 0 0 0",
                          labelWidth: 60
                        },
                        {
                          fieldLabel: "备注1",
                          name: 'note1',
                          labelAlign: "right",
                          margin: "10 0 0 0",
                          labelWidth: 60
                        },
                        {
                          fieldLabel: "备注2",
                          name: 'note2',
                          labelAlign: "right",
                          margin: "10 0 0 0",
                          labelWidth: 60
                        },
                        {
                          fieldLabel: "备注3",
                          name: 'note3',
                          labelAlign: "right",
                          margin: "10 0 0 0",
                          labelWidth: 60
                        },
                        {
                          fieldLabel: "备注4",
                          name: 'note4',
                          labelAlign: "right",
                          margin: "10 0 0 0",
                          labelWidth: 60
                        },
                        {
                          xtype: "button",
                          text: "保存",
                          margin: "20 0 40 0",
                          scale: "medium",
                          handler: function () {
                            var form = sendmethordEdit.getComponent("form").getForm();
                            form.submit({
                              success: function (form, action) {
                              },
                              failure: function (form, action) {
                                Ext.Msg.alert("保存通用设置", action.result.msg);
                              }
                            });
                          }
                        }
                      ]
                    }
                  ]
                }
              ]
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
                  console.log(record.data);
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
            },
            {
              xtype: "button",
              text: "<span class=\"key\">D</span> 删除",
              margin: "20 0 0 20",
              scale: "medium",
              handler: function () {
                window.removeGridRow({
                  grid: Ext.ComponentQuery.query("[itemId=estimatepurchase-grid]")[0],
                  api: env.services.web + env.api.manager.del,
                  success: function() {
                    Ext.data.StoreManager.lookup('managerList').load();
                  }
                })
              }
            }
          ]
        },
        {
          title: '系统角色管理',
          padding: 15,
          items: [
            {
              itemId: "role-list-grid",
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
                  showRoleEdit(record.data.id);
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
            },
            {
              xtype: "button",
              text: "<span class=\"key\">D</span> 删除",
              margin: "20 0 0 20",
              scale: "medium",
              handler: function () {
                window.removeGridRow({
                  grid: Ext.ComponentQuery.query("[itemId=role-list-grid]")[0],
                  api: env.services.web + env.api.managerrole.del,
                  success: function() {
                    Ext.data.StoreManager.lookup('roleList').load();
                  }
                })
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
                      itemId: "province-list",
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
                          name: "id"
                        }
                      ],
                      listeners: {
                        itemclick: function (that, record) {
                          Ext.ComponentQuery.query("[itemId=districtList-del]")[0].setDisabled(true);
                          showAreas(record.data.id, 2, 'cityList');
                          Ext.ComponentQuery.query("[itemId=setting-post]")[0].setDisabled(false);
                          Ext.ComponentQuery.query("[name=provinceId]")[0].setValue(record.data.id);
                          Ext.ComponentQuery.query("[itemId=create-post]")[0].setDisabled(true);
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
                          name: "id"
                        }
                      ],
                      listeners: {
                        itemclick: function (that, record) {
                          Ext.ComponentQuery.query("[itemId=districtList-del]")[0].setDisabled(true);
                          showAreas(record.data.id, 3, 'districtList');
                          Ext.ComponentQuery.query("[itemId=setting-post]")[0].setDisabled(false);
                          Ext.ComponentQuery.query("[name=name2]")[0].setValue(record.data.name);
                          Ext.ComponentQuery.query("[name=cityId]")[0].setValue(record.data.id);
                          Ext.ComponentQuery.query("[name=provinceId]")[0].setValue('');
                          Ext.ComponentQuery.query("[itemId=add-address-window-form]")[0].getForm().findField('id').setValue(record.data.id);
                          Ext.ComponentQuery.query("[itemId=create-post]")[0].setDisabled(true);
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
                  items: [
                    {
                      itemId: "county-list",
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
                          name: "id"
                        }
                      ],
                      listeners: {
                        itemclick: function () {
                          Ext.ComponentQuery.query("[itemId=setting-post]")[0].setDisabled(true);
                          Ext.ComponentQuery.query("[itemId=create-post]")[0].setDisabled(false);
                          Ext.ComponentQuery.query("[itemId=districtList-del]")[0].setDisabled(false);
                        },
                        itemdblclick: function (that, record) {
                          areaEdit.show();
                          window.updateForm(areaEdit.getComponent("form").getForm(), record.data);
                        }
                      }
                    }
                  ]
                }
              ]
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
            },
            {
              itemId: "create-post",
              xtype: "button",
              disabled: true,
              text: "新增",
              margin: "20 0 0 20",
              scale: "medium",
              handler: function () {
                addAddres.show();
              }
            },
            {
              itemId: "districtList-del",
              xtype: "button",
              text: "<span class=\"key\">D</span> 删除",
              margin: "20 0 0 20",
              disabled: true,
              scale: "medium",
              handler: function () {
                window.removeGridRow({
                  grid: Ext.ComponentQuery.query("[itemId=county-list]")[0],
                  api: env.services.web + env.api.managerrole.del,
                  success: function() {
                    Ext.data.StoreManager.lookup('roleList').load();
                  }
                })
              }
            }
          ]
        },
        {
          title: '目录重量设置',
          padding: 15,
          border: 0,
          items: [
            {
              xtype: "form",
              layout: 'vbox',
              border: 0,
              defaultType: 'textfield',
              url: env.services.web + env.api.weight.set,
              items: [
                  {
                    xtype: "hiddenfield",
                    name: "id",
                    value:"1"
                  },
                  {
                  fieldLabel: "单个目录重量",
                  name: "catalogWeight",
                  labelAlign: "right",
                  labelWidth: 80,
                  listeners: {
                    render: function(that) {
                      Ext.Ajax.request({
                        url: env.services.web + env.api.weight.get,
                        params: {
                          type: 1
                        },
                        success: function (resp) {
                          var data = Ext.JSON.decode(resp.responseText);
                          Ext.Array.each(data.list, function (item) {
                            if (item.name === "catalogWeight") {
                              that.setValue(item.value);
                            }
                          });
                        }
                      });
                    }
                  }
                },
                {
                  xtype: "button",
                  text: "保存",
                  handler: function () {
                    var form = this.up('form').getForm();
                    form.submit({
                      failure: function (form, action) {
                        Ext.Msg.alert("保存目录重量", action.result.msg);
                      }
                    });
                  }
                }
              ]
            }
          ]
        },
        {
          title: '折扣设置',
          padding: 15,
          border: 0,
          items: [
            {
              xtype: "grid",
              title: "折扣列表",
              height: 255,
              margin: "20 0 20 0",
              store: Ext.data.StoreManager.lookup('discountList'),
              columns: [
                {
                  text: '折扣分类',
                  dataIndex: 'typeName'
                },
                {
                  text: '最小金额',
                  dataIndex: 'minAmount'
                },
                {
                  text: '最大金额',
                  dataIndex: 'maxAmount'
                },
                {
                  text: '折扣',
                  dataIndex: 'discount'
                }
              ],
              listeners: {
                itemdblclick: function (that, record) {
                  district.show();
                  Ext.ComponentQuery.query("[itemId=productList]")[0].store.load();
                  window.updateForm(Ext.ComponentQuery.query("[itemId=district-form]")[0].getForm(), record.data);
                }
              }
            },
            {
              xtype: "button",
              text: "增加",
              handler: function () {
                district.show();
                Ext.ComponentQuery.query("[itemId=productList]")[0].store.load();
                Ext.ComponentQuery.query("[itemId=district-form]")[0].getForm().reset();
              }
            },
            {
              xtype: "button",
              text: "删除",
              margin: "0 0 0 10"
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
          format: 'Y-m-d',
          labelAlign: "right"
        }, {
          fieldLabel: '结束日期',
          name: "endDate",
          xtype: "datefield",
          format: 'Y-m-d',
          labelAlign: "right"
        }, {
          xtype: 'checkbox',
          checked: true,
          fieldLabel: "状态",
          name: "status",
          labelAlign: "right"
        }, {
          xtype: "hiddenfield",
          name: "id"
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
      closeAction: 'hide'
    });

    //配送方式
    var sendmethordEdit = new Ext.create("Ext.window.Window", {
      title: "编辑配送方式",
      layout: "column",

      items: [{
        itemId: "form",
        xtype: "form",
        columnWidth: 0.41,
        //layout: 'vbox',
        width: 500,
        bodyPadding: 5,
        defaultType: 'textfield',
        url: env.services.web + env.api.sendmethord.save,
        items: [
          {
            fieldLabel: "名称",
            name: "name",
            labelAlign: "right"
          },
          {
            fieldLabel: "KEY",
            name: "key",
            labelAlign: "right"
          },
          {
            xtype: 'filefield',
            name: 'file',
            fieldLabel: '面单图片',
            msgTarget: 'side',
            anchor: '70%',
            buttonText: "选择文件",
            labelAlign: "right"
          },
          {
            xtype: 'checkbox',
            checked: true,
            fieldLabel: "状态",
            name: "status",
            labelAlign: "right"
          },
          {
            fieldLabel: "排序",
            name: "sort",
            labelAlign: "right"
          },
          {
            xtype: "hiddenfield",
            name: "id"
          }, {
            xtype: "hiddenfield",
            name: "image"
          },
          {
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
            },
              {
                xtype: 'button',
                margin: "0 0 0 10",
                text: "<span class=\"key\">E</span> 返回",
                handler: function () {
                  sendmethordEdit.hide();
                }
              }
            ]
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
            name: "id"
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
    function showRoleEdit(id) {
      var $panel = Ext.ComponentQuery.query("[itemId=role-edit-panel]");
      if ($panel[0]) {
        roleEdit.getComponent("form").remove($panel[0]);
      }

      Ext.Ajax.request({
        url: env.services.web + env.api.privaction.list,
        params: {
          id: id
        },
        success: function (resp) {
          var data = Ext.JSON.decode(resp.responseText);
          var panel = Ext.create('Ext.panel.Panel', {
            itemId: 'role-edit-panel',
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
                    change: function (that, status) {
                      Ext.Array.each(Ext.ComponentQuery.query("[xtype=checkbox]", text), function (item) {
                        item.setValue(status);
                      });
                    }
                  }
                }
              ]
            });

            Ext.Array.each(item.actions, function (actionItem) {
              var checkbox = Ext.create('Ext.form.field.Checkbox', {
                margin: '0 15 0 0',
                boxLabel: actionItem.name,
                name: 'action-' + actionItem.id,
                inputValue: actionItem.action,
                checked: actionItem.checked
              });
              text.add(checkbox);
            });

            panel.add(text);
          });

          if (data.list) {
            roleEdit.height = 550;
          } else {
            roleEdit.height = 140;
          }
          roleEdit.show();
        },
        failure: function (resp) {
          Ext.Msg.alert("系统角色权限菜单载入失败", resp.statusText);
          console.error(resp.statusText);
        }
      });
    }

    //管理角色编辑
    var roleEdit = new Ext.create("Ext.window.Window", {
      title: "编辑管理角色",
      width: 600,
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
        },{
          xtype: "hiddenfield",
          name: "id"
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
          fieldLabel: "首重",
          name: "firstWeight",
          labelAlign: "right"
        },  {
          fieldLabel: "邮费",
          name: "cost",
          labelAlign: "right"
        }, {
          fieldLabel: "续重",
          name: "renewalWeight",
          labelAlign: "right"
        }, {
          fieldLabel: "价格",
          name: "fee",
          labelAlign: "right"
        },
        {
          xtype: "hiddenfield",
          name: "cityId"
        },
        {
          xtype: "hiddenfield",
          name: "provinceId"
        },
        {
          xtype: 'panel',
          layout: "hbox",
          border: 0,
          margin: "0 0 0 53",
          items: [{
            xtype: 'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">A</span> 保存",
            handler: function () {
              var form = costSetting.getComponent("form").getForm(),
                  $province = Ext.ComponentQuery.query("grid[itemId=province-list]")[0].getSelectionModel(),
                  $city = Ext.ComponentQuery.query("grid[itemId=city-list]")[0].getSelectionModel();
              form.url = env.services.web + env.api.areaList.setting;
              if (form.isValid()) {
                form.submit({
                  success: function (form, action) {
                    Ext.Msg.alert("修改", action.result.msg, function () {
                      costSetting.hide();

                      if ($province.getSelection()[0].data) {
                        showAreas($province.getSelection()[0].data.id, 2, cityList);
                      }

                      if ($city.getSelection()[0].data) {
                        showAreas($city.getSelection()[0].data.id, 3, districtList);
                      }
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


    function showAreas(id, type, storeId) {
      var _url = env.services.web + env.api.areaList.city + '/parentId/' + id;
      if (type == 3) {
        _url = env.services.web + env.api.areaList.district + '/parentId/' + id;
      }
      Ext.Ajax.request({
        url: _url,
        success: function (response) {
          Ext.data.StoreManager.lookup(storeId).loadData(Ext.JSON.decode(response.responseText).list);
        },
        failure: function (form, action) {
          Ext.Msg.alert("查询失败", "服务器无响应，请稍后再试");
        }
      });
    }

    var addAddres = new Ext.create("Ext.window.Window", {
      title: "新增地址",
      width: 400,
      bodyPadding: 10,
      closeAction: 'hide',
      items: [
        {
          itemId: "add-address-window-form",
          xtype: "form",
          url: env.services.web + env.api.areaList.save,
          bodyPadding: "20 50",
          border: 0,
          defaultType: 'textfield',
          items: [
            {
              xtype: "hiddenfield",
              name: "id"
            },
            {
              fieldLabel: "区域名称",
              name: "name",
              labelWidth: 60,
              labelAlign: "right"
            },
            {
              fieldLabel: '邮编',
              name: 'zipCode',
              labelWidth: 60,
              margin: "10 0 0 0",
              labelAlign: "right"
            }, {
              fieldLabel: "首重",
              name: "firstWeight",
              labelAlign: "right"
            }, {
              fieldLabel: "邮费",
              name: "cost",
              labelAlign: "right"
            },{
              fieldLabel: "续重",
              name: "renewalWeight",
              labelAlign: "right"
            },{
              fieldLabel: "价格",
              name: "fee",
              labelAlign: "right"
            }, {
              xtype: "button",
              text: "保存",
              scale: "medium",
              width: 150,
              handler: function () {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                  form.submit({
                    success: function (form, action) {
                      if (action.result.success) {
                        addAddres.hide();
                        showAreas(form.findField('id').value, 3, 'districtList');
                      }
                    },
                    failure: function (form, action) {
                      Ext.Msg.alert(addAddres.title, action.result.msg);
                    }
                  });
                }
              },
              margin: "0 0 0 20"
            }
          ]
        }
      ]
    });

    var district = new Ext.create("Ext.window.Window", {
      title: "折扣设置",
      width: 800,
      bodyPadding: 10,
      closeAction: 'hide',
      items: [
        {
          itemId: "district-form",
          xtype: "form",
          url: env.services.web + env.api.discount.save,
          bodyPadding: "20 50",
          border: 0,
          defaultType: 'textfield',
          items: [
            {
              xtype: "hiddenfield",
              name: "id"
            },
            {
              xtype:'fieldset',
              title: '折扣设置',
              collapsible: true,
              defaultType: 'textfield',
              defaults: {anchor: '100%'},
              padding: "0 0 10 0",
              layout: 'anchor',
              items :[
                {
                  xtype:'panel',
                  layout: "vbox",
                  width: 300,
                  border: 0,
                  defaultType: 'textfield',
                  bodyStyle: {
                    background:'transparent'
                  },
                  items: [
                    Ext.create("discountType"),
                    {
                      fieldLabel: '最小金额',
                      name: 'minAmount',
                      labelWidth: 40,
                      margin: "10 0 0 0",
                      labelAlign: "right"
                    },
                    {
                      fieldLabel: '最大金额',
                      name: 'maxAmount',
                      labelWidth: 40,
                      margin: "10 0 0 0",
                      labelAlign: "right"
                    },
                    {
                      fieldLabel: '折扣',
                      name: 'discount',
                      labelWidth: 40,
                      margin: "10 0 0 0",
                      labelAlign: "right"
                    }
                  ]
                }
              ]
            },
            {
              itemId: "productList",
              xtype: "grid",
              height: 155,
              title: '库存表',
              store: Ext.data.StoreManager.lookup('product'),
              margin: "20 0 15 0",
              selModel: sm,
              columns: [
                {
                  text: '序号',
                  dataIndex: 'key',
                  flex: 1
                },
                {
                  text: '货号',
                  dataIndex: 'productCode',
                  flex: 1
                },
                {
                  text: '品名',
                  dataIndex: 'name'
                },
                {
                  text: '进价',
                  dataIndex: 'purchasePrice',
                  flex: 1
                },
                {
                  text: '售价',
                  dataIndex: 'price',
                  flex: 1
                }
              ]
            },
            {
              xtype: "button",
              text: "保存",
              handler: function () {
                var form = this.up('form').getForm(),
                    proIds = [];

                Ext.Array.each(Ext.ComponentQuery.query("[itemId=productList]")[0].getSelectionModel().getSelection(), function (item) {
                  proIds.push(item.raw.id);
                });

                form.submit({
                  params: {
                    productIds: proIds.join(',')
                  },
                  success: function (form, action) {
                    district.hide();
                    Ext.data.StoreManager.lookup('discountList').load();
                  },
                  failure: function (form, action) {
                    Ext.Msg.alert("保存折扣", action.result.msg);
                  }
                });
              }
            }
          ]
        }
      ]
    });

  }
});
