Ext.application({
  name: "JNH",
  launch: function () {

    Ext.create('Ext.data.Store', {
      storeId: 'jhStore',
      fields: ['id', 'name', 'adder', 'man'],
      layout: "fit",
      data: {
        'items': [
          {
            'id': '54001',
            "name": "进货单",
            "adder": "14/01/01",
            "man": "500"
          },
          {
            'id': '54002',
            "name": "转换表",
            "adder": "14/01/01",
            "man": "500"
          },
          {
            'id': '54003',
            "name": "损坏表",
            "adder": "14/01/01",
            "man": "500"
          },
          {
            'id': '54004',
            "name": "进货单",
            "adder": "14/01/01",
            "man": "500"
          },
          {
            'id': '54005',
            "name": "转换表",
            "adder": "14/01/01",
            "man": "500"
          },
          {
            'id': '54006',
            "name": "损坏表",
            "adder": "14/01/01",
            "man": "500"
          },
          {
            'id': '54007',
            "name": "进货单",
            "adder": "14/01/01",
            "man": "500"
          },
          {
            'id': '54008',
            "name": "转换表",
            "adder": "14/01/01",
            "man": "500"
          },
          {
            'id': '合计',
            "name": "3",
            "adder": 798.8,
            "man": "500"
          }
        ]
      },
      proxy: {
        type: 'memory',
        reader: {
          type: 'json',
          root: 'items'
        }
      }
    });

    var search = Ext.create("Ext.Panel", {
      layout: "hbox",
      bodyPadding: 10,
      defaultType: 'textfield',
      margin: "10 0",
      renderTo: document.body,
      items: [
        {
          xtype: "combobox",
          fieldLabel: "期数",
          labelWidth: 40,
          width: 120,
          labelAlign: "right"
        },
        {
          fieldLabel: "汇票号码",
          labelWidth: 60,
          width: 150,
          labelAlign: "right"
        },
        {
          fieldLabel: "会员编号",
          labelWidth: 60,
          width: 150,
          labelAlign: "right"
        },
        {
          fieldLabel: "会员姓名",
          labelWidth: 60,
          width: 150,
          labelAlign: "right"
        },
        {
          fieldLabel: "地址",
          labelWidth: 60,
          labelAlign: "right"
        },
        {
          fieldLabel: "邮编",
          labelWidth: 60,
          labelAlign: "right"
        },
        {
          xtype: "combobox",
          fieldLabel: "付款方式",
          labelWidth: 60,
          width: 130,
          labelAlign: "right"
        },
        {
          xtype: "button",
          text: "搜索",
          margin: "0 0 0 20"
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
          xtype: "grid",
          title: "汇款订购列表",
          store: Ext.data.StoreManager.lookup('jhStore'),
          border: 0,
          columnWidth: 0.5,
          columns: [
            {
              text: '序号',
              dataIndex: 'id',
              flex: 1
            },
            {
              text: '付款方式',
              dataIndex: 'id',
              flex: 1
            },
            {
              text: '汇票号码',
              dataIndex: 'name',
              flex: 1
            },
            {
              text: '编号',
              dataIndex: 'name1',
              flex: 1
            },
            {
              text: '汇款日期',
              dataIndex: 'asdder2',
              flex: 1
            },
            {
              text: '收到汇款',
              dataIndex: 'asdder2',
              flex: 1
            },
            {
              text: '收款日期',
              dataIndex: 'asdder2',
              flex: 1
            },
            {
              text: '汇款人',
              dataIndex: 'asdder2',
              flex: 1
            },
            {
              text: '汇款额',
              dataIndex: 'adder',
              flex: 1
            },
            {
              text: '收到订单',
              dataIndex: 'asdder2',
              flex: 1
            },
            {
              text: '收订单日',
              dataIndex: 'asdder2',
              flex: 1
            },
            {
              text: '青春贴',
              dataIndex: 'asdder2',
              flex: 1
            },
            {
              text: '抵价券',
              dataIndex: 'asdder2',
              flex: 1
            },
            {
              text: '不打折抵价券',
              dataIndex: 'asdder2',
              flex: 2
            }
          ]
        }
      ]
    });


    var button = Ext.create("Ext.panel.Panel", {
      renderTo: Ext.getBody(),
      margin: "20 0 0 17",
      border: 0,
      layout: "column",
      items: [{
        xtype: "button",
        text: "<span class=\"key\">A</span> 增加",
        scale: "medium"
      }, {
        xtype: "button",
        text: "删除",
        scale: "medium"
      }]
    });


    var add = Ext.create("Ext.window.Window", {
      title: "购买记录详情",
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
      items: [
        {
          xtype: 'panel',
          margin: "20 0 0 0",
          layout: "hbox",
          border: 0,
          defaultType: 'textfield',
          items: [
            {
              xtype:"combobox",
              fieldLabel: "期数",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              xtype: "combobox",
              store: Ext.data.StoreManager.lookup('adderList'),
              queryMode: 'local',
              displayField: 'name',
              valueField: 'abbr',
              fieldLabel: "付款方式",
              labelAlign: "right"
            },
            {
              fieldLabel: '汇票号码',
              labelAlign: "right",
              name: 'company'
            },
            {
              fieldLabel: '编号',
              labelAlign: "right",
              name: 'email',
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
              fieldLabel: "付款金额",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              xtype: "datefield",
              fieldLabel: '付款日期',
              labelAlign: "right",
              name: 'company'
            },
            {
              xtype: "checkboxfield",
              boxLabel: "收到货款",
              margin: "0 0 0 37",
              inputValue: 1,
              labelAlign: "right",
              name: 'last'
            },
            {
              xtype: "datefield",
              fieldLabel: '收款日期',
              labelAlign: "right",
              name: 'email',
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
              name: 'first',
              allowBlank: false
            },
            {
              xtype: "combobox",
              store: Ext.data.StoreManager.lookup('adderList'),
              queryMode: 'local',
              displayField: 'name',
              valueField: 'abbr',
              fieldLabel: "寄送方式",
              labelAlign: "right"
            },{
              xtype: "datefield",
              fieldLabel: '收订单日期',
              labelAlign: "right",
              name: 'company'
            },
            {
              fieldLabel: "邮资",
              labelAlign: "right",
              name: 'first',
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
              name: 'last'
            }, {
              fieldLabel: "不打折金额",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "抵价券",
              labelAlign: "right",
              name: 'first',
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
              name: 'first',
              allowBlank: false
            },{
              fieldLabel: "会员编号",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "邮编",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "地址",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "收件人",
              labelAlign: "right",
              width: 170,
              name: 'first',
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
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "邮寄",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "青春贴",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "多付款",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
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
              text: "保存"
            },
            {
              xtype: 'button',
              scale: "medium",
              margin: "0 0 0 30",
              text: "返回"
            }
          ]
        }
      ]
    });

    // search.hide();
    // list.hide();
    add.show();
  }
});




