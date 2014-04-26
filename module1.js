Ext.application({
  name: "JNH",
  launch: function() {
    // 按钮
    // Ext.create('Ext.Button', {
    //   text: "<span class=\"key\">M</span> 修改",
    //   scale: "medium",
    //   renderTo: Ext.getBody(),
    //   handler: function() {
    //     alert('You clicked the button!');
    //   }
    // });
    // Ext.create('Ext.tab.Panel', {
    //   // width: 400,
    //   // height: 400,
    //   renderTo: document.body,
    //   layout: "fit",
    //   items: [{
    //     title: '厂商管理'
    //   }, {
    //     title: '进货',
    //     tabConfig: {
    //       title: '进货',
    //       tooltip: 'A button tooltip'
    //     }
    //   }]
    // });

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
    
    // 厂商管理列表
    var cs = Ext.create('Ext.grid.Panel', {
      title: '厂商管理列表',
      store: Ext.data.StoreManager.lookup('simpsonsStore'),
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

    // Ext.create('Ext.Panel', {
    //   width: 300,
    //   // height: 300,
    //   // layout: "fit",
    //   title: "厂商输入页面",
    //   layout: 'form',
    //   renderTo: Ext.getBody(),
    //   bodyPadding: 5,
    //   defaultType: 'textfield',
    //   fieldDefaults: {
    //     labelAlign: 'top'
    //   },
    //   items: [{
    //    fieldLabel: "厂商编号",
    //    name: 'first',
    //    width: 30,
    //    allowBlank:false
    //  },{
    //   fieldLabel: "名称",
    //   width: 40,
    //   name: 'last'
    // }, {
    //   fieldLabel: '地址',
    //   name: 'company'
    // }, {
    //   fieldLabel: '联系人',
    //   name: 'company'
    // }, {
    //   fieldLabel: '产品类别',
    //   name: 'email',
    //   vtype:'email'
    // }, {
    //   fieldLabel: '邮编',
    //   name: 'email',
    //   vtype:'email'
    // }, {
    //   fieldLabel: '电话1',
    //   name: 'dob',
    // }, {
    //   fieldLabel: '电话2',
    //   name: 'age',
    // }, {
    //   xtype: 'timefield',
    //   fieldLabel: '传真',
    // }, {
    //   fieldLabel: "email",
    //   width: 40,
    //   name: 'email',
    //   vtype:'email'
    // }, {
    //   fieldLabel: "qq",
    //   width: 40,
    // }, {
    //   fieldLabel: "订货所需时间",
    //   width: 40,
    //   name: 'last',
    //   xtype: 'datefield'
    // }, {
    //   fieldLabel: "付费方式",
    //   name: 'last',
    //   xtype: "combobox"
    // }, {
    //   fieldLabel: "开户行",
    //   width: 40,
    //   name: 'last'
    // }, {
    //   fieldLabel: "账号",
    //   width: 40,
    //   name: 'last'
    // }, {
    //   fieldLabel: "备注",
    //   name: 'last',
    //   xtype: "textarea"
    // }, {
    //   fieldLabel: "名称",
    //   width: 40,
    //   name: 'last'
    // }, {
    //   xtype:'button',
    //   scale: "medium",
    //   text: "保存"
    // }, {
    //   xtype:'button',
    //   scale: "medium",
    //   text: "取消"
    // }]
    // });

    // 进货单
    // var states = Ext.create('Ext.data.Store', {
    //   fields: ['abbr', 'name'],
    //   data : [
    //   {"abbr":"AL", "name":"类型"},
    //   {"abbr":"AK", "name":"Alaska"},
    //   {"abbr":"AZ", "name":"Arizona"}
    //     //...
    //     ]
    //   });
    // Ext.create('Ext.form.ComboBox', {
    //   fieldLabel: "类型",
    //   store: states,
    //   queryMode: "local",
    //   displayField: "name",
    //   valueFiled: "abbr",
    //   renderTo: Ext.getBody()
    // });

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
        columnWidth: 0.49,
        title: "厂商输入页面",
        layout: 'form',
        width: 500,
        bodyPadding: 5,
        defaultType: 'textfield',
        fieldDefaults: {
          labelAlign: 'top'
        },
        items: [{
           fieldLabel: "厂商编号",
           labelAlign: "right",
           name: 'first',
           width: 30,
           allowBlank:false
         },{
          fieldLabel: '地址',
          labelAlign: "right",
          name: 'company'
        }, {
          fieldLabel: '联系人',
          labelAlign: "right",
          name: 'company'
        }, {
          xtype: "textfield",
          fieldLabel: '产品类别',
          labelAlign: "right",
          columnWidth: 0.6,
          name: 'email',
          vtype:'email'
        }, {
          fieldLabel: '电话1',
          labelAlign: "right",
          name: 'dob',
        }, {
          fieldLabel: '电话2',
          labelAlign: "right",
          name: 'age',
        }, {
          fieldLabel: "qq",
          labelAlign: "right",
          width: 40,
        }, {
          fieldLabel: "开户行",
          labelAlign: "right",
          width: 40,
          name: 'last'
        }, {
          fieldLabel: "账号",
          labelAlign: "right",
          width: 40,
          name: 'last'
        }, {
          fieldLabel: "网址",
          labelAlign: "right",
          width: 40,
          name: 'last'
        }, {
          fieldLabel: "备注",
          labelAlign: "right",
          name: 'last',
          xtype: "textarea"
        }, {
          xtype:'panel',
          layout: "column",
          border: 0,
          items: [{
            xtype:'button',
            layout: "absolute",
            x: "30%",
            columnWidth: 0.2,
            scale: "medium",
            text: "保存"
          }, {
            xtype:'button',
            layout: "absolute",
            x: "35%",
            columnWidth: 0.2,
            scale: "medium",
            text: "返回"
          }]
        }]
        },
        {
          xtype: "grid",
          columnWidth: 0.5,
          layout: "absolute",
          x: 10,
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
        }
      ]
    });
    
    cs.hide();
    win.show();
  }
});