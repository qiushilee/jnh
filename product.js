Ext.require([
  "Ext.data.*",
  "Ext.ux.grid.Printer"
]);

Ext.application({
  name: "JNH",
  launch: function () {

    // 库存表
    Ext.create('Ext.data.Store', {
      storeId: 'product',
      fields: ["key", 'addDate', "averageCost", 'bagShape', 'foreignCurrency', 'id', 'isBelowInventory', 'name', 'number', 'price', 'productCode', "purchasePrice", "receiptId", "safetyStock", "specification", "status", "weight", "cardinalNumber", "content", "companyCode", "address", "companyId"],
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
      fields: ["key", 'id', "receiptCode", 'receiptDate', 'purchaseAmount', "remark"],
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
      fields: ["weight", "amount", "price", "key", 'bagShape', 'id', 'name', 'number', 'productCode', "remark", "receiptCode", "type"],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.productrecord.viewProductRecord,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    // 进转损
    Ext.create('Ext.data.Store', {
      storeId: 'transitionLoss',
      fields: ["key", 'id', 'typeName', 'receiptCode', 'receiptDate', "number", "remark", "type"],
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
      fields: ["key", 'id', 'deliveryOrderCode', 'tzqnumber', 'tzhnumber', 'status'],
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
      renderTo: window.$bd,
      layout: "fit",
      activeItem: 0,
      items: [
        {
          itemId: "product",
          title: '库存表',
          padding: 15,
          items: [
            {
              itemId: "search-bar",
              xtype: "form",
              border: 0,
              layout: "column",
              url: env.services.web + env.api.product.list,
              items: [
                Ext.create("periodical", {
                  itemId: "product-periodical",
                  title: '库存表期数'
                }),
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
                    searchHandler.call(this, "product");
                  }
                }
              ]
            },
            {
              itemId: "productList",
              xtype: "grid",
              height: 155,
              title: '库存表',
              store: Ext.data.StoreManager.lookup('product'),
              columns: [
                {
                  text: '序号',
                  dataIndex: 'key',
                  flex: 1
                },
                {
                  text: '货号',
                  dataIndex: 'productCode',
                  flex: 1
                },
                {
                  text: '品名',
                  dataIndex: 'name'
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
                  var form = productEdit.getComponent("form").getForm();

                  form.findField("address").setDisabled(true);
                  form.findField("productCode").setDisabled(true);
                  form.url = env.services.web + env.api.product.change;

                  productEdit.show();
                  productEdit.setTitle("查看库存详情");

                  window.updateForm(form, record.data);
                }
              }
            },
            {
              xtype: "button",
              text: "<span class=\"key\">A</span> 增加",
              margin: "20 0 0 0",
              handler: function () {
                var form = productEdit.getComponent("form").getForm();
                productEdit.setTitle("新增库存");

                form.reset();
                form.findField("productCode").setDisabled(false);

                form.url = env.services.web + env.api.product.add;
                productEdit.show();
              }
            },
            {
              xtype: "button",
              text: "删除",
              margin: "20 0 0 20",
              handler: function() {
                window.removeGridRow({
                  grid: Ext.ComponentQuery.query("grid[itemId=productList]")[0],
                  api: env.services.web + env.api.product.del,
                  success: function() {
                    var form = Ext.ComponentQuery.query("[itemId=search-bar]")[0].getForm();
                    searchHandler.call(form, "product");
                  }
                });
              }
            },
            {
              xtype: "button",
              text: "<span class=\"key\">I</span> 导入",
              margin: "20 0 0 20",
              handler: function() {
                upload.show();
              }
            },
            {
              xtype: "button",
              text: "进货单",
              margin: "20 0 0 20",
              handler: function () {
                try {
                  var data = productlist.getComponent("product").getComponent("productList").getSelectionModel().getSelection()[0].data;
                  var form = productlist.getComponent("transitionLoss").getComponent("form").getForm();

                  Ext.ComponentQuery.query("[title=进转损期数]")[0].setValue(Ext.ComponentQuery.query("[title=库存表期数]")[0].value);
                  window.updateForm(form, data);
                  productlist.setActiveTab(1);
                  searchHandler.call(form, "transitionLoss");
                } catch (e) {
                  Ext.Msg.alert("查看进货单", "请单击库存表中的一项后再查看进货单");
                  console.error(e.stack);
                }
              }
            },
            {
              name: "jhd-print",
              xtype: "button",
              text: "打印设置",
              margin: "20 0 0 20",
              handler: function () {
                window.printHandle.set("productrecord");
              }
            }
          ]
        },
        {
          itemId: "transitionLoss",
          title: '进转损',
          padding: 15,
          items: [
            {
              itemId: "form",
              xtype: "form",
              border: 0,
              url: env.services.web + env.api.product.transitionLoss,
              layout: "column",
              items: [
                Ext.create('periodical', {
                  title: '进转损期数'
                }),
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
                    searchHandler.call(this, "transitionLoss");
                  }
                },
                {
                  xtype: "button",
                  margin: "0 0 15 5",
                  text: "重置",
                  handler: function () {
                    this.up("form").getForm().reset();
                  }
                }
              ]
            },
            {
              xtype: "grid",
              height: 155,
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
                  var form = addJHD.getComponent("form").getForm();
                  form.url = env.services.web + env.api.product.changeTransitionLoss;
                  form.findField("periodicalId").setDisabled(true);
                  form.findField("type").setDisabled(true);

                  Ext.data.StoreManager.lookup('jhdProduct').load({
                    params: {
                      receiptId: record.data.id,
                    }
                  });
                  addJHD.show();
                  Ext.ComponentQuery.query("button[name=jhd-print]")[0].setDisabled(false);
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
                var form = addJHD.getComponent("form").getForm();
                form.url = env.services.web + env.api.product.addTransitionLoss;
                form.findField("periodicalId").setDisabled(false);
                form.findField("type").setDisabled(false);

                addJHD.getComponent("form").getForm().reset();
                Ext.data.StoreManager.lookup('jhdProduct').loadData({list: []});
                addJHD.show();
                Ext.ComponentQuery.query("button[name=jhd-print]")[0].setDisabled(true);
              }
            },
            {
              xtype: "button",
              text: "删除",
              margin: "20 0 0 20",
              scale: "medium",
              handler: function() {
                window.removeGridRow({
                  grid: Ext.ComponentQuery.query("grid[title=进转损]")[0],
                  api: env.services.web + env.api.product.delTransitionLoss,
                  success: function() {
                    Ext.data.StoreManager.lookup('transitionLoss').load();
                  }
                });
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
              items: [Ext.create('periodical'),
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
                    searchHandler.call(this, "shipmentDetails");
                  }
                },
                {
                  xtype: "button",
                  margin: "0 0 15 5",
                  text: "重置",
                  handler: function () {
                    this.up("form").getForm().reset();
                  }
                }
              ]
            },
            {
              xtype: "grid",
              height: 155,
              title: '出货明细',
              store: Ext.data.StoreManager.lookup('shipmentDetails'),
              columns: [
                {
                  text: '序号',
                  dataIndex: 'key'
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
            },
            {
              xtype: "button",
              text: "删除",
              margin: "20 0 0 0",
              scale: "medium",
              handler: function() {
                window.removeGridRow({
                  grid: Ext.ComponentQuery.query("grid[title=出货明细]")[0],
                  api: env.services.web + env.api.product.delShipmentDetails,
                  success: function() {
                    Ext.data.StoreManager.lookup('shipmentDetails').load();
                  }
                });
              }
            }
          ]
        }
      ]
    });

    window.printHandle.get({
      $el: Ext.ComponentQuery.query("[itemId=product]")[0],
      type: "productrecord",
      margin: "20 0 0 20"
    });

    window.printHandle.get({
      $el: Ext.ComponentQuery.query("[itemId=jhdProduct-print-container]")[0],
      type: "purchase",
      margin: "0 0 0 10"
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
          items: [
          Ext.create("periodical", {
            labelWidth: 70,
          }), {
            fieldLabel: "厂商编号",
            labelWidth: 70,
            width: 300,
            name: "companyCode",
            labelAlign: "right",
            listeners: {
              blur: function(that) {
                var form = this.up("form").getForm();
                Ext.Ajax.request({
                  url: env.services.web + env.api.company.findByCompanyCode,
                  params: {
                    companyCode: that.value
                  },
                  success: function (resp) {
                    var data = Ext.JSON.decode(resp.responseText);
                    if (data.success) {
                      form.findField("address").setValue(data.info.address);
                    } else {
                      Ext.Msg.alert("填充地址", data.msg);
                    }
                  }
                });
              }
            }
          }, {
            fieldLabel: "厂商地址",
            labelWidth: 70,
            width: 300,
            name: "address",
            disabled: true,
            labelAlign: "right"
          }, {
            fieldLabel: "货号",
            labelWidth: 70,
            width: 300,
            name: "productCode",
            labelAlign: "right"
          }, {
            fieldLabel: '品名',
            labelWidth: 70,
            width: 300,
            name: "name",
            labelAlign: "right"
          }, {
            fieldLabel: '进价',
            labelWidth: 70,
            width: 300,
            name: "purchasePrice",
            labelAlign: "right"
          }, {
            fieldLabel: '包装形式',
            labelWidth: 70,
            width: 300,
            labelAlign: "right",
            name: 'bagShape',
          }, {
            fieldLabel: '重量',
            labelWidth: 70,
            width: 300,
            name: "weight",
            labelAlign: "right"
          }, {
            fieldLabel: '售价',
            labelWidth: 70,
            width: 300,
            name: "price",
            labelAlign: "right"
          }, {
            fieldLabel: '商品说明',
            labelWidth: 70,
            width: 300,
            name: "content",
            labelAlign: "right"
          }, {
            fieldLabel: '调整基数',
            labelWidth: 70,
            width: 300,
            name: "cardinalNumber",
            labelAlign: "right"
          }, {
            fieldLabel: '安全库存量',
            labelWidth: 70,
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
                  form.submit({
                    success: function () {
                      var form = Ext.ComponentQuery.query("[itemId=search-bar]")[0].getForm();
                      productEdit.hide();
                      searchHandler.call(form, "product");
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

    //进货单商品详情
    var addJHD = new Ext.create("Ext.window.Window", {
      title: "进货单商品详情",
      width: 800,
      bodyPadding: 10,
      closeAction: 'hide',
      items: [{
        itemId: "form",
        xtype: "form",
        bodyPadding: 0,
        border: 0,
        url: env.services.web + env.api.productrecord.change,
        items: [{
          layout: "hbox",
          bodyPadding: 10,
          border: 0,
          defaultType: 'textfield',
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [
            Ext.create('periodical'),
            Ext.create('jzsType', {
              itemId: "jhd-type"
            })
          ]
        }, {
          xtype: "hiddenfield",
          name: "id"
        }, {
          xtype: "hiddenfield",
          name: "receiptId"
        }, {
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
              fieldLabel: "备注",
              name: "remark",
              labelWidth: 40,
              labelAlign: "right"
            }
          ]
          },
          {
            xtype: "button",
            text: "<span class=\"key\">M</span> 保存",
            margin: "0 0 30 20",
            handler: function () {
              var form = addJHD.getComponent("form").getForm();
              form.url = env.services.web + env.api.productrecord.change;

              form.submit({
                success: function(form) {
                  form.reset();
                  addJHD.hide();
                },
                failure: function (form, action) {
                  Ext.Msg.alert("保存", action.result.msg);
                }
              });
            }
          },
          {
            xtype: "button",
            text: "新增",
            margin: "0 0 30 20",
            handler: function () {
              var form = addJHD.getComponent("form").getForm();
              form.url = env.services.web + env.api.productrecord.add;

              form.submit({
                success: function(form) {
                  form.reset();
                },
                failure: function (form, action) {
                  Ext.Msg.alert("保存", action.result.msg);
                }
              });
            }
          }
        ]
      }, {
          itemId: "list",
          xtype: "grid",
          height: 155,
          store: Ext.data.StoreManager.lookup('jhdProduct'),
          height: 200,
          margin: "10 0 0 0",
          columns: [
            {
              text: '序号',
              dataIndex: 'key'
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
              dataIndex: 'price'
            },
            {
              text: '金额',
              dataIndex: 'amount'
            },
            {
              text: '包装形式',
              dataIndex: 'bagShape'
            },
            {
              text: '备注',
              dataIndex: 'remark',
              flex: 1
            },
            {
              text: '重量',
              dataIndex: 'weight',
              hidden: true,
              flex: 1
            }
          ],
          listeners: {
            itemdblclick: function (that, record, item, index, e, eOpts) {
              var form = addJHD.getComponent("form").getForm();
              window.updateForm(form, record.data);
            }
          }
        },
        {
          itemId: "jhdProduct-print-container",
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
              text: "<span class=\"key\">D</span> 删除",
              margin: "0 0 0 10",
              handler: function () {
                var record = addJHD.getComponent("list").getSelectionModel().getSelection()[0].data;

                Ext.Msg.confirm("删除", "确认删除“" + record.name + "”吗？", function(type) {
                  if (type === "yes") {
                    Ext.Ajax.request({
                      url: env.services.web + env.api.productrecord.del,
                      params: {
                        id: record.id
                      },
                      success: function (resp) {
                        var data = Ext.JSON.decode(resp.responseText);
                        Ext.data.StoreManager.lookup('jhdProduct').remove(record);
                      }
                    });
                  }
                });
              }
            },
            {
              name: "jhd-print",
              xtype: "button",
              text: "打印设置",
              margin: "0 0 0 10",
              handler: function () {
                window.printHandle.set("purchase");
              }
            }
          ]
        }
      ]
    });

    var upload = new Ext.create("Ext.window.Window", {
      title: "库存导入",
      layout: "column",
      bodyStyle: {
        background: "#fff"
      },
      bodyPadding: 50,
      items: [
        {
          xtype: "form",
          border: 0,
          url: env.services.web + env.api.product.import,
          items: [
            {
              xtype: 'filefield',
              name: 'file',
              fieldLabel: 'Excel文件',
              labelWidth: 60,
              msgTarget: 'side',
              allowBlank: false,
              anchor: '100%',
              buttonText: "选择文件",
              listeners: {
                change: function() {
                  var ext = window.getExt(this.getValue());
                  if (/^(xls|xlsx|csv)$/.test(ext)) {
                    return true;
                  } else {
                    Ext.Msg.alert("选择文件", "您选择的文件不是Excel，请重新选择");
                    return false;
                  }
                }
              }
            },
            {
              xtype: 'label',
              html: '<a href="/template/product.xls" target="_blank">下载模板</a>',
              labelWidth: 60
            }
          ],

          buttons: [
            {
              text: "上传",
              handler: function() {
                var form = this.up('form').getForm();
                var ext = window.getExt(form.findField("file").getValue());

                if (/^(xls|xlsx|csv)$/.test(ext)==false) {
                  Ext.Msg.alert("选择文件", "您选择的文件不是Excel，请重新选择");
                  return false;
                }

                form.submit({
                  waitMsg: "正在上传，请耐心等待...",
                  success: function(fp, o) {
                    upload.hide();
                    searchHandler.call(search.getForm(), "productList");
                  },
                  failure: function(fp, o) {
                    Ext.Msg.alert("上传失败", o.result.msg);
                  }
                });
              }
            }
          ]

        }
      ],
      closeAction: "hide"
    });

  }
});
