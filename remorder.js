Ext.application({
  name: "JNH",
  launch: function () {

    //汇款订购管理列表
    Ext.create('Ext.data.Store', {
      storeId: 'orderList',
      fields: [
        "periodicalId",
        "consignee",
        "zipCode",
        "address",
        "preferentialTicket",
        "memberId",
        "realName",
        "key",
        'id',
        'periodicalName',
        'userCode',
        'userName',
        "billNumber",
        "receiptProceedsOffice",
        "remitter",
        "remittanceAmount",
        "remittanceDate",
        "paymentMethord",
        "paymentMethordName",
        "youthStuck",
        "unDiscountAmount",
        "memberType",
        "postage",
        "packageCode",
        "mailingDate",
        "remittanceReceived",
        "isRemittanceReceived",
        "remittanceReceivedDate",
        "orderReceived",
        "isOrderReceived",
        "orderReceivedDate",
        "deliveryMethod",
        "deliveryMethodName",
        "mailTimes",
        "status",
        "orderStatus"
      ],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.order.list,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    //搜索栏
    var search = Ext.create("Ext.form.Panel", {
      layout: "hbox",
      url: env.services.web + env.api.order.list,
      bodyPadding: 10,
      defaultType: 'textfield',
      margin: "10 0",
      renderTo: window.$bd,
      items: [
        Ext.create("periodical"),
        {
          fieldLabel: "汇票号码",
          name: 'billNumber',
          labelWidth: 60,
          width: 150,
          labelAlign: "right"
        },
        {
          fieldLabel: "会员编号",
          name: 'userCode',
          labelWidth: 60,
          width: 150,
          labelAlign: "right"
        },
        {
          fieldLabel: "会员姓名",
          name: 'userName',
          labelWidth: 60,
          width: 150,
          labelAlign: "right"
        },
        {
          fieldLabel: "地址",
          name: 'address',
          labelWidth: 60,
          labelAlign: "right"
        },
        {
          fieldLabel: "邮编",
          name: 'zipCode',
          labelWidth: 60,
          labelAlign: "right"
        },
        Ext.create("paymentMethord",{
                  store: Ext.create("Ext.data.Store", {
                    fields: ["name", "value"],
                    data: JSON.parse(document.body.dataset.paymentmethordall)
                  })
              }),
        {
          xtype: "button",
          text: "搜索",
          margin: "0 0 0 20",
          handler: function () {
            searchHandler.call(this, "orderList");
          }
        },
        {
          xtype: "button",
          text: "重置",
          handler: function () {
            var form = this.ownerCt.getForm();
            form.reset();
          },
          margin: "0 0 0 20"
        }
      ]
    });

    var list = Ext.create("Ext.panel.Panel", {
      renderTo: window.$bd,
      items: [
        {
          itemId: "order-grid",
          xtype: "grid",
          height: 155,
          title: "汇款订购列表",
          store: Ext.data.StoreManager.lookup('orderList'),
          border: 0,
          columnWidth: 0.5,
          columns: [
            {
              text: '序号',
              dataIndex: 'key',
              flex: 1
            },
            {
              text: '汇票号码',
              dataIndex: 'billNumber',
              flex: 1
            },
            {
              text: '汇款局',
              dataIndex: 'receiptProceedsOffice',
              flex: 1
            },
            {
              text: '汇款日期',
              dataIndex: 'remittanceDate',
              flex: 1
            },
            {
              text: '汇款人',
              dataIndex: 'remitter',
              flex: 1
            },
            {
              text: '汇款金额',
              dataIndex: 'remittanceAmount',
              flex: 1
            },
            {
              text: '收到汇款',
              dataIndex: 'remittanceReceived',
              flex: 1
            },
            {
              text: '收到汇款日期',
              dataIndex: 'remittanceReceivedDate',
              flex: 1
            },
            {
              text: '收到订单',
              dataIndex: 'orderReceived',
              flex: 1
            },
            {
              text: '收到订单日',
              dataIndex: 'orderReceivedDate',
              flex: 1
            },
            {
              text: '青春贴',
              dataIndex: 'youthStuck',
              flex: 1
            },
            {
              text: '抵价券',
              dataIndex: 'preferentialTicket',
              flex: 1
            },
            {
              text: '不打折抵价券',
              dataIndex: 'unDiscountAmount',
              flex: 2
            }
          ],
          listeners: {
            itemdblclick: function (that, record, item, index, e, eOpts) {
              var form = addOrder.getComponent("orderForm").getForm();
              addOrder.show();
              updateForm(form, record.data);
            }
          }

        }
      ]
    });


    var button = Ext.create("Ext.panel.Panel", {
      renderTo: window.$bd,
      margin: "20 0 0 0",
      border: 0,
      layout: "column",
      items: [/*{
       xtype: "button",
       itemId: "addOrder",
       text: "<span class=\"key\">A</span> 增加",
       handler: function() {
       addOrder.show();
       }
       },*/ {
        xtype: "button",
        text: "删除",
        margin: "0 0 0 10",
        handler: function () {
          removeGridRow({
            grid: list.getComponent("grid"),
            api: env.services.web + env.api.order.del
          });
        }
      }]
    });


    var addOrder = Ext.create("Ext.window.Window", {
      title: "增加汇款订购",
      width: 1000,
      closeAction: 'hide',
      layout: 'form',
      bodyPadding: 5,
      defaultType: 'textfield',
      fieldDefaults: {
        labelAlign: 'top'
      },
      closeAction: 'hide',
      bodyStyle: {
        background: "#fff"
      },
      items: [
        {
          itemId: "orderForm",
          xtype: "form",
          border: 0,
          items: [
            {
              xtype: "form",
              border: 0,
              items: [
                {
                  xtype: 'panel',
                  margin: "20 0 0 0",
                  layout: "hbox",
                  border: 0,
                  defaultType: 'textfield',
                  items: [
                    Ext.create("periodical", {
                      labelWidth: 40
                    }),
                    Ext.create("paymentMethord", {
                      labelWidth: 145,
                      width: 260
                    }),
                    {
                      fieldLabel: '汇票号码',
                      name: "billNumber",
                      labelAlign: "right",
                      labelWidth: 90
                    },
                    {
                      fieldLabel: '收汇局',
                      labelAlign: "right",
                      name: 'receiptProceedsOffice',
                      labelWidth: 90
                    }
                  ]
                },
                {
                  xtype: 'panel',
                  layout: "hbox",
                  margin: "10 0 0 0",
                  border: 0,
                  defaultType: 'textfield',
                  items: [
                    {
                      xtype: "hiddenfield",
                      name: 'id'
                    },
                    {
                      xtype: "hiddenfield",
                      name: 'memberId'
                    },
                    {
                      fieldLabel: "汇款金额",
                      labelAlign: "right",
                      labelWidth: 60,
                      name: 'remittanceAmount'
                    },
                    {
                      xtype: "datefield",
                      format: 'Y-m-d',
                      fieldLabel: '汇款日期',
                      labelAlign: "right",
                      name: 'remittanceDate',
                      width: 220
                    },
                    {
                      xtype: "checkboxfield",
                      boxLabel: "收到货款",
                      margin: "0 0 0 37",
                      inputValue: 1,
                      labelAlign: "right",
                      name: 'isRemittanceReceived'
                    },
                    {
                      xtype: "datefield",
                      format: 'Y-m-d',
                      fieldLabel: '收款日期',
                      labelAlign: "right",
                      name: 'remittanceReceivedDate',
                      labelWidth: 220
                    }
                  ]
                },
                {
                  xtype: 'panel',
                  layout: "hbox",
                  margin: "30 0 0 0",
                  border: 0,
                  defaultType: 'textfield',
                  items: [
                    Ext.create('deliveryMethod', {
                      labelWidth: 60,
                      width: 160
                    }),
                    {
                      xtype: "datefield",
                      format: 'Y-m-d',
                      fieldLabel: '收订单日期',
                      labelAlign: "right",
                      name: 'orderReceivedDate',
                      labelWidth: 145,
                      width: 250
                    },
                    {
                      fieldLabel: "邮资",
                      labelAlign: "right",
                      name: 'postage',
                      labelWidth: 65,
                      width: 180
                    }
                  ]
                },
                {
                  xtype: 'panel',
                  layout: "hbox",
                  margin: "10 0 0 0",
                  border: 0,
                  defaultType: 'textfield',
                  items: [
                    {
                      xtype: "checkboxfield",
                      boxLabel: "收到订单",
                      margin: "0 0 0 10",
                      inputValue: 1,
                      labelAlign: "right",
                      name: 'isOrderReceived'
                    }, {
                      fieldLabel: "不打折金额",
                      labelAlign: "right",
                      name: 'unDiscountAmount',
                      labelWidth: 230,
                      width: 330
                    },
                    {
                      fieldLabel: "抵价券",
                      labelAlign: "right",
                      name: 'preferentialTicket',
                      labelWidth: 80,
                      width: 185
                    },
                    {
                      fieldLabel: "使用青春贴",
                      labelAlign: "right",
                      name: 'youthStuck',
                      labelWidth: 160
                    }
                  ]
                },
                {
                  xtype: 'panel',
                  layout: "hbox",
                  margin: "30 0 0 0",
                  border: 0,
                  defaultType: 'textfield',
                  items: [
                    {
                      labelWidth: 40,
                      fieldLabel: "姓名",
                      labelAlign: "right",
                      name: 'realName',
                      width: 180
                    },
                    {
                      labelWidth: 60,
                      fieldLabel: "会员编号",
                      labelAlign: "right",
                      name: 'userCode',
                      margin: "0 0 0 10",
                      width: 220
                    },
                    {
                      labelWidth: 60,
                      fieldLabel: "邮编",
                      labelAlign: "right",
                      name: 'zipCode',
                      width: 180
                    },
                    {
                      labelWidth: 60,
                      fieldLabel: "地址",
                      labelAlign: "right",
                      name: 'address'
                    },
                    {
                      labelWidth: 60,
                      fieldLabel: "收件人",
                      labelAlign: "right",
                      width: 170,
                      name: 'consignee'
                    }
                  ]
                },
                {
                  xtype: 'panel',
                  layout: "hbox",
                  margin: "10 0 0 0",
                  border: 0,
                  defaultType: 'textfield',
                  items: [
                    {
                      labelWidth: 80,
                      fieldLabel: "折扣",
                      labelAlign: "right",
                      disabled: true,
                      name: 'orderDiscount',
                      readOnly: true,
                      labelWidth: 40
                    },
                    {
                      labelWidth: 80,
                      fieldLabel: "邮寄",
                      labelAlign: "right",
                      disabled: true,
                      name: 'mailingCost',
                      width: 180
                    },
                    {
                      fieldLabel: "青春贴",
                      labelAlign: "right",
                      disabled: true,
                      name: 'orderYouthStuck',
                      margin: "0 0 0 30",
                      width: 180
                    },
                    {
                      fieldLabel: "多付款",
                      readOnly: true,
                      labelAlign: "right",
                      disabled: true,
                      name: 'orderMoreAmount',
                      width: 180
                    },
                    Ext.create("orderStatus"),
                  ]
                }
              ]
            },
            {
              xtype: 'panel',
              layout: "hbox",
              width: 410,
              margin: "30 0 30 100",
              border: 0,
              bodyStyle: {
                background: 'transparent'
              },
              items: [
                {
                  xtype: 'button',
                  scale: "medium",
                  text: "新增",
                  handler: function () {
                    var form = this.ownerCt.ownerCt.getForm();
                    form.url = env.services.web + env.api.order.save;
                    form.submit({
                      success: function (form, action) {
                        window.resetForm({
                          list: [
                            'paymentMethord',
                            'billNumber',
                            'receiptProceedsOffice',
                            'remittanceAmount',
                            'remittanceDate',
                            'isRemittanceReceived',
                            'remittanceReceivedDate',
                            'orderReceivedDate',
                            'postage',
                            'isOrderReceived',
                            'status'
                          ],
                          root: addOrder.getComponent("orderForm")
                        });
                      },
                      failure: function (form, action) {
                        Ext.Msg.alert("新增汇款订购", action.result.msg);
                      }
                    });
                  }
                },
                {
                  xtype: 'button',
                  scale: "medium",
                  margin: "0 0 0 30",
                  text: "保存",
                  handler: function () {
                    var form = this.ownerCt.ownerCt.getForm();
                    form.url = env.services.web + env.api.order.save;
                    form.submit({
                      success: function (form, action) {
                        addOrder.hide();
                        var form = addOrder.getComponent("orderForm").getForm();
                        form.reset();
                        orderModelHandler({
                          success: function (data) {
                            var record = Ext.ComponentQuery.query("grid[itemId=memberList]")[0]
                              .getSelectionModel()
                              .getSelection()[0].data;
                            showFolwCharts(record.memberId);
                          },
                          fail: function () {
                            Ext.Msg.alert("增加汇款定购", "错误：必须选选择一个会员才可以添加哦！");
                          }
                        });
                      },
                      failure: function (form, action) {
                        Ext.Msg.alert("修改汇款订购", action.result.msg);
                      }
                    });
                  }
                },
                {
                  xtype: 'button',
                  scale: "medium",
                  margin: "0 0 0 30",
                  text: "修改",
                  handler: function () {
                    var form = this.ownerCt.ownerCt.getForm(),
                      record = Ext.ComponentQuery.query("grid[itemId=order-grid]")[0]
                        .getSelectionModel()
                        .getSelection()[0].data;

                    Ext.Ajax.request({
                      url: env.services.web + env.api.member.getDefaultAddr,
                      params: {
                        memberId: record.memberId
                      },
                      success: function (resp) {
                        var data = Ext.JSON.decode(resp.responseText);
                        if (data.success) {
                          window.updateForm(form, data.info);
                        } else {
                          Ext.Msg.alert("填充地址", data.msg);
                        }
                      }
                    });

                  }
                },
                {
                  xtype: 'button',
                  scale: "medium",
                  margin: "0 0 0 30",
                  text: "返回",
                  handler: function () {
                    addOrder.hide();
                  }
                }
              ]
            }
          ]
        }
      ]
    });


    // search.hide();
    // list.hide();
    //add.show();
  }
});




