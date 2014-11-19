Ext.require([
  "Ext.data.*",
  "Ext.ux.grid.Printer"
]);

Ext.application({
  name: "JNH",
  launch: function() {
    // 厂商管理列表
    var companyList = Ext.create('Ext.data.Store', {
      storeId: 'companyList',
      fields: ["id",'key', "periodicalId", "companyCode", "title", "linkMan", "address", "type", "zipCode", "mobile1", "mobile2", "productClass", "fax", "email", "qq", "website", "needTime", "payMethod", "openingBank", "openingAccount", "remark", "addDate", "delFlag"],
      layout: "fit",
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.company.list,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    var search = Ext.create("Ext.form.Panel", {
      layout: "hbox",
      url: env.services.web + env.api.company.list,
      bodyPadding: 10,
      defaultType: 'textfield',
      margin: "10 0",
      renderTo: window.$bd,
      border: 0,
      items: [
        Ext.create("periodical", {
          labelWidth: 60,
        }),
      {
        fieldLabel: "厂商编号",
        name:'companyCode1',
        labelWidth: 60,
        labelAlign: "right"
      }, {
        fieldLabel: "~",
        labelWidth: 20,
        labelAlign: "right",
        name:'companyCode2'
      }, {
        fieldLabel: "地址",
        name:'address',
        labelWidth: 40,
        labelAlign: "right"
      }, {
        fieldLabel: "货号",
        name:'productCode',
        labelWidth: 40,
        labelAlign: "right"
      }, {
        xtype: "button",
        text: "搜索",
        margin: "0 0 0 20",
        handler: function() {
          searchHandler.call(this, "companyList");
        }
      }, {
        xtype: "button",
        text: "重置",
        margin: "0 0 0 20",
        handler: function() {
          this.up("form").getForm().reset();
        }
      }]
    });
    
    // 厂商管理列表
    var cs = Ext.create('Ext.grid.Panel', {
      title: '厂商管理列表',
      store: Ext.data.StoreManager.lookup('companyList'),
      height: 355,
      columns: [{
        text: '序号',
        dataIndex: 'key'
      },{
        text: '厂商编号',
        dataIndex: 'companyCode'
      }, {
        text: '厂商名称',
        dataIndex: 'title',
        flex: 1
      }, {
        text: '地址',
        dataIndex: 'address',
        flex: 1
      }, {
        text: '联系人',
        dataIndex: 'linkMan',
        flex: 1
      }, {
        text: '电话1',
        dataIndex: 'mobile1',
        flex: 1
      }, {
        text: '电话2',
        dataIndex: 'mobile2',
        flex: 1
      }, {
        text: 'QQ',
        dataIndex: 'qq',
        flex: 1
      }],
      listeners: {
        itemdblclick: function( that, record, item, index, e, eOpts) {
          var form = win.getComponent("form").getForm(),
              currentProduct = record.data;
          form.url = env.services.web + env.api.company.change;
          form.reset();
          window.updateForm(form, currentProduct);
          win.show();
        }
      },
      renderTo: window.$bd
    });

    Ext.create("Ext.Panel", {
      layout: "hbox",
      border: 0,
      defaultType: 'textfield',
      margin: "10 0 0 0",
      renderTo: window.$bd,
      items: [{
        xtype: "button",
        text: "<span class=\"key\">A</span> 增加",
        handler: function() {
          var form = win.getComponent("form").getForm();
          form.url = env.services.web + env.api.company.add;
          form.reset();
          win.show();
        }
      }, {
        xtype: "button",
        text: "删除",
        margin: "0 0 0 10",
        handler: function() {
          var record = cs.getSelectionModel()
          .getSelection()[0].data;

          Ext.Msg.confirm("删除", "确认删除" + record.title + "吗？", function(type) {
            if (type === "yes") {
              Ext.Ajax.request({
                url: env.services.web + env.api.company.del,
                params: {
                  id: record.id
                },
                success: function(resp) {
                  var data = Ext.JSON.decode(resp.responseText);
                  console.log(data);
                  searchHandler.call(search.getForm(), "companyList");
                },
                failure: function(resp) {
                  var data = Ext.JSON.decode(resp.responseText);
                  Ext.Msg.alert("删除", data.msg);
                }
              });
            }
          });
        }
      }, {
        xtype: "button",
        text: "导入",
        margin: "0 0 0 10",
        handler: function() {
          upload.show();
        }
      }, {
        xtype: "button",
        text: "打印",
        margin: "0 0 0 10",
        handler: function () {
          Ext.ux.grid.Printer.opt = {
            title: "厂商资料一览表",
            name: document.body.dataset.user
          };
          Ext.ux.grid.Printer.print(cs);
        }
      },
        {
          name: "jhd-print",
          xtype: "button",
          text: "打印设置",
          margin: "0 0 0 10",
          handler: function () {
            window.printHandle.set("company");
          }
        }, {
        xtype: "button",
        text: "复制",
        margin: "0 0 0 10",
        handler: function() {
          var record = cs.getSelectionModel()
          .getSelection()[0].data;

          Ext.Ajax.request({
            url: env.services.web + env.api.company.copy,
            params: {
              companyId: record.id
            },
            success: function(resp) {
              searchHandler.call(search.getForm(), "companyList");
            },
            failure: function(resp) {
              var data = Ext.JSON.decode(resp.responseText);
              Ext.Msg.alert("复制", data.msg);
            }
          });
        }
      }]
    });

    var win = new Ext.create("Ext.window.Window", {
      title: "厂商详情",
      layout: "column",
      width: 800,
      height: 570,
      items: [{
        itemId: "form",
        xtype: "form",
        columnWidth: 0.41,
        title: "厂商输入页面",
        layout: 'vbox',
        width: 500,
        bodyPadding: 5,
        defaultType: 'textfield',
        items: [
          {
            xtype: "hiddenfield",
            name: "id"
          },
          Ext.create("periodical"),
          {
            fieldLabel: "厂商编号",
            name: "companyCode",
            labelWidth: 60,
            width: 300,
            labelAlign: "right"
          },
         {
          fieldLabel: '地址',
          name: "address",
          labelWidth: 60,
          width: 300,
          labelAlign: "right",
        }, {
          fieldLabel: '联系人',
          name: "linkMan",
          labelWidth: 60,
          width: 300,
          labelAlign: "right"
        }, {
          fieldLabel: '厂商名称',
          name: "title",
          labelWidth: 60,
          width: 300,
          labelAlign: "right"
        }, {
          fieldLabel: '电话1',
          name: "mobile1",
          labelWidth: 60,
          width: 300,
          labelAlign: "right"
        }, {
          fieldLabel: '电话2',
          name: "mobile2",
          labelWidth: 60,
          width: 300,
          labelAlign: "right"
        }, {
          fieldLabel: '产品类别',
          name: "productClass",
          labelWidth: 60,
          width: 300,
          labelAlign: "right",
        }, {
          fieldLabel: '邮编',
          name: "zipCode",
          labelWidth: 60,
          width: 300,
          labelAlign: "right",
        }, {
          fieldLabel: "qq",
          name: "qq",
          labelWidth: 60,
          width: 300,
          labelAlign: "right"
        }, {
          fieldLabel: "网址",
          name: "website",
          labelWidth: 60,
          width: 300,
          labelAlign: "right"
        }, {
          fieldLabel: "邮箱",
          name: "email",
          labelWidth: 60,
          width: 300,
          labelAlign: "right"
        }, {
          fieldLabel: "开户行",
          name: "openingBank",
          labelWidth: 60,
          width: 300,
          labelAlign: "right"
        }, {
          fieldLabel: "账号",
          name: "openingAccount",
          labelWidth: 60,
          width: 300,
          labelAlign: "right"
        }, {
          xtype: "textarea",
          fieldLabel: "备注",
          name: "remark",
          labelWidth: 60,
          width: 300,
          height: 100,
          labelAlign: "right"
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
              var form = win.getComponent("form").getForm();
              form.submit({
                success: function(form, action) {
                  form.reset();
                  win.hide();
                  searchHandler.call(search.getForm(), "companyList");
                },
                failure: function(form, action) {
                  Ext.Msg.alert("保存", action.result.msg);
                }
              });
            }
          }, {
            xtype:'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">E</span> 返回",
            handler: function() {
              win.hide();
            }
          }, {
            xtype:'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">A</span> 增加",
            handler: function() {
              var form = win.getComponent("form").getForm();
              form.url = env.services.web + env.api.company.add;
              form.submit({
                success: function(form, action) {
                  form.reset();
                  searchHandler.call(search.getForm(), "companyList");
                },
                failure: function(form, action) {
                  console.log(action.result)
                }
              });
            }
          }]
        }]
        },
        {
          xtype: "panel",
          columnWidth: 0.59,
          bodyPadding: 10,
          border: 0,
          // +TODO: 类型可下拉选择
          items: [{
            xtype: "combobox",
            fieldLabel: "类型",
            labelWidth: 40,
            margin: "10"
          }, {
            xtype: "grid",
            title: '进转损',
            store: Ext.data.StoreManager.lookup('jhStore'),
            columns: [{
              text: '类型',
              dataIndex: 'name'
            }, {
              text: '流水号',
              dataIndex: 'id'
            }, {
              text: '日期',
              dataIndex: 'adder'
            }, {
              text: '金额',
              dataIndex: 'man',
              flex: 1
            }]
          }]
        },
      ],
      closeAction: 'hide',
    });

    var upload = new Ext.create("Ext.window.Window", {
      title: "厂商详情",
      layout: "column",
      bodyStyle: {
        background: "#fff"
      },
      bodyPadding: 50,
      items: [
        {
          xtype: "form",
          border: 0,
          url: env.services.web + env.api.company.import,
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
              html: '<a href="/template/company.xls" target="_blank">下载模板</a>',
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
                    searchHandler.call(search.getForm(), "companyList");
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
