Ext.require([
  "Ext.data.*",
  "Ext.ux.grid.Printer"
]);

Ext.application({
  name: "setting",
  launch: function () {

    // 期数管理
    var periodicalList = Ext.create('Ext.data.Store', {
      storeId: 'periodicalList',
      fields: ['id','code', 'title', 'startDate', 'endDate'],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.periodical.list,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    //寄送方式
    var sendmethordList = Ext.create('Ext.data.Store', {
      storeId: 'sendmethordList',
      fields: ['id','name', 'key', 'state'],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.sendmethord.list,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });


    var panel = Ext.create('Ext.tab.Panel', {
      renderTo: window.$bd,
      layout: "fit",
      activeItem: 0,
      items: [
        {
          title: '期数管理列表',
          padding: 15,
          items: [
            {
              itemId: "purchase-grid",
              xtype: "grid",
              height: 455,
              margin: "20 0 0 0",
              store: Ext.data.StoreManager.lookup('periodicalList'),
              columns: [{
                text: '编号',
                dataIndex: 'code',
                flex: 1
              },  {
                text: '名称',
                dataIndex: 'title',
                flex: 1
              }, {
                text: '开始日期',
                dataIndex: 'startDate',
                flex: 1
              }, {
                text: '结束日期',
                dataIndex: 'endDate',
                flex: 1
              }],
              listeners: {
              itemdblclick: function( that, record, item, index, e, eOpts) {
                periodicalEdit.show();
                window.updateForm(periodicalEdit.getComponent("form").getForm(), record.data);
              }
            }
            }
          ]
        },
        {
          title: '配送方式管理',
          padding: 15,
          items: [
            {
              itemId: "shipment-grid",
              xtype: "grid",
              height: 455,
              margin: "20 0 0 0",
              store: Ext.data.StoreManager.lookup("sendmethordList"),
              columns: [
                {
                  text: '名称',
                  dataIndex: 'name',
                  flex: 1
                },
                {
                  text: 'KEY',
                  dataIndex: 'key',
                  flex: 1
                },
                {
                  text: '状态',
                  dataIndex: 'state',
                  flex: 1
                }
              ]
            }
          ]
        },
        {
          title: '系统角色管理',
          padding: 15,
          items: [
            {
              itemId: "estimatepurchase-grid",
              xtype: "grid",
              height: 455,
              margin: "20 0 0 0",
              store: Ext.data.StoreManager.lookup('estimatepurchase'),
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
                  dataIndex: 'name',
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
                  text: '库存量',
                  dataIndex: 'number',
                  flex: 1
                },
                {
                  text: '损坏数',
                  dataIndex: 'corruptedNumber',
                  flex: 1
                },
                {
                  text: '供应单数',
                  dataIndex: 'supplyNumber',
                  flex: 1
                },
                {
                  text: '进价',
                  dataIndex: 'price',
                  flex: 1
                },
                {
                  text: '调整前预计出货数',
                  dataIndex: 'tzqExpectedShipmentNumber',
                  flex: 2
                },
                {
                  text: '调整后预计出货数',
                  dataIndex: 'tzhExpectedShipmentNumber',
                  flex: 2
                },
                {
                  text: '调整前补货数',
                  dataIndex: 'tzqReplenishmentNumber',
                  flex: 2
                },
                {
                  text: '调整后补货数',
                  dataIndex: 'tzhReplenishmentNumber',
                  flex: 2
                },
                {
                  text: '补货金额',
                  dataIndex: 'replenishmentAmount',
                  flex: 1
                },
                {
                  text: '全期预估',
                  dataIndex: 'allPeriodPrediction',
                  flex: 1
                },
                {
                  text: '全期补货数',
                  dataIndex: 'allReplenishmentNumber',
                  flex: 1
                }
              ]
            },
          ]
        },
        {
          title: '管理员管理',
          padding: 15,
          items: [
            {
              xtype: "grid",
              height: 355,
              margin: "20 0 0 0",
              store: Ext.data.StoreManager.lookup("memberList"),
              columns: [
                {
                  text: '序号',
                  dataIndex: 'key',
                  flex: 1
                },
                {
                  text: '会员编号',
                  dataIndex: 'userCode',
                  flex: 2
                },
                {
                  text: '姓名',
                  dataIndex: 'realName',
                  flex: 1
                },
                {
                  text: '电话',
                  dataIndex: 'mobile',
                  flex: 1
                },
                {
                  text: '默认地址',
                  dataIndex: 'address1',
                  flex: 2
                },
                {
                  text: '邮编',
                  dataIndex: 'zipCode1',
                  flex: 1
                },
                {
                  text: '地址2',
                  dataIndex: 'address2',
                  flex: 1
                },
                {
                  text: '邮编2',
                  dataIndex: 'zipCode2',
                  flex: 1
                },
                {
                  text: '购买金额',
                  dataIndex: 'buyAmount',
                  flex: 1
                },
                {
                  text: '抵价券',
                  dataIndex: 'preferentialTicket',
                  flex: 1
                },
                {
                  text: '青春贴',
                  dataIndex: 'youthStuck',
                  flex: 1
                },
                {
                  text: '不打折抵价券',
                  dataIndex: 'unDiscountAmount',
                  flex: 2
                },
                {
                  text: '毕业时间',
                  dataIndex: 'graduateDate',
                  flex: 1
                },
                {
                  text: '备注',
                  dataIndex: 'remark',
                  flex: 1
                }
              ]
            }
          ]
        },
        {
          title: '邮资配置',
          padding: 15,
          items:[
          ]
        }
      ]
    });




    var periodicalEdit = new Ext.create("Ext.window.Window", {
      title: "编辑期数",
      layout: "column",

      items: [{
        itemId: "form",
        xtype: "form",
        columnWidth: 0.41,
        layout: 'vbox',
        width: 500,
        bodyPadding: 5,
        defaultType: 'textfield',
        url: env.services.web + env.api.periodical.add,
        items: [ {
          fieldLabel: "编号",
          name: "code",
          labelAlign: "right",
        }, {
          fieldLabel: "名称",
          name: "title",

          labelAlign: "right"
        }, {
          fieldLabel: '开始日期',
          name: "startDate",
          xtype: "datefield",
          labelAlign: "right"
        }, {
          fieldLabel: '结束日期',
          name: "endDate",
          xtype: "datefield",
          labelAlign: "right"
        }, {
          xtype: "hiddenfield",
          name: "id",
        }, {
          xtype:'panel',
          layout: "hbox",
          border: 0,
          margin: "0 0 0 53",
          items: [{
            xtype:'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">A</span> 保存",
            handler: function() {
              var form = periodicalEdit.getComponent("form").getForm();
              form.url = env.services.web + env.api.periodical.change;
              if (form.isValid()) {
                form.submit({
                  success: function(form, action) {
                    Ext.Msg.alert("修改期数", action.result.msg, function() {
                      periodicalEdit.hide();
                      periodicalList.load();
                    });
                  },
                  failure: function(form, action) {
                    Ext.Msg.alert("修改期数", action.result.msg);
                  }
                });
              }
            }
          }, {
            xtype:'button',
            margin: "0 0 0 10",
            text: "<span class=\"key\">E</span> 返回",
            handler: function() {
              periodicalAdd.hide();
            }
          }]
        }]
      }
      ],
      closeAction: 'hide',
    });


  }
});
