Ext.application({
  name: "JNH",
  launch: function() {
    // 厂商管理列表
    Ext.create('Ext.data.Store', {
      storeId: 'simpsonsStore',
      fields: ['id', 'name', 'adder', 'man', 'phone1', 'phone2', 'fax', 'qq', 'custom'],
      layout: "fit",
      data: {
        'items': [{
          'id': '55001',
          "name": "人民邮电出版社",
          "adder": "浙江省杭州市西湖区",
          "man": "李先生",
          "phone1": "13112128372",
          "phone2": "15912128372",
          "fax": "057184200712",
          "qq": "389210372",
          "custom": '<img src="' + Ext.BLANK_IMAGE_URL + '" class="x-action-col-icon x-action-col-0 buy-col">'
        }, {
          'id': '55002',
          "name": "人民邮电出版社",
          "adder": "浙江省杭州市西湖区",
          "man": "李先生",
          "phone1": "13112128372",
          "phone2": "15912128372",
          "fax": "057184200712",
          "qq": "389210372",
          "custom": '<img src="' + Ext.BLANK_IMAGE_URL + '" class="x-action-col-icon x-action-col-0 buy-col">'
        }, {
          'id': '55003',
          "name": "人民邮电出版社",
          "adder": "浙江省杭州市西湖区",
          "man": "李先生",
          "phone1": "13112128372",
          "phone2": "15912128372",
          "fax": "057184200712",
          "qq": "389210372",
          "custom": '<img src="' + Ext.BLANK_IMAGE_URL + '" class="x-action-col-icon x-action-col-0 buy-col">'
        }, {
          'id': '55004',
          "name": "人民邮电出版社",
          "adder": "浙江省杭州市西湖区",
          "man": "李先生",
          "phone1": "13112128372",
          "phone2": "15912128372",
          "fax": "057184200712",
          "qq": "389210372",
          "custom": '<img src="' + Ext.BLANK_IMAGE_URL + '" class="x-action-col-icon x-action-col-0 buy-col">'
        }, {
          'id': '55005',
          "name": "人民邮电出版社",
          "adder": "浙江省杭州市西湖区",
          "man": "李先生",
          "phone1": "13112128372",
          "phone2": "15912128372",
          "fax": "057184200712",
          "qq": "389210372",
          "custom": '<img src="' + Ext.BLANK_IMAGE_URL + '" class="x-action-col-icon x-action-col-0 buy-col">'
        }, {
          'id': '55006',
          "name": "人民邮电出版社",
          "adder": "浙江省杭州市西湖区",
          "man": "李先生",
          "phone1": "13112128372",
          "phone2": "15912128372",
          "fax": "057184200712",
          "qq": "389210372",
          "custom": '<img src="' + Ext.BLANK_IMAGE_URL + '" class="x-action-col-icon x-action-col-0 buy-col">'
        }, {
          'id': '55007',
          "name": "人民邮电出版社",
          "adder": "浙江省杭州市西湖区",
          "man": "李先生",
          "phone1": "13112128372",
          "phone2": "15912128372",
          "fax": "057184200712",
          "qq": "389210372",
          "custom": '<img src="' + Ext.BLANK_IMAGE_URL + '" class="x-action-col-icon x-action-col-0 buy-col">'
        }, {
          'id': '合计',
          "name": "人民邮电出版社",
          "adder": "浙江省杭州市西湖区",
          "man": "李先生",
          "phone1": "13112",
          "phone2": "15912128372",
          "fax": "057184200712",
          "qq": "3892",
          "custom": '<img src="' + Ext.BLANK_IMAGE_URL + '" class="x-action-col-icon x-action-col-0 buy-col">'
        }]
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
      margin: "10 0 0 0",
      renderTo: document.body,
      items: [{
        xtype: "combobox",
        fieldLabel: "期数",
        labelWidth: 40,
        width: 90,
        labelAlign: "right"
      }, {
        fieldLabel: "姓名",
        labelWidth: 40,
        width: 120,
        labelAlign: "right"
      }, {
        fieldLabel: "地址",
        labelWidth: 40,
        width: 120,
        labelAlign: "right"
      }, {
        fieldLabel: "电话",
        labelWidth: 40,
        width: 145,
        labelAlign: "right"
      }, {
        fieldLabel: "邮编",
        labelWidth: 40,
        width: 100,
        labelAlign: "right"
      }, {
        fieldLabel: "会员编号",
        labelWidth: 60,
        width: 140,
        labelAlign: "right"
      }, {
        fieldLabel: "来源",
        labelWidth: 40,
        width: 120,
        labelAlign: "right"
      }, {
        xtype: "button",
        text: "搜索",
        margin: "0 0 0 20"
      }, {
        xtype: "button",
        text: "重置",
        margin: "0 0 0 20"
      }]
    });

    // TODO Tab: [ "名单管理: list, list2", "管理打印", "打印购物车"]
    var list = Ext.create('Ext.Panel', {
      layout: "column",
      border: 0,
      renderTo: Ext.getBody(),
      items: [{
        xtype: "panel",
        border: 0,
        columnWidth: 0.5,
        margin: "47 0 0 0",
        items: [{
          xtype: "grid",
          store: Ext.data.StoreManager.lookup('simpsonsStore'),
          columns: [{
            text: '姓名',
            dataIndex: 'id1'
          }, {
            text: '地址',
            dataIndex: 'qq1',
            flex: 1
          }, {
            text: '地址2',
            dataIndex: 'qq1',
            flex: 1
          }, {
            text: '状态',
            dataIndex: 'qq1'
          }]
        }]
      }, {
        xtype: "panel",
        border: 0,
        columnWidth: 0.49,
        style: {
          float: "right",
        },
        items: [{
          xtype:'panel',
          layout: "hbox",
          border: 0,
        }, {
          xtype:'panel',
          bodyPadding: 5,
          margin: "10 0 0 0",
          border: 0,
          items: [{
            xtype:'panel',
            layout: "hbox",
            border: 0,
            defaultType: 'textfield',
            items: [{
              xtype: "button",
              text: "目录寄送"
            }]
          }, {
            xtype: "grid",
            store: Ext.data.StoreManager.lookup('simpsonsStore'),
            margin: "10 0 0 0",
            columns: [{
              text: '寄送日期',
              dataIndex: 'id1'
            }, {
              text: '寄送方式',
              dataIndex: 'adder1',
              flex: 1
            }, {
              text: '期数',
              dataIndex: 'man1',
              flex: 1
            }, {
              text: '索取数',
              dataIndex: 'phone11',
              flex: 1
            }, {
              text: '数量1',
              dataIndex: 'phone21',
              flex: 1
            }, {
              text: '数量2',
              dataIndex: 'qq1',
              flex: 1
            }, {
              text: '单号',
              dataIndex: 'qq1',
              flex: 1
            }, {
              text: '备注',
              dataIndex: 'qq1',
              flex: 1
            }, {
              text: '状态',
              dataIndex: 'qq1',
              flex: 1
            }]
          }]
        }]
      }]
    });

    var list2 = Ext.create('Ext.Panel', {
      layout: "column",
      border: 0,
      renderTo: Ext.getBody(),
      margin: "15 0 0 0",
      items: [{
        xtype:'panel',
        layout: "hbox",
        border: 0,
        defaultType: 'textfield',
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
      }, {
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
          xtype: 'textfield',
          fieldLabel: "索取数量",
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
        // +TODO: 增加一个按钮：增加地址
      }, {
        xtype:'panel',
        layout: "hbox",
        border: 0,
        defaultType: 'textfield',
        margin: "25 0 0 0",
        items: [{
          xtype: "button",
          text: "<span class=\"key\">A</span> 增加"
        }, {
          xtype: "button",
          text: "<span class=\"key\">N</span> 修改",
          margin: "0 0 0 20"
        }, {
          xtype: "button",
          text: "<span class=\"key\">S</span> 保存",
          margin: "0 0 0 20"
        }, {
          xtype: "button",
          text: "<span class=\"key\">Q</span> 添加",
          margin: "0 0 0 20"
        }, {
          xtype: "button",
          text: "删除",
          margin: "0 0 0 20"
        }, {
          xtype: "button",
          text: "打印",
          margin: "0 0 0 20"
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
          fieldLabel: "参考期数",
          labelWidth: 60,
          width: 110,
          labelAlign: "right"
        }, {
          fieldLabel: "~",
          labelWidth: 20,
          width: 70,
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
        store: Ext.data.StoreManager.lookup('simpsonsStore'),
        margin: "10 0 0 0",
        selModel:Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE"}),
        columns: [{
          text: '序号',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '流水号',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '姓名',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '地址',
          dataIndex: 'id1',
          flex: 2
        }, {
          text: '索取数',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '寄出数量1',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '寄出数量2',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '期数',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '寄出日',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '重量',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '邮资',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '包裹单号',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '备注',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '购买金额',
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
        width: "56%",
        style: {
          float: "right"
        },
        bodyStyle: {
          "background-color": "transparent"
        },
        items: [{
          xtype: "button",
          text: "批量修改",
          margin: "0 0 0 20"
        }, {
          xtype: "button",
          text: "包裹单号扫描",
          margin: "0 0 0 10"
        }, {
          xtype: "button",
          text: "<span class=\"key\">N</span> 修改",
          margin: "0 0 0 10"
        }, {
          xtype: "button",
          text: "<span class=\"key\">W</span> 保存",
          margin: "0 0 0 10"
        }, {
          xtype: "button",
          text: "面单打印",
          margin: "0 0 0 10"
        }, {
          xtype: "button",
          text: "块状打印",
          margin: "0 0 0 10"
        }, {
          xtype: "button",
          text: "条状打印",
          margin: "0 0 0 10"
        }]
      }]
    });

    var print = new Ext.create("Ext.window.Window", {
      title: "管理打印",
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
          fieldLabel: "来源",
          labelWidth: 40,
          width: 100,
          labelAlign: "right"
        }, {
          xtype: "combobox",
          fieldLabel: "类型",
          labelWidth: 40,
          width: 100,
          labelAlign: "right"
        }, {
          xtype: "combobox",
          fieldLabel: "状态",
          labelWidth: 40,
          width: 100,
          labelAlign: "right"
        }, {
          fieldLabel: "期数",
          labelWidth: 40,
          width: 110,
          labelAlign: "right"
        }, {
          fieldLabel: "到",
          labelWidth: 20,
          width: 90,
          labelAlign: "right"
        }]
      }, {
        layout: "hbox",
        bodyPadding: 10,
        border: 0,
        defaultType: 'textfield',
        bodyStyle: {
          "background-color": "transparent"
        },
        items: [{
          fieldLabel: "姓名",
          labelWidth: 40,
          width: 120,
          labelAlign: "right"
        }, {
          fieldLabel: "会员编号",
          labelWidth: 60,
          width: 140,
          labelAlign: "right"
        }, {
          xtype: "datefield",
          fieldLabel: "加入时间",
          labelWidth: 60,
          width: 180,
          format: "Y-m-d H",
          labelAlign: "right"
        }, {
          xtype: "datefield",
          fieldLabel: "~",
          labelWidth: 20,
          width: 140,
          format: "Y-m-d H",
          labelAlign: "right"
        }]
      }, {
        layout: "hbox",
        bodyPadding: 10,
        border: 0,
        defaultType: 'textfield',
        bodyStyle: {
          "background-color": "transparent"
        },
        items: [{
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
        store: Ext.data.StoreManager.lookup('simpsonsStore'),
        margin: "10 0 0 0",
        selModel:Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE"}),
        columns: [{
          text: '序号',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '姓名',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '地址',
          dataIndex: 'id1',
          flex: 2
        }, {
          text: '邮编',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '电话',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '寄送方式',
          dataIndex: 'id1',
          flex: 1
        }]
      }, {
        layout: "hbox",
        bodyPadding: 10,
        border: 0,
        defaultType: 'textfield',
        bodyStyle: {
          "background-color": "transparent"
        },
        items: [{
          xtype: "button",
          text: "<span class=\"key\">Q</span> 添加打印",
          margin: "0 0 0 10"
        }]
      }]
    });

    // search.hide();
    // list.hide();
    // list2.hide();
    printCart.show();
    print.show();
  }
});