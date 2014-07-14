Ext.application({
  name: "JNH",
  launch: function() {


      // 厂商管理列表
      var companyList = Ext.create('Ext.data.Store', {
        storeId: 'companyList',
        fields: ['companyCode', 'address', 'linkMan', 'mobile1', "mobile2", "email"],
        layout: "fit",
        autoLoad: true,
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
      renderTo: document.body,
      border: 0,
      items: [{
        fieldLabel: "期数",
        name: 'periodicalId',
        labelWidth: 40,
        width: 120,
        labelAlign: "right"
      }, {
        fieldLabel: "厂商编号",
        name:'companyCode',
        labelWidth: 60,
        labelAlign: "right"
      }, {
        fieldLabel: "~",
        labelWidth: 20,
        labelAlign: "right"
      }, {
        fieldLabel: "地址",
        name:'address',
        labelWidth: 40,
        labelAlign: "right"
      }, {
        fieldLabel: "邮箱",
        name:'email',
        labelWidth: 40,
        labelAlign: "right"
      }, {
        xtype: "button",
        text: "搜索",
        margin: "0 0 0 20",
        handler: function() {
          var form = this.ownerCt.ownerCt.getComponent("searchBar");
          if (form.isValid()) {
            // TODO 接口需要加上 success: true
            form.submit({
              success: function(form, action) {
                console.log(action)
              },
              failure: function(form, action) {
                companyList.loadData(action.result.list);
              }
            });
          }
        }
      }, {
        xtype: "button",
        text: "重置",
        margin: "0 0 0 20"
      }]
    });
    
    // 厂商管理列表
    var cs = Ext.create('Ext.grid.Panel', {
      title: '厂商管理列表',
      store: Ext.data.StoreManager.lookup('companyList'),
      selModel:Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE"}),
      columns: [{
        text: '厂商编号',
        dataIndex: 'companyCode'
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
        text: 'email',
        dataIndex: 'email',
        flex: 1
      }],
      renderTo: Ext.getBody()
    });

    Ext.create("Ext.Panel", {
      layout: "hbox",
      border: 0,
      defaultType: 'textfield',
      margin: "10 0 0 0",
      renderTo: Ext.getBody(),
      items: [{
        xtype: "button",
        text: "<span class=\"key\">A</span> 增加",
        handler: function() {
          win.show();
        }
      }, {
        xtype: "button",
        text: "导入",
        margin: "0 0 0 10"
      }, {
        xtype: "button",
        text: "打印",
        margin: "0 0 0 10"
      }, {
        xtype: "button",
        text: "复制",
        margin: "0 0 0 10"
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
        url: env.services.web + env.api.company.add,
        items: [Ext.create("periodical"), {
           fieldLabel: "厂商编号",
           name: "companyCode",
           labelWidth: 60,
           width: 300,
           labelAlign: "right"
         },{
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
              form.url = env.services.web + env.api.company.change;
              if (form.isValid()) {
                form.submit({
                  success: function(form, action) {
                    form.reset();
                    win.hide();
                    companyList.load();
                  },
                  failure: function(form, action) {
                    console.log(action.result)
                  }
                });
              }
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
              if (form.isValid()) {
                form.submit({
                  success: function(form, action) {
                    form.reset();
                    win.hide();
                    companyList.load();
                  },
                  failure: function(form, action) {
                    console.log(action.result)
                  }
                });
              }
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
  }
});
