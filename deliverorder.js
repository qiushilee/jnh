Ext.application({
  name: "JNH",
  launch: function () {
    // 出货单列表
    Ext.create('Ext.data.Store', {
      storeId: 'list',
      fields: ["memberId","key","deliveryOrderId", "orderCode", "deliveryOrderCode", "id", "remittanceAmount",'billNumber', "remitter", "userName", "userCode", "receivableAmount", "totalSales", "receivedRemittance", "unDiscountAmount", "preferentialTicket", "discount", "overpaidAmount", "postage", "orderRemittanceId"],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.deliverorder.list,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    // 连续打印列表
    Ext.create('Ext.data.Store', {
      storeId: 'printList',
      fields: ["address1", "realName", "memberId", "deliveryOrderId", "orderCode", "deliveryOrderCode", "id", "remittanceAmount",'billNumber', "remitter", "userName", "userCode", "receivableAmount", "totalSales", "receivedRemittance", "unDiscountAmount", "preferentialTicket", "discount", "overpaidAmount", "postage", "orderRemittanceId"],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.deliverorder.list,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    // 右侧商品列表
    Ext.create('Ext.data.Store', {
      storeId: 'productData',
      fields: ["productId", "deliveryorderId", "memberId", "key", "id", "productCode", "name", "number", "price", "amount", "remark", "weight","safetyStock"],
      layout: "fit",
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.deliverorder.view,
        actionMethods: {
          create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'
        },
        pageParam: "",
        startParam: "",
        limitParam: "",
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    // 查看加入抵价券
    Ext.create('Ext.data.Store', {
      storeId: 'ticket',
      fields: ["productId", "key", "id", "productCode", "name", "number", "price", "amount"],
      layout: "fit",
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.deliverorder.viewticketproduct,
        actionMethods: {
          create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'
        },
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    // 查看生成抵价券
    Ext.create('Ext.data.Store', {
      storeId: 'create-ticket',
      fields: ["deliveryOrderId", "key", "memberId", "overpaidAmount", "packaging", "remark", "ticketCode", "totalAmount", "addDate", "id"],
      layout: "fit",
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.deliverorder.viewticket,
        actionMethods: {
          create: 'POST', read: 'POST', update: 'POST', destroy: 'POST'
        },
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    function getTicketData() {
      var record = Ext.ComponentQuery.query("grid[itemId=orderList]")[0].getSelectionModel().getSelection()[0].data,
          $totalAmount = Ext.ComponentQuery.query("[name=totalAmount]", addDjq)[0],
          $overpaidAmount = Ext.ComponentQuery.query("[name=overpaidAmount]", addDjq)[0];

      Ext.data.StoreManager.lookup('ticket').loadData({});
      Ext.data.StoreManager.lookup('ticket').load({
        params: {
          deliveryOrderId: window.deliveryOrderId,
          memberId: record.memberId,
          ticketId: 0
        },
        callback: function (data) {
          if (data === null) {
            $totalAmount.setValue("");
            return;
          }
        var overpaidAmount = parseFloat($overpaidAmount.value),
        ticketAmout = parseFloat(data[data.length - 1].data.amount),
        total = overpaidAmount + ticketAmout;

        $totalAmount.setValue(total.toFixed(2));
      }
    });
  }

    var search = Ext.create("Ext.form.Panel", {
      layout: "hbox",
      bodyPadding: 10,
      defaultType: 'textfield',
      margin: "10 0",
      renderTo: window.$bd,
      itemId: "searchBar",
      xtype: "form",
      url: env.services.web + env.api.deliverorder.list,
      items: [
        Ext.create("periodical"),
        Ext.create("deliverorderStatus",{
              labelWidth: 70,
              width: 130,
              store: Ext.create("Ext.data.Store", {
                fields: ["name", "value"],
                data: JSON.parse(document.body.dataset.deliverorderstatusall)
              }),
         }),
        
        {
          xtype: "hiddenfield",
          name: "type",
          value: 2
        },
        {
          fieldLabel: "会员姓名",
          labelWidth: 60,
          name: "userName",
          labelAlign: "right"
        },
        {
          fieldLabel: "会员编号",
          labelWidth: 60,
          name: "userCode",
          labelAlign: "right"
        },
        {
          fieldLabel: "出货单编号",
          labelWidth: 70,
          name: "deliveryOrderCode",
          labelAlign: "right"
          //TODO 增加键盘事件 enter
        },
        {
          xtype: "button",
          text: "搜索",
          margin: "0 0 0 20",
          handler: function() {
            searchHandler.call(this, "list");
          }
        },
        {
          xtype: "button",
          text: "重置",
          margin: "0 0 0 20",
          handler: function() {
            this.up("form").getForm().reset();
          }
        }
        ],
        listeners: {
          afterlayout: function(that) {
            var memberId = location.search.replace(/.*=/, "");
            if (memberId) {
              var form = that.getForm()
              form.findField("userCode").setValue(memberId);
              searchHandler.call(that, "list");
            }
          }
        }
      });

    Ext.ComponentQuery.query("[name=periodicalId]")[0].on('change', function(that, val) {
      Ext.Ajax.request({
        url: search.url,
        method: 'POST',
        params: {
          type: 1,
          periodicalId: val
        },
        success: function (resp) {
          var data = Ext.JSON.decode(resp.responseText);
          if (data.list.length > 0) {
            Ext.data.StoreManager.lookup('list').loadData(data.list);
          } else {
            Ext.Msg.alert("搜索", data.msg);
          }
        },
        failure: function (resp) {
          var data = Ext.JSON.decode(resp.responseText);
          Ext.Msg.alert("搜索", data.msg);
        }
      });
    });

    function createCode(code, orderId) {
      list.getComponent("orderproductform").getComponent("orderproduct").getComponent("product").getForm().findField("deliveryOrderId").setValue(orderId);
      Ext.ComponentQuery.query("label[name=code]")[0].setText(code);
      Ext.ComponentQuery.query("button[itemId=createCode]")[0].setDisabled(true);
      Ext.ComponentQuery.query("[itemId=import-web-order]")[0].setDisabled(false);;
    }

    var list = Ext.create('Ext.Panel', {
      layout: "column",
      border: 0,
      renderTo: window.$bd,
      margin: "30 0",
      items: [
        {
          itemId: "detail",
          xtype: "form",
          border: 0,
          columnWidth: 0.5,
          items: [
            {
              itemId: "col",
              xtype: 'panel',
              layout: "hbox",
              border: 0,
              defaultType: 'textfield',
              items: [
                {
                  itemId: "createCode",
                  xtype: "button",
                  margin: "0 0 0 50",
                  disabled: true,
                  text: "生成出货单编号",
                  handler: function() {
                    var record = Ext.ComponentQuery.query("grid[itemId=orderList]")[0].getSelectionModel().getSelection()[0].data;

                    Ext.Ajax.request({
                      url: env.services.web + env.api.deliverorder.remorderdelivercode,
                      params: {
                        orderRemittanceId: record.orderRemittanceId,
                        deliveryOrderId: record.deliveryOrderId
                      },
                      success: function(resp) {
                        var data = Ext.JSON.decode(resp.responseText);
                        if (data.success) {
                          createCode(data.code, data.deliveryOrderId);
                        } else {
                          Ext.Msg.alert("生成出货单编号失败", data.msg);
                        }
                      },
                      failure: function(resp) {
                        Ext.Msg.alert("生成出货单编号失败", resp.statusText);
                        console.error(resp.statusText);
                      }
                    });
                  }
                },
                {
                  xtype: "label",
                  margin: "3 0 0 15",
                  name: "code"
                }
              ]
            },
            {
              xtype: "hidden",
              name: "orderRemittanceId"
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
                  fieldLabel: "会员姓名",
                  name: "userName",
                  labelAlign: "right",
                  disabled:true
                },
                {
                  xtype: 'textfield',
                  fieldLabel: "应收金额",
                  name: "receivableAmount",
                  labelAlign: "right",
                  disabled:true
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
                  name: "totalSales",
                  labelAlign: "right",
                  disabled:true
                },
                {
                  fieldLabel: "已收汇款",
                  name: "receivedRemittance",
                  labelAlign: "right",
                  disabled:true
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
                  name: "unDiscountAmount",
                  labelAlign: "right",
                  disabled:true
                },
                {
                  fieldLabel: "抵价券",
                  name: "preferentialTicket",
                  labelAlign: "right",
                  disabled:true
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
                  name: "discount",
                  labelAlign: "right",
                  disabled:true
                },
                {
                  fieldLabel: "多付金额",
                  name: "overpaidAmount",
                  labelAlign: "right",
                  disabled:true
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
                  name: "postage",
                  labelAlign: "right",
                  disabled:true
                },
                {
                  fieldLabel: "会员编号",
                  name: "userCode",
                  labelAlign: "right",
                  disabled:true
                }
              ]
            },
            {
              itemId: "orderList",
              xtype: "grid",
              height: 155,
              store: Ext.data.StoreManager.lookup('list'),
              margin: "20 0 0 0",
              columns: [
                {
                  text: "序号",
                  dataIndex: "key",
                  flex: 1
                },
                {
                  text: '出货单号',
                  dataIndex: 'deliveryOrderCode',
                  flex: 1
                },
                {
                  text: '汇款编号',
                  dataIndex: 'billNumber',
                  flex: 1
                },
                {
                  text: '汇款人',
                  dataIndex: 'remitter'
                },
                {
                  text: '汇款额',
                  dataIndex: 'remittanceAmount',
                  flex: 1
                }
              ],
              listeners: {
                itemclick: function( that, record, item, index, e, eOpts) {
                  var $btn = Ext.ComponentQuery.query("[itemId=import-tel-order]")[0];
                  if (record.data.deliveryOrderCode === "") {
                    $btn.setDisabled(true);
                  } else {
                    $btn.setDisabled(false);
                  }
                },
                itemdblclick: function( that, record, item, index, e, eOpts) {
                  var detail = this.ownerCt.ownerCt.getComponent("detail"),
                      productStore = Ext.data.StoreManager.lookup("productData"),
                      $sidebarForm = list.getComponent("orderproductform").getComponent("orderproduct").getComponent("product").getForm();
                  window.deliveryOrderId = record.data.deliveryOrderId;

                  detail.getComponent("col").getComponent("createCode").setDisabled(false);
                  Ext.ComponentQuery.query("label[name=code]")[0].setText("");
                  window.updateForm(detail.getForm(), record.data);

                  productStore.load({
                    params: {
                      deliveryOrderId: window.deliveryOrderId
                    }
                  });
                 
                  //订单产品
                  $sidebarForm.findField("orderRemittanceId").setValue(record.data.orderRemittanceId);
                  $sidebarForm.findField("deliveryOrderId").setValue(window.deliveryOrderId);

                  if (record.data.deliveryOrderCode) {
                    createCode(record.data.deliveryOrderCode, record.data.deliveryOrderId);
                  } else {
                    Ext.ComponentQuery.query("[itemId=import-web-order]")[0].setDisabled(true);;
                  }
                }
              }
            },
            {
              xtype: 'panel',
              layout: "hbox",
              border: 0,
              defaultType: 'textfield',
              margin: "10 0 0 0"
            }
          ]
        },
        {
		      itemId:"orderproductform",
          xtype: "panel",
          border: 0,
          columnWidth: 0.49,
          style: {
            float: "right",
          },
          items: [
            {
              itemId: "right-searchbar",
              xtype: 'form',
              layout: "hbox",
              border: 0,
              url: env.services.web + env.api.deliverorder.view,
              items: [
              {
                xtype: "textfield",
                fieldLabel: "货号",
                labelWidth: 30,
                width: 100,
                labelAlign: "right",
                margin: "0 10 0 20",
                name: "productCode"
              },
              {
                xtype: "button",
                text: "搜索",
                margin: "0 0 0 40",
                float: "right",
                handler: function() {
                  var form = this.up("form");
                  form.submit({
                    params: {
                      deliveryOrderId: window.deliveryOrderId
                    },
                    failure: function(form, action) {
                      Ext.data.StoreManager.lookup('productData').loadData(action.result.list);
                    }
                  });
                }
              },
              {
                itemId: "import-tel-order",
                xtype: "button",
                text: "导入电话订单",
                margin: "0 0 0 10",
                disabled: true,
                float: "right",
                handler: function() {
                  var data = Ext.ComponentQuery.query("[itemId=orderList]")[0].getSelectionModel().getSelection()[0].data;
                  window.switchView({
                    key: "deliveryOrderId",
                    val: data.deliveryOrderId,
                    view: "telorder"
                  });
                }
              },
              {
                itemId: "import-web-order",
                xtype: "button",
                disabled: true,
                text: "导入网上订单",
                margin: "0 0 0 10",
                float: "right",
                handler: function() {
                  upload.show();
                  Ext.ComponentQuery.query("[itemId=upload-deliveryOrderId]")[0].setValue(window.deliveryOrderId);
                  Ext.data.StoreManager.lookup('productData').load({
                    params: {
                      deliveryOrderId: window.deliveryOrderId
                    }
                  });
                }
              },
              {
                xtype: "button",
                text: "查看抵价券",
                margin: "0 0 0 10",
                float: "right",
                handler: function() {
                  var record = Ext.ComponentQuery.query("grid[itemId=orderList]")[0].getSelectionModel().getSelection()[0].data,
                      $overpaidAmount = Ext.ComponentQuery.query("[name=overpaidAmount]", addDjq)[0];

                  getTicketData();
                  Ext.data.StoreManager.lookup("create-ticket").load({
                    params: {
                      deliveryOrderId: window.deliveryOrderId,
                      memberId: record.memberId
                    }
                  });

                  $overpaidAmount.setValue(parseFloat(Ext.ComponentQuery.query("[name=overpaidAmount]")[0].value).toFixed(2));
                  addDjq.show();

                  window.printHandle.get({
                    $el: Ext.ComponentQuery.query("[itemId=djq-btn-container]")[0],
                    formParam: {
                      memberId: record.memberId,
                      deliveryOrderId: record.deliveryOrderId
                    },
                    type: "ticket",
                    margin: "0 0 0 10"
                  });
                }
              }
            ]
            },
            {
              itemId: "orderproduct",	
              xtype: "panel",
              bodyPadding: 5,
              margin: "10 0 0 0",
              items: [
                {
                  itemId: "product",
                  xtype: "form",
                  layout: "hbox",
                  border: 0,
                  defaultType: 'textfield',
                  margin: "10 0 0 0",
                  items: [
                    {
                      fieldLabel: "货号",
                      labelWidth: 30,
                      width: 100,
                      name:'productCode',
                      labelAlign: "right"
                    },
                    {
                      fieldLabel: "数量",
                      labelWidth: 50,
                      width: 120,
                      name:'number',
                      labelAlign: "right"
                    },
                    {
                      fieldLabel: "备注",
                      labelWidth: 50,
                      width: 300,
                      name:'remark',
                      labelAlign: "right"
                    }, {
                      xtype: "hiddenfield",
                      name: "orderRemittanceId"
                    }, {
                      xtype: "hiddenfield",
                      name: "deliveryOrderId"
                    }, {
                      xtype: "hiddenfield",
                      name: "id"
                    }
                  ]
                },
                {
                  itemId: "orderproductlist",	
                  xtype: "grid",
                  height: 155,
                  store: Ext.data.StoreManager.lookup('productData'),
                  margin: "10 0 0 0",
                  columns: [
                    {
                      text: '序号',
                      dataIndex: 'key'
                    },
                    {
                      text: '货号',
                      dataIndex: 'productCode',
                      flex: 1
                    },
                    {
                      text: '品名',
                      dataIndex: 'name',
                      flex: 1
                    },
                    {
                      text: '数量',
                      dataIndex: 'number',
                      flex: 1
                    },
                    {
                      text: '售价',
                      dataIndex: 'price',
                      flex: 1
                    },
                    {
                      text: '金额',
                      dataIndex: 'amount',
                      flex: 1
                    },
                    {
                      text: '备注',
                      dataIndex: 'remark',
                      flex: 1
                    },
                    {
                      text: '重量',
                      dataIndex: 'weight',
                      flex: 1
                    },
                    {
                      text:"缺货提示",
                      dataIndex:"safetyStock",
                      flex:1
                    }
                  ],
                   listeners: {
                      itemdblclick: function( that, record, item, index, e, eOpts) {
                        var product = this.ownerCt.getComponent("product");
                        window.updateForm(product.getForm(), record.data);
                      }
                    }
                },
                {
                  itemId: "right-print-container",
                  xtype: 'panel',
                  layout: "hbox",
                  border: 0,
                  defaultType: 'textfield',
                  margin: "10 0 0 0",
                  items: [
                    {
                      xtype: "button",
                      text: "连续打印",
                      handler: function() {
                        print.show();
                      }
                    },
                    {
                      name: "jhd-print",
                      xtype: "button",
                      text: "打印设置",
                      margin: "0 0 0 10",
                      handler: function () {
                        window.printHandle.set("deliverorderreprint");
                      }
                    },
                    {
                      xtype: "button",
                      text: "<span class=\"key\">A</span> 增加",
                      margin: "0 0 0 10",
                      handler: function() {
                        var $form = list.getComponent("orderproductform").getComponent("orderproduct").getComponent("product"),
                            form =  $form.getForm();
                        form.url = env.services.web + env.api.deliverorder.saveorderproduct;
                        form.submit({
                          success: function(form, action) {
                            Ext.data.StoreManager.lookup('productData').loadData(action.result.list);
                            window.resetForm({
                              root: form,
                              list: [
                                'productCode',
                                'number',
                                'remark'
                              ]
                            });

                            if (window.deliveryOrderId) {
                              form.findField("deliveryOrderId").setValue(window.deliveryOrderId);
                            }

                            if (window.orderRemittanceId) {
                              form.findField("orderRemittanceId").setValue(window.orderRemittanceId);
                            }
                          },
                          failure: function(form, action) {
                            Ext.Msg.alert("修改订单产品", action.result.msg);
                          }
                        });
                      }
                    },
                    {
                      xtype: "button",
                      text: "<span class=\"key\">D</span> 删除",
                      margin: "0 0 0 10",
                      handler: function() {
                        window.removeGridRow({
                          grid: Ext.ComponentQuery.query("grid[itemId=orderproductlist]")[0],
                          api: env.services.web + env.api.deliverorder.deleteorderproduct,
                          success: function(data) {
                            if (data.success) {
                              Ext.data.StoreManager.lookup("productData").load({
                                params: {
                                  deliveryOrderId: window.deliveryOrderId
                                }
                              });
                            } else {
                              console.log(data)
                            }
                          }
                        });
                      }
                    },
                    {
                      xtype: "button",
                      text: "<span class=\"key\">M</span> 修改",
                      margin: "0 0 0 10",
                      handler: function() {
                        //需要传递id参数
                        var $form = list.getComponent("orderproductform").getComponent("orderproduct").getComponent("product"),
                            form =  $form.getForm();
                        form.url = env.services.web + env.api.deliverorder.saveorderproduct;
                        form.submit({
                          success: function(form, action) {
                            //更新订单列表
                           searchHandler.call(Ext.ComponentQuery.query("[itemId=searchBar]")[0], "list");
                            

                            //加载产品列表
                            Ext.data.StoreManager.lookup('productData').loadData(action.result.list);
                            window.resetForm({
                              root: form,
                              list: [
                                'productCode',
                                'number',
                                'remark'
                              ]
                            });

                            if (window.deliveryOrderId) {
                              form.findField("deliveryOrderId").setValue(window.deliveryOrderId);
                            }

                            if (window.orderRemittanceId) {
                              form.findField("orderRemittanceId").setValue(window.orderRemittanceId);
                            }
                          },
                          failure: function(form, action) {
                            Ext.Msg.alert("修改订单产品", action.result.msg);
                          }
                        });
                      }
                    },
                    {
                      xtype: "button",
                      text: "加入抵价券",
                      margin: "0 0 0 10",
                      handler: function() {
                        var record = Ext.ComponentQuery.query("grid[itemId=orderproductlist]")[0].getSelectionModel().getSelection()[0].data;
                        Ext.Ajax.request({
                          url: env.services.web + env.api.deliverorder.addticket,
                          params: {
                            memberId: record.memberId,
                            productCode: record.productCode,
                            productId: record.productId,
                            price: record.price,
                            deliveryOrderId: record.deliveryorderId,
                            number: record.number,
                            amount: record.amount,
                            weight: record.weight
                          },
                          success: function(resp) {
                            var data = Ext.JSON.decode(resp.responseText);
                          },
                          failure: function(resp) {
                            var data = Ext.JSON.decode(resp.responseText);
                            Ext.Msg.alert("保存", data.msg);
                          }
                        });
                      }
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
              disabled: true,
              text: "保存"
            },
            {
              xtype: 'button',
              layout: "absolute",
              x: "35%",
              disabled: true,
              text: "返回"
            }
          ]
        }
      ]
    });

    var print = new Ext.create("Ext.window.Window", {
      title: "连续打印",
      width: 600,
      bodyPadding: 10,
      closeAction: "hide",
      items: [
        {
          itemId: "print-container",
          xtype: "form",
          url: env.services.web + env.api.deliverorder.list,
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
              name: 'deliveryOrderCode1',
              labelWidth: 62
            },
            {
              fieldLabel: "",
              name: 'deliveryOrderCode2'
            },
            {
              xtype: "button",
              text: "搜索",
              margin: "0 0 0 20",
              handler: function() {
                searchHandler.call(this, "printList");
              }
            },
            {
              xtype: "button",
              text: "打印设置",
              margin: "0 0 0 10",
              handler: function () {
                window.printHandle.set("deliverorder");
              }
            }
          ]
        },
        {
          xtype: "grid",
          height: 155,
          store: Ext.data.StoreManager.lookup('printList'),
          margin: "10 0 0 0",
          columns: [
            {
              text: '出货单号',
              dataIndex: 'deliveryOrderCode'
            },
            {
              text: '姓名',
              dataIndex: 'realName'
            },
            {
              text: '地址',
              dataIndex: "address1",
              flex: 1
            }
          ]
        }
      ]
    });
    
    var addDjq = new Ext.create("Ext.window.Window", {
      title: "抵价券",
      width: 830,
      bodyPadding: 10,
      closeAction: "hide",
      items: [
      {
        xtype: "form",
        itemId: "ticket-change-form",
        layout: "hbox",
        border: 0,
        defaultType: 'textfield',
        url: env.services.web + env.api.deliverorder.changenumber,
        bodyStyle: {
          "background-color": "transparent"
        },
        items: [
        {
          xtype:'fieldset',
          title: "加入抵价券",
          defaultType: 'textfield',
          layout: 'hbox',
          items :[
          {
            fieldLabel: "数量",
            labelAlign: "right",
            labelWidth: 50,
            name:"number"
          },
          {
            xtype: "button",
            text: "修改",
            margin: "0 0 10 10",
            handler: function() {
              try {
                var ticketId = 0,
                    record = Ext.ComponentQuery.query("grid[itemId=ticket-list]")[0].getSelectionModel().getSelection()[0].data,
                    orderRecord = Ext.ComponentQuery.query("grid[itemId=orderList]")[0].getSelectionModel().getSelection()[0].data,
                    createRecord = Ext.ComponentQuery.query("grid[itemId=create-ticket-list]")[0].getSelectionModel().getSelection()[0];

                if (createRecord) {
                  ticketId = createRecord.data.id;
                }

                Ext.ComponentQuery.query("[itemId=ticket-change-form]")[0].getForm().submit({
                  params: {
                    id: record.id,
                    productId: record.productId
                  },
                  success: function (form, action) {
                    /**
                     * 修改完成后，刷新右侧列表
                     * ticketId需要判断左侧列表是否有选中，选中则取左侧的id，没选中就取0
                     */
                    Ext.data.StoreManager.lookup("ticket").load({
                      params: {
                        deliveryOrderId: window.deliveryOrderId,
                        memberId: orderRecord.memberId,
                        ticketId: ticketId
                      }
                    });
                  },
                  failure: function (form, action) {
                    Ext.Msg.alert("修改抵价券", action.result.msg);
                  }
                });
              } catch (e) {
                Ext.Msg.alert("修改", "请选中列表中的一项后再操作");
              }
            }
          },
          {
            xtype: "button",
            text: "删除",
            margin: "0 0 10 10",
            handler: function() {
              var ticketList = Ext.ComponentQuery.query("grid[itemId=ticket-list]")[0];

              window.removeGridRow({
                grid: ticketList,
                api: env.services.web + env.api.deliverorder.delticketproduct,
                success: function() {
                  getTicketData();
                }
              });
            }
          }
          ]
        }
        ]
      },
      {
        layout: "column",
        border: 0,
        margin: "10 0 0 0",
        items: [
          {
            xtype: "panel",
            border: 0,
            columnWidth: 0.4,
            items: [
              {
                itemId: "create-ticket-list",
                title: "抵价券",
                xtype: "grid",
                height: 155,
                store: Ext.data.StoreManager.lookup("create-ticket"),
                columns: [
                  {
                    text: '编号',
                    dataIndex: 'ticketCode'
                  },
                  {
                    text: '日期',
                    dataIndex: 'addDate',
                    flex: 1
                  },
                  {
                    text: '金额',
                    dataIndex: 'totalAmount'
                  }
                ],
                listeners: {
                  itemclick: function( that, record, item, index, e, eOpts) {
                    var $btn = Ext.ComponentQuery.query("[itemId=create-ticket-button]")[0];
                    if (record.data.id === 0) {
                      $btn.setDisabled(false);
                    } else {
                      $btn.setDisabled(true);
                    }
                  },
                /**
                 * 双击后，刷新右侧列表，ticketId参数用create-ticket的id
                 */
                  itemdblclick: function( that, record, item, index, e, eOpts) {
                    var orderListRecord = Ext.ComponentQuery.query("grid[itemId=orderList]")[0].getSelectionModel().getSelection()[0].data;
                    Ext.data.StoreManager.lookup("ticket").load({
                      params: {
                        deliveryOrderId: window.deliveryOrderId,
                        memberId: orderListRecord.memberId,
                        ticketId: record.data.id
                      }
                    });
                  }
                }
              }
            ]
          },
          {
            xtype: "panel",
            border: 0,
            columnWidth: 0.59,
            items: [
              {
                itemId: "ticket-list",
                title: "抵价券商品列表",
                xtype: "grid",
                height: 155,
                store: Ext.data.StoreManager.lookup('ticket'),
                margin: "0 0 0 30",
                columns: [
                {
                  text: '序号',
                  dataIndex: 'key'
                },
                {
                  text: '货号',
                  dataIndex: 'productCode',
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
                }
                ],
                listeners: {
                  itemdblclick: function( that, record, item, index, e, eOpts) {
                    var form = Ext.ComponentQuery.query("[itemId=ticket-change-form]")[0].getForm(),
                        currentProduct = record.data;
                    form.reset();
                    window.updateForm(form, currentProduct);
                  }
                }
              }
            ]
          }
        ]
      },
      {
        xtype: "form",
        itemId: "ticket-form",
        layout: "hbox",
        bodyPadding: 10,
        border: 0,
        defaultType: 'textfield',
        url: env.services.web + env.api.deliverorder.generateticket,
        bodyStyle: {
          "background-color": "transparent"
        },
        items: [
        {
          xtype:'fieldset',
          title: "生成抵价券",
          items :[
          {
            xtype: "panel",
            layout: "hbox",
            defaultType: 'textfield',
            bodyStyle: {
              "background-color": "transparent"
            },
            border: 0,
            items :[
            {
              fieldLabel: "包装员",
              labelAlign: "right",
              labelWidth: 50,
              name:"packaging"
            },
            {
              fieldLabel: "备注",
              labelAlign: "right",
              labelWidth: 40,
              name:"remark"
            },
            {
              fieldLabel: "抵价券总金额",
              labelAlign: "right",
              labelWidth: 80,
              width: 180,
              name:"totalAmount"
            },
            {
              fieldLabel: "多付款",
              labelAlign: "right",
              labelWidth: 50,
              width: 130,
              name:"overpaidAmount",
              listeners: {
                blur: function() {
                  var ticket = Ext.data.StoreManager.lookup('ticket').data.items,
                      amount = 0;

                  amount = ticket[ticket.length - 1].data.amount;
                  Ext.ComponentQuery.query("[name=totalAmount]")[0].setValue(amount + parseInt(this.getValue(), 10));
                }
              }
            }
            ]
          },
          {
            itemId: "djq-btn-container",
            xtype: "panel",
            layout: "hbox",
            bodyPadding: 10,
            border: 0,
            defaultType: 'textfield',
            width: 300,
            style: {
              float: "right"
            },
            bodyStyle: {
              "background-color": "transparent"
            },
            items: [
            {
              itemId: "create-ticket-button",
              xtype: "button",
              text: "<span class=\"key\">X</span> 生成抵价券",
              margin: "0 0 0 10",
              disabled: true,
              handler: function(that) {
                var record = Ext.ComponentQuery.query("grid[itemId=orderList]")[0].getSelectionModel().getSelection()[0].data,
                    form = Ext.ComponentQuery.query("[itemId=ticket-form]")[0].getForm();

                form.submit({
                  params: {
                    memberId: record.memberId,
                    deliveryOrderId: record.deliveryOrderId
                  },
                  success: function (form, action) {
                    form.reset();
                    that.setDisabled(true);

                    //加载抵价券列表
                    Ext.data.StoreManager.lookup("create-ticket").load({
                      params: {
                        memberId: record.memberId,
                        deliveryOrderId: record.deliveryOrderId
                      }
                    });
                    //加载右侧
                    getTicketData();
                  },
                  failure: function (form, action) {
                    Ext.Msg.alert("生成抵价券", action.result.msg);
                  }
                });
              }
            },
            {
              xtype: "button",
              text: "打印设置",
              margin: "0 0 0 10",
              handler: function () {
                window.printHandle.set("ticket");
              }
            },
            {
              xtype: "button",
              text: "删除",
              margin: "0 0 0 10",
              handler: function() {
                window.removeGridRow({
                  grid: Ext.ComponentQuery.query("grid[itemId=create-ticket-list]")[0],
                  api: env.services.web + env.api.deliverorder.delticket,
                  success: function() {
                    searchHandler.call(search.getForm(), "companyList");
                  }
                });
              }
            }
            ]
          }
        ]
      }
      ]
        }
      ]
    });
    
    /**
     * +TODO: 增加按钮：
     * C查询，P打印，R重打
     */
    var addCHD = Ext.create("Ext.window.Window", {
      title: "出货单打印",
      width: 600,
      layout: 'form',
      bodyPadding: 5,
      defaultType: 'textfield',
      fieldDefaults: {
        labelAlign: 'top'
      },
      bodyStyle: {
        background: "#fff"
      },
      items: [
        {
          xtype: "panel",
          layout: 'hbox',
          bodyPadding: 5,
          border: 0,
          defaultType: 'textfield',
          items: [
          {
            xtype: "combobox",
            fieldLabel: "期数",
            labelWidth: 40,
            width: 120,
            labelAlign: "right"
          },
          {
            fieldLabel: "出货单编号从",
            labelAlign: "right"
          },
          {
            fieldLabel: "~~~~~~~",
            labelWidth: 57,
            labelAlign: "right"
          },
          {
            xtype: "button",
            text: "会员卡查询",
            disabled: true,
            margin: "0 0 0 50"
          },
          {
            xtype: "button",
            text: "会员卡预览",
            disabled: true,
            margin: "0 0 0 20"
          },
          {
            xtype: "button",
            text: "会员卡打印",
            disabled: true,
            margin: "0 0 0 20"
          }
          ]
        },
        {
          xtype: "grid",
          height: 155,
          margin: "20 0 0 0",
          store: Ext.data.StoreManager.lookup('simpsonsStore'),
          columns: [
          {
            text: '序号',
            dataIndex: 'key'
          },
          {
            text: '出货单编号',
            dataIndex: 'iid1'
          },
          {
            text: '汇票号码',
            dataIndex: 'bnum1'
          },
          {
            text: '会员编号',
            dataIndex: 'bnum1'
          },
          {
            text: '姓名',
            dataIndex: 'bnum1'
          },
          {
            text: '地址',
            dataIndex: 'bnum1',
            flex: 1
          }
          ]
        },
        {
          xtype: "panel",
          layout: 'hbox',
          bodyPadding: 5,
          border: 0,
          defaultType: 'button',
          items: [{
            disabled: true,
            text: "<span class=\"key\">C</span> 查询"
          }, {
            disabled: true,
            text: "<span class=\"key\">P</span> 打印",
            margin: "0 0 0 10"
          }, {
            disabled: true,
            text: "<span class=\"key\">R</span> 重打",
            margin: "0 0 0 10"
          }]
        }
      ]
    });


    var upload = new Ext.create("Ext.window.Window", {
      title: "导入网络订单",
      layout: "column",
      bodyStyle: {
        background: "#fff"
      },
      bodyPadding: 50,
      items: [
        {
          xtype: "form",
          border: 0,
          url: env.services.web + env.api.deliverorder.import,
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
              itemId: "upload-deliveryOrderId",
              xtype: "hidden",
              name: "deliveryOrderId"
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
                    Ext.data.StoreManager.lookup('productData').load();
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
      $el: Ext.ComponentQuery.query("[itemId=right-print-container]")[0],
      form: Ext.ComponentQuery.query("[itemId=right-searchbar]")[0].getForm(),
      type: "deliverorderreprint",
      margin: "0 0 0 10"
    });

    window.printHandle.get({
      $el: Ext.ComponentQuery.query("[itemId=print-container]")[0],
      form: Ext.ComponentQuery.query("[itemId=print-container]")[0].getForm(),
      type: "deliverorder",
      margin: "0 0 0 10"
    });
  }
});
