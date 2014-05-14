Ext.application({
  name: "JNH",
  launch: function () {
    Ext.create('Ext.data.Store', {
      storeId: 'memberList',
      fields: ['id', 'name', 'adder', 'adder2'],
      layout: "fit",
      data: {
        'items': [
          {
            'id': '54001',
            "name": "张XX",
            "adder": "浙江省杭州市西湖区文一西路",
            "adder2": "浙江省绍兴市柯桥区文一西路"
          },
          {
            'id': '540012',
            "name": "张XX",
            "adder": "浙江省杭州市西湖区文一西路",
            "adder2": "浙江省绍兴市柯桥区文一西路"
          },
          {
            'id': '540013',
            "name": "张XX",
            "adder": "浙江省杭州市西湖区文一西路",
            "adder2": "浙江省绍兴市柯桥区文一西路"
          },
          {
            'id': '540014',
            "name": "张XX",
            "adder": "浙江省杭州市西湖区文一西路",
            "adder2": "浙江省绍兴市柯桥区文一西路"
          },
          {
            'id': '540015',
            "name": "张XX",
            "adder": "浙江省杭州市西湖区文一西路",
            "adder2": "浙江省绍兴市柯桥区文一西路"
          },
          {
            'id': '540016',
            "name": "张XX",
            "adder": "浙江省杭州市西湖区文一西路",
            "adder2": "浙江省绍兴市柯桥区文一西路"
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

    Ext.create('Ext.data.Store', {
      storeId: 'adderList',
      fields: ['adder', 'adder2'],
      data: [
        {"adder": "AL", "adder2": "Alabama"},
        {"adder": "AK", "adder2": "Alaska"},
        {"adder": "AZ", "adder2": "Arizona"}
      ]
    });

    Ext.create("Ext.panel.Panel", {
      renderTo: Ext.getBody(),
      items: [
        {
          xtype: "panel",
          border: 0,
          layout: "column",
          defaultType: 'textfield',
          fieldDefaults: {
            labelAlign: 'top'
          },
          items: [
            {
              fieldLabel: "会员编号",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "姓名",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "电话",
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
              xtype:"datefield",
              fieldLabel: "加入时间",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              xtype:"datefield",
              fieldLabel: "到",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              xtype:"combobox",
              fieldLabel: "来源",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              xtype: 'button',
              margin: "0 5 0 50",
              text: "搜索"
            },
            {
              xtype: 'button',
              margin: "0 5",
              text: "E电话订购"
            },
            {
              xtype: 'button',
              margin: "0 5",
              text: "N修改"
            },
            {
              xtype: 'button',
              margin: "0 5",
              text: "Q增加"
            },
            {
              xtype: 'button',
              margin: "0 5",
              text: "删除"
            },
            {
              xtype: 'button',
              margin: "0 5",
              text: "W保存"
            }
          ]
        },

        // 第二行
        {
          xtype: "panel",
          margin: "20 0 0 0",
          border: 0,
          layout: "column",
          items: [
            {
              xtype: "grid",
              columnWidth: 0.5,
              height: 155,
              store: Ext.data.StoreManager.lookup('memberList'),
              columns: [
                {
                  text: '会员号',
                  dataIndex: 'id'
                },
                {
                  text: '会员姓名',
                  dataIndex: 'name'
                },
                {
                  text: '默认地址',
                  flex: 1,
                  dataIndex: 'adder'
                },
                {
                  text: '地址2',
                  flex: 1,
                  dataIndex: 'adder2'
                },
                {
                  text: '状态',
                  flex: 1,
                  dataIndex: '2'
                }
              ]
            },
            {
              xtype: "grid",
              columnWidth: 0.4,
              margin: "0 0 0 100",
              height: 155,
              title: "目录寄送",
              store: Ext.data.StoreManager.lookup('memberList'),
              columns: [
                {
                  text: '期数',
                  dataIndex: 'id'
                },
                {
                  text: '寄送方式',
                  flex: 1,
                  dataIndex: 'adder'
                },
                {
                  text: '数量',
                  dataIndex: 'id'
                },
                {
                  text: '状态',
                  flex: 1,
                  dataIndex: '1'
                }
              ]
            },
          ]
        },

        // 第三行
        {
          xtype: "panel",
          margin: "20 0 0 0",
          border: 0,
          layout: {
            type: "hbox",
            align: "stretch"
          },
          defaultType: 'textfield',
          fieldDefaults: {
            labelAlign: 'right'
          },
          items: [
            {
              fieldLabel: "会员编号",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              xtype: "checkboxfield",
              boxLabel: "代理",
              inputValue: 1,
              labelAlign: "right",
              name: 'last'
            },
            {
              fieldLabel: "会员姓名",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "生日",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              xtype:"combobox",
              fieldLabel: "寄送方式",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              xtype:"datefield",
              fieldLabel: "毕业时间",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            }
          ]
        },

        // 第四行
        {
          xtype: "panel",
          margin: "20 0 0 0",
          border: 0,
          layout: "column",
          defaultType: 'textfield',
          fieldDefaults: {
            labelAlign: 'right'
          },
          items: [
            {
              xtype: "label",
              columnWidth: 0.15,
              text: "默认地址：浙江省杭州市西湖区",
              name: 'last'
            },
            {
              xtype: "label",
              columnWidth: 0.15,
              text: "邮编：312402",
              name: 'first',
            },
            {
              xtype: "label",
              columnWidth: 0.15,
              text: "电话：809312402",
              name: 'first',
            },
            {
              xtype: "label",
              columnWidth: 0.15,
              text: "收件人：张XX",
              name: 'first',
            }
          ]
        },

        // 第五行
        {
          xtype: "panel",
          margin: "20 0 0 0",
          border: 0,
          layout: {
            type: "hbox",
            align: "stretch"
          },
          defaultType: 'textfield',
          fieldDefaults: {
            labelAlign: 'right'
          },
          items: [
            {
              xtype: "combobox",
              store: Ext.data.StoreManager.lookup('adderList'),
              queryMode: 'local',
              width:150,
              displayField: 'name',
              valueField: 'abbr',
              fieldLabel: "家庭地址",
              labelAlign: "right"
            },
            {
              xtype:"combobox",
              fieldLabel: "类型",
              width:150,
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
              fieldLabel: "电话",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "收件人",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            }
          ]
        },

        // 第六行
        {
          xtype: "panel",
          margin: "20 0 0 0",
          border: 0,
          layout: {
            type: "hbox",
            align: "stretch"
          },
          defaultType: 'textfield',
          fieldDefaults: {
            labelAlign: 'right'
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
            },
            {
              fieldLabel: "青春贴",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "代理期数",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "加入时间",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            }
          ]
        },

        // 第七行
        {
          xtype: "textfield",
          margin: "20 0 0 0",
          width: 1000,
          fieldLabel: "备注",
          labelAlign: "right",
          name: 'first'
        },

        // 第八行
        {
          xtype: "grid",
          title: "流程表",
          margin: "20 0 0 0",
          columnWidth: 0.5,
          height: 155,
          store: Ext.data.StoreManager.lookup('memberList'),
          columns: [
            {
              text: '序号',
              dataIndex: 'isd'
            },
            {
              text: '期数',
              dataIndex: 'nsame'
            },
            {
              text: '付费方式',
              dataIndex: 'adsder'
            },
            {
              text: '编号',
              dataIndex: 'asdder2'
            },
            {
              text: '付费日期',
              dataIndex: 'asdder2'
            },
            {
              text: '付费金额',
              dataIndex: 'asdder2'
            },
            {
              text: '汇票号码',
              dataIndex: 'asdder2'
            },
            {
              text: '寄送方式',
              dataIndex: 'asdder2'
            },
            {
              text: '邮资',
              dataIndex: 'asdder2'
            },
            {
              text: '收订单日',
              dataIndex: 'asdder2'
            },
            {
              text: '寄出日期',
              dataIndex: 'asdder2'
            },
            {
              text: '包裹单号',
              dataIndex: 'asdder2'
            },
            {
              text: '状态',
              dataIndex: 'asdder2'
            },
            {
              text: '补寄',
              dataIndex: 'asdder2'
            }
          ]
        }
      ]
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

    add.show();
  }
});