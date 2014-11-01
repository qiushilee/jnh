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
              xtype: "form",
              url: env.services.web + env.api.setting.periodicalList,
              layout: 'hbox',
              bodyPadding: 5,
              border: 0,
              defaultType: 'datefield',
              items: [
                Ext.create("periodical", {
                  itemId: "purchase-periodical",
                }),
                {
                  itemId: "purchase-start-date",
                  fieldLabel: "起始日期",
                  labelAlign: "right",
                  name:'startDate'
                },
                {
                  itemId: "purchase-end-date",
                  fieldLabel: "终止日期",
                  labelAlign: "right",
                  name:'endDate'
                },
                {
                  xtype: "button",
                  text: "搜索",
                  margin: "0 0 0 50",
                  handler:function(){
                    searchHandler.call(this, "purchaseList");
                  }
                },
                {
                  xtype: "button",
                  text: "打印",
                  margin: "0 0 0 20",
                  handler: function() {
                    var date = {
                      start: Ext.ComponentQuery.query("[itemId=purchase-start-date]")[0].rawValue,
                      end: Ext.ComponentQuery.query("[itemId=purchase-end-date]")[0].rawValue
                    };

                    Ext.ux.grid.Printer.opt = {
                      title: "进货清单报表",
                      name: document.body.dataset.user,
                      periodical: Ext.ComponentQuery.query("[itemId=purchase-periodical]")[0].value
                    };

                    if (date.start || date.end) {
                      Ext.ux.grid.Printer.opt.date = date;
                    }

                    Ext.ux.grid.Printer.print(Ext.ComponentQuery.query("grid[itemId=purchase-grid]")[0]);
                  }
                }
              ]
            },
            {
              itemId: "purchase-grid",
              xtype: "grid",
              height: 455,
              margin: "20 0 0 0",
              store: Ext.data.StoreManager.lookup('purchaseList'),
              columns: [
                {
                  text: '序号',
                  dataIndex: 'key',
                  flex: 1
                },
                {
                  text: '进货编号',
                  dataIndex: 'receiptCode',
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
                  text: '数量',
                  dataIndex: 'number',
                  flex: 2
                },
                {
                  text: '厂商',
                  dataIndex: 'companyName',
                  flex: 1
                },
                {
                  text: '进货日期',
                  dataIndex: 'receiptDate',
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
          title: '配送方式管理',
          padding: 15,
          items: [
            {
              xtype: "form",
              url: env.services.web + env.api.search.searchshipment,
              layout: 'hbox',
              bodyPadding: 5,
              border: 0,
              defaultType: 'datefield',
              items: [
                Ext.create("periodical", {
                  itemId: "shipment-periodical"
                }),
                {
                  itemId: "shipment-start-date",
                  fieldLabel: "起始日期",
                  labelAlign: "right",
                  name:'startDate'
                },
                {
                  itemId: "shipment-end-date",
                  fieldLabel: "终止日期",
                  labelAlign: "right",
                  name:'endDate'
                },
                {
                  xtype: "button",
                  text: "搜索",
                  margin: "0 0 0 50",
                  handler: function() {
                    searchHandler.call(this, "shipmentList");
                  }
                },
                {
                  xtype: "button",
                  text: "打印",
                  margin: "0 0 0 20",
                  handler: function() {
                    var date = {
                      start: Ext.ComponentQuery.query("[itemId=shipment-start-date]")[0].rawValue,
                      end: Ext.ComponentQuery.query("[itemId=shipment-end-date]")[0].rawValue
                    };

                    Ext.ux.grid.Printer.opt = {
                      title: "出货清单报表",
                      name: document.body.dataset.user,
                      periodical: Ext.ComponentQuery.query("[itemId=shipment-periodical]")[0].value
                    };

                    if (date.start || date.end) {
                      Ext.ux.grid.Printer.opt.date = date;
                    }

                    Ext.ux.grid.Printer.print(Ext.ComponentQuery.query("grid[itemId=shipment-grid]")[0]);
                  }
                }
              ]
            },
            {
              itemId: "shipment-grid",
              xtype: "grid",
              height: 455,
              margin: "20 0 0 0",
              store: Ext.data.StoreManager.lookup("shipmentList"),
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
                  text: '出货量',
                  dataIndex: 'number',
                  flex: 2
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
              itemId: "estimatepurchaseForm",
              xtype: "form",
              url: env.services.web + env.api.search.estimatepurchase,
              layout: 'hbox',
              bodyPadding: 5,
              border: 0,
              defaultType: 'textfield',
              items: [
                Ext.create("periodical", {
                  itemId: "estimatepurchase-periodical"
                }),
                {
                  fieldLabel: "厂商编号",
                  labelWidth: 60,
                  width: 150,
                  labelAlign: "right",
                  name:'companyCode1'
                },
                {
                  fieldLabel: "~~~~",
                  labelWidth: 45,
                  width: 150,
                  labelAlign: "right",
                  name:'companyCode2'
                },
                {
                  fieldLabel: "预估单量",
                  labelWidth: 60,
                  width: 120,
                  labelAlign: "right",
                  name:"estimateNumber"

                },
                {
                  fieldLabel: "全期单数",
                  labelWidth: 60,
                  width: 120,
                  labelAlign: "right",
                  name:"allPeriodNumber"
                },
                {
                  xtype:"datefield",
                  fieldLabel: "参考日期",
                  labelWidth: 60,
                  width: 160,
                  labelAlign: "right",
                  name:'referenceStartDate'
                },
                {
                  xtype:"datefield",
                  fieldLabel: "到",
                  labelWidth: 20,
                  width: 120,
                  labelAlign: "right",
                  name:'referenceEndDate'
                }
              ]
            },
            {
              xtype: 'panel',
              layout: "hbox",
              border: 0,
              margin: "10 0 0 25",
              items: [
                {
                  xtype: "label",
                  text: "本期单量：",
                  margin: "0 0 0 10"
                },
                {
                  xtype: "label",
                  text: "4561",
                  name: "currentPeriodNumber"
                },
                {
                  xtype: "label",
                  text: "拆分单量：",
                  margin: "0 0 0 10"
                },
                {
                  xtype: "label",
                  text: "4561",
                  name: "splitNumber"
                }
              ]
            },
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
            {
              xtype: "panel",
              layout: 'hbox',
              bodyPadding: 5,
              border: 0,
              margin: "10 0 0 0",
              items: [
                {
                  xtype: "button",
                  text: "查询",
                  handler: function() {
                    searchHandler.call(this.ownerCt.ownerCt.getComponent("estimatepurchaseForm").getForm(), "estimatepurchase");
                  }
                },
                {
                  xtype: "button",
                  text: "日报表",
                  margin: "0 0 0 10",
                  handler: function() {
                    var date = {
                      start: Ext.ComponentQuery.query("[name=referenceStartDate]")[0].rawValue,
                      end: Ext.ComponentQuery.query("[name=referenceStartDate]")[0].rawValue
                    };

                    Ext.ux.grid.Printer.opt = {
                      title: "预估采购日报表",
                      name: document.body.dataset.user,
                      periodical: Ext.ComponentQuery.query("[itemId=estimatepurchase-periodical]")[0].value,
                      estimateNumber: Ext.ComponentQuery.query("[name=estimateNumber]")[0].value,
                      allPeriodNumber: Ext.ComponentQuery.query("[name=allPeriodNumber]")[0].value,
                      currentPeriodNumber: Ext.ComponentQuery.query("[name=currentPeriodNumber]")[0].text
                    };

                    if (date.start || date.end) {
                      Ext.ux.grid.Printer.opt.date = date;
                    }

                    Ext.ux.grid.Printer.print(Ext.ComponentQuery.query("grid[itemId=estimatepurchase-grid]")[0]);
                  }
                },
                {
                  xtype: "button",
                  text: "订货单",
                  disabled: true,
                  margin: "0 0 0 10"
                },
                {
                  xtype: "button",
                  text: "预估缺货",
                  disabled: true,
                  margin: "0 0 0 10"
                },
                {
                  xtype: "button",
                  text: "下架表",
                  disabled: true,
                  margin: "0 0 0 10"
                }
              ]
            }
          ]
        },
        {
          title: '管理员管理',
          padding: 15,
          items: [
            {
              xtype: "panel",
              layout: "hbox",
              border: 0,
              items: [
                {
                  xtype: "panel",
                  layout: 'vbox',
                  bodyPadding: 5,
                  border: 0,
                  defaultType: 'combobox',
                  items: [
                    {
                      xtype: "panel",
                      layout: "hbox",
                      bodyPadding: 5,
                      border: 0,
                      defaultType: "button",
                      items: [
                        {
                          text: "块状打印",
                          disabled: true,
                          margin: "0 0 0 50"
                        },
                        {
                          text: "条状打印",
                          disabled: true,
                          margin: "0 0 0 20"
                        },
                        {
                          text: "面单打印",
                          disabled: true,
                          margin: "0 0 0 20"
                        },
                        {
                          text: "批量修改",
                          disabled: true,
                          margin: "0 0 0 20"
                        }
                      ]
                    },
                    {
                      xtype: "panel",
                      layout: "hbox",
                      bodyPadding: 5,
                      border: 0,
                      defaultType: "button",
                      items: [{
                        text: "搜索",
                        margin: "0 0 0 50",
                        handler: function() {
                          searchHandler.call(this.ownerCt.ownerCt.ownerCt.getComponent("searchForm").getForm(), "memberList");
                        }
                      },
                      {
                        text: "重置",
                        margin: "0 0 0 20",
                        handler: function() {
                          var form = this.ownerCt.ownerCt.ownerCt.getComponent("searchForm").getForm();
                          form.reset();
                        }
                      }]
                    }
                  ]
                }
              ]
            },
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
        }
      ]
    });
  }
});
