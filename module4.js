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
          fieldLabel: "汇票号码",
          labelAlign: "right"
        },
        {
          fieldLabel: "会员编号",
          labelAlign: "right"
        },
        {
          fieldLabel: "会员姓名",
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
              text: '汇票号码',
              dataIndex: 'name',
              flex: 1
            },
            {
              text: '收汇局',
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
              text: '收到汇款日期',
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
              text: '收到订单日期',
              dataIndex: 'asdder2',
              flex: 1
            },
            {
              text: '代用券',
              dataIndex: 'asdder2',
              flex: 1
            },
            {
              text: '抵价券',
              dataIndex: 'asdder2',
              flex: 1
            },
            {
              text: '折价券',
              dataIndex: 'asdder2',
              flex: 1
            },
            {
              text: '折扣',
              dataIndex: 'asdder2',
              flex: 1
            },
            {
              text: '总额',
              dataIndex: 'asdder2',
              flex: 1
            },
            {
              text: '备注',
              dataIndex: 'asdder2',
              flex: 1
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
      items: [
        {
          xtype: "button",
          text: "<span class=\"key\">A</span> 增加",
          scale: "medium"
        }
      ]
    });

    var add = Ext.create("Ext.window.Window", {
      title: "汇款定购详情",
      width: 600,
      layout: 'form',
      bodyPadding: 5,
      defaultType: 'textfield',
      items: [
        {
          xtype: "panel",
          border: 0,
          layout: {
            type: "hbox",
            align: "stretch"
          },
          defaultType: 'textfield',
          fieldDefaults: {
            labelAlign: 'right'
          },
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [
            {
              fieldLabel: "汇票号码",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "收汇局",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            }
          ]
        },
        //第二行
        {
          xtype: "panel",
          border: 0,
          layout: {
            type: "hbox",
            align: "stretch"
          },
          defaultType: 'textfield',
          fieldDefaults: {
            labelAlign: 'right'
          },
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [
            {
              fieldLabel: "会员编号",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "汇款人",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            }
          ]
        },
        //第三行
        {
          xtype: "panel",
          border: 0,
          layout: {
            type: "hbox",
            align: "stretch"
          },
          defaultType: 'textfield',
          fieldDefaults: {
            labelAlign: 'right'
          },
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [
            {
              fieldLabel: "汇款金额",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "汇款日期",
              xtype: "datefield",
              labelAlign: "right",
              name: 'first'
            }
          ]
        },
        //第四行
        {
          xtype: "panel",
          border: 0,
          layout: {
            type: "hbox",
            align: "stretch"
          },
          defaultType: 'textfield',
          fieldDefaults: {
            labelAlign: 'right'
          },
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [
            {
              fieldLabel: "收到汇款",
              xtype: "checkboxfield",
              labelAlign: "right",
              name: 'first',
              width: 240,
              items: [
                {  name: 'rb', inputValue: '1' }
              ]
            },
            {
              fieldLabel: "收到汇款日期",
              xtype: "datefield",
              labelAlign: "right",
              name: 'first'
            }
          ]
        },

        // 第五行
        {
          xtype: "panel",
          border: 0,
          layout: {
            type: "hbox",
            align: "stretch"
          },
          defaultType: 'textfield',
          fieldDefaults: {
            labelAlign: 'right'
          },
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [
            {
              xtype: "combobox",
              store: Ext.data.StoreManager.lookup('sourceList'),
              queryMode: 'local',
              displayField: 'name',
              valueField: 'source',
              fieldLabel: "订单来源",
              labelAlign: "right"
            },
            {
              fieldLabel: "邮编",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            }
          ]
        },
        //第六行
        {
          xtype: "panel",
          border: 0,
          layout: "hbox",
          defaultType: 'textfield',
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [
            {
              fieldLabel: "抵价券",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "不打折金额",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            }
          ]
        },
        //第七行
        {
          xtype: "panel",
          border: 0,
          layout: {
            type: "hbox",
            align: "stretch"
          },
          defaultType: 'textfield',
          fieldDefaults: {
            labelAlign: 'right'
          },
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [
            {
              fieldLabel: "邮资",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "收到订单",
              xtype: "checkboxfield",
              labelAlign: "right",
              name: 'first',
              width: 240,
              items: [
                {  name: 'rb', inputValue: '1' }
              ]
            }
          ]
        },

        // 第八行
        {
          xtype: "panel",
          border: 0,
          layout: {
            type: "hbox",
            align: "stretch"
          },
          defaultType: 'textfield',
          fieldDefaults: {
            labelAlign: 'right'
          },
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [
            {
              fieldLabel: "收到订单日期",
              xtype: "datefield",
              labelAlign: "right",
              name: 'first'
            }
          ]
        },
        //第九行
        {
          xtype: "panel",
          border: 0,
          layout: {
            type: "hbox",
            align: "stretch"
          },
          defaultType: 'textfield',
          fieldDefaults: {
            labelAlign: 'right'
          },
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [
            {
              fieldLabel: "地址",
              labelAlign: "right",
              name: 'first',
              width: 480
            }
          ]
        },

        // 第十行
        {
          xtype: "textareafield",
          width: 300,
          height: 100,
          fieldLabel: "备注",
          labelAlign: "right",
          name: 'first'
        },
        {
          xtype: 'panel',
          layout: "column",
          border: 0,
          width: 110,
          style: {
            margin: "10px auto"
          },
          bodyStyle: {
            "background-color": "transparent"
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
              margin: "0 0 0 20",
              text: "返回"
            }
          ]
        }
      ]
    });

    // search.hide();
    // list.hide();
    // add.show();
  }
});




