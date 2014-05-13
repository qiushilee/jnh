Ext.application({
  name: "JNH",
  launch: function () {
    // 厂商管理列表
    Ext.create('Ext.data.Store', {
      storeId: 'simpsonsStore',
      fields: ['id', 'name', 'adder', 'man', 'phone1', 'phone2', 'fax', 'qq', 'custom'],
      layout: "fit",
      data: {
        'items': [
          {
            'id': '55001',
            "name": "人民邮电出版社",
            "adder": "浙江省杭州市西湖区",
            "man": "李先生",
            "phone1": "13112128372",
            "phone2": "15912128372",
            "fax": "057184200712",
            "qq": "389210372",
            "custom": '<img src="' + Ext.BLANK_IMAGE_URL + '" class="x-action-col-icon x-action-col-0 buy-col">'
          },
          {
            'id': '55002',
            "name": "人民邮电出版社",
            "adder": "浙江省杭州市西湖区",
            "man": "李先生",
            "phone1": "13112128372",
            "phone2": "15912128372",
            "fax": "057184200712",
            "qq": "389210372",
            "custom": '<img src="' + Ext.BLANK_IMAGE_URL + '" class="x-action-col-icon x-action-col-0 buy-col">'
          },
          {
            'id': '55003',
            "name": "人民邮电出版社",
            "adder": "浙江省杭州市西湖区",
            "man": "李先生",
            "phone1": "13112128372",
            "phone2": "15912128372",
            "fax": "057184200712",
            "qq": "389210372",
            "custom": '<img src="' + Ext.BLANK_IMAGE_URL + '" class="x-action-col-icon x-action-col-0 buy-col">'
          },
          {
            'id': '55004',
            "name": "人民邮电出版社",
            "adder": "浙江省杭州市西湖区",
            "man": "李先生",
            "phone1": "13112128372",
            "phone2": "15912128372",
            "fax": "057184200712",
            "qq": "389210372",
            "custom": '<img src="' + Ext.BLANK_IMAGE_URL + '" class="x-action-col-icon x-action-col-0 buy-col">'
          },
          {
            'id': '55005',
            "name": "人民邮电出版社",
            "adder": "浙江省杭州市西湖区",
            "man": "李先生",
            "phone1": "13112128372",
            "phone2": "15912128372",
            "fax": "057184200712",
            "qq": "389210372",
            "custom": '<img src="' + Ext.BLANK_IMAGE_URL + '" class="x-action-col-icon x-action-col-0 buy-col">'
          },
          {
            'id': '55006',
            "name": "人民邮电出版社",
            "adder": "浙江省杭州市西湖区",
            "man": "李先生",
            "phone1": "13112128372",
            "phone2": "15912128372",
            "fax": "057184200712",
            "qq": "389210372",
            "custom": '<img src="' + Ext.BLANK_IMAGE_URL + '" class="x-action-col-icon x-action-col-0 buy-col">'
          },
          {
            'id': '55007',
            "name": "人民邮电出版社",
            "adder": "浙江省杭州市西湖区",
            "man": "李先生",
            "phone1": "13112128372",
            "phone2": "15912128372",
            "fax": "057184200712",
            "qq": "389210372",
            "custom": '<img src="' + Ext.BLANK_IMAGE_URL + '" class="x-action-col-icon x-action-col-0 buy-col">'
          },
          {
            'id': '合计',
            "name": "人民邮电出版社",
            "adder": "浙江省杭州市西湖区",
            "man": "李先生",
            "phone1": "13112",
            "phone2": "15912128372",
            "fax": "057184200712",
            "qq": "3892",
            "custom": '<img src="' + Ext.BLANK_IMAGE_URL + '" class="x-action-col-icon x-action-col-0 buy-col">'
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
          labelAlign: "right"
        },
        {
          fieldLabel: "会员姓名",
          labelAlign: "right"
        },
        {
          fieldLabel: "会员编号",
          labelAlign: "right"
        },
        {
          fieldLabel: "出货单编号",
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

    var list = Ext.create('Ext.Panel', {
      layout: "column",
      border: 0,
      renderTo: Ext.getBody(),
      margin: "30 0",
      items: [
        {
          xtype: "panel",
          border: 0,
          columnWidth: 0.5,
          items: [
            {
              xtype: 'panel',
              layout: "hbox",
              border: 0,
              defaultType: 'textfield',
              items: [
                {
                  disabled: true,
                  fieldLabel: "出货单编号",
                  width: 220,
                  labelAlign: "right"
                },
                {
                  xtype: "label",
                  text: "(10期)"
                } ,
                {
                  fieldLabel: "会员编号",
                  labelAlign: "right"
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
                  xtype: "textfield",
                  margin: "10 0 0 0",
                  fieldLabel: "会员姓名",
                  labelAlign: "right"
                },
                {
                  xtype: 'textfield',
                  fieldLabel: "应收金额",
                  margin: "10 0 0 0",
                  labelAlign: "right"
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
                  fieldLabel: "销货合计",
                  labelAlign: "right"
                },
                {
                  fieldLabel: "已收汇款",
                  labelAlign: "right"
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
                  fieldLabel: "不打折金额",
                  labelAlign: "right"
                },
                {
                  fieldLabel: "抵价券",
                  labelAlign: "right"
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
                  fieldLabel: "折扣",
                  labelAlign: "right"
                },
                {
                  fieldLabel: "多付金额",
                  labelAlign: "right"
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
                  fieldLabel: "邮资",
                  labelAlign: "right"
                }
              ]
            },
            {
              xtype: "grid",
              store: Ext.data.StoreManager.lookup('simpsonsStore'),
              margin: "20 0 0 0",
              columns: [
                {
                  text: '出货单号',
                  dataIndex: 'id',
                  flex: 1
                },
                {
                  text: '汇款编号',
                  dataIndex: 'qq',
                  flex: 1
                },
                {
                  text: '汇款人',
                  dataIndex: 'qq'
                },
                {
                  text: '汇款额',
                  dataIndex: 'qq',
                  flex: 1
                }
              ]
            },
            {
              xtype: 'panel',
              layout: "hbox",
              border: 0,
              defaultType: 'textfield',
              margin: "10 0 0 0",
              /* items: [{
               xtype: "button",
               text: "<span class=\"key\">N</span> 修改"
               }, {
               xtype: "button",
               text: "<span class=\"key\">T</span> 保存",
               margin: "0 0 0 20"
               }, {
               xtype: "button",
               text: "<span class=\"key\">C</span> 重打",
               margin: "0 0 0 20"
               }]*/
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
              layout: "hbox",
              border: 0, items: [

              {
                xtype: "textfield",
                fieldLabel: "货号",
                labelWidth: 30,
                width: 100,
                labelAlign: "right",
                margin: "0 10 0 20"
              },
              {
                xtype: "button",
                text: "搜索",
                float: "right"
              }
            ]
            },
            {
              xtype: 'panel',
              bodyPadding: 5,
              margin: "10 0 0 0",
              items: [
                {
                  xtype: 'panel',
                  layout: "hbox",
                  border: 0,
                  defaultType: 'textfield',
                  margin: "10 0 0 0",
                  items: [
                    {
                      fieldLabel: "货号",
                      labelWidth: 30,
                      width: 100,
                      labelAlign: "right"
                    },
                    {
                      fieldLabel: "数量",
                      labelWidth: 50,
                      width: 120,
                      labelAlign: "right"
                    },
                    {
                      xtype: "combobox",
                      fieldLabel: "备注",
                      labelWidth: 50,
                      width: 300,
                      labelAlign: "right"
                    }
                  ]
                },
                {
                  xtype: "grid",
                  store: Ext.data.StoreManager.lookup('simpsonsStore'),
                  margin: "10 0 0 0",
                  columns: [
                    {
                      text: '序号',
                      dataIndex: 'id'
                    },
                    {
                      text: '货号',
                      dataIndex: 'adder1',
                      flex: 1
                    },
                    {
                      text: '品名',
                      dataIndex: 'man1',
                      flex: 1
                    },
                    {
                      text: '数量',
                      dataIndex: 'phone1',
                      flex: 1
                    },
                    {
                      text: '售价',
                      dataIndex: 'phone21',
                      flex: 1
                    },
                    {
                      text: '金额',
                      dataIndex: 'qq',
                      flex: 1
                    },
                    {
                      text: '备注',
                      dataIndex: 'qq1',
                      flex: 1
                    },
                    {
                      text: '重量',
                      dataIndex: 'qq1',
                      flex: 1
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
                      xtype: "button",
                      text: "连续打印"
                    },
                    {
                      xtype: "button",
                      text: "<span class=\"key\">A</span> 增加",
                      margin: "0 0 0 10"
                    },
                    {
                      xtype: "button",
                      text: "<span class=\"key\">D</span> 删除",
                      margin: "0 0 0 10"
                    },
                    {
                      xtype: "button",
                      text: "<span class=\"key\">M</span> 修改",
                      margin: "0 0 0 10"
                    },
                    {
                      xtype: "button",
                      text: "<span class=\"key\">S</span> 保存",
                      margin: "0 0 0 10"
                    },
                    {
                      xtype: "button",
                      text: "<span class=\"key\">H</span> 预览",
                      margin: "0 0 0 10"
                    },
                    {
                      xtype: "button",
                      text: "<span class=\"key\">R</span> 重打",
                      margin: "0 0 0 10"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    });

    var add = new Ext.create("Ext.window.Window", {
      title: "商品详情",
      width: 300,
      layout: 'form',
      bodyPadding: 10,
      defaultType: 'textfield',
      items: [
        {
          fieldLabel: '序号',
          labelAlign: "right",
          disabled: true,
          labelWidth: 35
        },
        {
          fieldLabel: '货号',
          labelAlign: "right",
          labelWidth: 35
        },
        {
          fieldLabel: '品名',
          labelAlign: "right",
          labelWidth: 35
        },
        {
          fieldLabel: '数量',
          labelAlign: "right",
          labelWidth: 35
        },
        {
          fieldLabel: '售价',
          labelAlign: "right",
          labelWidth: 35
        },
        {
          fieldLabel: '金额',
          labelAlign: "right",
          labelWidth: 35
        },
        {
          fieldLabel: '重量',
          labelAlign: "right",
          labelWidth: 35
        },
        {
          xtype: "textareafield",
          fieldLabel: '备注',
          labelAlign: "right",
          labelWidth: 35
        },
        {
          xtype: 'panel',
          layout: "column",
          border: 0,
          bodyStyle: {
            background: 'transparent'
          },
          items: [
            {
              xtype: 'button',
              layout: "absolute",
              x: "30%",
              text: "保存"
            },
            {
              xtype: 'button',
              layout: "absolute",
              x: "35%",
              text: "返回"
            }
          ]
        }
      ]
    });

    var print = new Ext.create("Ext.window.Window", {
      title: "打印",
      width: 600,
      bodyPadding: 10,
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
            {
              fieldLabel: "出货单号",
              labelAlign: "right",
              labelWidth: 52
            },
            {
              fieldLabel: ""
            },
            {
              xtype: "button",
              text: "搜索",
              margin: "0 0 0 20"
            },
            {
              xtype: "button",
              text: "重置",
              margin: "0 0 0 10"
            }
          ]
        },
        {
          xtype: "grid",
          store: Ext.data.StoreManager.lookup('simpsonsStore'),
          margin: "10 0 0 0",
          selModel: Ext.create('Ext.selection.CheckboxModel', {mode: "SIMPLE"}),
          columns: [
            {
              text: '出货单号',
              dataIndex: 'id1'
            },
            {
              text: '姓名',
              dataIndex: 'adder1'
            },
            {
              text: '地址',
              dataIndex: 'man1',
              flex: 1
            }
          ]
        },
        {
          layout: "hbox",
          bodyPadding: 10,
          border: 0,
          defaultType: 'textfield',
          width: 230,
          style: {
            float: "right"
          },
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [
            {
              xtype: "button",
              text: "查询",
              margin: "0 0 0 20"
            },
            {
              xtype: "button",
              text: "名单打印",
              margin: "0 0 0 10"
            },
            {
              xtype: "button",
              text: "明细打印",
              margin: "0 0 0 10"
            }
          ]
        }
      ]
    });

    // search.hide();
    //list.hide();
    //add.show();
    // print.show();
  }
});