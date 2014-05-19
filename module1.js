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
          'id': '55008',
          "name": "人民邮电出版社",
          "adder": "浙江省杭州市西湖区",
          "man": "李先生",
          "phone1": "13112128372",
          "phone2": "15912128372",
          "fax": "057184200712",
          "qq": "389210372",
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

    Ext.create('Ext.data.Store', {
      storeId: 'jhStore',
      fields: ['id', 'name', 'adder', 'man'],
      layout: "fit",
      data: {
        'items': [{
          'id': '54001',
          "name": "进货单",
          "adder": "14/01/01",
          "man": "500"
        }, {
          'id': '54002',
          "name": "转换表",
          "adder": "14/01/01",
          "man": "500"
        }, {
          'id': '54003',
          "name": "损坏表",
          "adder": "14/01/01",
          "man": "500"
        }, {
          'id': '54004',
          "name": "进货单",
          "adder": "14/01/01",
          "man": "500"
        }, {
          'id': '54005',
          "name": "转换表",
          "adder": "14/01/01",
          "man": "500"
        }, {
          'id': '54006',
          "name": "损坏表",
          "adder": "14/01/01",
          "man": "500"
        }, {
          'id': '54007',
          "name": "进货单",
          "adder": "14/01/01",
          "man": "500"
        }, {
          'id': '54008',
          "name": "转换表",
          "adder": "14/01/01",
          "man": "500"
        }, {
          'id': '54009',
          "name": "损坏表",
          "adder": "14/01/01",
          "man": "500"
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
      margin: "10 0",
      renderTo: document.body,
      border: 0,
      items: [{
        fieldLabel: "期数",
        labelWidth: 40,
        width: 120,
        labelAlign: "right"
      }, {
        fieldLabel: "厂商编号",
        labelWidth: 60,
        labelAlign: "right"
      }, {
        fieldLabel: "~",
        labelWidth: 20,
        labelAlign: "right"
      }, {
        fieldLabel: "地址",
        labelWidth: 40,
        labelAlign: "right"
      }, {
        fieldLabel: "货号",
        labelWidth: 40,
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
    
    // 厂商管理列表
    var cs = Ext.create('Ext.grid.Panel', {
      title: '厂商管理列表',
      store: Ext.data.StoreManager.lookup('simpsonsStore'),
      selModel:Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE"}),
      columns: [{
        text: '厂商编号',
        dataIndex: 'id'
      }, {
        text: '地址',
        dataIndex: 'adder',
        flex: 1
      }, {
        text: '联系人',
        dataIndex: 'man',
        flex: 1
      }, {
        text: '电话1',
        dataIndex: 'phone1',
        flex: 1
      }, {
        text: '电话2',
        dataIndex: 'phone2',
        flex: 1
      }, {
        text: 'qq',
        dataIndex: 'qq',
        flex: 1
      }],
      renderTo: Ext.getBody()
    });

    Ext.create("Ext.Panel", {
      layout: "hbox",
      border: 0,
      defaultType: 'textfield',
      margin: "10 0 0 0",
      renderTo: Ext.getBody(),
      items: [{
        xtype: "button",
        text: "<span class=\"key\">A</span> 增加"
      }, {
        xtype: "button",
        text: "导入",
        margin: "0 0 0 10"
      }, {
        xtype: "button",
        text: "打印",
        margin: "0 0 0 10"
      }, {
        xtype: "button",
        text: "复制",
        margin: "0 0 0 10"
      }]
    });
    
    // // 进货单
    // Ext.create('Ext.grid.Panel', {
    //   title: '进货单',
    //   store: Ext.data.StoreManager.lookup('simpsonsStore'),
    //   columns: [{
    //     text: '类型',
    //     dataIndex: 'name'
    //   }, {
    //     text: '编号',
    //     dataIndex: 'id'
    //   }, {
    //     text: '日期',
    //     dataIndex: 'adder'
    //   }, {
    //     text: '金额',
    //     dataIndex: 'man',
    //     flex: 1
    //   }],
    //   renderTo: Ext.getBody()
    // });

    var win = new Ext.create("Ext.window.Window", {
      title: "厂商详情",
      layout: "column",
      width: 800,
      height: 500,
      items: [{
        xtype: "panel",
        columnWidth: 0.41,
        title: "厂商输入页面",
        layout: 'vbox',
        width: 500,
        bodyPadding: 5,
        defaultType: 'textfield',
        items: [{
          xtype: "combobox",
          fieldLabel: "期数",
          labelWidth: 60,
          width: 300,
          labelAlign: "right"
        }, {
           fieldLabel: "厂商编号",
           labelWidth: 60,
           width: 300,
           labelAlign: "right"
         },{
          fieldLabel: '地址',
          labelWidth: 60,
          width: 300,
          labelAlign: "right",
        }, {
          fieldLabel: '联系人',
          labelWidth: 60,
          width: 300,
          labelAlign: "right"
        }, {
          fieldLabel: '电话1',
          labelWidth: 60,
          width: 300,
          labelAlign: "right"
        }, {
          fieldLabel: '电话2',
          labelWidth: 60,
          width: 300,
          labelAlign: "right"
        }, {
          fieldLabel: '产品类别',
          labelWidth: 60,
          width: 300,
          labelAlign: "right",
        }, {
          fieldLabel: "qq",
          labelWidth: 60,
          width: 300,
          labelAlign: "right"
        }, {
          fieldLabel: "网址",
          labelWidth: 60,
          width: 300,
          labelAlign: "right"
        }, {
          fieldLabel: "开户行",
          labelWidth: 60,
          width: 300,
          labelAlign: "right"
        }, {
          fieldLabel: "账号",
          labelWidth: 60,
          width: 300,
          labelAlign: "right"
        }, {
          xtype: "textarea",
          fieldLabel: "备注",
          labelWidth: 60,
          width: 300,
          height: 100,
          labelAlign: "right"
        }, {
          xtype:'panel',
          layout: "hbox",
          border: 0,
          margin: "0 0 0 53",
          items: [{
            xtype:'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">S</span> 保存"
          }, {
            xtype:'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">E</span> 返回"
          }, {
            xtype:'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">A</span> 增加"
          }]
        }]
        },
        {
          xtype: "panel",
          columnWidth: 0.59,
          bodyPadding: 10,
          border: 0,
          items: [{
            xtype: "combobox",
            fieldLabel: "类型",
            labelWidth: 40,
            margin: "10"
          }, {
            xtype: "grid",
            title: '进转损',
            store: Ext.data.StoreManager.lookup('jhStore'),
            columns: [{
              text: '类型',
              dataIndex: 'name'
            }, {
              text: '流水号',
              dataIndex: 'id'
            }, {
              text: '日期',
              dataIndex: 'adder'
            }, {
              text: '金额',
              dataIndex: 'man',
              flex: 1
            }]
          }]
        },
      ]
    });
    
    // cs.hide();
    win.show();
  }
});