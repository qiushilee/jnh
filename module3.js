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
      border: 0,
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
              fieldLabel: "邮编",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            }
          ]
        }, {
          xtype: "panel",
          border: 0,
          layout: "column",
          defaultType: 'textfield',
          fieldDefaults: {
            labelAlign: 'top'
          },
          margin: "10 0 0 0",
          items: [
            {
              xtype:"datefield",
              fieldLabel: "加入时间",
              width: 200,
              labelAlign: "right"
            },
            {
              xtype:"datefield",
              fieldLabel: "到",
              labelWidth: 20,
              width: 120,
              labelAlign: "right"
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
              // TODO 有电话订购颜色不一样并显示数量
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
              // +TODO: 参照 module9.js 地址，索取数量不要
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
          xtype:'panel',
          layout: "hbox",
          border: 0,
          defaultType: 'textfield',
          margin: "10 0 0 0",
          items: [{
            xtype: "radiofield",
            fieldLabel: "代理",
            labelWidth: 40,
            labelAlign: "right"
          }, {
            xtype: "radiofield",
            fieldLabel: "会员",
            labelWidth: 40,
            labelAlign: "right"
          }, {
            fieldLabel: "姓名",
            labelWidth: 60,
            width: 120,
            labelAlign: "right"
          }, {
            xtype: "combobox",
            fieldLabel: "寄送方式",
            labelWidth: 102,
            width: 185,
            labelAlign: "right"
          }, {
            fieldLabel: "毕业时间",
            labelWidth: 60,
            labelAlign: "right"
          }, {
            xtype: "combobox",
            fieldLabel: "期数",
            labelWidth: 60,
            labelAlign: "right"
          }]
        },

        // 第四行
        {
          xtype:'panel',
          layout: "hbox",
          border: 0,
          defaultType: 'textfield',
          margin: "10 0 0 0",
          items: [{
            xtype: "combobox",
            fieldLabel: "类型",
            labelWidth: 40,
            width: 105,
            labelAlign: "right"
          }, {
            xtype: 'textfield',
            fieldLabel: "邮编",
            labelWidth: 40,
            width: 100,
            labelAlign: "right"
          }, {
            xtype: 'textfield',
            fieldLabel: "地址",
            labelWidth: 60,
            width: 300,
            labelAlign: "right"
          }, {
            xtype: 'textfield',
            fieldLabel: "电话",
            labelWidth: 40,
            width: 145,
            labelAlign: "right"
          }, {
            xtype: 'textfield',
            fieldLabel: "收件人",
            labelWidth: 60,
            width: 120,
            labelAlign: "right"
          }, {
            xtype: 'button',
            text: "设为默认",
            margin: "0 0 0 10"
          }, {
            xtype: 'button',
            text: "删除",
            margin: "0 0 0 10"
          }, {
            xtype: 'button',
            text: "增加地址",
            margin: "0 0 0 10"
          }]
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
              labelWidth: 50
            },
            {
              fieldLabel: "不打折金额",
              labelAlign: "right",
              labelWidth: 70
            },
            {
              fieldLabel: "青春贴",
              labelAlign: "right",
              labelWidth: 50
            },
            {
              xtype:"combobox",
              fieldLabel: "代理期数",
              labelAlign: "right",
              labelWidth: 60
            },
            {
              fieldLabel: "加入时间",
              labelAlign: "right",
              labelWidth: 60
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
          labelWidth: 40
        },

        // 第八行
        // +TODO: 增加补寄详情
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
              text: '付款方式',
              dataIndex: 'adsder'
            },
            {
              text: '编号',
              dataIndex: 'asdder2'
            },
            {
              text: '付款日期',
              dataIndex: 'asdder2'
            },
            {
              text: '付款金额',
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
            // 点击后跳转到补寄界面
            {
              text: '补寄',
              dataIndex: 'asdder2'
            },
            {
              text: '状态',
              dataIndex: 'asdder2'
            }
          ]
        },

        {
          xtype: "panel",
          layout: "hbox",
          defaultType: "button",
          border: 0,
          margin: "20 0 0 0",
          items: [{
            text: "<span class=\"key\">A</span> 增加"
          }, {
            text: "<span class=\"key\">M</span> 修改",
            margin: "0 0 0 10"
          }, {
            text: "<span class=\"key\">D</span> 删除",
            margin: "0 0 0 10"
          }]
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

    var bujiDetail = Ext.create("Ext.window.Window", {
      title: "补寄详情",
      width: 700,
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
          xtype: "grid",
          margin: "20 0 0 0",
          store: Ext.data.StoreManager.lookup('memberList'),
          columns: [
          {
            text: '序号',
            dataIndex: 'id1'
          },
          {
            text: '补寄日期',
            dataIndex: 'iid1'
          },
          {
            text: '寄送方式',
            dataIndex: 'bnum1'
          },
          {
            text: '包裹单号',
            dataIndex: 'bnum1'
          },
          {
            text: '邮资',
            dataIndex: 'bnum1'
          },
          {
            text: '重量',
            dataIndex: 'bnum1'
          },
          {
            text: '备注',
            dataIndex: 'bnum1'
          }
          ]
        },
        {
          xtype: "panel",
          layout: 'hbox',
          bodyPadding: 5,
          border: 0,
          defaultType: 'button',
          items: [{
            text: "修改"
          }, {
            text: "保存",
            margin: "0 0 0 10"
          }]
        }
      ]
    });

    /** 
     * +TODO 增加按钮：
     *    A增加
     *    M修改
     *    D删除
     */
    add.show();
    bujiDetail.show();
  }
});