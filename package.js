Ext.application({
  name: "JNH",
  launch: function () {

     var dataList = Ext.create('Ext.data.Store', {
      storeId: 'dataList',
      fields: ['key', 'deliveryOrderCode', 'packageCode','serialNumber','mailingDate','weight','postage','bjtimes','packaging','userName','address','packageRemark'],
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

    var printStore = Ext.create('Ext.data.Store', {
      storeId: 'printStore',
      fields: ['key', 'deliveryOrderCode', 'packageCode','serialNumber','mailingDate','weight','postage','packaging','userName','address','packageRemark'],
      layout: "fit",
      data: {
        "id":"8","key":5,"deliveryOrderCode":"DO20140722103818","packageCode":null,"serialNumber":null,"mailingDate":"","weight":"0","postage":"0.00","packaging":null,"userName":"","address":"","packageRemark":null
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
       {
         //TODO 更换成统一的periodical组件
         xtype: "combobox",
         fieldLabel: "期数",
         store: Ext.create("Ext.data.Store", {
           fields: ["title", "id"],
           autoLoad: true,
           proxy: {
             type: 'ajax',
             url: env.services.web + env.api.periodical.list,
             reader: {
               type: 'json',
               root: 'list'
             }
           }
         }),
         labelWidth: 60,
         displayField: "title",
         valueField: "id",
         labelAlign: "right",
         name: "periodicalId"
        },
        {
          fieldLabel: "出货单号",
          name:'deliveryOrderCode',
          labelWidth: 60,
          width: 150,
          labelAlign: "right"
        },
        {
          fieldLabel: "会员编号",
          name:'userCode',
          labelWidth: 60,
          width: 150,
          labelAlign: "right"
        },
        {
          fieldLabel: "姓名",
          name:'userName',
          labelWidth: 40,
          width: 150,
          labelAlign: "right"
        },
        {
          xtype: "datefield",
          fieldLabel: "邮寄日期",
          name:'mailingDate',
          labelWidth: 60,
          width: 160,
          labelAlign: "right"
        },
       
        {
          xtype: "button",
          text: "搜索",
          margin: "0 0 0 20",
          handler: function() {
            var form = this.up("form").getForm();
            if (form.isValid()) {
              // TODO 接口需要加上 success: true
              form.submit({
                success: function(form, action) {
                  console.log(action)
                },
                failure: function(form, action) {
                  dataList.loadData(action.result.list);
                }
              });
            }
          }
        },
        {
          xtype: "button",
          text: "重置",
          margin: "0 0 0 20"
        }
      ]
    });

    var list = Ext.create("Ext.panel.Panel", {
      renderTo: window.$bd,
      items: [
        {
          itemId: "grid",
          xtype: "grid",
          title: "包裹列表",
          store: Ext.data.StoreManager.lookup('dataList'),
          border: 0,
          columnWidth: 0.5,
          columns: [{
            text: '序号',
            dataIndex: 'key',
            flex: 1
          }, {
            text: '出货单号',
            dataIndex: 'deliveryOrderCode',
            flex: 1
          }, {
            text: '包裹单号',
            dataIndex: 'packageCode',
            flex: 1
          }, {
            text: '流水号',
            dataIndex: 'serialNumber',
            flex: 1
          }, {
            text: '邮寄日期',
            dataIndex: 'mailingDate',
            flex: 1
          }, {
            text: '重量',
            dataIndex: 'weight',
            flex: 1
          }, {
            text: '邮资',
            dataIndex: 'postage',
            flex: 1
          },{
            text: '补寄',
            dataIndex: 'bjtimes',
            flex: 1
          }, {
            text: '包装员',
            dataIndex: 'packaging',
            flex: 1
          }, {
            text: '姓名',
            dataIndex: 'userName',
            flex: 1
          }, {
            text: '地址',
            dataIndex: 'address',
            flex: 1
          },  {
            text: '备注',
            dataIndex: 'packageRemark',
            flex: 1
          }],
          listeners: {
            itemdblclick: function( that, record, item, index, e, eOpts) {
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
      items: [{
        // 添加到打印购物车
        xtype: "button",
        text: "<span class=\"key\">W</span> 添加",
        handler: function() {
          try {
            var record = Ext.ComponentQuery.query("grid")[0]
            .getSelectionModel()
            .getSelection()[0].data;

            printCart.show();
            window.create = true;
          } catch (e) {
            Ext.Msg.alert("添加", "请选中列表中的一项后再操作");
          }
        },
        margin: "0 0 0 10"
      }, {
        xtype: "button",
        text: "补寄",
        handler: function() {
          bujiDetail.show();
        },
        margin: "0 0 0 10"
      }, {
        xtype: "button",
        text: "<span class=\"key\">D</span> 打印",
        margin: "0 0 0 10"
      }, {
        xtype: "button",
        text: "<span class=\"key\">C</span> 预览",
        margin: "0 0 0 10"
      }, {
        xtype: "button",
        text: "<span class=\"key\">B</span> 连续打印",
        margin: "0 0 0 10",
        handler: function() {
          var data = list.getComponent("grid").getSelectionModel().getSelection()[0].data

          printStore.loadData(data);
          print.show();
        }
      }, {
        xtype: "button",
        text: "批量修改",
        margin: "0 0 0 10"
      }, {
        xtype: "button",
        text: "扫描包裹单",
        margin: "0 0 0 10"
      }]
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
              items: [{
                disabled: true,
                fieldLabel: "出货单号",
                labelWidth: 55,
                margin: "5 0",
                labelAlign: "right",
                name:'deliveryOrderCode'
              }, {
                disabled: true,
                fieldLabel: "会员编号",
                labelWidth: 55,
                margin: "5 0",
                labelAlign: "right",
                name:'userCode'
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
                fieldLabel: "会员姓名",
                labelWidth: 55,
                margin: "5 0",
                labelAlign: "right",
                name:'userName'
              }, {
                disabled: true,
                fieldLabel: "重量",
                labelWidth: 55,
                margin: "5 0",
                labelAlign: "right",
                name:'weight'
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
                name:'zipCode'
              },
              {
                disabled: true,
                fieldLabel: "地址",
                labelWidth: 55,
                width: 250,
                margin: "5 0",
                labelAlign: "right",
                name:'address'
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
                fieldLabel: "邮寄日期",
                labelWidth: 55,
                margin: "5 0",
                labelAlign: "right",
                name:'mailingDate'
              }, {
                fieldLabel: "包裹单号",
                labelWidth: 55,
                margin: "5 0",
                labelAlign: "right",
                name:'packageCode'
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
                name:'weight'
              }, {
                fieldLabel: "邮资",
                labelWidth: 55,
                margin: "5 0",
                labelAlign: "right",
                name:'postage'
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
                name:'packaging'
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
            handler: function() {
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
                  success: function(form, action) {
                    console.log(action)
                  },
                  failure: function(form, action) {
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
          labelWidth: 60,
          width: 150,
        }, {
          fieldLabel: "",
          width: 90
        }, {
          xtype: "combobox",
          fieldLabel: "寄送方式",
          labelAlign: "right",
          labelWidth: 60,
          width: 140
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
        itemId: "list",
        xtype: "grid",
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
      }, {
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
        items: [{
          xtype: "button",
          text: "查询",
          margin: "0 0 0 20"
        }, {
          xtype: "button",
          text: "打印",
          margin: "0 0 0 10",
          handler: function() {
            ;
          }
        }, {
          xtype: "button",
          text: "重打",
          margin: "0 0 0 10"
        }]
      }]
    });

    var printCart = new Ext.create("Ext.window.Window", {
      title: "打印购物车",
      width: 1000,
      bodyPadding: 10,
      closeAction: 'hide',
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
          margin: "0 0 0 20"
        }, {
          xtype: "button",
          text: "重置",
          margin: "0 0 0 10"
        }]
      }, {
        xtype: "grid",
        store: Ext.data.StoreManager.lookup('jhStore'),
        height: 155,
        margin: "10 0 0 0",
        selModel:Ext.create('Ext.selection.CheckboxModel',{mode:"SIMPLE"}),
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
        bbar: Ext.create('Ext.PagingToolbar', {
          displayMsg: 'Displaying topics {0} - {1} of {2}',
          items:['-', {
            pressed: false
          }]
        })
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
        items: [{
          xtype: "button",
          text: "<span class=\"key\">M</span> 修改",
          margin: "0 0 0 10"
        }, {
          xtype: "button",
          text: "<span class=\"key\">S</span> 保存",
          margin: "0 0 0 10"
        }, {
          xtype: "button",
          text: "<span class=\"key\">D</span> 打印",
          margin: "0 0 0 10"
        }]
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
          xtype: "grid",
          margin: "20 0 0 0",
          store: Ext.data.StoreManager.lookup('jhStore'),
          columns: [
          {
            text: '序号',
            dataIndex: 'id1'
          },
          {
            text: '补寄日期',
            dataIndex: 'iid1'
          },
          {
            text: '寄送方式',
            dataIndex: 'bnum1'
          },
          {
            text: '包裹单号',
            dataIndex: 'bnum1'
          },
          {
            text: '邮资',
            dataIndex: 'bnum1'
          },
          {
            text: '重量',
            dataIndex: 'bnum1'
          },
          {
            text: '备注',
            dataIndex: 'bnum1'
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
            text: "保存"
          }]
        }
      ]
    });
  }
});
