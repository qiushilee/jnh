Ext.application({
  name: "JNH",
  launch: function() {
    // 库存表
    Ext.create('Ext.data.Store', {
      storeId: 'kucun',
      fields: ['id', "iid", 'name', 'price', 'price2', 'num', 'num2', 'num3', 'num4', 'style', "desc", "num5", "text"],
      layout: "fit",
      data: {
        'items': [{
          'id': '1',
          "iid": '55088',
          "name": "人民邮电出版社",
          "price": 30,
          "price2": 50,
          "num": 100,
          "num2": 80,
          "num3": 90,
          "num4": 100,
          "style": "箱包",
          "desc": "这是商品的简要说明",
          "num5": 5,
          "text": "这是商品的备注信息"
        }, {
          'id': '2',
          "iid": '55088',
          "name": "人民邮电出版社",
          "price": 30,
          "price2": 50,
          "num": 100,
          "num2": 80,
          "num3": 90,
          "num4": 100,
          "style": "箱包",
          "desc": "这是商品的简要说明",
          "num5": 5,
          "text": "这是商品的备注信息"
        }, {
          'id': '3',
          "iid": '55088',
          "name": "人民邮电出版社",
          "price": 30,
          "price2": 50,
          "num": 100,
          "num2": 80,
          "num3": 90,
          "num4": 100,
          "style": "箱包",
          "desc": "这是商品的简要说明",
          "num5": 5,
          "text": "这是商品的备注信息"
        }, {
          'id': '4',
          "iid": '55088',
          "name": "人民邮电出版社",
          "price": 30,
          "price2": 50,
          "num": 100,
          "num2": 80,
          "num3": 90,
          "num4": 100,
          "style": "箱包",
          "desc": "这是商品的简要说明",
          "num5": 5,
          "text": "这是商品的备注信息"
        }, {
          'id': '5',
          "iid": '55088',
          "name": "人民邮电出版社",
          "price": 30,
          "price2": 50,
          "num": 100,
          "num2": 80,
          "num3": 90,
          "num4": 100,
          "style": "箱包",
          "desc": "这是商品的简要说明",
          "num5": 5,
          "text": "这是商品的备注信息"
        }, {
          'id': '6',
          "iid": '55088',
          "name": "人民邮电出版社",
          "price": 30,
          "price2": 50,
          "num": 100,
          "num2": 80,
          "num3": 90,
          "num4": 100,
          "style": "箱包",
          "desc": "这是商品的简要说明",
          "num5": 5,
          "text": "这是商品的备注信息"
        }, {
          'id': '7',
          "iid": '55088',
          "name": "人民邮电出版社",
          "price": 30,
          "price2": 50,
          "num": 100,
          "num2": 80,
          "num3": 90,
          "num4": 100,
          "style": "箱包",
          "desc": "这是商品的简要说明",
          "num5": 5,
          "text": "这是商品的备注信息"
        }, {
          'id': '8',
          "iid": '55088',
          "name": "人民邮电出版社",
          "price": 30,
          "price2": 50,
          "num": 100,
          "num2": 80,
          "num3": 90,
          "num4": 100,
          "style": "箱包",
          "desc": "这是商品的简要说明",
          "num5": 5,
          "text": "这是商品的备注信息"
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

    // 进转损
    Ext.create('Ext.data.Store', {
      storeId: 'jzs',
      fields: ['id', 'iid', 'anum', 'bnum', "category"],
      layout: "fit",
      data: {
        'items': [{
          'id': '1',
          "category": "进货单",
          "iid": "54001",
          "anum": "2014/04/24",
          "bnum": "30"
        }, {
          'id': '2',
          "category": "进货单",
          "iid": "54001",
          "anum": "2014/04/24",
          "bnum": "30"
        }, {
          'id': '3',
          "category": "进货单",
          "iid": "54001",
          "anum": "2014/04/24",
          "bnum": "30"
        }, {
          'id': '4',
          "category": "进货单",
          "iid": "54001",
          "anum": "2014/04/24",
          "bnum": "30"
        }, {
          'id': '5',
          "category": "损坏表",
          "iid": "54001",
          "anum": "2014/04/24",
          "bnum": "30"
        }, {
          'id': '6',
          "iid": "54001",
          "category": "损坏表",
          "anum": "2014/04/24",
          "bnum": "30"
        }, {
          'id': '7',
          "iid": "54001",
          "anum": "2014/04/24",
          "category": "损坏表",
          "bnum": "30"
        }, {
          'id': '8',
          "iid": "54001",
          "anum": "2014/04/24",
          "bnum": "30",
          "category": "损坏表"
        }, {
          'id': '9',
          "iid": "54001",
          "category": "抵价券",
          "anum": "2014/04/24",
          "bnum": "30"
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

    var panel = Ext.create('Ext.tab.Panel', {
      renderTo: document.body,
      layout: "fit",
      activeItem: 2,
      items: [{
        title: '库存表',
        padding: 15,
        items: [{
          xtype: "grid",
          title: '库存表',
          store: Ext.data.StoreManager.lookup('kucun'),
          margin: "40 0 0 0",
          columns: [{
            text: '序号',
            dataIndex: 'id',
            flex: 1
          }, {
            text: '货号',
            dataIndex: 'iid',
            flex: 1
          }, {
            text: '品名',
            dataIndex: 'name',
          }, {
            text: '进价',
            dataIndex: 'price',
            flex: 1
          }, {
            text: '售价',
            dataIndex: 'price2',
            flex: 1
          }, {
            text: '累进量调整前',
            dataIndex: 'num',
            flex: 1
          }, {
            text: '累进量调整后',
            dataIndex: 'num',
            flex: 1
          }, {
            text: '出货数调整前',
            dataIndex: 'num2',
            flex: 1
          }, {
            text: '出货数调整后',
            dataIndex: 'num3',
            flex: 1
          }, {
            text: '库存数',
            dataIndex: 'num3',
            flex: 1
          }, {
            text: '包装形式',
            dataIndex: 'style',
            flex: 1
          }, {
            text: '重量',
            dataIndex: 'num3',
            flex: 1
          }, {
            text: '调整基数',
            dataIndex: 'num5',
            flex: 1
          }, {
            text: '进货说明',
            dataIndex: 'desc',
          }, {
            text: '商品说明',
            dataIndex: 'text',
          }, {
            text: '厂商编号',
            dataIndex: 'text',
          }, {
            text: '厂商地址',
            dataIndex: 'text',
          }]
        }]
      }, {
        title: '进转损',
        padding: 15,
        items: [{
          xtype: "grid",
          title: '进转损',
          margin: "40 0 0 0",
          store: Ext.data.StoreManager.lookup('jzs'),
          columns: [{
            text: '类型',
            dataIndex: 'category'
          }, {
            text: '编号',
            dataIndex: 'iid'
          }, {
            text: '日期',
            dataIndex: 'anum'
          }, {
            text: '数量',
            dataIndex: 'bnum',
            flex: 1
          }]
        }]
      }, {
        title: '出货明细',
        padding: 15,
        items: [{
          xtype: "grid",
          title: '出货明细',
          margin: "40 0 0 0",
          store: Ext.data.StoreManager.lookup('jzs'),
          columns: [{
            text: '序号',
            dataIndex: 'id'
          }, {
            text: '出货单号',
            dataIndex: 'iid'
          }, {
            text: '调整前数量',
            dataIndex: 'bnum'
          }, {
            text: '调整后数量',
            dataIndex: 'bnum',
            flex: 1
          }]
        }]
      }]
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
        text: "<span class=\"key\">I</span> 导入",
        margin: "0 0 0 20",
        scale: "medium"
      }]
    });

    var add = new Ext.create("Ext.window.Window", {
      title: "库存详情",
      width: 400,
      layout: 'form',
      bodyPadding: 5,
      defaultType: 'textfield',
      fieldDefaults: {
        labelAlign: 'top'
      },
      bodyStyle: {
        background: "#fff"
      },
      items: [{
          fieldLabel: "编号",
          labelAlign: "right",
          name: 'first',
          width: 30,
          allowBlank:false
        }, {
          fieldLabel: '品名',
          labelAlign: "right",
          name: 'company'
        }, {
          fieldLabel: '进价',
          labelAlign: "right",
          name: 'company'
        }, {
          fieldLabel: '包装形式',
          labelAlign: "right",
          name: 'email',
        }, {
          fieldLabel: '重量',
          labelAlign: "right",
          name: 'dob',
        }, {
          fieldLabel: '进货说明',
          labelAlign: "right",
          name: 'age',
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
    
    var addJzs = new Ext.create("Ext.window.Window", {
      title: "进转损详情",
      width: 300,
      layout: 'form',
      bodyPadding: "5 50 5 0",
      defaultType: 'textfield',
      fieldDefaults: {
        labelAlign: 'top'
      },
      bodyStyle: {
        background: "#fff"
      },
      items: [{
          fieldLabel: "类型",
          labelAlign: "right",
          name: 'first',
          xtype: "combobox",
          allowBlank:false
        }, {
          fieldLabel: '货号定位',
          labelAlign: "right",
          name: 'company'
        }, {
          fieldLabel: '日期',
          labelAlign: "right",
          name: 'company',
          xtype: "datefield"
        }, {
          fieldLabel: '数量',
          labelAlign: "right",
          name: 'email',
        }, {
          xtype:'panel',
          layout: "column",
          border: 0,
          margin: "10 0",
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

    // panel.hide();
    // button.hide();
    // add.show();
    addJzs.show();
  }
});