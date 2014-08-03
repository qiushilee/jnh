Ext.application({
  name: "JNH",
  launch: function () {

    //汇款订购管理列表
    var  orderList = Ext.create('Ext.data.Store', {
      storeId: 'orderList',
      fields: ['id','billNumber', 'receiptProceedsOffice', 'remittanceDate','remitter','remittanceAmount', 'isRemittanceReceived', "remittanceReceivedDate", "isOrderReceived",'orderReceivedDate','youthStuck','preferentialTicket','unDiscountAmount','remark'],
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
      renderTo: document.body,
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
        {
          xtype: "combobox",
          fieldLabel: "付款方式",
          name: 'payMethord',
          labelWidth: 60,
          width: 130,
          labelAlign: "right"
        },
        {
          xtype: "button",
          text: "搜索",
          margin: "0 0 0 20",
          handler: function() {
            var form = this.ownerCt.getForm();
            if (form.isValid()) {
              // TODO 接口需要加上 success: true
              form.submit({
                success: function(form, action) {
                  console.log(action)
                },
                failure: function(form, action) {
                  orderList.loadData(action.result.list);
                }
              });
            }
          }
        },
        {
          xtype: "button",
          text: "重置",
          margin: "0 0 0 20"
        }
      ]
    });

    var list = Ext.create("Ext.panel.Panel", {
      renderTo: Ext.getBody(),
      items: [
        {
          itemId: "grid",
          xtype: "grid",
          title: "汇款订购列表",
          store: Ext.data.StoreManager.lookup('orderList'),
          border: 0,
          columnWidth: 0.5,
          columns: [
            {
              text: '序号',
              dataIndex: 'id',
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
              text: '是否收到汇款',
              dataIndex: 'isRemittanceReceived',
              flex: 1
            },
            {
              text: '收到汇款日期',
              dataIndex: 'remittanceReceivedDate',
              flex: 1
            },
            {
              text: '是否收到订单',
              dataIndex: 'isOrderReceived',
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
          ]
        }
      ]
    });


    var button = Ext.create("Ext.panel.Panel", {
      renderTo: Ext.getBody(),
      margin: "20 0 0 0",
      border: 0,
      layout: "column",
      items: [{
        xtype: "button",
        itemId: "addOrder",
        text: "<span class=\"key\">A</span> 增加",
        handler: function() {
          addOrder.show();
        }
      }, {
        xtype: "button",
        text: "删除",
        margin: "0 0 0 10",
        handler: function() {
          var id = list.getComponent("grid").getSelectionModel().getSelection()[0].data.id;          
          Ext.Ajax.request({
            url: env.services.web + env.api.order.del,
            params: {
              id: id
            },
            success: function(resp) {
              var data = Ext.JSON.decode(resp.responseText);
              Ext.data.StoreManager.lookup('orderList').loadData(data.list);
            }
          });
        }
      }]
    });


    var addOrder = Ext.create("Ext.window.Window", {
      title: "添加汇款订购",
      width: 1000,
      layout: 'form',
      bodyPadding: 5,
      defaultType: 'textfield',
      fieldDefaults: {
        labelAlign: 'top'
      },
      bodyStyle: {
        background: "#fff"
      },
      items: [{
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
              Ext.create("periodical"),
              {
                xtype: "combobox",
                fieldLabel: "付款方式",
                name:"payMethord",
                labelAlign: "right"
              },
              {
                fieldLabel: '汇票号码',
                name:"billNumber",
                labelAlign: "right",
              },
              {
                fieldLabel: '收汇局',
                labelAlign: "right",
                name: 'billNumber'
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
                fieldLabel: "汇款金额",
                labelAlign: "right",
                name: 'remittanceAmount',
                allowBlank: false
              },
              {
                xtype: "datefield",
                fieldLabel: '汇款日期',
                labelAlign: "right",
                name: '汇款日期'
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
                fieldLabel: '收款日期',
                labelAlign: "right",
                name: 'remittanceReceivedDate'
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
                fieldLabel: "使用青春贴",
                labelAlign: "right",
                name: 'youthStuck',
                allowBlank: false
              },
              {
                xtype: "combobox",
                fieldLabel: "寄送方式",
                name:"deliveryMethod",
                labelAlign: "right"
              },{
                xtype: "datefield",
                fieldLabel: '收订单日期',
                labelAlign: "right",
                name: 'orderReceivedDate'
              },
              {
                fieldLabel: "邮资",
                labelAlign: "right",
                name: 'postage',
                allowBlank: false
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
                margin: "0 0 0 37",
                inputValue: 1,
                labelAlign: "right",
                name: 'isOrderReceived'
              }, {
                fieldLabel: "不打折金额",
                labelAlign: "right",
                name: 'unDiscountAmount',
                allowBlank: false
              },
              {
                fieldLabel: "抵价券",
                labelAlign: "right",
                name: 'preferentialTicket',
                allowBlank: false
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
                fieldLabel: "姓名",
                labelAlign: "right",
                name: 'userName',
                allowBlank: false
              },{
                fieldLabel: "会员编号",
                labelAlign: "right",
                name: 'userCode',
                allowBlank: false
              },
              {
                fieldLabel: "邮编",
                labelAlign: "right",
                name: 'zipCode',
                allowBlank: false
              },
              {
                fieldLabel: "地址",
                labelAlign: "right",
                name: 'address',
                allowBlank: false
              },
              {
                fieldLabel: "收件人",
                labelAlign: "right",
                width: 170,
                name: 'consignee',
                allowBlank: false
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
                fieldLabel: "折扣",
                labelAlign: "right",
                readOnly:true
              },
              {
                fieldLabel: "邮寄",
                labelAlign: "right",
                name: 'mailingCost',
                allowBlank: false
              },
              {
                fieldLabel: "青春贴",
                labelAlign: "right",
                name: 'youthStuck',
                allowBlank: false
              },
              {
                fieldLabel: "多付款",
                readOnly:true,
                labelAlign: "right"
              }
            ]
          },
          {
            xtype: 'panel',
            layout: "hbox",
            width: 110,
            margin: "30 auto",
            border: 0,
            bodyStyle: {
              background: 'transparent'
            },
            items: [
              {
                xtype: 'button',
                scale: "medium",
                text: "保存",
                handler: function() {
                  var form = this.ownerCt.ownerCt.getForm();
                  form.url = env.services.web + env.api.order.create;
                  form.submit({
                    success: function(form, action) {
                      Ext.Msg.alert("新增汇款订购", action.result.msg, function() {
                        addOrder.hide();
                      });
                    },
                    failure: function(form, action) {
                      Ext.Msg.alert("新增汇款订购", action.result.msg);
                    }
                  });
                }
              },
              {
                xtype: 'button',
                scale: "medium",
                margin: "0 0 0 30",
                text: "返回",
                handler: function() {
                  addOrder.hide();
                }
              }
            ]
          }
        ]
      }]
    });

    // search.hide();
    // list.hide();
    //add.show();
  }
});




