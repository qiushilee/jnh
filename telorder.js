/*电话订购*/
Ext.application({
  name: "JNH",
  launch: function() {
    window.telorderCurrent = {};

    //电话订购列表
    Ext.create('Ext.data.Store', {
      storeId: 'orderList',
      fields: ["memberId","key", "id", "periodicalId", "orderRemittanceId", "deliveryOrderCode", "packageCode", "userCode", "serialNumber", "userName", "realName", "totalSales", "receivedRemittance", "unDiscountAmount", "preferentialTicket", "youthStuck", "discount", "overpaidAmount", "receivableAmount", "postage", "consignee", "mobile", "zipCode", "address", "packaging", "remark", "deliveryMethod", "deliveryMethodName"],
      layout: "fit",
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.telorder.list.order,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    Ext.data.StoreManager.lookup("orderList").load({
      params: {
        id: location.search.replace(/.*=/, "")
      },
      callback: function(records) {
        console.log(records);
      }
    });

    //电话订购右侧列表
    var orderproduct = Ext.create('Ext.data.Store', {
      storeId: 'orderproduct',
      fields: ['id','productCode', 'name', 'number', 'price','amount', 'remark'],
      layout: "fit"
    });

    //搜索栏
    var search = Ext.create("Ext.form.Panel", {
      layout: "hbox",
      url: env.services.web + env.api.telorder.list.order,
      bodyPadding: 10,
      defaultType: 'textfield',
      margin: "10 0",
      renderTo: window.$bd,
      items: [Ext.create('periodical'),
        {
          fieldLabel: "会员编号",
          name: 'userCode',
          labelWidth: 60,
          width: 150,
          labelAlign: "right"
        }, {
          fieldLabel: "姓名",
          name: 'realName',
          labelWidth: 60,
          width: 150,
          labelAlign: "right"
        }, {
          fieldLabel: "单号",
          name: 'orderCode',
          labelWidth: 60,
          width: 150,
          labelAlign: "right"
        }, {
          xtype: "button",
          text: "搜索",
          margin: "0 0 0 20",
          handler: function() {
            searchHandler.call(this, "orderList");
          }
        }, {
          xtype: "button",
          text: "重置",
          margin: "0 0 0 20",
          handler: function() {
            var form = this.ownerCt.getForm();
            form.reset();
          }
        }]
    });

    var list = Ext.create('Ext.Panel', {
      layout: "column",
      border: 0,
      renderTo: window.$bd,
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
          margin: "0 0 0 70",
          items: [{
            xtype: "button",
            text: "<span class=\"key\">Q</span> 增加",
            handler: function() {
              var form = this.ownerCt.ownerCt.getComponent("member").getForm();
              form.url = env.services.web + env.api.telorder.add.member;
              if (form.isValid()) {
                form.submit({
                  success: function(form, action) {
                    telorderCurrent.memberId = action.result.id;
                    Ext.Msg.alert("增加", action.result.msg);
                  },
                  failure: function(form, action) {
                    Ext.Msg.alert("增加", action.result.msg);
                  }
                });
              }
            }
          }, {
            xtype: "button",
            text: "<span class=\"key\">N</span> 修改",
            handler: function() {
              var form = this.ownerCt.ownerCt.getComponent("member").getForm();
              form.url = env.services.web + env.api.telorder.change.member;
              form.submit({
                success: function(form, action) {
                  Ext.Msg.alert("保存", action.result.msg);
                },
                failure: function(form, action) {
                  Ext.Msg.alert("保存", action.result.msg);
                }
              });
            },
            margin: "0 0 0 20"
          }, {
            xtype: "button",
            text: "删除",
            handler: function() {
              try {
                var $container = this.ownerCt.ownerCt,
                    id = $container.getComponent("grid").getSelectionModel().getSelection()[0].data.id;
                Ext.Ajax.request({
                  url: env.services.web + env.api.telorder.del.all,
                  params: {
                    id: id
                  },
                  success: function(resp) {
                    Ext.data.StoreManager.lookup('orderList').load;
                  }
                });
              } catch(e) {
                Ext.Msg.alert("删除操作", "请单击表中的一项后再删除");
              }
            },
            margin: "0 0 0 20"
          }]
        }, {
          itemId: "member",
          xtype: "form",
          border: 0,
          items: [
            {
              xtype:'panel',
              layout: "hbox",
              border: 0,
              defaultType: 'textfield',
              margin: "20 0 0 0",
              items: [{
                xtype: "hiddenfield",
                name: "id"
              },
              Ext.create('deliveryMethod'),
              {
                fieldLabel: "青春贴",
                width:220,
                labelAlign: "right",
                name:'youthStuck'
              }, {
                xtype: "label",
                text: "(0枚)"
              }]
            }, {
              xtype:'panel',
              layout: "hbox",
              border: 0,
              defaultType: 'textfield',
              margin: "10 0 0 0",
              items: [{
                fieldLabel: "姓名",
                labelAlign: "right",
                name:'realName'
              }, {
                fieldLabel: "收件人",
                labelAlign: "right",
                name:'consignee'
              }]
            }, {
              xtype: 'textfield',
              fieldLabel: "地址",
              width: 470,
              margin: "10 0 0 0",
              labelAlign: "right",
              name:'address'
            }, {
              xtype:'panel',
              layout: "hbox",
              border: 0,
              defaultType: 'textfield',
              margin: "10 0 0 0",
              items: [{
                fieldLabel: "邮编",
                labelAlign: "right",
                name:'zipCode'
              }, {
                fieldLabel: "电话",
                labelAlign: "right",
                name:'mobile'
              }]
            }, {
              xtype: 'textfield',
              fieldLabel: "备注",
              margin: "10 0 0 0",
              width: 470,
              labelAlign: "right",
              name:'remark'
            }
          ]
        }, {
          itemId: "grid",
          xtype: "grid",
          store: Ext.data.StoreManager.lookup('orderList'),
          margin: "20 0 0 0",
          columns: [
            {
              text: '序号',
              dataIndex: 'key',
              flex: 1
            },
            {
              text: '出货单号',
              dataIndex: 'deliveryOrderCode',
              flex: 1
            },
            {
              text: '抵价券',
              dataIndex: 'preferentialTicket',
              flex: 1
            },
            {
              text: '不打折金额',
              dataIndex: 'unDiscountAmount'
            },
            {
              text: '青春贴',
              dataIndex: 'youthStuck',
              flex: 1
            },
            {
              text: '寄送方式',
              dataIndex: 'deliveryMethodName',
              flex: 1
            },
            {
              text: '邮资',
              dataIndex: 'postage',
              flex: 1
            },
            {
              text: '应付款',
              dataIndex: 'receivableAmount',
              flex: 1
            }
          ],
          listeners: {
            itemdblclick: function( that, record, item, index, e, eOpts) {
              var $container = this.ownerCt,
                  $sidebar = $container.ownerCt.getComponent("sidebar"),
                  $sidebarForm = $sidebar.getComponent("searchbar").getForm(),
                  form = $container.getComponent("member").getForm(),
                  currentData = record.data;

              window.telorderCurrent = currentData;
              searchHandler.call($sidebarForm, "orderproduct");
              $sidebarForm.findField("deliveryorderId").setValue(currentData.id);
              if (currentData.deliveryOrderCode) {
                $sidebarForm.findField("deliveryOrderCode").setValue(currentData.deliveryOrderCode);
                $sidebar.getComponent("searchbar").getComponent("deliveryOrderCode").setDisabled(true);
              } else {
                $sidebar.getComponent("searchbar").getComponent("deliveryOrderCode").setDisabled(false);
              }
              $sidebar.getComponent("detail").getForm().findField("deliveryorderId").setValue(currentData.id);
              updateForm(form, currentData);
            }
          }
        }, {
          xtype:'panel',
          layout: "hbox",
          border: 0,
          defaultType: 'textfield',
          margin: "20 0 0 0",
          items: [{
            xtype: "button",
            text: "<span class=\"key\">W</span>删除记录",
            handler: function() {
              try {
                var id = list.getComponent("grid").getSelectionModel().getSelection()[0].data.id;
                Ext.Ajax.request({
                  url: env.services.web + env.api.telorder.del.record,
                  params: {
                    id: id
                  },
                  success: function(resp) {
                    var data = Ext.JSON.decode(resp.responseText);
                    Ext.data.StoreManager.lookup('orderList').loadData(data.list);
                  }
                });
              } catch(e) {
                Ext.Msg.alert("删除操作", "请单击表中的一项后再删除");
              }
            },
            margin: "0 0 0 20"
          }, {
            xtype: "button",
            text: "删除",
            handler: function() {
              try {
                var id = list.getComponent("grid").getSelectionModel().getSelection()[0].data.id;
                Ext.Ajax.request({
                  url: env.services.web + env.api.telorder.del.member,
                  params: {
                    id: id
                  },
                  success: function(resp) {
                    var data = Ext.JSON.decode(resp.responseText);
                    Ext.data.StoreManager.lookup('orderList').loadData(data.list);
                  }
                });
              } catch(e) {
                Ext.Msg.alert("删除操作", "请单击表中的一项后再删除");
              }
            },
            margin: "0 0 0 20"
          }]
        }]
      }, {
        itemId: "sidebar",
        xtype: "panel",
        border: 0,
        columnWidth: 0.49,
        style: {
          float: "right",
        },
        items: [{
          itemId: "searchbar",
          xtype:'form',
          layout: "hbox",
          url: env.services.web + env.api.telorder.list.orderproduct,
          border: 0,
          items: [{
            itemId: "deliveryOrderCode",
            xtype: "button",
            text: "出货单号",
            handler: function() {
              var self = this,
                  form = this.ownerCt.getForm(),
                  detailForm = this.ownerCt.ownerCt.getComponent("detail").getForm();
              if (telorderCurrent.memberId === "") {
                Ext.Msg.alert("生成出货单号", "请先增加会员");
              } else {
                Ext.Ajax.request({
                  url: env.services.web + env.api.deliverorder.telorderdelivercode,
                  params: {
                    memberId: telorderCurrent.memberId
                  },
                  success: function(resp) {
                    var data = Ext.JSON.decode(resp.responseText);
                    form.findField("deliveryorderId").setValue(data.id);
                    detailForm.findField("deliveryorderId").setValue(data.id);
                    form.findField("deliveryOrderCode").setValue(data.code);
                    self.setDisabled(true);
                  },
                  failure: function(resp) {
                    var data = Ext.JSON.decode(resp.responseText);
                    Ext.Msg.alert("生成出货单号", data.msg);
                  }
                });
              }
            }
          },{
            xtype: "hiddenfield",
            name: "deliveryorderId"
          },{
            xtype: "textfield",
            width: 70,
            margin: "0 10 0 20",
            name: "deliveryOrderCode"
          },  {
            xtype: "textfield",
            fieldLabel: "货号",
            labelWidth : 30,
            width: 100,
            labelAlign: "right",
            margin: "0 10 0 20",
            name:"productCode"
          }, {
            xtype: "button",
            text: "搜索",
            float:"right",
            handler: function() {
              searchHandler.call(this, "orderproduct");
            }
          }]
        }, {
          itemId: "detail",
          xtype:'form',
          bodyPadding: 5,
          margin: "10 0 0 0",
          items: [{
            itemId: "order",
            xtype:'form',
            layout: "hbox",
            border: 0,
            defaultType: 'textfield',
            margin: "10 0 0 0",
            items: [{
              fieldLabel: "货号",
              labelWidth : 30,
              width: 100,
              labelAlign: "right",
              name:"productCode"
            }, {
              xtype: "hiddenfield",
              name: "id"
            }, {
              xtype: "hiddenfield",
              name: "deliveryorderId"
            }, {
              fieldLabel: "数量",
              labelWidth : 50,
              width: 120,
              labelAlign: "right",
              name:"number"
            }, {
              fieldLabel: "备注",
              labelWidth : 50,
              width: 250,
              labelAlign: "right",
              name:"remark"
            }]
          }, {
            itemId: "grid",
            xtype: "grid",
            store: Ext.data.StoreManager.lookup('orderproduct'),
            margin: "10 0 0 0",
            columns: [{
              text: '序号',
              dataIndex: 'id'
            }, {
              text: '货号',
              dataIndex: 'productCode',
              flex: 1
            }, {
              text: '品名',
              dataIndex: 'name',
              flex: 1
            }, {
              text: '数量',
              dataIndex: 'number',
              flex: 1
            }, {
              text: '单价',
              dataIndex: 'price',
              flex: 1
            }, {
              text: '金额',
              dataIndex: 'amount',
              flex: 1
            }, {
              text: '备注',
              dataIndex: 'remark',
              flex: 1
            }],
            listeners: {
              itemdblclick: function( that, record, item, index, e, eOpts) {
                var detail = this.ownerCt.ownerCt.getComponent("detail");
                window.updateForm(detail.getForm(), record.data);
              }
            }
          }, {
            xtype:'panel',
            layout: "hbox",
            border: 0,
            defaultType: 'textfield',
            margin: "10 0 0 0",
            items: [{
              xtype: "button",
              text: "<span class=\"key\">A</span> 增加",
              handler: function() {
                var $container = this.ownerCt.ownerCt.ownerCt,
                    form = $container.getComponent("detail").getForm();
                form.url = env.services.web + env.api.telorder.add.order;
                form.submit({
                  success: function(form, action) {
                    form.reset();
                    searchHandler.call($container.getComponent("searchbar").getForm(), "orderproduct");
                  },
                  failure: function(form, action) {
                    Ext.Msg.alert("增加", action.result.msg);
                  }
                });
              }
            }, {
              xtype: "button",
              text: "<span class=\"key\">D</span> 删除",
              handler: function() {
                try {
                  var $container = this.ownerCt.ownerCt.ownerCt,
                      id = this.ownerCt.ownerCt.getComponent("grid").getSelectionModel().getSelection()[0].data.id;
                  Ext.Ajax.request({
                    url: env.services.web + env.api.telorder.del.order,
                    params: {
                      id: id
                    },
                    success: function(resp) {
                      searchHandler.call($container.getComponent("searchbar").getForm(), "orderproduct");
                    }
                  });
                } catch(e) {
                  Ext.Msg.alert("删除操作", "请单击表中的一项后再删除");
                }
              },
              margin: "0 0 0 10"
            }, {
              xtype: "button",
              text: "<span class=\"key\">M</span> 修改",
              handler: function() {
                var $container = this.ownerCt.ownerCt.ownerCt,
                    form = $container.getComponent("detail").getForm();
                form.url = env.services.web + env.api.telorder.change.order;
                form.submit({
                  success: function(form, action) {
                    Ext.Msg.alert("修改", action.result.msg, function() {
                      searchHandler.call($container.getComponent("searchbar").getForm(), "orderproduct");
                    });
                  },
                  failure: function(form, action) {
                    Ext.Msg.alert("修改", action.result.msg);
                  }
                });
              },
              margin: "0 0 0 10"
            }, {
              xtype: "button",
              text: "<span class=\"key\">H</span> 预览",
              margin: "0 0 0 10"
            }, {
              xtype: "button",
              text: "<span class=\"key\">R</span>批量打印",
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
        width: 270,
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
        }, {
          xtype: "button",
          text: "重打",
          margin: "0 0 0 10"
        }]
      }]
    });

    // search.hide();
    // list.hide();
    // add1.show();
    //print.show();
  }
});
