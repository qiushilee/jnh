Ext.application({
  name: "JNH",
  launch: function () {
    // 出货单列表
    Ext.create('Ext.data.Store', {
      storeId: 'list',
      fields: ["orderCode", "deliveryOrderCode", "id", "remittanceAmount", "remitter", "userName", "userCode", "receivableAmount", "totalSales", "receivedRemittance", "unDiscountAmount", "preferentialTicket", "discount", "overpaidAmount", "postage", "orderRemittanceId"],
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
      fields: ["id", "productCode", "name", "number", "price", "amount", "remark", "weight"],
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

    var search = Ext.create("Ext.form.Panel", {
      layout: "hbox",
      bodyPadding: 10,
      defaultType: 'textfield',
      margin: "10 0",
      renderTo: document.body,
      url: env.services.web + env.api.deliverorder.list,
      items: [Ext.create("periodical"),
        {
          fieldLabel: "会员姓名",
          labelWidth: 60,
          name: "userName",
          labelAlign: "right"
        }, {
          fieldLabel: "会员编号",
          labelWidth: 60,
          name: "userCode",
          labelAlign: "right"
        }, {
          fieldLabel: "出货单编号",
          labelWidth: 70,
          name: "deliveryOrderCode",
          labelAlign: "right"
        //TODO 增加键盘事件 enter
        }, {
          xtype: "button",
          text: "搜索",
          margin: "0 0 0 20",
          handler: function() {
            searchHandler.call(this, "list");
          }
        }, {
          xtype: "button",
          text: "重置",
          margin: "0 0 0 20",
          handler: function() {
            this.up("form").getForm().reset();
          }
        }
      ]
    });

    var list = Ext.create('Ext.Panel', {
      layout: "column",
      border: 0,
      renderTo: Ext.getBody(),
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
              items: [{
                itemId: "createCode",
                xtype: "button",
                margin: "0 0 0 50",
                disabled: true,
                text: "生成出货单编号",
                handler: function() {
                  Ext.Ajax.request({
                    url: env.services.web + env.api.deliverorder.code,
                    params: {
                      orderRemittanceId: window.orderRemittanceId
                    },
                    success: function(resp) {
                      var data = Ext.JSON.decode(resp.responseText);
                      //TODO 期数应该放在list中比较合理
                      id.setText("出货单编号：" + data.code);
                    }
                  });
                }
              }]
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
                  labelAlign: "right"
                },
                {
                  xtype: 'textfield',
                  fieldLabel: "应收金额",
                  name: "receivableAmount",
                  labelAlign: "right"
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
                  labelAlign: "right"
                },
                {
                  fieldLabel: "已收汇款",
                  name: "receivedRemittance",
                  labelAlign: "right"
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
                  labelAlign: "right"
                },
                {
                  fieldLabel: "抵价券",
                  name: "preferentialTicket",
                  labelAlign: "right"
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
                  labelAlign: "right"
                },
                {
                  fieldLabel: "多付金额",
                  name: "overpaidAmount",
                  labelAlign: "right"
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
                  labelAlign: "right"
                },
                {
                  fieldLabel: "会员编号",
                  name: "userCode",
                  labelAlign: "right"
                }
              ]
            },
            {
              xtype: "grid",
              store: Ext.data.StoreManager.lookup('list'),
              margin: "20 0 0 0",
              columns: [
                {
                  text: '出货单号',
                  dataIndex: 'deliveryOrderCode',
                  flex: 1
                },
                {
                  text: '汇款编号',
                  dataIndex: 'orderCode',
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
                itemdblclick: function( that, record, item, index, e, eOpts) {
                  var detail = this.ownerCt.ownerCt.getComponent("detail"),
                      productStore = Ext.data.StoreManager.lookup("productData");
                  window.orderRemittanceId = record.data.orderRemittanceId;

                  detail.getComponent("col").getComponent("createCode").setDisabled(false);
                  window.updateForm(detail.getForm(), record.data);

                  productStore.load({
                    params: {
                      orderRemittanceId: window.orderRemittanceId
                    }
                  });
                 
				  //订单产品
				  list.getComponent("orderproductform").getComponent("orderproduct").getComponent("product").getForm().findField("orderremittanceId").setValue(window.orderRemittanceId);
				  
				 
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
              xtype: 'panel',
              layout: "hbox",
              border: 0,
              items: [
              {
                xtype: "textfield",
                fieldLabel: "货号",
                labelWidth: 30,
                width: 100,
                labelAlign: "right",
                margin: "0 10 0 20"
              },
              {
                xtype: "button",
                text: "搜索",
                margin: "0 0 0 40",
                float: "right"
              },
              {
                xtype: "button",
                text: "导入电话订单",
                margin: "0 0 0 10",
                float: "right"
              },
              {
                xtype: "button",
                text: "导入网上订单",
                margin: "0 0 0 10",
                float: "right"
              },
              {
                xtype: "button",
                text: "查看抵价券",
                margin: "0 0 0 10",
                float: "right"
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
						name: "orderremittanceId"
					 }
                  ]
                },
                {
				  itemId: "orderproductlist",	
                  xtype: "grid",
                  store: Ext.data.StoreManager.lookup('productData'),
                  margin: "10 0 0 0",
                  columns: [
                    {
                      text: '序号',
                      dataIndex: 'id'
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
                      xtype: "button",
                      text: "连续打印"
                    },
                    {
                      xtype: "button",
                      text: "<span class=\"key\">A</span> 增加",
                      margin: "0 0 0 10",
					  handler: function() {
						  var form =  list.getComponent("orderproductform").getComponent("orderproduct").getComponent("product").getForm();
						  form.url = env.services.web + env.api.deliverorder.saveorderproduct;
						  form.submit({
							   success: function(form, action) {
								Ext.Msg.alert("新增订单产品", action.result.msg);
								form.reset();
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
                      margin: "0 0 0 10"
                    },
                    {
                      xtype: "button",
                      text: "<span class=\"key\">M</span> 修改",
                      margin: "0 0 0 10",
					  handler: function() {
						  //需要传递id参数
						  var form = this.up("form").getForm();
						  form.url = env.services.web + env.api.deliverorder.saveorderproduct;
						  form.submit({
							success: function(form, action) {
							  Ext.Msg.alert("修改订单产品", action.result.msg, function() {
								product.hide();
							  });
							},
							failure: function(form, action) {
							  Ext.Msg.alert("修改订单产品", action.result.msg);
							}
						  });
						}
                    },
                   
                    {
                      xtype: "button",
                      text: "<span class=\"key\">H</span> 预览",
                      margin: "0 0 0 10"
                    },
                    {
                      xtype: "button",
                      text: "<span class=\"key\">R</span> 重打",
                      margin: "0 0 0 10"
                    },
                    {
                      xtype: "button",
                      text: "加入抵价券",
                      margin: "0 0 0 10"
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
              text: "保存"
            },
            {
              xtype: 'button',
              layout: "absolute",
              x: "35%",
              text: "返回"
            }
          ]
        }
      ]
    });

    var print = new Ext.create("Ext.window.Window", {
      title: "打印",
      width: 600,
      bodyPadding: 10,
      items: [
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
              fieldLabel: "出货单号",
              labelAlign: "right",
              labelWidth: 52
            },
            {
              fieldLabel: ""
            },
            {
              xtype: "button",
              text: "搜索",
              margin: "0 0 0 20"
            },
            {
              xtype: "button",
              text: "重置",
              margin: "0 0 0 10"
            }
          ]
        },
        {
          xtype: "grid",
          store: Ext.data.StoreManager.lookup('simpsonsStore'),
          margin: "10 0 0 0",
          selModel: Ext.create('Ext.selection.CheckboxModel', {mode: "SIMPLE"}),
          columns: [
            {
              text: '出货单号',
              dataIndex: 'id1'
            },
            {
              text: '姓名',
              dataIndex: 'adder1'
            },
            {
              text: '地址',
              dataIndex: 'man1',
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
              text: "查询",
              margin: "0 0 0 20"
            },
            {
              xtype: "button",
              text: "名单打印",
              margin: "0 0 0 10"
            },
            {
              xtype: "button",
              text: "明细打印",
              margin: "0 0 0 10"
            }
          ]
        }
      ]
    });
    
    // TODO 左侧增加一个列表
    var addQhd = new Ext.create("Ext.window.Window", {
      title: "抵价券",
      width: 830,
      bodyPadding: 10,
      items: [
        {
          xtype: "grid",
          store: Ext.data.StoreManager.lookup('simpsonsStore'),
          margin: "10 0 0 0",
          selModel: Ext.create('Ext.selection.CheckboxModel', {mode: "SIMPLE"}),
          columns: [
            {
              text: '序号',
              dataIndex: 'id1'
            },
            {
              text: '编号',
              dataIndex: 'id1'
            },
            {
              text: '货号',
              dataIndex: 'adder1',
              flex: 1
            },
            {
              text: '数量',
              dataIndex: 'man1'
            },
            {
              text: '单价',
              dataIndex: 'man1'
            },
            {
              text: '金额',
              dataIndex: 'man1'
            },
            {
              text: '删除',
              dataIndex: 'man1'
            }
          ]
        },
        {
          xtype: "panel",
          layout: "hbox",
          bodyPadding: 10,
          border: 0,
          defaultType: 'textfield',
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [
            {
              fieldLabel: "包装员",
              labelAlign: "right",
              labelWidth: 50
            },
            {
              fieldLabel: "备注",
              labelAlign: "right",
              labelWidth: 50
            },
            {
              fieldLabel: "抵价券总金额",
              labelAlign: "right",
              labelWidth: 80
            },
            {
              fieldLabel: "多付款",
              labelAlign: "right",
              labelWidth: 50
            }
          ]
        },
        {
          xtype: "panel",
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
              text: "<span class=\"key\">X</span> 生成抵价券",
              margin: "0 0 0 10"
            },
            {
              xtype: "button",
              text: "<span class=\"key\">Z</span> 打印",
              margin: "0 0 0 10"
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
            margin: "0 0 0 50"
          },
          {
            xtype: "button",
            text: "会员卡预览",
            margin: "0 0 0 20"
          },
          {
            xtype: "button",
            text: "会员卡打印",
            margin: "0 0 0 20"
          }
          ]
        },
        {
          xtype: "grid",
          margin: "20 0 0 0",
          store: Ext.data.StoreManager.lookup('simpsonsStore'),
          columns: [
          {
            text: '序号',
            dataIndex: 'id1'
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
            text: "<span class=\"key\">C</span> 查询"
          }, {
            text: "<span class=\"key\">P</span> 打印",
            margin: "0 0 0 10"
          }, {
            text: "<span class=\"key\">R</span> 重打",
            margin: "0 0 0 10"
          }]
        }
      ]
    });

    // search.hide();
    //list.hide();
    //add.show();
  }
});