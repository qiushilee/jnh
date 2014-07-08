Ext.application({
  name: "JNH",
  launch: function() {
    // 库存表
    Ext.create('Ext.data.Store', {
      storeId: 'kucun',
      fields: ['addDate', "averageCost", 'bagShape', 'foreignCurrency', 'id', 'isBelowInventory', 'name', 'number', 'price', 'productCode', "purchasePrice", "receiptId", "remark", "safetyStock", "specification", "status", "weight", "companyCode", "address"],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.product.list,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    // 进货单
    Ext.create('Ext.data.Store', {
      storeId: 'receipt',
      fields: ['id', "receiptCode", 'receiptDate', 'purchaseAmount', "remark"],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.receipt.list,
        reader: {
          type: 'json',
          root: 'list'
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
      activeItem: 0,
      items: [{
        itemId: "product",
        title: '库存表',
        padding: 15,
        items: [{
          xtype: "form",
          border: 0,
          layout: "column",
          url: env.services.web + env.api.product.list,
          items: [{
            xtype: "textfield",
            labelWidth: 30,
            name: "productCode",
            fieldLabel: "货号"
          }, {
            xtype: "button",
            margin: "0 0 15 10",
            text: "搜索",
            handler: function() {
              var form = this.ownerCt.getForm();
              if (form.isValid()) {
                form.submit({
                  failure: function(form, action) {
                    Ext.data.StoreManager.lookup('kucun').loadData(action.result.list);
                  }
                });
              }
            }
          }]
        }, {
          itemId: "productList",
          xtype: "grid",
          title: '库存表',
          store: Ext.data.StoreManager.lookup('kucun'),
          columns: [{
            text: '序号',
            dataIndex: 'id',
            flex: 1
          }, {
            text: '货号',
            dataIndex: 'productCode',
            flex: 1
          }, {
            text: '品名',
            dataIndex: 'name',
          }, {
            text: '进价',
            dataIndex: 'purchasePrice',
            flex: 1
          }, {
            text: '售价',
            dataIndex: 'price',
            flex: 1
          }, {
            text: '调整前累进量',
            dataIndex: '',
            flex: 2
          }, {
            text: '调整后累进量',
            dataIndex: '',
            flex: 2
          }, {
            text: '调整前出货数',
            dataIndex: '',
            flex: 2
          }, {
            text: '调整后出货数',
            dataIndex: '',
            flex: 2
          }, {
            text: '库存数',
            dataIndex: 'number',
            flex: 1
          }, {
            text: '包装形式',
            dataIndex: 'bagShape',
            flex: 1
          }, {
            text: '重量',
            dataIndex: 'weight',
            flex: 1
          }, {
            text: '调整基数',
            dataIndex: '',
            flex: 1
          }, {
            text: '进货说明',
            dataIndex: 'remark',
          }, {
            text: '商品说明',
            dataIndex: '',
          }, {
            text: '厂商编号',
            dataIndex: 'companyCode',
          }, {
            text: '厂商地址',
            dataIndex: 'address',
          }, {
            text: '缺货提示',
            dataIndex: '',
          }],
          listeners: {
            itemdblclick: function( that, record, item, index, e, eOpts) {
              product.show();
              window.updateForm(product.getComponent("form").getForm(), record.data);
            }
          }
        }, {
          xtype: "button",
          text: "<span class=\"key\">A</span> 增加",
          margin: "20 0 0 0",
          scale: "medium",
          handler: function() {
            product.getComponent("form").getForm().reset();
            product.show();
          }
        }, {
          xtype: "button",
          text: "<span class=\"key\">I</span> 导入",
          margin: "20 0 0 20",
          disabled: true,
          scale: "medium"
        }, {
          xtype: "button",
          text: "进货单",
          margin: "20 0 0 20",
          scale: "medium",
          handler: function() {
            //厂商ID
            var productId = panel.getComponent("product").getComponent("productList").getSelectionModel().getSelection()[0].data.id;
            Ext.Ajax.request({
              url: env.services.web + env.api.receipt.list,
              params: {
                companyId: productId
              },
              success: function(resp) {
                var data = Ext.JSON.decode(resp.responseText);
                Ext.data.StoreManager.lookup('receipt').loadData(data.list);
                receipt.show();
              }
            });
          }
        }]
      }, {
        title: '进转损',
        padding: 15,
        items: [{
          xtype: "form",
          border: 0,
          layout: "column",
          items: [{
            xtype: "textfield",
            labelWidth: 30,
            fieldLabel: "货号"
          }, {
            xtype: "textfield",
            labelWidth: 30,
            fieldLabel: "编号",
            margin: "0 0 0 10",
          }, {
            xtype: "button",
            margin: "0 0 0 10",
            text: "搜索"
          }, {
            xtype: "button",
            margin: "0 0 15 5",
            text: "重置"
          }]
        }, {
          xtype: "grid",
          title: '进转损',
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
        }, {
          xtype: "button",
          text: "<span class=\"key\">A</span> 增加",
          margin: "20 0 0 0",
          scale: "medium"
        }]
      }, {
        title: '出货明细',
        padding: 15,
        items: [{
          xtype: "form",
          border: 0,
          layout: "column",
          items: [{
            xtype: "textfield",
            labelWidth: 60,
            fieldLabel: "货号定位"
          }, {
            xtype: "button",
            margin: "0 0 0 10",
            text: "搜索"
          }, {
            xtype: "button",
            margin: "0 0 15 5",
            text: "重置"
          }]
        }, {
          xtype: "grid",
          title: '出货明细',
          store: Ext.data.StoreManager.lookup('jzs'),
          columns: [{
            text: '序号',
            dataIndex: 'id'
          }, {
            text: '出货单号',
            dataIndex: 'iid',
            flex: 1
          }, {
            text: '调整前数量',
            dataIndex: 'bnum'
          }, {
            text: '调整后数量',
            dataIndex: 'bnum'
          }, {
            text: '状态',
            dataIndex: 'bnum1',
            flex: 1
          }]
        }]
      }]
    });

    var product = new Ext.create("Ext.window.Window", {
      title: "库存详情",
      width: 400,
      layout: 'vbox',
      bodyPadding: 5,
      closeAction: 'hide',
      fieldDefaults: {
        labelAlign: 'top'
      },
      bodyStyle: {
        background: "#fff"
      },
      items: [{
        itemId: "form",
        xtype: "form",
        border: 0,
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
          name: "companyCode",
          disabled: true,
          labelAlign: "right"
        }, {
          fieldLabel: "厂商地址",
          labelWidth: 60,
          width: 300,
          disabled: true,
          name: "address",
          labelAlign: "right"
        }, {
          fieldLabel: "货号",
          labelWidth: 60,
          width: 300,
          disabled: true,
          name: "productCode",
          labelAlign: "right"
        }, {
          fieldLabel: '品名',
          labelWidth: 60,
          width: 300,
          name: "name",
          labelAlign: "right"
        }, {
          fieldLabel: '进价',
          labelWidth: 60,
          width: 300,
          name: "purchasePrice",
          labelAlign: "right"
        }, {
          fieldLabel: '包装形式',
          labelWidth: 60,
          width: 300,
          labelAlign: "right",
          name: 'bagShape',
        }, {
          fieldLabel: '重量',
          labelWidth: 60,
          width: 300,
          name: "weight",
          labelAlign: "right"
        }, {
          fieldLabel: '进货说明',
          labelWidth: 60,
          width: 300,
          name: "remark",
          labelAlign: "right"
        }, {
          fieldLabel: '售价',
          labelWidth: 60,
          width: 300,
          name: "price",
          labelAlign: "right"
        }, {
          fieldLabel: '商品说明',
          labelWidth: 60,
          width: 300,
          labelAlign: "right"
        }, {
          fieldLabel: '调整基数',
          labelWidth: 60,
          width: 300,
          labelAlign: "right"
        }, {
          fieldLabel: '缺货提示',
          labelWidth: 60,
          width: 300,
          labelAlign: "right"
        }, {
          xtype: "hiddenfield",
          name: "id",
        }, {
          xtype:'panel',
          layout: "hbox",
          border: 0,
          margin: "0 0 0 53",
          items: [{
            xtype:'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">S</span> 保存",
            handler: function() {
              var form = this.up("form").getForm();
              form.url = env.services.web + env.api.product.change;
              form.submit({
                success: function(form, action) {
                  Ext.Msg.alert("修改库存", action.result.msg, function() {
                    product.hide();
                  });
                },
                failure: function(form, action) {
                  Ext.Msg.alert("修改库存", action.result.msg);
                }
              });
            }
          }, {
            xtype:'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">E</span> 返回",
            handler: function() {
              product.hide();
            }
          }, {
            xtype:'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">A</span> 增加",
            handler: function() {
              var form = this.up("form").getForm();
              form.url = env.services.web + env.api.product.create;
              form.submit({
                success: function(form, action) {
                  Ext.Msg.alert("新增库存", action.result.msg, function() {
                    product.hide();
                  });
                },
                failure: function(form, action) {
                  Ext.Msg.alert("新增库存", action.result.msg);
                }
              });
            }
          }]
        }]
      }]
    });

    var receipt = new Ext.create("Ext.window.Window", {
      title: "进货单详情",
      width: 600,
      layout: 'column',
      bodyPadding: 5,
      closeAction: 'hide',
      fieldDefaults: {
        labelAlign: 'top'
      },
      bodyStyle: {
        background: "#fff"
      },
      items: [{
        itemId: "inputPanel",
        xtype: "panel",
        border: 0,
        columnWidth: 0.5,
        items: [{
          xtype: "form",
          url: env.services.web + env.api.receipt.list,
          border: 0,
          defaultType: 'textfield',
          columnWidth: 0.5,
          items: [{
            fieldLabel: "进货编号搜索",
            labelAlign: "right",
            labelWidth: 80,
            name: 'receiptCode'
          }],
          defaults: {
            listeners : {
              specialkey : function(field, e) {
                if (e.getKey() == Ext.EventObject.ENTER) {
                  var form = this.up('form').getForm();
                  form.submit({
                    failure: function(form, action) {
                      Ext.data.StoreManager.lookup('receipt').loadData(action.result.list);
                    }
                  });
                }
              }
            }
          }
        }, {
          itemId: "desc",
          xtype: "form",
          url: env.services.web + env.api.receipt.list,
          border: 0,
          defaultType: 'textfield',
          columnWidth: 0.5,
          items: [{
            fieldLabel: "进货编号",
            labelAlign: "right",
            labelWidth: 80,
            name: 'receiptCode'
          }, {
            fieldLabel: "进货金额",
            labelAlign: "right",
            labelWidth: 80,
            name: 'purchaseAmount'
          }, {
            xtype: "datefield",
            fieldLabel: "日期",
            labelAlign: "right",
            labelWidth: 80,
            name: 'receiptDate'
          }, {
            xtype: "textareafield",
            fieldLabel: "备注",
            labelAlign: "right",
            labelWidth: 80,
            name: 'remark'
          }, {
            xtype:'panel',
            layout: "hbox",
            border: 0,
            margin: "10 0",
            items: [{
              xtype:'button',
              text: "<span class=\"key\">B</span> 增加",
              margin: "0 0 0 15"
            }, {
              xtype:'button',
              text: "<span class=\"key\">N</span> 修改",
              margin: "0 0 0 5"
            }, {
              xtype:'button',
              text: "<span class=\"key\">E</span> 删除",
              margin: "0 0 0 5"
            }]
          }, {
            xtype:'panel',
            layout: "hbox",
            border: 0,
            margin: "10 0",
            items: [{
              xtype:'button',
              text: "<span class=\"key\">I</span> 保存",
              margin: "0 0 0 15"
            }, {
              xtype:'button',
              text: "进货单",
              margin: "0 0 0 5"
            }]
          }]
        }]
      }, {
        xtype: "grid",
        title: '进货单简表',
        store: Ext.data.StoreManager.lookup('receipt'),
        columnWidth: 0.5,
        columns: [{
          text: '序号',
          dataIndex: 'id'
        }, {
          text: '进货编号',
          dataIndex: 'receiptCode'
        }, {
          text: '进货日期',
          dataIndex: 'receiptDate'
        }, {
          text: '进货金额',
          dataIndex: 'purchaseAmount',
          flex: 1
        }],
        listeners: {
          itemdblclick: function( that, record, item, index, e, eOpts) {
            window.updateForm(this.ownerCt.getComponent("inputPanel").getComponent("desc").getForm(), record.data);
          }
        }
      }]
    });
    
    var addJzs = new Ext.create("Ext.window.Window", {
      title: "进转损详情",
      width: 300,
      layout: 'form',
      bodyPadding: "5 50 5 0",
      defaultType: 'textfield',
      closeAction: 'hide',
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

    var addJHD = new Ext.create("Ext.window.Window", {
      title: "详情",
      width: 800,
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
          fieldLabel: "期数",
          labelAlign: "right",
          labelWidth: 40,
          width: 120
        }, {
          xtype: "combobox",
          fieldLabel: "类型",
          labelAlign: "right",
          labelWidth: 40,
          width: 120
        }, {
          xtype:'button',
          margin: "0 10",
          text: "编号"
        }, {
          fieldLabel: "",
          width: 170,
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
          fieldLabel: "货号",
          labelWidth: 40,
          width: 200,
          labelAlign: "right"
        }, {
          fieldLabel: "数量",
          labelWidth: 40,
          width: 100,
          labelAlign: "right"
        }, {
          fieldLabel: "进价",
          labelWidth: 40,
          width: 100,
          labelAlign: "right"
        }, {
          fieldLabel: "备注",
          labelWidth: 40,
          labelAlign: "right"
        }]
      }, {
        xtype: "grid",
        store: Ext.data.StoreManager.lookup('kucun'),
        margin: "10 0 0 0",
        columns: [{
          text: '序号',
          dataIndex: 'id1'
        }, {
          text: '货号',
          dataIndex: 'id1'
        }, {
          text: '品名',
          dataIndex: 'man1',
          flex: 1
        }, {
          text: '数量',
          dataIndex: 'adder1'
        }, {
          text: '单价',
          dataIndex: 'adder1'
        }, {
          text: '金额',
          dataIndex: 'adder1'
        }, {
          text: '包装形式',
          dataIndex: 'adder1'
        }, {
          text: '备注',
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
        items: [
          {
            xtype: "button",
            text: "<span class=\"key\">M</span> 修改",
            margin: "0 0 0 20"
          },
          {
            xtype: "button",
            text: "<span class=\"key\">S</span> 保存",
            margin: "0 0 0 10"
          },
          {
            xtype: "button",
            text: "<span class=\"key\">D</span> 删除",
            margin: "0 0 0 10"
          }]
        }]
    });

    // add.show();
    // addJzs.show();
    // addJHD.show();
  }
});