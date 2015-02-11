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
      fields: ["key", 'addDate', "averageCost", 'bagShape', 'foreignCurrency', 'id', 'isBelowInventory', 'name', 'number', 'price', 'productCode', "purchasePrice","tzqProgressiveNumber","tzhProgressiveNumber","tzqShipmentNumber","tzhShipmentNumber", "receiptId", "safetyStock", "specification", "status", "weight", "cardinalNumber", "content","safetyStock", "companyCode", "address", "companyId"],
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
      fields: ["periodicalId", "receiptId", "key", 'id', 'typeName', 'receiptCode', 'receiptDate', "number", "remark", "type"],
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
      fields: ["key", 'id', 'deliveryOrderCode', 'tzqnumber', 'tzhnumber', 'status','orderStatus'],
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
                  dataIndex: 'tzqProgressiveNumber',
                  flex: 2
                },
                {
                  text: '调整后累进量',
                  dataIndex: 'tzhProgressiveNumber',
                  flex: 2
                },
                {
                  text: '调整前出货数',
                  dataIndex: 'tzqShipmentNumber',
                  flex: 2
                },
                {
                  text: '调整后出货数',
                  dataIndex: 'tzhShipmentNumber',
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
                },
                {
                  text:"缺货提示",
                  dataIndex:'safetyStock'
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
                window.printHandle.set("product");
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
                itemdblclick: function (that, record) {
                  var form = addJHD.getComponent("form").getForm();
                  Ext.data.StoreManager.lookup('jhdProduct').load({
                    params: {
                      receiptId: record.data.id
                    }
                  });
                  Ext.ComponentQuery.query("button[name=jhd-print]")[0].setDisabled(false);
                  form.reset();
                  window.updateForm(form, record.data);
                  window.resetForm({
                    list: ['id', 'number'],
                    root: form
                  });
                  Ext.ComponentQuery.query("[itemId=create-receipt-code]")[0].setDisabled(true);

                  addJHD.show();
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
                form.findField("periodicalId").setDisabled(false);
                form.findField("type").setDisabled(false);

                window.resetForm({
                  list: ['productCode', 'number', 'remark', 'receiptCode'],
                  root: form
                });
                Ext.data.StoreManager.lookup('jhdProduct').loadData({list: []});
                Ext.ComponentQuery.query("[itemId=create-receipt-code]")[0].setDisabled(false);
                Ext.ComponentQuery.query("button[name=jhd-print]")[0].setDisabled(true);
                addJHD.show();
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
                    searchHandler.call(Ext.ComponentQuery.query("[itemId=form]")[0], "transitionLoss");
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
                  dataIndex: 'orderStatus',
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
            fieldLabel: '缺货提示',
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
      items: [
        {
          itemId: "form",
          xtype: "form",
          bodyPadding: 0,
          border: 0,
          items: [
            {
              xtype: 'fieldset',
              layout: 'vbox',
              title: '新增商品',
              items: [
                {
                  xtype: "panel",
                  layout: "hbox",
                  border: 0,
                  defaultType: 'textfield',
                  items: [
                    Ext.create('periodical'),
                    Ext.create('jzsType', {
                      itemId: "jhd-type"
                    }),
                    {
                      itemId: "create-receipt-code",
                      xtype: "button",
                      text: "生成进转损编号",
                      margin: "0 0 30 20",
                      handler: function () {
                        var form = addJHD.getComponent("form").getForm();
                            form.url = env.services.web + env.api.receipt.add;
                        form.submit({
                          success: function (form, action) {
                            var form = productlist.getComponent("transitionLoss").getComponent("form").getForm();
                            Ext.ComponentQuery.query("[name=receiptCode]")[1].setValue(action.result.receiptCode);
                            Ext.ComponentQuery.query("[name=receiptId]")[0].setValue(action.result.receiptId);
                            searchHandler.call(form, "transitionLoss");
                             Ext.ComponentQuery.query("[itemId=create-receipt-code]")[0].setDisabled(true);
                          },
                          failure: function (form, action) {
                            Ext.Msg.alert("创建进转损编号", action.result.msg);
                          }
                        });
                      }
                    },
                    {
                      disabled: true,
                      name: "receiptCode",
                      margin: "3 0 0 20"
                    },
                    {
                      xtype: "hiddenfield",
                      name: "receiptId"
                    },
                    {
                      xtype: "hiddenfield",
                      name: "id"
                    }
                  ]
                },
                {
                  xtype: "panel",
                  layout: "hbox",
                  margin: "10 0 0 0",
                  border: 0,
                  defaultType: 'textfield',
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
                  xtype: "panel",
                  layout: "hbox",
                  margin: "10 0 0 0",
                  border: 0,
                  defaultType: 'textfield',
                  items: [
                    {
                      xtype: "button",
                      text: "保存",
                      margin: "0 0 30 20",
                      handler: function () {
                        var form = addJHD.getComponent("form").getForm();
                         form.url=env.services.web + env.api.productrecord.save,
                        form.submit({
                          success: function () {
                            //加载产品列表
                            Ext.data.StoreManager.lookup('jhdProduct').load({
                              params: {
                                receiptId: Ext.ComponentQuery.query("[name=receiptId]", addJHD)[0].value
                              }
                            });
                            //加载进转损列表
                             Ext.data.StoreManager.lookup('transitionLoss').load({
                              params: {
                                periodicalId: Ext.ComponentQuery.query("[name=periodicalId]", addJHD)[0].value
                              }
                            });

                             window.resetForm({
                                root: form,
                                list: [
                                  'id',
                                  'productCode',
                                  'number',
                                  'remark'
                                ]
                              });
                            
                          },
                          failure: function (form, action) {
                            Ext.Msg.alert("保存", action.result.msg);
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
            itemdblclick: function (that, record) {
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
                removeGridRow({
                  grid: addJHD.getComponent("list"),
                  api: env.services.web + env.api.productrecord.del,
                  success: function() {
                    //加载进转损列表
                     Ext.data.StoreManager.lookup('transitionLoss').load({
                      params: {
                        periodicalId: Ext.ComponentQuery.query("[name=periodicalId]", addJHD)[0].value
                      }
                    });


                    Ext.data.StoreManager.lookup('jhdProduct').load({
                      params: {
                        receiptId: Ext.ComponentQuery.query("[name=receiptId]", addJHD)[0].value
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

    window.printHandle.get({
      $el: Ext.ComponentQuery.query("[itemId=product]")[0],
      type: "product",
      margin: "20 0 0 20",
      form: Ext.ComponentQuery.query("[itemId=search-bar]")[0].getForm(),
      title: Ext.ComponentQuery.query("[itemId=productList]")[0].title
    });

    window.printHandle.get({
      $el: Ext.ComponentQuery.query("[itemId=jhdProduct-print-container]")[0],
      form: Ext.ComponentQuery.query("[itemId=form]")[0].getForm(),
      type: "purchase",
      margin: "0 0 0 10",
      title: addJHD.title
    });
  }
});
