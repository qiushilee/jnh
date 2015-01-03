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
      fields: ['issueDate', 'periodicalName', 'deliveryMethodName', 'issueNum1','issueNum2', 'recyclingNum', 'source', 'issueCode', 'remark'],
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
      fields: ["key", "printcartCode", "serialNumber", "userCode", "userName", "address", "askNumber", 'sendNumber1', 'sendNumber2', "mailingDate", "weight", "postage", "amount", "remark"],
      layout: "fit",
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.business.printcartlist,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    var sm = Ext.create('Ext.selection.CheckboxModel', {
      checkOnly: true
    });

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
                Ext.create('periodical'),
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
                Ext.create('memberType'),
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
                        Ext.create("memberType"),
                        {
                          fieldLabel: "姓名",
                          labelWidth: 60,
                          width: 120,
                          labelAlign: "right",
                          name: "realName"
                        },
                        Ext.create("deliveryMethod"),
                        {
                          xtype: "datefield",
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
                        {
                          xtype: 'textfield',
                          fieldLabel: "邮编",
                          name: "zipCode0",
                          labelWidth: 40,
                          width: 100,
                          labelAlign: "right"
                        },
                        {
                          xtype: 'textfield',
                          fieldLabel: "地址",
                          labelWidth: 60,
                          name: "address0",
                          width: 300,
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
                        {
                          xtype: 'textfield',
                          fieldLabel: "邮编",
                          name: "zipCode1",
                          labelWidth: 40,
                          width: 100,
                          labelAlign: "right"
                        },
                        {
                          xtype: 'textfield',
                          fieldLabel: "地址",
                          labelWidth: 60,
                          name: "address1",
                          width: 300,
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
                      xtype: "textfield",
                      margin: "20 0 0 0",
                      width: 1000,
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
                      text: "<span class=\"key\">A</span> 增加",
                      handler: function () {
                        var form = this.ownerCt.ownerCt.getComponent("member").getForm();
                        form.url = env.services.web + env.api.business.add;
                        form.submit({
                          success: function (form, action) {
                            Ext.data.StoreManager.lookup("memberList").load();
                            form.reset();
                          },
                          failure: function (form, action) {
                            Ext.Msg.alert("增加名单", action.result.msg);
                          }
                        });
                      }
                    },
                    {
                      xtype: "button",
                      text: "<span class=\"key\">N</span> 修改",
                      handler: function () {
                        var form = this.ownerCt.ownerCt.getComponent("member").getForm();
                        form.url = env.services.web + env.api.business.change;
                        form.submit({
                          success: function () {
                            searchHandler.call(Ext.ComponentQuery.query("[itemId=searchBar]")[0].getForm(), "memberList");
                          },
                          failure: function (form, action) {
                            Ext.Msg.alert("修改名单", action.result.msg);
                          }
                        });
                      },
                      margin: "0 0 0 20"
                    },
                    {
                      xtype: "button",
                      text: "<span class=\"key\">S</span> 保存",
                      disabled: true,
                      handler: function () {
                        var form = this.ownerCt.ownerCt.getComponent("member").getForm();
                        form.url = env.services.web + env.api.business.save;
                        if (form.isValid()) {
                          form.submit({
                            success: function (form, action) {
                              console.log(action)
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
                            url: env.services.web + env.api.business.addprintcart,
                            params: {
                              memberId: record.id
                            },
                            success: function (resp) {
                              var data = Ext.JSON.decode(resp.responseText);
                              console.log(data);
                            },
                            failure: function (resp) {
                              try {
                                var data = Ext.JSON.decode(resp.responseText);
                                Ext.Msg.alert("添加到打印购物车", data.msg);
                              } catch (e) {
                                console.error(e.stack);
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
                    {
                      xtype: "combobox",
                      fieldLabel: "类型",
                      labelWidth: 40,
                      width: 100,
                      labelAlign: "right"
                    },
                    {
                      xtype: "datefield",
                      fieldLabel: "毕业时间",
                      labelWidth: 60,
                      width: 180,
                      format: "Y-m-d",
                      labelAlign: "right",
                      name: 'startDate'
                    },
                    {
                      fieldLabel: "期数",
                      labelWidth: 40,
                      width: 110,
                      labelAlign: "right",
                      name: 'startPeriodical'
                    },
                    {
                      fieldLabel: "到",
                      labelWidth: 20,
                      width: 90,
                      labelAlign: "right",
                      name: 'endPeriodical'
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
                        url: env.services.web + env.api.business.addprintcart,
                        params: {
                          memberId: memberIds.join(",")
                        },
                        success: function (resp) {
                          var data = Ext.JSON.decode(resp.responseText);
                          console.log(data);
                        },
                        failure: function (resp) {
                          try {
                            var data = Ext.JSON.decode(resp.responseText);
                            Ext.Msg.alert("添加到打印购物车", data.msg);
                          } catch (e) {
                            console.error(e.stack);
                          }
                        }
                      });
                    } catch (e) {
                      console.log(e.stack)
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
              url: env.services.web + env.api.business.printcartlist,
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
                {
                  fieldLabel: "参考期数",
                  labelWidth: 60,
                  width: 110,
                  labelAlign: "right",
                  name: 'periodicalId1'
                },
                {
                  fieldLabel: "~",
                  labelWidth: 20,
                  width: 70,
                  labelAlign: "right",
                  name: 'periodicalId2'
                },
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
                  flex: 2
                },
                {
                  text: '索取数',
                  dataIndex: 'askNumber',
                  flex: 1
                },
                {
                  text: '寄出数量1',
                  dataIndex: 'sendNumber1',
                  flex: 1
                },
                {
                  text: '寄出数量2',
                  dataIndex: 'sendNumber2',
                  flex: 1
                },
                {
                  text: '期数',
                  dataIndex: 'periodicalName',
                  flex: 1
                },
                {
                  text: '寄出日',
                  dataIndex: 'mailingDate',
                  flex: 1
                },
                {
                  text: '重量',
                  dataIndex: 'weight',
                  flex: 1
                },
                {
                  text: '邮资',
                  dataIndex: 'postage',
                  flex: 1
                },
                {
                  text: '包裹单号',
                  dataIndex: 'printcartCode',
                  flex: 1
                },
                {
                  text: '备注',
                  dataIndex: 'remark',
                  flex: 1
                },
                {
                  text: '购买金额',
                  dataIndex: 'amount',
                  flex: 1
                }
              ]
            },
            {
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
                  disabled: true,
                  margin: "0 0 0 20"
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
                  disabled: true,
                  margin: "0 0 0 10"
                },
                {
                  xtype: "button",
                  text: "面单打印",
                  disabled: true,
                  margin: "0 0 0 10"
                },
                {
                  xtype: "button",
                  text: "块状打印",
                  disabled: true,
                  margin: "0 0 0 10"
                },
                {
                  xtype: "button",
                  text: "条状打印",
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

    window.printHandle.get({
      $el: Ext.ComponentQuery.query("[itemId=list-btn-panel]")[0],
      form: Ext.ComponentQuery.query("[itemId=member]")[0].getForm(),
      type: "businessmember",
      margin: "0 0 0 10",
      title: panel.items.items[0].title
    });
  }
});
// +TODO Tab: [ "名单管理: list, list2", "管理打印", "打印购物车"]