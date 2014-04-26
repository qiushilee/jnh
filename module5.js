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
          'id': '总数',
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
      margin: "10 0",
      renderTo: document.body,
      items: [{
        fieldLabel: "会员编号",
        labelAlign: "right"
      }, {
        fieldLabel: "姓名",
        labelAlign: "right"
      }, {
        fieldLabel: "单号",
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

    var list = Ext.create('Ext.Panel', {
      layout: "column",
      border: 0,
      renderTo: Ext.getBody(),
      margin: "30 0",
      items: [{
        xtype: "panel",
        border: 0,
        columnWidth: 0.5,
        items: [{
          xtype:'panel',
          layout: "hbox",
          border: 0,
          defaultType: 'textfield',
          items: [{
            fieldLabel: "寄送方式",
            labelAlign: "right"
          }, {
            fieldLabel: "青春贴",
            labelAlign: "right"
          }]
        }, {
          xtype:'panel',
          layout: "hbox",
          border: 0,
          defaultType: 'textfield',
          margin: "10 0 0 0",
          items: [{
            fieldLabel: "姓名",
            labelAlign: "right"
          }, {
            fieldLabel: "收件人",
            labelAlign: "right"
          }]
        }, {
          xtype: 'textfield',
          fieldLabel: "地址",
          width: 470,
          margin: "10 0 0 0",
          labelAlign: "right"
        }, {
          xtype:'panel',
          layout: "hbox",
          border: 0,
          defaultType: 'textfield',
          margin: "10 0 0 0",
          items: [{
            fieldLabel: "邮编",
            labelAlign: "right"
          }, {
            fieldLabel: "电话",
            labelAlign: "right"
          }]
        }, {
          xtype: 'textfield',
          fieldLabel: "备注",
          margin: "10 0 0 0",
          width: 470,
          labelAlign: "right"
        }, {
          xtype: "grid",
          store: Ext.data.StoreManager.lookup('simpsonsStore'),
          margin: "20 0 0 0",
          columns: [{
            text: '出货单号',
            dataIndex: 'id',
            flex: 1
          }, {
            text: '抵价券',
            dataIndex: 'qq',
            flex: 1
          }, {
            text: '不打折抵价券',
            dataIndex: 'qq'
          }, {
            text: '青春贴',
            dataIndex: 'qq',
            flex: 1
          }, {
            text: '寄送方式',
            dataIndex: 'qq1',
            flex: 1
          }, {
            text: '邮资',
            dataIndex: 'qq',
            flex: 1
          }, {
            text: '应付款',
            dataIndex: 'qq',
            flex: 1
          }]
        }, {
          xtype:'panel',
          layout: "hbox",
          border: 0,
          defaultType: 'textfield',
          margin: "20 0 0 0",
          items: [{
            xtype: "button",
            text: "<span class=\"key\">Q</span> 增加"
          }, {
            xtype: "button",
            text: "<span class=\"key\">N</span> 修改",
            margin: "0 0 0 20"
          }, {
            xtype: "button",
            text: "<span class=\"key\">W</span> 保存",
            margin: "0 0 0 20"
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
          items: [{
            xtype: "button",
            text: "出货单号"
          }, {
            xtype: "textfield",
            fieldLabel: "货号",
            labelWidth : 30,
            width: 100,
            labelAlign: "right",
            margin: "0 0 0 20"
          }]
        }, {
          xtype:'panel',
          bodyPadding: 5,
          margin: "10 0 0 0",
          items: [{
            xtype:'panel',
            layout: "hbox",
            border: 0,
            defaultType: 'textfield',
            margin: "10 0 0 0",
            items: [{
              fieldLabel: "货号",
              labelWidth : 30,
              width: 100,
              labelAlign: "right"
            }, {
              fieldLabel: "数量",
              labelWidth : 50,
              width: 120,
              labelAlign: "right"
            }, {
              fieldLabel: "备注",
              labelWidth : 50,
              width: 120,
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
            columns: [{
              text: '序号',
              dataIndex: 'id'
            }, {
              text: '货号',
              dataIndex: 'adder1',
              flex: 1
            }, {
              text: '品名',
              dataIndex: 'man1',
              flex: 1
            }, {
              text: '数量',
              dataIndex: 'phone1',
              flex: 1
            }, {
              text: '单价',
              dataIndex: 'phone21',
              flex: 1
            }, {
              text: '金额',
              dataIndex: 'qq',
              flex: 1
            }, {
              text: '备注',
              dataIndex: 'qq1',
              flex: 1
            }]
          }, {
            xtype:'panel',
            layout: "hbox",
            border: 0,
            defaultType: 'textfield',
            margin: "10 0 0 0",
            items: [{
              xtype: "button",
              text: "<span class=\"key\">A</span> 增加"
            }, {
              xtype: "button",
              text: "<span class=\"key\">D</span> 删除",
              margin: "0 0 0 10"
            }, {
              xtype: "button",
              text: "<span class=\"key\">M</span> 修改",
              margin: "0 0 0 10"
            }, {
              xtype: "button",
              text: "<span class=\"key\">S</span> 保存",
              margin: "0 0 0 10"
            }, {
              xtype: "button",
              text: "<span class=\"key\">H</span> 预览",
              margin: "0 0 0 10"
            }, {
              xtype: "button",
              text: "<span class=\"key\">R</span> 打印",
              margin: "0 0 0 10"
            }]
          }]
        }]
      }]
    });

    var add1 = new Ext.create("Ext.window.Window", {
      title: "出货详情",
      width: 300,
      layout: 'form',
      bodyPadding: 10,
      defaultType: 'textfield',
      items: [{
        fieldLabel: "出货单号",
        labelAlign: "right",
        labelWidth: 80
      }, {
        fieldLabel: '抵价券',
        labelAlign: "right",
        labelWidth: 80
      }, {
        fieldLabel: '不打折抵价券',
        labelAlign: "right",
        labelWidth: 80
      }, {
        fieldLabel: '青春贴',
        labelAlign: "right",
        labelWidth: 80
      }, {
        fieldLabel: '邮资',
        labelAlign: "right",
        labelWidth: 80
      }, {
        fieldLabel: '应付款',
        labelAlign: "right",
        labelWidth: 80
      }, {
        fieldLabel: '寄送方式',
        labelAlign: "right",
        labelWidth: 80
      }, {
        xtype:'panel',
        layout: "column",
        border: 0,
        bodyStyle: {
          background:'transparent'
        },
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
    });

    var add2 = new Ext.create("Ext.window.Window", {
      title: "商品详情",
      width: 300,
      layout: 'form',
      bodyPadding: 10,
      defaultType: 'textfield',
      items: [{
        fieldLabel: "序号",
        labelAlign: "right",
        labelWidth: 35
      }, {
        fieldLabel: '货号',
        labelAlign: "right",
        labelWidth: 35
      }, {
        fieldLabel: '品名',
        labelAlign: "right",
        labelWidth: 35
      }, {
        fieldLabel: '数量',
        labelAlign: "right",
        labelWidth: 35
      }, {
        fieldLabel: '单价',
        labelAlign: "right",
        labelWidth: 35
      }, {
        fieldLabel: '金额',
        labelAlign: "right",
        labelWidth: 35
      }, {
        xtype: "textareafield",
        fieldLabel: '备注',
        labelAlign: "right",
        labelWidth: 35
      }, {
        xtype:'panel',
        layout: "column",
        border: 0,
        bodyStyle: {
          background:'transparent'
        },
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
    });

    var print = new Ext.create("Ext.window.Window", {
      title: "打印",
      width: 600,
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
          labelWidth: 52
        }, {
          fieldLabel: ""
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
          text: '出货单号',
          dataIndex: 'id1'
        }, {
          text: '姓名',
          dataIndex: 'adder1'
        }, {
          text: '地址',
          dataIndex: 'man1',
          flex: 1
        }]
      }, {
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
        items: [{
          xtype: "button",
          text: "查询",
          margin: "0 0 0 20"
        }, {
          xtype: "button",
          text: "名单打印",
          margin: "0 0 0 10"
        }, {
          xtype: "button",
          text: "明细打印",
          margin: "0 0 0 10"
        }]
      }]
    });
    
    // search.hide();
    // list.hide();
    // add1.show();
    // print.show();
  }
});