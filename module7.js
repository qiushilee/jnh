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
          fieldLabel: "出货单号",
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
          fieldLabel: "姓名",
          labelWidth: 40,
          width: 150,
          labelAlign: "right"
        },
        {
          xtype: "datefield",
          fieldLabel: "邮寄日期",
          labelWidth: 60,
          width: 160,
          labelAlign: "right"
        },
        {
          xtype: "combobox",
          fieldLabel: "寄送方式",
          labelWidth: 60,
          width: 150,
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
          title: "包裹列表",
          store: Ext.data.StoreManager.lookup('jhStore'),
          selModel: Ext.create('Ext.selection.CheckboxModel', {mode: "SIMPLE"}),
          border: 0,
          columnWidth: 0.5,
          columns: [{
            text: '序号',
            dataIndex: 'id',
            flex: 1
          }, {
            text: '出货单号',
            dataIndex: 'name',
            flex: 1
          }, {
            text: '包裹单号',
            dataIndex: 'name1',
            flex: 1
          }, {
            text: '流水号',
            dataIndex: 'name1',
            flex: 1
          }, {
            text: '邮寄日期',
            dataIndex: 'asdder2',
            flex: 1
          }, {
            text: '重量',
            dataIndex: 'asdder2',
            flex: 1
          }, {
            text: '邮资',
            dataIndex: 'asdder2',
            flex: 1
          }, {
            text: '包装员',
            dataIndex: 'asdder2',
            flex: 1
          }, {
            text: '姓名',
            dataIndex: 'asdder2',
            flex: 1
          }, {
            text: '地址',
            dataIndex: 'asdder2',
            flex: 1
          }, {
            text: '补寄',
            dataIndex: 'asdder2',
            flex: 1
          }, {
            text: '备注',
            dataIndex: 'asdder2',
            flex: 1
          }]
        }
      ]
    });

    var button = Ext.create("Ext.panel.Panel", {
      renderTo: Ext.getBody(),
      margin: "10 0 0 0",
      border: 0,
      layout: "column",
      items: [{
        xtype: "button",
        text: "<span class=\"key\">M</span> 修改",
        margin: "0 0 0 10"
      }, {
        // 添加到打印购物车
        xtype: "button",
        text: "<span class=\"key\">W</span> 添加",
        margin: "0 0 0 10"
      }, {
        xtype: "button",
        text: "<span class=\"key\">D</span> 打印",
        margin: "0 0 0 10"
      }, {
        xtype: "button",
        text: "<span class=\"key\">C</span> 预览",
        margin: "0 0 0 10"
      }, {
        xtype: "button",
        text: "<span class=\"key\">B</span> 连续打印",
        margin: "0 0 0 10"
      }, {
        xtype: "button",
        text: "批量修改",
        margin: "0 0 0 10"
      }, {
        xtype: "button",
        text: "扫描包裹单",
        margin: "0 0 0 10"
      }]
    });

    var add = Ext.create("Ext.window.Window", {
      title: "包裹详情",
      width: 500,
      layout: 'form',
      bodyPadding: 10,
      defaultType: 'textfield',
      items: [
        {
          xtype: "panel",
          border: 0,
          layout: "hbox",
          defaultType: 'textfield',
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [{
            disabled: true,
            fieldLabel: "出货单号",
            labelWidth: 55,
            margin: "5 0",
            labelAlign: "right"
          }, {
            disabled: true,
            fieldLabel: "会员编号",
            labelWidth: 55,
            margin: "5 0",
            labelAlign: "right"
          }]
        },
        {
          xtype: "panel",
          border: 0,
          layout: "hbox",
          defaultType: 'textfield',
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [{
            disabled: true,
            fieldLabel: "会员姓名",
            labelWidth: 55,
            margin: "5 0",
            labelAlign: "right"
          }, {
            disabled: true,
            fieldLabel: "重量",
            labelWidth: 55,
            margin: "5 0",
            labelAlign: "right"
          }]
        },
        {
          xtype: "panel",
          border: 0,
          layout: "hbox",
          defaultType: 'textfield',
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [{
            disabled: true,
            fieldLabel: "邮编",
            labelWidth: 55,
            margin: "5 0",
            labelAlign: "right"
          },
          {
            disabled: true,
            fieldLabel: "地址",
            labelWidth: 55,
            width: 250,
            margin: "5 0",
            labelAlign: "right"
          }]
        },
        {
          xtype: "panel",
          border: 0,
          layout: "hbox",
          defaultType: 'textfield',
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [{
            xtype: "datefield",
            fieldLabel: "邮寄日期",
            labelWidth: 55,
            margin: "5 0",
            labelAlign: "right"
          }, {
            fieldLabel: "包裹单号",
            labelWidth: 55,
            margin: "5 0",
            labelAlign: "right"
          }]
        },
        {
          xtype: "panel",
          border: 0,
          layout: "hbox",
          defaultType: 'textfield',
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [{
            fieldLabel: "邮寄重量",
            labelWidth: 55,
            margin: "5 0",
            labelAlign: "right"
          }, {
            fieldLabel: "邮资",
            labelWidth: 55,
            margin: "5 0",
            labelAlign: "right"
          }]
        },
        {
          xtype: "panel",
          border: 0,
          layout: "hbox",
          defaultType: 'textfield',
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [{
            fieldLabel: "包装员",
            labelWidth: 55,
            margin: "5 0",
            labelAlign: "right"
          }]
        },
        {
          xtype: "textareafield",
          width: 300,
          height: 100,
          fieldLabel: "备注",
          labelWidth: 55,
          margin: "5 0",
          labelAlign: "right",
          name: 'first'
        },
        {
          xtype: "panel",
          border: 0,
          layout: "hbox",
          defaultType: 'button',
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [{
            text: "保存",
            margin: "5 0",
            labelAlign: "right"
          }]
        },
      ]
    });

    var print = new Ext.create("Ext.window.Window", {
      title: "包裹打印",
      width: 700,
      bodyPadding: 10,
      items: [{
        layout: "hbox",
        bodyPadding: 10,
        border: 0,
        defaultType: 'textfield',
        bodyStyle: {
          "background-color": "transparent"
        },
        items: [{
          fieldLabel: "出货单号",
          labelAlign: "right",
          labelWidth: 60,
          width: 150,
        }, {
          fieldLabel: "",
          width: 90
        }, {
          xtype: "combobox",
          fieldLabel: "寄送方式",
          labelAlign: "right",
          labelWidth: 60,
          width: 140
        }, {
          xtype: "button",
          text: "搜索",
          margin: "0 0 0 20"
        }, {
          xtype: "button",
          text: "重置",
          margin: "0 0 0 10"
        }]
      }, {
        xtype: "grid",
        store: Ext.data.StoreManager.lookup('jhStore'),
        margin: "10 0 0 0",
        columns: [{
          text: '序号',
          dataIndex: 'id'
        }, {
          text: '出货单号',
          dataIndex: 'id1'
        }, {
          text: '流水号',
          dataIndex: 'id1'
        }, {
          text: '地址',
          dataIndex: 'man1',
          flex: 1
        }, {
          text: '姓名',
          dataIndex: 'adder1'
        }, {
          text: '寄送方式',
          dataIndex: 'id1'
        }, {
          text: '备注',
          dataIndex: 'man1',
        }]
      }, {
        layout: "hbox",
        bodyPadding: 10,
        border: 0,
        defaultType: 'textfield',
        width: 190,
        style: {
          float: "right"
        },
        bodyStyle: {
          "background-color": "transparent"
        },
        items: [{
          xtype: "button",
          text: "查询",
          margin: "0 0 0 20"
        }, {
          xtype: "button",
          text: "打印",
          margin: "0 0 0 10"
        }, {
          xtype: "button",
          text: "重打",
          margin: "0 0 0 10"
        }]
      }]
    });

    var printCart = new Ext.create("Ext.window.Window", {
      title: "打印购物车",
      width: 1000,
      bodyPadding: 10,
      items: [{
        layout: "hbox",
        bodyPadding: 10,
        border: 0,
        defaultType: 'textfield',
        bodyStyle: {
          "background-color": "transparent"
        },
        items: [{
          xtype: "combobox",
          fieldLabel: "寄送方式",
          labelWidth: 60,
          labelAlign: "right"
        }, {
          fieldLabel: "编号",
          labelWidth: 40,
          labelAlign: "right"
        }, {
          xtype: "button",
          text: "搜索",
          margin: "0 0 0 20"
        }, {
          xtype: "button",
          text: "重置",
          margin: "0 0 0 10"
        }]
      }, {
        xtype: "grid",
        store: Ext.data.StoreManager.lookup('jhStore'),
        margin: "10 0 0 0",
        selModel:Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE"}),
        columns: [{
          text: '序号',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '出货单号',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '会员姓名',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '寄送方式',
          dataIndex: 'id1',
          flex: 2
        }, {
          text: '流水号',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '寄送日期',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '单号重量',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '邮资',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '包装员',
          dataIndex: 'id1',
          flex: 1
        }],
        bbar: Ext.create('Ext.PagingToolbar', {
          displayMsg: 'Displaying topics {0} - {1} of {2}',
          items:['-', {
            pressed: false
          }]
        })
      }, {
        layout: "hbox",
        bodyPadding: 10,
        border: 0,
        defaultType: 'textfield',
        width: "22%",
        style: {
          float: "right"
        },
        bodyStyle: {
          "background-color": "transparent"
        },
        items: [{
          xtype: "button",
          text: "<span class=\"key\">M</span> 修改",
          margin: "0 0 0 10"
        }, {
          xtype: "button",
          text: "<span class=\"key\">S</span> 保存",
          margin: "0 0 0 10"
        }, {
          xtype: "button",
          text: "<span class=\"key\">D</span> 打印",
          margin: "0 0 0 10"
        }]
      }]
    });

    // search.hide();
    // list.hide();
    // button.hide();
    add.show();
    print.show();
    printCart.show();
  }
});




