Ext.application({
  name: "JNH",
  launch: function () {

    // 库存表&进货单——商品详情
    Ext.create('Ext.data.Store', {
      storeId: 'product',
      fields: ['addDate', "averageCost", 'bagShape', 'foreignCurrency', 'id', 'isBelowInventory', 'name', 'number', 'price', 'productCode', "purchasePrice", "receiptId", "safetyStock", "specification", "status", "weight", "cardinalNumber", "content", "companyCode", "address", "companyId"],
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

    //进货单
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

    // 进货单——商品详情
    Ext.create('Ext.data.Store', {
      storeId: 'jhdProduct',
      fields: ['bagShape', 'id', 'name', 'number', 'productCode', "remark"],
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

    // 进转损
    Ext.create('Ext.data.Store', {
      storeId: 'transitionLoss',
      fields: ['id', 'typeName', 'receiptCode', 'receiptDate', "number","remark"],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.product.transitionLoss,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    //出货明细
    Ext.create('Ext.data.Store', {
      storeId: 'shipmentDetails',
      fields: ['id', 'deliveryOrderCode', 'tzqnumber', 'tzhnumber', 'status'],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.product.shipmentDetails,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    //库存表列表
    var productlist = Ext.create('Ext.tab.Panel', {
      renderTo: document.body,
      layout: "fit",
      activeItem: 0,
      items: [
        {
          itemId: "product",
          title: '库存表',
          padding: 15,
          items: [
            {
              xtype: "form",
              border: 0,
              layout: "column",
              url: env.services.web + env.api.product.list,
              items: [
                {
                  xtype: "textfield",
                  labelWidth: 30,
                  name: "productCode",
                  fieldLabel: "货号"
                },
                {
                  xtype: "button",
                  margin: "0 0 15 10",
                  text: "搜索",
                  handler: function () {
                    var form = this.ownerCt.getForm();
                    form.submit({
                      success: function(form, action) {
                        Ext.data.StoreManager.lookup('product').loadData(action.result.list);
                      },
                      failure: function (form, action) {
                        Ext.Msg.alert("搜索", action.result.msg);
                      }
                    });
                  }
                }
              ]
            },
            {
              itemId: "productList",
              xtype: "grid",
              title: '库存表',
              store: Ext.data.StoreManager.lookup('product'),
              columns: [
                {
                  text: '序号',
                  dataIndex: 'id',
                  flex: 1
                },
                {
                  text: '货号',
                  dataIndex: 'productCode',
                  flex: 1
                },
                {
                  text: '品名',
                  dataIndex: 'name',
                },
                {
                  text: '进价',
                  dataIndex: 'purchasePrice',
                  flex: 1
                },
                {
                  text: '售价',
                  dataIndex: 'price',
                  flex: 1
                },
                {
                  text: '调整前累进量',
                  dataIndex: '',
                  flex: 2
                },
                {
                  text: '调整后累进量',
                  dataIndex: '',
                  flex: 2
                },
                {
                  text: '调整前出货数',
                  dataIndex: '',
                  flex: 2
                },
                {
                  text: '调整后出货数',
                  dataIndex: '',
                  flex: 2
                },
                {
                  text: '库存数',
                  dataIndex: 'number',
                  flex: 1
                },
                {
                  text: '包装形式',
                  dataIndex: 'bagShape',
                  flex: 1
                },
                {
                  text: '重量',
                  dataIndex: 'weight',
                  flex: 1
                },
                {
                  text: '调整基数',
                  dataIndex: 'cardinalNumber',
                  flex: 1
                },
                {
                  text: '商品说明',
                  dataIndex: 'content',
                },
                {
                  text: '厂商编号',
                  dataIndex: 'companyCode',
                },
                {
                  text: '厂商地址',
                  dataIndex: 'address',
                }
              ],
              listeners: {
                itemdblclick: function (that, record, item, index, e, eOpts) {
                  productEdit.show();
                  window.updateForm(productEdit.getComponent("form").getForm(), record.data);
                }
              }
            },
            {
              xtype: "button",
              text: "<span class=\"key\">A</span> 增加",
              margin: "20 0 0 0",
              scale: "medium",
              handler: function () {
                productAdd.getComponent("form").getForm().reset();
                productAdd.show();
              }
            },
            {
              xtype: "button",
              text: "<span class=\"key\">I</span> 导入",
              margin: "20 0 0 20",
              disabled: true,
              scale: "medium"
            },
            {
              xtype: "button",
              text: "进货单",
              margin: "20 0 0 20",
              scale: "medium",
              handler: function () {
                try {
                  //厂商ID
                  var _companyId = productlist.getComponent("product").getComponent("productList").getSelectionModel().getSelection()[0].data.companyId;
                  receipt.getComponent("inputPanel").getComponent("desc").getForm().findField("companyId").setValue(_companyId);
                  Ext.Ajax.request({
                    url: env.services.web + env.api.receipt.list,
                    params: {
                      companyId: _companyId
                    },
                    success: function (resp) {
                      var data = Ext.JSON.decode(resp.responseText);
                      Ext.data.StoreManager.lookup('receipt').loadData(data.list);
                      receipt.show();
                    }
                  });
                } catch (e) {
                  Ext.Msg.alert("查看进货单", "请单击库存表中的一项后再查看进货单");
                }
              }
            }
          ]
        },
        {
          title: '进转损',
          padding: 15,
          items: [
            {
              xtype: "form",
              border: 0,
              url: env.services.web + env.api.product.transitionLoss,
              layout: "column",
              items: [
                {
                  xtype: "textfield",
                  labelWidth: 30,
                  fieldLabel: "货号",
                  name: "productCode"
                },
                {
                  xtype: "textfield",
                  labelWidth: 30,
                  fieldLabel: "编号",
                  margin: "0 0 0 10",
                  name: "receiptCode"
                },
                {
                  xtype: "button",
                  margin: "0 0 0 10",
                  text: "搜索",
                  handler: function () {
                    var form = this.ownerCt.getForm();
                    form.submit({
                      success: function(form, action) {
                        Ext.data.StoreManager.lookup('product').loadData(action.result.list);
                      },
                      failure: function (form, action) {
                        Ext.Msg.alert("搜索", action.result.msg);
                      }
                    });
                  }
                },
                {
                  xtype: "button",
                  margin: "0 0 15 5",
                  text: "重置"
                }
              ]
            },
            {
              xtype: "grid",
              title: '进转损',
              store: Ext.data.StoreManager.lookup('transitionLoss'),
              columns: [
                {
                  text: '类型',
                  dataIndex: 'typeName'
                },
                {
                  text: '编号',
                  dataIndex: 'receiptCode'
                },
                {
                  text: '日期',
                  dataIndex: 'receiptDate'
                },
                {
                  text: '数量',
                  dataIndex: 'number',
                  flex: 1
                },
                {
                  text: '备注',
                  dataIndex: 'remark',
                  flex: 1
                }
              ],
              listeners: {
                itemdblclick: function (that, record, item, index, e, eOpts) {
                  var form = addJzs.getComponent("form").getForm();
                  addJzs.show();
                  window.updateForm(form, record.data);
                  form.url = env.services.web + env.api.product.changeTransitionLoss;
                }
              }
            },
            {
              xtype: "button",
              text: "<span class=\"key\">A</span> 增加",
              margin: "20 0 0 0",
              scale: "medium",
              handler: function () {
                addJzs.getComponent("form").getForm().reset();
                addJzs.show();
              }
            }
          ]
        },
        {
          title: '出货明细',
          padding: 15,
          items: [
            {
              xtype: "form",
              border: 0,
              url: env.services.web + env.api.product.shipmentDetails,
              layout: "column",
              items: [
                {
                  xtype: "textfield",
                  labelWidth: 60,
                  fieldLabel: "货号定位",
                  name: "productCode"
                },
                {
                  xtype: "button",
                  margin: "0 0 0 10",
                  text: "搜索",
                  handler: function () {
                    var form = this.ownerCt.getForm();
                    form.submit({
                      success: function(form, action) {
                        Ext.data.StoreManager.lookup('product').loadData(action.result.list);
                      },
                      failure: function (form, action) {
                        Ext.Msg.alert("搜索", action.result.msg);
                      }
                    });
                  }
                },
                {
                  xtype: "button",
                  margin: "0 0 15 5",
                  text: "重置"
                }
              ]
            },
            {
              xtype: "grid",
              title: '出货明细',
              store: Ext.data.StoreManager.lookup('shipmentDetails'),
              columns: [
                {
                  text: '序号',
                  dataIndex: 'id'
                },
                {
                  text: '出货单号',
                  dataIndex: 'deliveryOrderCode',
                  flex: 1
                },
                {
                  text: '调整前数量',
                  dataIndex: 'tzqnumber'
                },
                {
                  text: '调整后数量',
                  dataIndex: 'tzhnumber'
                },
                {
                  text: '状态',
                  dataIndex: 'status',
                  flex: 1
                }
              ]
            }
          ]
        }
      ]
    });

    //编辑查看
    var productEdit = new Ext.create("Ext.window.Window", {
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
      items: [
        {
          itemId: "form",
          xtype: "form",
          border: 0,
          defaultType: 'textfield',
          items: [Ext.create("periodical"), {
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
            fieldLabel: '售价',
            labelWidth: 60,
            width: 300,
            name: "price",
            labelAlign: "right"
          }, {
            fieldLabel: '商品说明',
            labelWidth: 60,
            width: 300,
            name: "content",
            labelAlign: "right"
          }, {
            fieldLabel: '调整基数',
            labelWidth: 60,
            width: 300,
            name: "cardinalNumber",
            labelAlign: "right"
          }, {
            fieldLabel: '安全库存量',
            labelWidth: 60,
            width: 300,
            name: 'safetyStock',
            labelAlign: "right"
          }, {
            xtype: "hiddenfield",
            name: "id",
          }, {
            xtype: 'panel',
            layout: "hbox",
            border: 0,
            margin: "0 0 0 53",
            items: [
              {
                xtype: 'button',
                margin: "0 0 0 10",
                text: "<span class=\"key\">S</span> 保存",
                handler: function () {
                  var form = this.up("form").getForm();
                  form.url = env.services.web + env.api.product.change;
                  form.submit({
                    success: function (form, action) {
                      Ext.Msg.alert("修改库存", action.result.msg, function () {
                        productEdit.hide();
                      });
                    },
                    failure: function (form, action) {
                      Ext.Msg.alert("修改库存", action.result.msg);
                    }
                  });
                }
              },
              {
                xtype: 'button',
                margin: "0 0 0 10",
                text: "<span class=\"key\">E</span> 返回",
                handler: function () {
                  productEdit.hide();
                }
              }
            ]
          }]
        }
      ]
    });

    //新增
    var productAdd = new Ext.create("Ext.window.Window", {
      title: "新增库存",
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
      items: [
        {
          itemId: "form",
          xtype: "form",
          border: 0,
          defaultType: 'textfield',
          items: [Ext.create("periodical"), {
            fieldLabel: "厂商编号",
            labelWidth: 60,
            width: 300,
            name: "companyCode",
            labelAlign: "right"
          }, {
            fieldLabel: "货号",
            labelWidth: 60,
            width: 300,
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
            name: "content",
            labelAlign: "right"
          }, {
            fieldLabel: '调整基数',
            labelWidth: 60,
            width: 300,
            name: "cardinalNumber",
            labelAlign: "right"
          }, {
            fieldLabel: '安全库存量',
            labelWidth: 60,
            width: 300,
            name: 'safetyStock',
            labelAlign: "right"
          }, {
            xtype: 'panel',
            layout: "hbox",
            border: 0,
            margin: "0 0 0 53",
            items: [
              {
                xtype: 'button',
                margin: "0 0 0 10",
                text: "<span class=\"key\">A</span> 增加",
                handler: function () {
                  var form = this.up("form").getForm();
                  form.url = env.services.web + env.api.product.add;
                  form.submit({
                    success: function (form, action) {
                      Ext.Msg.alert("新增库存", action.result.msg, function () {
                        productAdd.hide();
                      });
                    },
                    failure: function (form, action) {
                      Ext.Msg.alert("新增库存", action.result.msg);
                    }
                  });
                }
              },
              {
                xtype: 'button',
                margin: "0 0 0 10",
                text: "<span class=\"key\">E</span> 返回",
                handler: function () {
                  productAdd.hide();
                }
              }
            ]
          }]
        }
      ]
    });

    //进货单详情
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
      items: [
        {
          itemId: "inputPanel",
          xtype: "panel",
          border: 0,
          columnWidth: 0.5,
          items: [
            {
              xtype: "form",
              url: env.services.web + env.api.receipt.searchReceiptByCode,
              border: 0,
              defaultType: 'textfield',
              columnWidth: 0.5,
              items: [
                {
                  fieldLabel: "进货编号搜索",
                  labelAlign: "right",
                  labelWidth: 80,
                  name: 'receiptCode'
                }
              ],
              defaults: {
                listeners: {
                  specialkey: function (field, e) {
                    if (e.getKey() == Ext.EventObject.ENTER) {
                      var form = this.up('form').getForm();
                      form.submit({
                        failure: function (form, action) {
                          Ext.data.StoreManager.lookup('receipt').loadData(action.result.list);
                        }
                      });
                    }
                  }
                }
              }
            },
            {
              itemId: "desc",
              xtype: "form",
              url: env.services.web + env.api.receipt.list,
              border: 0,
              defaultType: 'textfield',
              columnWidth: 0.5,
              items: [
                {
                  fieldLabel: "进货编号",
                  labelAlign: "right",
                  labelWidth: 80,
                  disabled: true,
                  name: 'receiptCode'
                },
                {
                  fieldLabel: "进货金额",
                  labelAlign: "right",
                  labelWidth: 80,
                  name: 'purchaseAmount'
                },
                {
                  xtype: "datefield",
                  fieldLabel: "日期",
                  labelAlign: "right",
                  labelWidth: 80,
                  name: 'receiptDate'
                },
                {
                  xtype: "textareafield",
                  fieldLabel: "备注",
                  labelAlign: "right",
                  labelWidth: 80,
                  name: 'remark'
                },
                {
                  xtype: "hiddenfield",
                  name: "id"
                },
                {
                  xtype: "hiddenfield",
                  name: "companyId"
                },
                {
                  xtype: 'panel',
                  layout: "hbox",
                  border: 0,
                  margin: "10 0",
                  items: [
                    {
                      xtype: 'button',
                      text: "<span class=\"key\">B</span> 增加",
                      margin: "0 0 0 15",
                      handler: function () {
                        var form = this.up("form").getForm();
                        form.url = env.services.web + env.api.receipt.add;
                        form.submit({
                          success: function (form, action) {
                            Ext.Msg.alert("增加进货单", action.result.msg);
                          },
                          failure: function (form, action) {
                            Ext.Msg.alert("增加进货单", action.result.msg);
                          }
                        });
                      }
                    },
                    {
                      xtype: 'button',
                      text: "<span class=\"key\">N</span> 修改",
                      margin: "0 0 0 5",
                      handler: function () {
                        var form = this.up("form").getForm();
                        form.url = env.services.web + env.api.receipt.change;
                        form.submit({
                          success: function (form, action) {
                            Ext.Msg.alert("修改进货单", action.result.msg);
                          },
                          failure: function (form, action) {
                            Ext.Msg.alert("修改进货单", action.result.msg);
                          }
                        });
                      }
                    },
                    {
                      xtype: 'button',
                      text: "<span class=\"key\">E</span> 删除",
                      margin: "0 0 0 5",
                      handler: function () {
                        var form = this.up("form").getForm();
                        form.url = env.services.web + env.api.receipt.del;
                        form.submit({
                          success: function (form, action) {
                            Ext.Msg.alert("删除进货单", action.result.msg);
                          },
                          failure: function (form, action) {
                            Ext.Msg.alert("删除进货单", action.result.msg);
                          }
                        });
                      }
                    }
                  ]
                },
                {
                  xtype: 'panel',
                  layout: "hbox",
                  border: 0,
                  margin: "10 0",
                  items: [
                    {
                      xtype: 'button',
                      text: "进货单",
                      margin: "0 0 0 15",
                      handler: function () {
                        var form = this.up("form").getForm(),
                          receiptId = form.findField("id").value;

                        Ext.Ajax.request({
                          url: env.services.web + env.api.receipt.list,
                          params: {
                            receiptId: receiptId
                          },
                          success: function (resp) {
                            var data = Ext.JSON.decode(resp.responseText);
                            Ext.data.StoreManager.lookup('jhdProduct').loadData(data.list);
                            addJHD.getComponent("search").getForm().findField("receiptId").setValue(receiptId);
                            addJHD.show();
                          }
                        });
                      }
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          xtype: "grid",
          title: '进货单简表',
          store: Ext.data.StoreManager.lookup('receipt'),
          columnWidth: 0.5,
          columns: [
            {
              text: '序号',
              dataIndex: 'id'
            },
            {
              text: '进货编号',
              dataIndex: 'receiptCode'
            },
            {
              text: '进货日期',
              dataIndex: 'receiptDate'
            },
            {
              text: '进货金额',
              dataIndex: 'purchaseAmount',
              flex: 1
            }
          ],
          listeners: {
            itemdblclick: function (that, record, item, index, e, eOpts) {
              window.updateForm(this.ownerCt.getComponent("inputPanel").getComponent("desc").getForm(), record.data);
            }
          }
        }
      ]
    });

    //进转损详情
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
        itemId: "form",
        xtype: "form",
        url: env.services.web + env.api.product.addTransitionLoss,
        bodyPadding: 0,
        border: 0,
        defaultType: 'textfield',
        bodyStyle: {
          "background-color": "transparent"
        },
        items: [
          Ext.create("jzsType", {
            labelWidth: 100,
            width: 200
          }),
          {
            fieldLabel: '货号定位',
            labelAlign: "right",
            name: 'company'
          },
          {
            fieldLabel: '日期',
            labelAlign: "right",
            name: 'receiptDate',
            xtype: "datefield"
          },
          {
            fieldLabel: '数量',
            labelAlign: "right",
            name: 'number',
          },
          {
            xtype: 'panel',
            layout: "column",
            border: 0,
            margin: "10 0",
            bodyStyle: {
              background: 'transparent'
            },
            items: [
              {
                xtype: 'button',
                layout: "absolute",
                x: "30%",
                columnWidth: 0.2,
                scale: "medium",
                text: "保存",
                handler: function () {
                  var form = this.up("form").getForm();
                  form.submit({
                    success: function (form, action) {
                      Ext.Msg.alert("增加进转损", action.result.msg);
                    },
                    failure: function (form, action) {
                      Ext.Msg.alert("增加进转损", action.result.msg);
                    }
                  });
                }
              },
              {
                xtype: 'button',
                layout: "absolute",
                x: "35%",
                columnWidth: 0.2,
                scale: "medium",
                text: "返回",
                handler: function () {
                  addJzs.hide();
                }
              }
            ]
          }
        ]
      }]
    });

    var addJHD = new Ext.create("Ext.window.Window", {
      title: "进货单商品详情",
      width: 800,
      bodyPadding: 10,
      closeAction: 'hide',
      items: [
        {
          itemId: "search",
          xtype: "form",
          layout: "hbox",
          bodyPadding: 10,
          border: 0,
          defaultType: 'textfield',
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [
            {
              xtype: "hiddenfield",
              name: "receiptId"
            },
            Ext.create('periodical'),
            Ext.create('jzsType'),
            {
              xtype: 'button',
              margin: "0 10",
              text: "编号"
            },
            {
              fieldLabel: "",
              width: 170,
              labelAlign: "right"
            }
          ]
        },
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
              fieldLabel: "货号",
              name: "productCode",
              labelWidth: 40,
              width: 200,
              labelAlign: "right"
            },
            {
              fieldLabel: "数量",
              name: "number",
              labelWidth: 40,
              width: 100,
              labelAlign: "right"
            },
            {
              fieldLabel: "进价",
              name: "purchasePrice",
              labelWidth: 40,
              width: 100,
              labelAlign: "right"
            },
            {
              fieldLabel: "备注",
              name: "remark",
              labelWidth: 40,
              labelAlign: "right"
            }
          ]
        },
        {
          xtype: "grid",
          store: Ext.data.StoreManager.lookup('jhdProduct'),
          margin: "10 0 0 0",
          columns: [
            {
              text: '序号',
              dataIndex: 'id'
            },
            {
              text: '货号',
              dataIndex: 'productCode'
            },
            {
              text: '品名',
              dataIndex: 'name',
              flex: 1
            },
            {
              text: '数量',
              dataIndex: 'number'
            },
            {
              text: '单价',
              dataIndex: ''
            },
            {
              text: '金额',
              dataIndex: ''
            },
            {
              text: '包装形式',
              dataIndex: 'bagShape'
            },
            {
              text: '备注',
              dataIndex: 'remark',
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
            }
          ]
        }
      ]
    });

    // add.show();
    // addJzs.show();
    // addJHD.show();
  }
});
