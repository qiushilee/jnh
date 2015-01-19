Ext.require([
  "Ext.data.*",
  "Ext.ux.grid.Printer"
]);

Ext.application({
  name: "JNH",
  launch: function () {
    var sm = Ext.create('Ext.selection.CheckboxModel', {
      checkOnly: true
    });

    var dataList = Ext.create('Ext.data.Store', {
      storeId: 'dataList',
      fields: ["id", 'key', 'deliveryOrderCode', 'packageCode', 'serialNumber', 'mailingDate', 'weight', 'postage', 'bjtimes', 'packaging', 'userName', 'address', 'packageRemark'],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.package.list,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    Ext.create('Ext.data.Store', {
      storeId: "bujiList",
      fields: ['id', 'key', 'packageCode', 'deliveryOrderCode', 'deliveryMethodName', 'sendDate', 'postage', 'weight', 'remark'],
      layout: "fit",
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.package.sendlist,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });


    var printStore = Ext.create('Ext.data.Store', {
      storeId: 'printStore',
      fields: ['key', 'id', 'deliveryOrderCode', 'packageCode', 'serialNumber', 'mailingDate', 'weight', 'postage', 'packaging', 'userName', 'address', 'packageRemark'],
      layout: "fit",
      data: {
        "id": "8",
        "key": 5,
        "deliveryOrderCode": "DO20140722103818",
        "packageCode": null,
        "serialNumber": null,
        "mailingDate": "",
        "weight": "0",
        "postage": "0.00",
        "packaging": null,
        "userName": "",
        "address": "",
        "packageRemark": null
      }
    });


    Ext.create('Ext.data.Store', {
      storeId: 'printCartList',
      fields: ['key', 'id', 'deliveryOrderCode', 'packageCode', 'serialNumber', 'mailingDate', 'weight', 'postage', 'packaging', 'userName', 'address', 'packageRemark'],
      layout: "fit",
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.printcart.packagelist,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    var search = Ext.create("Ext.form.Panel", {
      layout: "hbox",
      url: env.services.web + env.api.package.list,
      bodyPadding: 10,
      defaultType: 'textfield',
      margin: "10 0",
      renderTo: window.$bd,
      items: [
        Ext.create('periodical'),
        {
          fieldLabel: "出货单号",
          name: 'deliveryOrderCode',
          labelWidth: 60,
          width: 150,
          labelAlign: "right"
        },
        {
          fieldLabel: "会员编号",
          name: 'userCode',
          labelWidth: 60,
          width: 150,
          labelAlign: "right"
        },
        {
          fieldLabel: "姓名",
          name: 'userName',
          labelWidth: 40,
          width: 150,
          labelAlign: "right"
        },
        {
          xtype: "datefield",
          format: 'Y-m-d',
          fieldLabel: "邮寄日期",
          name: 'mailingDate',
          labelWidth: 60,
          width: 160,
          labelAlign: "right"
        },

        {
          xtype: "button",
          text: "搜索",
          margin: "0 0 0 20",
          handler: function () {
            searchHandler.call(this, "dataList");
          }
        },
        {
          xtype: "button",
          text: "重置",
          disabled: true,
          margin: "0 0 0 20"
        }
      ]
    });

    var list = Ext.create("Ext.panel.Panel", {
      renderTo: window.$bd,
      items: [
        {
          itemId: "grid",
          height: 155,
          xtype: "grid",
          title: "包裹列表",
          store: Ext.data.StoreManager.lookup('dataList'),
          border: 0,
          columnWidth: 0.5,
          selModel: sm,
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
              text: '包裹单号',
              dataIndex: 'packageCode',
              flex: 1
            },
            {
              text: '流水号',
              dataIndex: 'serialNumber',
              flex: 1
            },
            {
              text: '邮寄日期',
              dataIndex: 'mailingDate',
              flex: 1
            },
            {
              text: '重量',
              dataIndex: 'weight',
              flex: 1
            },
            {
              text: '邮资',
              dataIndex: 'postage',
              flex: 1
            },
            {
              text: '补寄',
              dataIndex: 'bjtimes',
              flex: 1
            },
            {
              text: '包装员',
              dataIndex: 'packaging',
              flex: 1
            },
            {
              text: '姓名',
              dataIndex: 'userName',
              flex: 1
            },
            {
              text: '地址',
              dataIndex: 'address',
              flex: 1
            },
            {
              text: '备注',
              dataIndex: 'packageRemark',
              flex: 1
            }
          ],
          listeners: {
            itemdblclick: function (that, record, item, index, e, eOpts) {
              var form = add.getComponent("form").getForm(),
                data = record.data;

              add.show();
              window.create = false;

              updateForm(form, data);
            }
          }
        }
      ]
    });

    var button = Ext.create("Ext.panel.Panel", {
      renderTo: window.$bd,
      margin: "10 0 0 0",
      border: 0,
      layout: "column",
      items: [
        {
          // 添加到打印购物车
          xtype: "button",
          text: "<span class=\"key\">W</span> 添加",
          handler: function () {
            var record = Ext.ComponentQuery.query("grid")[0]
              .getSelectionModel()
              .getSelection()[0].data;

            Ext.Ajax.request({
              url: env.services.web +  env.api.printcart.packageadd,
              params: {
                id: record.id
              },
              success: function (resp) {
                var data = Ext.JSON.decode(resp.responseText);
                if (data.success) {
                  searchHandler.call(search, "dataList");
                } else {
                  Ext.Msg.alert("添加到打印购物车", data.msg);
                }
              }
            });
          },
          margin: "0 0 0 10"
        },
        {
          xtype: "button",
          text: "查看打印购物车",
          margin: "0 0 0 10",
          handler: function () {
            printCart.show();
            searchHandler.call(printCart.getComponent("print-cart-form"), "printCart");
          }
        },
        {
          xtype: "button",
          text: "补寄",
          handler: function () {
            try {
              var record = Ext.ComponentQuery.query("grid")[0]
                .getSelectionModel()
                .getSelection()[0].data;

              bujiDetail.show();
              bujiDetail.getComponent("bujiForm").getForm().findField("packageId").setValue(record.id);
              Ext.data.StoreManager.lookup("bujiList").load({
                params: {
                  packageId: record.id
                }
              });
            } catch (e) {
              Ext.Msg.alert("补寄", "请选中列表中的一项后再操作");
            }
          },
          margin: "0 0 0 10"
        },
        {
          name: "jhd-print",
          xtype: "button",
          text: "打印设置",
          margin: "0 0 0 10",
          handler: function () {
            window.printHandle.set("package");
          }
        },
        {
          xtype: "button",
          text: "<span class=\"key\">C</span> 预览",
          disabled: true,
          margin: "0 0 0 10"
        },
        {
          xtype: "button",
          text: "<span class=\"key\">B</span> 连续打印",
          margin: "0 0 0 10",
          handler: function () {
            //var data = list.getComponent("grid").getSelectionModel().getSelection()[0].data

            //printStore.loadData(data);
            print.show();
          }
        },
        {
          xtype: "button",
          text: "批量修改",
          margin: "0 0 0 10",
          handler: function () {
            var packageList = list.getComponent("grid").getSelectionModel().getSelection();
            ids = [];

            Ext.Array.each(packageList, function (item, index) {
              var record = item.data;
              ids.push(record.id);
            });
            Ext.ComponentQuery.query("[name=package-ids]")[0].setValue(ids);
            add.show();
          }
        },
        {
          xtype: "button",
          text: "扫描包裹单",
          disabled: true,
          margin: "0 0 0 10"
        },
        {
          xtype: "button",
          text: "导出",
          margin: "0 0 0 10",
          handler: function () {
            var periodicalId = Ext.ComponentQuery.query("[name=periodicalId]")[0].value,
              userCode = Ext.ComponentQuery.query("[name=userCode]")[0].rawValue,
              userName = Ext.ComponentQuery.query("[name=userName]")[0].rawValue,
              deliveryOrderCode = Ext.ComponentQuery.query("[name=deliveryOrderCode]")[0].rawValue,
              mailingDate = Ext.ComponentQuery.query("[name=mailingDate]")[0].rawValue;
            var params = "";
            if (periodicalId > 0)
              params += '/periodicalId/' + periodicalId;
            if (userCode != '')
              params += '/userCode/' + userCode;
            if (userName != '')
              params += '/userName/' + userName;
            if (deliveryOrderCode != '')
              params += '/deliveryOrderCode/' + deliveryOrderCode;
            if (mailingDate != '')
              params += '/mailingDate/' + mailingDate;
            window.open(env.services.web + env.api.package.export + params);

          }
        }
      ]
    });

    var add = Ext.create("Ext.window.Window", {
      title: "包裹详情",
      width: 500,
      layout: 'form',
      bodyPadding: 10,
      defaultType: 'textfield',
      closeAction: 'hide',
      items: [
        {
          itemId: "form",
          xtype: "form",
          items: [
            {
              xtype: "panel",
              border: 0,
              layout: "hbox",
              defaultType: 'textfield',
              bodyStyle: {
                "background-color": "transparent"
              },
              items: [
                {
                  xtype: "hidden",
                  "name": "id"
                },
                {
                  xtype: "hidden",
                  name: "package-ids"
                },
                {
                  disabled: true,
                  fieldLabel: "出货单号",
                  labelWidth: 55,
                  margin: "5 0",
                  labelAlign: "right",
                  name: 'deliveryOrderCode'
                },
                {
                  disabled: true,
                  fieldLabel: "会员编号",
                  labelWidth: 55,
                  margin: "5 0",
                  labelAlign: "right",
                  name: 'userCode'
                }
              ]
            },
            {
              xtype: "panel",
              border: 0,
              layout: "hbox",
              defaultType: 'textfield',
              bodyStyle: {
                "background-color": "transparent"
              },
              items: [{
                disabled: true,
                fieldLabel: "会员姓名",
                labelWidth: 55,
                margin: "5 0",
                labelAlign: "right",
                name: 'userName'
              }, {
                disabled: true,
                fieldLabel: "重量",
                labelWidth: 55,
                margin: "5 0",
                labelAlign: "right",
                name: 'weight'
              }]
            },
            {
              xtype: "panel",
              border: 0,
              layout: "hbox",
              defaultType: 'textfield',
              bodyStyle: {
                "background-color": "transparent"
              },
              items: [{
                disabled: true,
                fieldLabel: "邮编",
                labelWidth: 55,
                margin: "5 0",
                labelAlign: "right",
                name: 'zipCode'
              },
                {
                  disabled: true,
                  fieldLabel: "地址",
                  labelWidth: 55,
                  width: 250,
                  margin: "5 0",
                  labelAlign: "right",
                  name: 'address'
                }]
            },
            {
              xtype: "panel",
              border: 0,
              layout: "hbox",
              defaultType: 'textfield',
              bodyStyle: {
                "background-color": "transparent"
              },
              items: [{
                xtype: "datefield",
                format: 'Y-m-d',
                fieldLabel: "邮寄日期",
                labelWidth: 55,
                margin: "5 0",
                labelAlign: "right",
                name: 'mailingDate'
              }, {
                fieldLabel: "包裹单号",
                labelWidth: 55,
                margin: "5 0",
                labelAlign: "right",
                name: 'packageCode'
              }]
            },
            {
              xtype: "panel",
              border: 0,
              layout: "hbox",
              defaultType: 'textfield',
              bodyStyle: {
                "background-color": "transparent"
              },
              items: [{
                fieldLabel: "邮寄重量",
                labelWidth: 55,
                margin: "5 0",
                labelAlign: "right",
                name: 'weight'
              }, {
                fieldLabel: "邮资",
                labelWidth: 55,
                margin: "5 0",
                labelAlign: "right",
                name: 'postage'
              }]
            },
            {
              xtype: "panel",
              border: 0,
              layout: "hbox",
              defaultType: 'textfield',
              bodyStyle: {
                "background-color": "transparent"
              },
              items: [{
                fieldLabel: "包装员",
                labelWidth: 55,
                margin: "5 0",
                labelAlign: "right",
                name: 'packaging'
              }]
            },
            {
              xtype: "textareafield",
              width: 300,
              height: 100,
              fieldLabel: "备注",
              labelWidth: 55,
              margin: "5 0",
              labelAlign: "right",
              name: 'packageRemark'
            },
          ]
        },
        {
          xtype: "panel",
          border: 0,
          layout: "hbox",
          defaultType: 'button',
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [{
            text: "保存",
            margin: "5 0",
            labelAlign: "right",
            handler: function () {
              var form = add.getComponent("form").getForm(),
                api = env.services.web;

              if (window.create) {
                api += env.api.package.add;
              } else {
                api += env.api.package.change;
              }

              form.url = api;

              if (form.isValid()) {
                form.submit({
                  success: function (form, action) {
                    add.hide();
                    searchHandler.call(search, "dataList");
                  },
                  failure: function (form, action) {
                    Ext.Msg.alert("包裹详情", action.result.msg);
                  }
                });
              }
            }
          }]
        },
      ]
    });

    var print = new Ext.create("Ext.window.Window", {
      title: "包裹打印",
      width: 700,
      bodyPadding: 10,
      closeAction: 'hide',
      items: [
        {
          itemId: "print-form",
          xtype: "form",
          url: env.services.web + env.api.package.list,
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
              labelWidth: 60,
              width: 150,
              name: "deliveryOrderCode"
            },
            {
              fieldLabel: "",
              width: 90,
              name: "deliveryOrderCode2"
            },
            Ext.create("deliveryMethod"),
            {
              xtype: "button",
              text: "搜索",
              margin: "0 0 0 20",
              handler: function () {
                searchHandler.call(print.getComponent("print-form"), "printStore");
              }
            },
            {
              xtype: "button",
              text: "重置",
              margin: "0 0 0 10",
              handler: function () {
                var form = this.up("form").getForm();
                form.reset();
              }
            }
          ]
        },
        {
          itemId: "list",
          xtype: "grid",
          height: 155,
          store: Ext.data.StoreManager.lookup('printStore'),
          margin: "10 0 0 0",
          columns: [{
            text: '序号',
            dataIndex: 'key'
          }, {
            text: '出货单号',
            dataIndex: 'deliveryOrderCode'
          }, {
            text: '流水号',
            dataIndex: 'packageCode'
          }, {
            text: '地址',
            dataIndex: 'address',
            flex: 1
          }, {
            text: '姓名',
            dataIndex: 'userName'
          }, {
            text: '寄送方式',
            dataIndex: 'deliveryMethod'
          }, {
            text: '备注',
            dataIndex: 'packageRemark',
          }]
        },
        {
          layout: "hbox",
          bodyPadding: 10,
          border: 0,
          defaultType: 'textfield',
          width: 190,
          style: {
            float: "right"
          },
          bodyStyle: {
            "background-color": "transparent"
          },
          items: [
            {
              xtype: "button",
              text: "打印",
              margin: "0 0 0 10",
              disabled: true,
              handler: function () {
                ;
              }
            },
            {
              xtype: "button",
              text: "重打",
              disabled: true,
              margin: "0 0 0 10"
            }
          ]
        }
      ]
    });

    var printCart = new Ext.create("Ext.window.Window", {
      title: "打印购物车",
      width: 1000,
      bodyPadding: 10,
      closeAction: 'hide',
      items: [{
        itemId: "print-cart-form",
        xtype: "form",
        layout: "hbox",
        bodyPadding: 10,
        border: 0,
        defaultType: 'textfield',
        bodyStyle: {
          "background-color": "transparent"
        },
        items: [{
          xtype: "combobox",
          fieldLabel: "寄送方式",
          labelWidth: 60,
          labelAlign: "right"
        }, {
          fieldLabel: "编号",
          labelWidth: 40,
          labelAlign: "right"
        }, {
          xtype: "button",
          text: "搜索",
          margin: "0 0 0 20",
          handler: function() {
            searchHandler.call(this.up("form"), "printCartList");
          }
        }, {
          xtype: "button",
          text: "重置",
          margin: "0 0 0 10",
          handler: function() {
            this.up("form").getForm().reset();
          }
        }]
      }, {
        xtype: "grid",
        height: 155,
        store: Ext.data.StoreManager.lookup('printCart'),
        height: 155,
        margin: "10 0 0 0",
        columns: [{
          text: '序号',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '出货单号',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '会员姓名',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '寄送方式',
          dataIndex: 'id1',
          flex: 2
        }, {
          text: '流水号',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '寄送日期',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '单号重量',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '邮资',
          dataIndex: 'id1',
          flex: 1
        }, {
          text: '包装员',
          dataIndex: 'id1',
          flex: 1
        }],
        listeners: function(that) {
          window.updateForm(printCart.getComponent("print-cart-form"), that.record.data);
        }
      }, {
        layout: "hbox",
        bodyPadding: 10,
        border: 0,
        defaultType: 'textfield',
        width: "22%",
        style: {
          float: "right"
        },
        bodyStyle: {
          "background-color": "transparent"
        },
        items: [
          {
            xtype: "button",
            text: "<span class=\"key\">S</span> 保存",
            margin: "0 0 0 10",
            handler: function() {
              var form = printCart.getComponent("print-cart-form");
              form.getForm.submit({
                success: function(f, action) {
                  searchHandler.call(form, "printCart");
                }
              })
            }
          },
          {
            xtype: "button",
            text: "<span class=\"key\">D</span> 打印",
            disabled: true,
            margin: "0 0 0 10"
          }
        ]
      }]
    });

    var bujiDetail = Ext.create("Ext.window.Window", {
      title: "补寄详情",
      width: 700,
      layout: 'form',
      bodyPadding: 5,
      defaultType: 'textfield',
      closeAction: 'hide',
      fieldDefaults: {
        labelAlign: 'top'
      },
      bodyStyle: {
        background: "#fff"
      },
      items: [
        {
          itemId: "bujiForm",
          xtype: "form",
          border: 0,
          items: [
            {
              xtype: "hiddenfield",
              name: "packageId",
            },
            {
              xtype: "hiddenfield",
              name: "id",
            },
            {
              layout: "hbox",
              defaultType: 'textfield',
              border: 0,
              items: [
                {
                  xtype: "datefield",
                  format: 'Y-m-d',
                  fieldLabel: "补寄日期",
                  name: 'sendDate',
                  labelWidth: 60,
                  width: 160,
                  labelAlign: "right"
                },
                Ext.create("deliveryMethod", {
                  labelWidth: 60,
                  width: 160,
                }),
                {
                  fieldLabel: "包裹单号",
                  name: 'packageCode',
                  labelWidth: 60,
                  width: 160,
                  labelAlign: "right"
                }
              ]
            },
            {
              layout: "hbox",
              defaultType: 'textfield',
              border: 0,
              margin: "10 0 0 0",
              items: [
                {
                  fieldLabel: "邮资",
                  name: 'postage',
                  labelWidth: 60,
                  width: 160,
                  labelAlign: "right"
                },
                {
                  fieldLabel: "重量",
                  name: 'weight',
                  labelWidth: 60,
                  width: 160,
                  labelAlign: "right"
                },
                {
                  fieldLabel: "备注",
                  name: 'remark',
                  labelWidth: 60,
                  width: 160,
                  labelAlign: "right"
                }
              ]
            },
            {
              xtype: "button",
              text: "保存",
              margin: "10 0 0 10",
              handler: function () {
                var form = this.up("form").getForm();
                form.url = env.services.web + env.api.package.sendchange;

                form.submit({
                  success: function (form, action) {
                    form.reset();
                  },
                  failure: function (form, action) {
                    Ext.Msg.alert("保存", action.result.msg);
                  }
                });
              }
            },
            {
              xtype: "button",
              text: "删除",
              margin: "10 0 0 30",
              handler: function () {
                var form = this.up("form").getForm();
                form.url = env.services.web + env.api.package.del;

                form.submit({
                  success: function (form, action) {
                    form.reset();
                    Ext.data.StoreManager.lookup("bujiList").load({
                      params: {
                        packageId: form.findField("packageId").value
                      }
                    });
                  },
                  failure: function (form, action) {
                    Ext.Msg.alert("新增", action.result.msg);
                  }
                });
              }
            }
          ]
        },
        {
          xtype: "grid",
          height: 155,
          margin: "20 0 0 0",
          store: Ext.data.StoreManager.lookup('bujiList'),
          columns: [
            {
              text: '序号',
              dataIndex: 'key'
            },
            {
              text: '补寄日期',
              dataIndex: 'sendDate'
            },
            {
              text: '寄送方式',
              dataIndex: 'deliveryMethodName'
            },
            {
              text: '包裹单号',
              dataIndex: 'packageCode'
            },
            {
              text: '邮资',
              dataIndex: 'postage'
            },
            {
              text: '重量',
              dataIndex: 'weight'
            },
            {
              text: '备注',
              dataIndex: 'remark'
            }
          ],
          listeners: {
            itemdblclick: function (that, record, item, index, e, eOpts) {
              var form = bujiDetail.getComponent("bujiForm").getForm(),
                data = record.data;

              updateForm(form, data);
            }
          }
        }
      ]
    });

    window.printHandle.get({
      $el: button,
      form: search.getForm(),
      type: "package",
      margin: "0 0 0 20",
      title: Ext.ComponentQuery.query("[itemId=grid]")[0].title
    });
  }
});
