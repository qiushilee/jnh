/*业务管理*/
Ext.application({
  name: "JNH",
  launch: function () {
    // 名单管理-会员列表
    var memberList = Ext.create('Ext.data.Store', {
      storeId: 'memberList',
      fields: ["askNumber1", "zipCode", "deliveryMethodName", "mobile", "key", "id", 'addrList', 'userCode', 'realName', 'memberType', 'memberTypeName', "address1", "address2"],
      layout: "fit",
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.business.list,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    // 名单管理-目录寄送
    Ext.create('Ext.data.Store', {
      storeId: 'directoryList',
      fields: ['issueDate', 'periodicalName', 'deliveryMethodName', 'issueNum1', 'issueNum2', 'recyclingNum', 'source', 'issueCode', 'remark'],
      layout: "fit",
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.catalog.record,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    // 管理打印-会员列表
    var memberList = Ext.create('Ext.data.Store', {
      storeId: "manager-memberList",
      fields: ["memberId", "zipCode", "deliveryMethodName", "mobile", "key", "id", 'addrList', 'userCode', 'realName', 'memberType', 'memberTypeName', "address1", "address2"],
      layout: "fit",
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.business.list,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    // 打印购物车
    Ext.create("Ext.data.Store", {
      storeId: "printcart",
      fields: ["id", "key", "printcartCode", "serialNumber", "userCode", "userName", "address", "askNumber", 'sendNumber1', 'sendNumber2', "mailingDate", "weight", "postage", "amount", "remark"],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.printcart.businesslist,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    var sm = Ext.create('Ext.selection.CheckboxModel', {
      checkOnly: true
    });

    function addPrintCart(id) {
      Ext.Ajax.request({
        url: env.services.web + env.api.printcart.businessadd,
        params: {
          memberId: id
        },
        success: function (resp) {
          var data = Ext.JSON.decode(resp.responseText);

          if (data.success === false) {
            Ext.Msg.alert("增加", action.result.msg);
          }
        },
        failure: function (form, action) {
          Ext.Msg.alert("增加", action.result.msg);
        }
      });
    }

    var panel = Ext.create('Ext.tab.Panel', {
      renderTo: window.$bd,
      layout: "fit",
      items: [
        {
          title: '名单管理',
          padding: 15,
          items: [
            {
              itemId: "searchBar",
              xtype: "form",
              url: env.services.web + env.api.business.list,
              layout: "hbox",
              bodyPadding: 10,
              defaultType: 'textfield',
              margin: "10 0 0 0",
              items: [
                 Ext.create("periodical",{
                  store: Ext.create("Ext.data.Store", {
                    fields: ["name", "value"],
                    data: JSON.parse(document.body.dataset.periodicalall)
                  })
                }),
                {
                  fieldLabel: "会员编号",
                  labelWidth: 60,
                  width: 140,
                  labelAlign: "right",
                  name: 'userCode'
                },
                {
                  fieldLabel: "姓名",
                  labelWidth: 40,
                  width: 120,
                  labelAlign: "right",
                  name: 'realName'
                }, {
                  fieldLabel: "地址",
                  labelWidth: 40,
                  width: 120,
                  labelAlign: "right",
                  name: 'address'
                },
                {
                  fieldLabel: "电话",
                  labelWidth: 40,
                  width: 145,
                  labelAlign: "right",
                  name: 'mobile'
                },
                {
                  fieldLabel: "邮编",
                  labelWidth: 40,
                  width: 100,
                  labelAlign: "right",
                  name: 'zipCode'
                },
                Ext.create('memberType', {
                   store: Ext.create("Ext.data.Store", {
                    fields: ["name", "value"],
                    data: JSON.parse(document.body.dataset.membertypeall)
                  }),
                  listeners: {
                    render: function (combobox) {
                      combobox.store.load(function (data) {
                        combobox.setValue(data[2]);
                      });
                    }
                  }
                }),
                Ext.create("addressType", {
                   store: Ext.create("Ext.data.Store", {
                    fields: ["name", "value"],
                    data: JSON.parse(document.body.dataset.addresstypeall)
                  })
                 }),
                {
                  xtype: "button",
                  text: "搜索",
                  margin: "0 0 0 20",
                  handler: function () {
                    searchHandler.call(this.ownerCt.ownerCt.getComponent("searchBar"), "memberList");
                  }
                },
                {
                  xtype: "button",
                  text: "重置",
                  margin: "0 0 0 20",
                  handler: function () {
                    this.ownerCt.ownerCt.getComponent("searchBar").getForm().reset();
                  }
                }
              ]
            },
            {
              layout: "column",
              border: 0,
              items: [
                {
                  xtype: "panel",
                  border: 0,
                  columnWidth: 0.5,
                  margin: "25 0 0 0",
                  items: [
                    {
                      itemId: "memberList",
                      title: "会员列表",
                      xtype: "grid",
                      height: 155,
                      store: Ext.data.StoreManager.lookup('memberList'),
                      columns: [
                        {
                          text: '会员号',
                          dataIndex: 'userCode'
                        },
                        {
                          text: '会员姓名',
                          dataIndex: 'realName'
                        },
                        {
                          text: '默认地址',
                          flex: 1,
                          dataIndex: "address1"
                        },
                        {
                          text: '地址2',
                          flex: 1,
                          dataIndex: "address2"
                        },
                        {
                          text: '来源',
                          flex: 1,
                          dataIndex: 'memberTypeName'
                        }
                      ],
                      listeners: {
                        itemdblclick: function (that, record) {
                          var form = this.ownerCt.ownerCt.ownerCt.getComponent("memberContainer").getComponent("member").getForm();

                          Ext.data.StoreManager.lookup('directoryList').load({
                            params: {
                              id: record.data.id
                            }
                          });

                          Ext.Ajax.request({
                            url: env.services.web + env.api.member.info + record.data.id,
                            success: function (resp) {
                              var data = Ext.JSON.decode(resp.responseText);
                              window.updateForm(form, data.info);
                              window.updateForm(form, data.addressList);
                            },
                            failure: function (resp) {
                              console.error(resp.statusText);
                            }
                          });
                        }
                      }
                    }
                  ]
                },
                {
                  xtype: "panel",
                  border: 0,
                  columnWidth: 0.49,
                  style: {
                    float: "right",
                  },
                  items: [
                    {
                      xtype: 'panel',
                      bodyPadding: 5,
                      margin: "10 0 0 0",
                      border: 0,
                      items: [
                        {
                          xtype: "grid",
                          title: "目录寄送",
                          height: 155,
                          store: Ext.data.StoreManager.lookup('directoryList'),
                          margin: "10 0 0 0",
                          columns: [
                            {
                              text: '寄送日期',
                              dataIndex: 'issueDate'
                            },
                            {
                              text: '寄送方式',
                              dataIndex: 'deliveryMethodName',
                              flex: 1
                            },
                            {
                              text: '期数',
                              dataIndex: 'periodicalName',
                              flex: 1
                            },
                            {
                              text: '索取数',
                              dataIndex: 'recyclingNum',
                              flex: 1
                            },
                            {
                              text: '寄出数量1',
                              dataIndex: 'issueNum1',
                              flex: 1
                            },
                            {
                              text: '寄出数量2',
                              dataIndex: 'issueNum2',
                              flex: 1
                            },
                            {
                              text: '单号',
                              dataIndex: 'issueCode',
                              flex: 1
                            },
                            {
                              text: '备注',
                              dataIndex: 'remark',
                              flex: 1
                            },
                            {
                              text: '状态',
                              dataIndex: 'status',
                              flex: 1
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
              itemId: "memberContainer",
              xtype: "panel",
              border: 0,
              margin: "15 0 0 0",
              items: [
                {
                  xtype: "form",
                  itemId: "member",
                  border: 0,
                  items: [
                    {
                      xtype: 'panel',
                      layout: "hbox",
                      border: 0,
                      defaultType: 'textfield',
                      items: [
                        {
                          xtype: "hiddenfield",
                          name: "id"
                        },
                        Ext.create("memberType", {
                          listeners: {
                            render: function (combobox) {
                              combobox.store.load(function (data) {
                                combobox.setValue(data[2]);
                              });
                            }
                          }
                        }),
                        {
                          fieldLabel: "姓名",
                          labelWidth: 40,
                          width: 150,
                          labelAlign: "right",
                          name: "realName"
                        },
                        Ext.create("deliveryMethod"),
                        {
                          xtype: "datefield",
                          format: 'Y-m-d',
                          fieldLabel: "毕业时间",
                          labelWidth: 60,
                          labelAlign: "right",
                          name: "graduateDate"
                        },
                        Ext.create("periodical"),
                        {
                          fieldLabel: "索取数",
                          labelWidth: 50,
                          labelAlign: "right",
                          name: "askNumber1"
                        }
                      ]
                    },
                    {
                      xtype: 'panel',
                      layout: "hbox",
                      border: 0,
                      defaultType: 'textfield',
                      margin: "10 0 0 0",
                      items: [
                        Ext.create("addressType", {
                          name: "type0"
                        }),
                        Ext.create("zipCode", {
                          name: "zipCode0",
                          input: "address0"
                        }),
                        {
                          xtype: 'textfield',
                          fieldLabel: "地址",
                          labelWidth: 60,
                          name: "address0",
                          width: 455,
                          labelAlign: "right"
                        },
                        {
                          xtype: 'textfield',
                          fieldLabel: "电话",
                          labelWidth: 40,
                          name: "mobile0",
                          width: 145,
                          labelAlign: "right"
                        },
                        {
                          xtype: 'textfield',
                          fieldLabel: "收件人",
                          labelWidth: 60,
                          name: "consignee0",
                          width: 180,
                          labelAlign: "right"
                        },
                        {
                          xtype: 'radio',
                          id: 'isDefault0',
                          fieldLabel: '默认地址',
                          labelAlign: 'right',
                          labelWidth: 80,
                          name: 'isDefault',
                          inputValue: '0',
                          checked: true
                        }
                      ]
                    },
                    {
                      xtype: 'panel',
                      layout: "hbox",
                      border: 0,
                      defaultType: 'textfield',
                      margin: "10 0 0 0",
                      items: [
                        {
                          xtype: "hiddenfield",
                          name: "addressDefault1"
                        },
                        Ext.create("addressType", {
                          name: "type1"
                        }),
                        Ext.create("zipCode", {
                          name: "zipCode1",
                          input: "address1"
                        }),
                        {
                          xtype: 'textfield',
                          fieldLabel: "地址",
                          labelWidth: 60,
                          name: "address1",
                          width: 455,
                          labelAlign: "right"
                        },
                        {
                          xtype: 'textfield',
                          fieldLabel: "电话",
                          labelWidth: 40,
                          name: "mobile1",
                          width: 145,
                          labelAlign: "right"
                        },
                        {
                          xtype: 'textfield',
                          fieldLabel: "收件人",
                          labelWidth: 60,
                          name: "consignee1",
                          width: 180,
                          labelAlign: "right"
                        }, {
                          xtype: 'radio',
                          id: 'isDefault1',
                          labelAlign: 'right',
                          fieldLabel: '默认地址',
                          labelWidth: 80,
                          name: 'isDefault',
                          inputValue: '1'
                        }
                      ]
                    },
                    {
                      xtype: "textarea",
                      margin: "20 0 0 0",
                      width: 1000,
                      height:40,
                      fieldLabel: "备注",
                      labelAlign: "right",
                      name: "remark",
                      labelWidth: 40
                    }
                  ]
                }, {
                  itemId: 'list-btn-panel',
                  xtype: 'panel',
                  layout: "hbox",
                  border: 0,
                  defaultType: 'textfield',
                  margin: "25 0 0 0",
                  items: [
                    {
                      xtype: "button",
                      text: "<span class=\"key\">A</span> 新增",
                      handler: function () {
                        var form = this.ownerCt.ownerCt.getComponent("member").getForm();
                        form.reset();
                      }
                    },
                    {
                      xtype: "button",
                      text: "<span class=\"key\">S</span> 保存",
                      handler: function () {
                        var form = this.ownerCt.ownerCt.getComponent("member").getForm();
                        form.url = env.services.web + env.api.business.change;
                        if (form.isValid()) {
                          form.submit({
                            success: function (form, action) {
                              searchHandler.call(Ext.ComponentQuery.query("[itemId=searchBar]")[0].getForm(), "memberList");
                            },
                            failure: function (form, action) {
                              Ext.Msg.alert("保存名单", action.result.msg);
                            }
                          });
                        }
                      },
                      margin: "0 0 0 20"
                    },
                    {
                      xtype: "button",
                      text: "<span class=\"key\">Q</span> 添加",
                      handler: function () {
                        try {
                          var record = Ext.ComponentQuery.query("grid[itemId=memberList]")[0]
                            .getSelectionModel()
                            .getSelection()[0].data;

                          Ext.Ajax.request({
                            url: env.services.web + env.api.printcart.checkbusiness,
                            params: {
                              memberId: record.id
                            },
                            success: function (resp) {
                              var data = Ext.JSON.decode(resp.responseText);
                              if (data.success) {
                                addPrintCart(record.id);
                              } else {
                                Ext.Msg.confirm("添加到打印购物车", data.msg, function (type) {
                                  if (type === 'yes') {
                                    addPrintCart(record.id);
                                  }
                                });
                              }
                            }
                          });
                        } catch (e) {
                          Ext.Msg.alert("添加打印购物车", "请选中列表中的一项后再操作");
                        }
                      },
                      margin: "0 0 0 20"
                    },
                    {
                      xtype: "button",
                      text: "删除",
                      margin: "0 0 0 20",
                      handler: function () {
                        window.removeGridRow({
                          grid: Ext.ComponentQuery.query("grid[itemId=memberList]")[0],
                          api: env.services.web + env.api.business.del,
                          success: function () {
                            searchHandler.call(Ext.ComponentQuery.query("[itemId=searchBar]")[0], "memberList");
                          }
                        });
                      }
                    },
                    {
                      name: "jhd-print",
                      xtype: "button",
                      text: "打印设置",
                      margin: "0 0 0 20",
                      handler: function () {
                        window.printHandle.set("businessmember");
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          title: '管理打印',
          padding: 15,
          items: [
            {
              itemId: "manager-print-search",
              xtype: "form",
              border: 0,
              url: env.services.web + env.api.business.list,
              items: [
                {
                  layout: "hbox",
                  bodyPadding: 10,
                  border: 0,
                  defaultType: 'textfield',
                  bodyStyle: {
                    "background-color": "transparent"
                  },
                  items: [
                    Ext.create("memberType", {
                      fieldLabel: "来源"
                    }),
                    Ext.create("addressType"),
                    {
                      xtype: "datefield",
                      fieldLabel: "毕业时间",
                      labelWidth: 60,
                      width: 180,
                      format: "Y-m-d",
                      labelAlign: "right",
                      name: 'graduateDate'
                    },
                    Ext.create('periodical',{
                      itemId: "periodical1",
                      name:'periodical1'
                    }),
                     Ext.create('periodical',{
                      fieldLabel: "~",
                      itemId: "periodical2",
                      name:'periodical2'
                    }),
                    Ext.create("deliveryMethod")
                  ]
                },
                {
                  layout: "hbox",
                  bodyPadding: 10,
                  border: 0,
                  defaultType: 'textfield',
                  bodyStyle: {
                    "background-color": "transparent"
                  },
                  items: [
                    {
                      fieldLabel: "姓名",
                      labelWidth: 40,
                      width: 120,
                      labelAlign: "right",
                      name: 'realName'
                    },
                    {
                      fieldLabel: "会员编号",
                      labelWidth: 60,
                      width: 140,
                      labelAlign: "right",
                      name: 'userCode'
                    },
                    {
                      xtype: "datefield",
                      fieldLabel: "加入时间",
                      labelWidth: 60,
                      width: 180,
                      format: "Y-m-d H",
                      labelAlign: "right",
                      name: 'startDate'
                    },
                    {
                      xtype: "datefield",
                      fieldLabel: "~",
                      labelWidth: 20,
                      width: 140,
                      format: "Y-m-d H",
                      labelAlign: "right",
                      name: 'endDate'
                    }
                  ]
                },
                {
                  layout: "hbox",
                  bodyPadding: 10,
                  border: 0,
                  defaultType: 'textfield',
                  bodyStyle: {
                    "background-color": "transparent"
                  },
                  items: [
                    {
                      xtype: "button",
                      text: "搜索",
                      margin: "0 0 0 20",
                      handler: function () {
                        searchHandler.call(Ext.ComponentQuery.query("[itemId=manager-print-search]")[0], "manager-memberList");
                      }
                    },
                    {
                      xtype: "button",
                      text: "重置",
                      margin: "0 0 0 10",
                      handler: function () {
                        Ext.ComponentQuery.query("[itemId=manager-print-search]")[0].getForm().reset();
                      }
                    }
                  ]
                }
              ]
            },
            {
              itemId: "manager-memberList",
              xtype: "grid",
              height: 155,
              store: Ext.data.StoreManager.lookup("manager-memberList"),
              margin: "10 0 0 0",
              selModel: sm,
              columns: [
                {
                  text: '序号',
                  dataIndex: 'key',
                  flex: 1
                },
                {
                  text: '姓名',
                  dataIndex: 'realName',
                  flex: 1
                },
                {
                  text: '地址',
                  dataIndex: 'address1',
                  flex: 2
                },
                {
                  text: '邮编',
                  dataIndex: 'zipCode',
                  flex: 1
                },
                {
                  text: '电话',
                  dataIndex: 'mobile',
                  flex: 1
                },
                {
                  text: '寄送方式',
                  dataIndex: 'deliveryMethodName',
                  flex: 1
                }
              ]
            },
            {
              layout: "hbox",
              bodyPadding: 10,
              border: 0,
              defaultType: 'textfield',
              bodyStyle: {
                "background-color": "transparent"
              },
              items: [
                {
                  xtype: "button",
                  text: "<span class=\"key\">Q</span> 添加打印",
                  margin: "0 0 0 10",
                  handler: function () {
                    try {
                      var list = Ext.ComponentQuery.query("grid[itemId=manager-memberList]")[0].getSelectionModel().getSelection(),
                        memberIds = [];

                      Ext.Array.each(list, function (item, index) {
                        var record = item.data;
                        memberIds.push(record.memberId);
                      });

                      Ext.Ajax.request({
                        url: env.services.web + env.api.printcart.checkbusiness,
                        params: {
                          memberId: memberIds.join(",")
                        },
                        success: function (resp) {
                          var data = Ext.JSON.decode(resp.responseText);
                          if (data.success) {
                            addPrintCart(memberIds.join(","));
                          } else {
                            Ext.Msg.confirm("添加到打印购物车", data.msg, function (type) {
                              if (type === 'yes') {
                                addPrintCart(memberIds.join(","));
                              }
                            });
                          }
                        }
                      });
                    } catch (e) {
                      Ext.Msg.alert("添加打印购物车", "请选中列表中的一项后再操作");
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          title: "打印购物车",
          padding: 15,
          items: [
            {
              itemId: "print-cart-searchbar",
              xtype: "form",
              url: env.services.web + env.api.printcart.businesslist,
              layout: "hbox",
              bodyPadding: 10,
              border: 0,
              defaultType: 'textfield',
              bodyStyle: {
                "background-color": "transparent"
              },
              items: [
                Ext.create("deliveryMethod"),
                {
                  fieldLabel: "编号",
                  labelWidth: 40,
                  labelAlign: "right",
                  name: 'code'
                },
                Ext.create("periodical", {
                  fieldLabel: "参考期数",
                  labelWidth: 60,
                  width: 160,
                  itemId: 'periodicalId1',
                  name: 'periodicalId1'
                }),
                Ext.create("periodical", {
                  fieldLabel: "~",
                  labelWidth: 20,
                  itemId: 'periodicalId2',
                  name: 'periodicalId2'
                }),
                {
                  xtype: "datefield",
                  fieldLabel: "参考时间",
                  labelWidth: 60,
                  width: 160,
                  labelAlign: "right",
                  name: 'addDate1'
                },
                {
                  xtype: "datefield",
                  fieldLabel: "~",
                  labelWidth: 20,
                  width: 120,
                  labelAlign: "right",
                  name: 'addDate2'
                },
                {
                  xtype: "button",
                  text: "搜索",
                  margin: "0 0 0 20",
                  handler: function () {
                    searchHandler.call(Ext.ComponentQuery.query("[itemId=print-cart-searchbar]")[0], "printcart");
                  }
                },
                {
                  xtype: "button",
                  text: "重置",
                  margin: "0 0 0 10",
                  handler: function () {
                    Ext.ComponentQuery.query("[itemId=print-cart-searchbar]")[0].getForm().reset();
                  }
                }
              ]
            },
            {
              itemId: "print-cart-list",
              xtype: "grid",
              height: 205,
              store: Ext.data.StoreManager.lookup("printcart"),
              margin: "10 0 0 0",
              columns: [
                {
                  text: '序号',
                  dataIndex: 'key',
                  flex: 1
                },
                {
                  text: '流水号',
                  dataIndex: 'serialNumber',
                  flex: 1
                },
                {
                  text: '姓名',
                  dataIndex: 'userName',
                  flex: 1
                },
                {
                  text: '地址',
                  dataIndex: 'address',
                  editor: {
                    xtype:'textfield',
                    allowBlank:false
                  },
                  flex: 2
                },
                {
                  text: '索取数',
                  dataIndex: 'askNumber',
                  editor: {
                    xtype:'textfield',
                    allowBlank:false
                  },
                  flex: 1
                },
                {
                  text: '寄出数量1',
                  dataIndex: 'sendNumber1',
                  editor: {
                    xtype:'textfield',
                    allowBlank:false
                  },
                  flex: 1
                },
                {
                  text: '寄出数量2',
                  dataIndex: 'sendNumber2',
                  editor: {
                    xtype:'textfield',
                    allowBlank:false
                  },
                  flex: 1
                },
                {
                  text: '期数',
                  dataIndex: 'periodicalName',
                  editor: {
                    xtype:'textfield',
                    allowBlank:false
                  },
                  flex: 1
                },
                {
                  text: '寄出日',
                  dataIndex: 'mailingDate',
                  editor: {
                    xtype:'textfield',
                    allowBlank:false
                  },
                  flex: 1
                },
                {
                  text: '重量',
                  dataIndex: 'weight',
                  editor: {
                    xtype:'textfield',
                    allowBlank:false
                  },
                  flex: 1
                },
                {
                  text: '邮资',
                  dataIndex: 'postage',
                  editor: {
                    xtype:'textfield',
                    allowBlank:false
                  },
                  flex: 1
                },
                {
                  text: '包裹单号',
                  dataIndex: 'printcartCode',
                  editor: {
                    xtype:'textfield',
                    allowBlank:false
                  },
                  flex: 1
                },
                {
                  text: '备注',
                  dataIndex: 'remark',
                  editor: {
                    xtype:'textfield',
                    allowBlank:false
                  },
                  flex: 1
                },
                {
                  text: '购买金额',
                  dataIndex: 'amount',
                  flex: 1
                }
              ],
              selType: 'cellmodel',
              plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                  clicksToEdit: 1
                })
              ]
            },
            {
              itemId: "print-cart-btn",
              layout: "hbox",
              bodyPadding: 10,
              border: 0,
              defaultType: 'textfield',
              width: "56%",
              style: {
                float: "right"
              },
              bodyStyle: {
                "background-color": "transparent"
              },
              items: [
                {
                  xtype: "button",
                  text: "批量修改",
                  margin: "0 0 0 20",
                  handler: function () {
                    window.batchEditHandle(Ext.data.StoreManager.lookup('printcart'), env.services.web + env.api.package.change);
                  }
                },
                {
                  xtype: "button",
                  text: "包裹单号扫描",
                  disabled: true,
                  margin: "0 0 0 10"
                },
                {
                  xtype: "button",
                  text: "<span class=\"key\">N</span> 修改",
                  margin: "0 0 0 10",
                  handler: function () {
                    var form = Ext.ComponentQuery.query("[itemId=print-cart-window-form]")[0].getForm(),
                        data = Ext.ComponentQuery.query("[itemId=print-cart-list]")[0].getSelectionModel().getSelection()[0].data;

                    printCart.show();
                    window.updateForm(form, data);
                  }
                },
                {
                  xtype: "button",
                  text: "面单打印",
                  margin: "0 0 0 10",
                  handler: function() {
                    var serial = '',
                        vals = Ext.ComponentQuery.query("[itemId=print-cart-searchbar]")[0].getForm().getValues();
                    Ext.Object.each(vals, function(key, val) {
                      serial += '&' + key + '=' + val;
                    });
                    serial = serial.replace('&', '?');
                    window.open(env.services.web + env.api.printcart.printExpress + serial);
                  }
                },
                {
                  xtype: "button",
                  text: "块状打印",
                  disabled: true,
                  margin: "0 0 0 10"
                },
                {
                  name: "jhd-print",
                  xtype: "button",
                  text: "打印设置",
                  margin: "0 0 0 10",
                  handler: function () {
                    window.printHandle.set("printcart");
                  }
                },
                {
                  xtype: "button",
                  text: "导出",
                  margin: "0 0 0 10",
                  handler: function () {
                    var deliveryMethod = Ext.ComponentQuery.query("[name=realName]")[0].value,
                      code = Ext.ComponentQuery.query("[name=realName]")[0].rawValue,
                      periodicalId1 = Ext.ComponentQuery.query("[name=realName]")[0].value,
                      periodicalId2 = Ext.ComponentQuery.query("[name=realName]")[0].value,
                      addDate1 = Ext.ComponentQuery.query("[name=realName]")[0].rawValue,
                      addDate2 = Ext.ComponentQuery.query("[name=realName]")[0].rawValue;
                    var params = "";
                    if (deliveryMethod > 0)
                      params += '/deliveryMethod/' + deliveryMethod;
                    if (code != '')
                      params += '/code/' + code;
                    if (periodicalId1 != '')
                      params += '/periodicalId1/' + periodicalId1;
                    if (periodicalId2 != '')
                      params += '/periodicalId2/' + periodicalId2;
                    if (addDate1 != '')
                      params += '/addDate1/' + addDate1;
                    if (addDate2 != '')
                      params += '/addDate2/' + addDate2;
                    window.open(env.services.web + env.api.business.export + params);

                  }
                }
              ]
            }
          ]
        }
      ]
    });

    var printCart = new Ext.create("Ext.window.Window", {
      title: "修改打印购物车",
      width: 400,
      bodyPadding: 10,
      closeAction: 'hide',
      items: [
        {
          itemId: "print-cart-window-form",
          xtype: "form",
          url: env.services.web + env.services.web + env.api.package.change,
          bodyPadding: "20 50",
          border: 0,
          defaultType: 'textfield',
          items: [
            {
              xtype: "hiddenfield",
              name: "id"
            },
            {
              fieldLabel: "流水号",
              name: "serialNumber",
              labelWidth: 60,
              labelAlign: "right"
            },
            {
              fieldLabel: '寄出数量1',
              name: 'sendNumber1',
              labelWidth: 60,
              margin: "10 0 0 0",
              labelAlign: "right"
            },
            {
              fieldLabel: '寄出数量2',
              name: 'sendNumber2',
              labelWidth: 60,
              margin: "10 0 0 0",
              labelAlign: "right"
            },
            Ext.create("periodical", {
              name: 'periodicalName',
              labelWidth: 60,
              margin: "10 0 0 0",
              width: 160
            }),
            {
              xtype: "datefield",
              fieldLabel: '寄出日',
              name: 'mailingDate',
              labelWidth: 60,
              margin: "10 0 0 0",
              labelAlign: "right"
            },
            {
              fieldLabel: '重量',
              name: 'weight',
              labelWidth: 60,
              margin: "10 0 0 0",
              labelAlign: "right"
            },
            {
              fieldLabel: '邮资',
              name: 'postage',
              labelWidth: 60,
              margin: "10 0 0 0",
              labelAlign: "right"
            },
            {
              fieldLabel: '包裹单号',
              name: 'printcartCode',
              labelWidth: 60,
              margin: "10 0 0 0",
              labelAlign: "right"
            },
            {
              xtype: "textareafield",
              fieldLabel: '备注',
              name: 'remark',
              labelWidth: 60,
              width: 260,
              margin: "10 0 20 0",
              labelAlign: "right"
            },
            {
              xtype: "button",
              text: "保存",
              scale: "medium",
              width: 150,
              handler: function () {
                var form = Ext.ComponentQuery.query("[itemId=print-cart-window-form]")[0].getForm();
                if (form.isValid()) {
                  form.submit({
                    success: function (form, action) {
                      if (action.result.success) {
                        printCart.hide();
                      }
                    },
                    failure: function (form, action) {
                      Ext.Msg.alert("修改打印购物车", action.result.msg);
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

    window.printHandle.get({
      $el: Ext.ComponentQuery.query("[itemId=list-btn-panel]")[0],
      form: Ext.ComponentQuery.query("[itemId=member]")[0].getForm(),
      type: "businessmember",
      margin: "0 0 0 10"
    });

    window.printHandle.get({
      $el: Ext.ComponentQuery.query("[itemId=print-cart-btn]")[0],
      form: Ext.ComponentQuery.query("[itemId=print-cart-searchbar]")[0].getForm(),
      type: "printcart",
      margin: "0 0 0 10"
    });
  }
});
// +TODO Tab: [ "名单管理: list, list2", "管理打印", "打印购物车"]
