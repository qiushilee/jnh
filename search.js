Ext.require([
  "Ext.data.*",
  "Ext.ux.grid.Printer"
]);

Ext.application({
  name: "search",
  launch: function () {
    var memberType = {
      "会员定位": 1,
      "地址定位": 2,
      "时间定位": 3,
      "金额定位": 4,
      "其它定位": 5
    };

    // 进货清单数据
    var purchaseList = Ext.create('Ext.data.Store', {
      storeId: 'purchaseList',
      fields: ["id",'key',"productCode", "name", 'number', 'receiptCode','companyCode','receiptDate','addDate','remark'],
      layout: "fit",
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.search.searchpurchase,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    // 出货清单数据
    Ext.create('Ext.data.Store', {
      storeId: 'shipmentList',
      fields: ["id", "key","productCode", "name", 'number','price','amount', 'deliveryOrderCode','addDate','mailingDate','remark'],
      layout: "fit",
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.search.searchshipment,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });


    // 预估采购数据
    Ext.create('Ext.data.Store', {
      storeId: 'estimatepurchase',
      fields: ["periodicalCount", "splitCount", "companyName", "mobile1", "linkMan", 'id','key','productCode','name','price','number','purchasePrice','tzqProgressiveNumber','tzhProgressiveNumber','tzqShipmentNumber','tzhShipmentNumber','corruptedNumber','tzqSupplyNumber','tzhSupplyNumber','tzqExpectedShipmentNumber','tzhExpectedShipmentNumber','tzqReplenishmentNumber','tzhReplenishmentNumber','replenishmentAmount','allPeriodPrediction','allReplenishmentNumber'],
      layout: "fit",
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.search.estimatepurchase,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });

    // 会员查询数据
    Ext.create('Ext.data.Store', {
      storeId: 'memberList',
      fields: ["id", 'key',"userCode", "realName", 'address1', 'address2','zipCode1','zipCode2','buyAmount','mobile','graduateDate','remark','preferentialTicket','youthStuck','unDiscountAmount'],
      layout: "fit",
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.search.member,
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
          title: '进货清单',
          padding: 15,
          items: [
            {
              itemId: 'purchase-btn-panel',
              xtype: "form",
              url: env.services.web + env.api.search.searchpurchase,
              layout: 'hbox',
              bodyPadding: 5,
              border: 0,
              defaultType: 'datefield',
              items: [
                Ext.create("periodical", {
                  itemId: "purchase-periodical"
                }),
                {
                  itemId: "purchase-start-date",
                  fieldLabel: "起始日期",
                  format: 'Y-m-d',
                  labelAlign: "right",
                  name:'startDate'
                },
                {
                  itemId: "purchase-end-date",
                  fieldLabel: "终止日期",
                  format: 'Y-m-d',
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
                  name: "jhd-print",
                  xtype: "button",
                  text: "打印设置",
                  margin: "0 0 0 20",
                  handler: function () {
                    window.printHandle.set("searchpurchase");
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
                  text: '厂商编号',
                  dataIndex: 'companyCode',
                  flex: 1
                },
                {
                  text: '进货日期',
                  dataIndex: 'receiptDate',
                  format: 'Y-m-d',
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
          title: '出货清单',
          padding: 15,
          items: [
            {
              itemId: 'shipment-btn-panel',
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
                  format: 'Y-m-d',
                  labelAlign: "right",
                  name:'startDate'
                },
                {
                  itemId: "shipment-end-date",
                  fieldLabel: "终止日期",
                  format: 'Y-m-d',
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
                  name: "jhd-print",
                  xtype: "button",
                  text: "打印设置",
                  margin: "0 0 0 20",
                  handler: function () {
                    window.printHandle.set("searchshipment");
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
          title: '预估采购',
          padding: 15,
          items: [
            {
              itemId: "estimatepurchaseForm",
              xtype: "form",
              url: env.services.web + env.api.search.estimatepurchase,
              layout: 'vbox',
              bodyPadding: 5,
              border: 0,
              items: [
              {
                xtype: "panel",
                layout: "hbox",
                border: 0,
                defaultType: 'textfield',
                items: [
                Ext.create("periodical", {
                  itemId: "estimatepurchase-periodical",
                  labelWidth: 40,
                  store: Ext.create("Ext.data.Store", {
                    fields: ["name", "value"],
                    data: JSON.parse(document.body.dataset.periodical)
                  })
                }),
                {
                  fieldLabel: "厂商编号",
                  labelWidth: 60,
                  width: 150,
                  labelAlign: "right",
                  margin: "0 0 0 20",
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
                  margin: "0 0 0 20",
                  name:"estimateNumber"

                }
                ]
              },
              {
                xtype: "panel",
                layout: "hbox",
                border: 0,
                defaultType: 'textfield',
                margin: "20 0 0 0",
                items: [
                {
                  fieldLabel: "全期单数",
                  labelWidth: 60,
                  width: 120,
                  labelAlign: "right",
                  name:"allPeriodNumber"
                },
                {
                  xtype: "datefield",
                  format: 'Y-m-d',
                  fieldLabel: "参考日期",
                  labelWidth: 60,
                  width: 160,
                  labelAlign: "right",
                  margin: "0 0 0 50",
                  name:'referenceStartDate'
                },
                {
                  xtype: "datefield",
                  format: 'Y-m-d',
                  fieldLabel: "到",
                  labelWidth: 20,
                  width: 120,
                  labelAlign: "right",
                  name:'referenceEndDate'
                },
                {
                  xtype: "button",
                  text: "查询",
                  margin: "0 0 0 50",
                  handler: function() {
                    var $form = Ext.ComponentQuery.query("[itemId=estimatepurchaseForm]")[0].getForm(),
                        $periodNum = Ext.ComponentQuery.query("[name=currentPeriodNumber]")[0],
                        $splitNum = Ext.ComponentQuery.query("[name=splitNumber]")[0];

                    searchHandler.call($form, "estimatepurchase", function(store) {
                      var data = store.data.items[0].data;
                      if (data.periodicalCount) {
                        $periodNum.setText(data.periodicalCount);
                      }
                      if (data.splitCount) {
                        $splitNum.setText(data.splitCount);
                      }
                    });
                  }
                }
                ]
              }
              ]
            },
            {
              xtype: 'panel',
              layout: "hbox",
              border: 0,
              margin: "35 0 0 0",
              items: [
                {
                  xtype: "label",
                  text: "本期单量：",
                  margin: "0 0 0 10"
                },
                {
                  xtype: "label",
                  text: "0",
                  name: "currentPeriodNumber"
                },
                {
                  xtype: "label",
                  text: "拆分单量：",
                  margin: "0 0 0 20"
                },
                {
                  xtype: "label",
                  text: "0",
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
                  text: '调整前供应单数',
                  dataIndex: 'tzqSupplyNumber',
                  flex: 1
                },
                {
                  text: '调整后供应单数',
                  dataIndex: 'tzhSupplyNumber',
                  flex: 1
                },
                {
                  text: '进价',
                  dataIndex: 'purchasePrice',
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
                  margin: "0 0 0 10",
                  handler: function() {
                    var date = {
                      start: Ext.ComponentQuery.query("[name=referenceStartDate]")[0].rawValue,
                      end: Ext.ComponentQuery.query("[name=referenceStartDate]")[0].rawValue
                    };

                    Ext.ux.grid.Printer.opt = {
                      title: "预估缺货报表",
                      name: document.body.dataset.user,
                      periodical: Ext.ComponentQuery.query("[itemId=estimatepurchase-periodical]")[0].value,
                      estimateNumber: Ext.ComponentQuery.query("[name=estimateNumber]")[0].value,
                      allPeriodNumber: Ext.ComponentQuery.query("[name=allPeriodNumber]")[0].value
                    };

                    if (date.start || date.end) {
                      Ext.ux.grid.Printer.opt.date = date;
                    }

                    Ext.ux.grid.Printer.print(Ext.ComponentQuery.query("grid[itemId=estimatepurchase-grid]")[0]);
                  }
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
          title: '会员查询',
          padding: 15,
          items: [
            {
              xtype: "panel",
              layout: "hbox",
              border: 0,
              items: [
              {
                itemId: "searchForm",
                xtype: "form",
                border: 0,
                url: env.services.web + env.api.search.member,
                items: [
                {
                  xtype: "hiddenfield",
                  name: "type",
                  value: "1"
                }, {
                  itemId: "member-tab",
                  xtype: "tabpanel",
                  width: 500,
                  listeners: {
                    beforetabchange: function(tabs, newTab) {
                      var $type = this.ownerCt.getForm().findField("type");

                      if (memberType[newTab.title]) {
                        $type.setValue(memberType[newTab.title]);
                      }
                    }
                  },
                  items: [
                    {
                      title: "会员定位",
                      padding: 15,
                      items: [
                        {
                          xtype: "panel",
                          layout: 'hbox',
                          bodyPadding: 5,
                          border: 0,
                          defaultType: 'textfield',
                          items: [
                            Ext.create('periodical', {
                              name: "periodicalId_1",
                              store: Ext.create("Ext.data.Store", {
                                fields: ["name", "value"],
                                data: JSON.parse(document.body.dataset.periodicalall)
                              })
                            }),
                            {
                              fieldLabel: "姓名",
                              width: 120,
                              labelWidth: 40,
                              labelAlign: "right",
                              name:'realName'
                            }, {
                              fieldLabel: "会员编号",
                              labelWidth: 60,
                              labelAlign: "right",
                              name:'userCode'
                            }
                          ]
                        }
                      ]
                    },
                    {
                      title: "地址定位",
                      padding: 15,
                      items: [
                        {
                          xtype: "panel",
                          layout: 'hbox',
                          bodyPadding: 5,
                          border: 0,
                          defaultType: 'textfield',
                          items: [
                            {
                              fieldLabel: "地址",
                              labelWidth: 40,
                              width: 150,
                              labelAlign: "right",
                              name:'address'
                            },
                            {
                              fieldLabel: "邮编",
                              labelWidth: 40,
                              width: 150,
                              labelAlign: "right",
                              name:'zipCode'
                            },
                            {
                              fieldLabel: "电话",
                              labelWidth: 40,
                              width: 150,
                              labelAlign: "right",
                              name:'mobile'
                            }
                          ]
                        }
                      ]
                    },
                    {
                      title: "时间定位",
                      padding: 15,
                      items: [
                        {
                          xtype: "panel",
                          layout: 'hbox',
                          bodyPadding: 5,
                          border: 0,
                          defaultType: 'datefield',
                          items: [
                            {
                              fieldLabel: "加入时间",
                              format: 'Y-m-d',
                              labelWidth: 60,
                              width: 160,
                              labelAlign: "right",
                              name:'addDate1'
                            },
                            {
                              fieldLabel: "到",
                              format: 'Y-m-d',
                              labelWidth: 20,
                              width: 120,
                              labelAlign: "right",
                              name:'addDate2'
                            }
                          ]
                        }, {
                          xtype: "panel",
                          layout: 'hbox',
                          bodyPadding: 5,
                          border: 0,
                          defaultType: 'datefield',
                          items: [
                            {
                              fieldLabel: "购买时间",
                              format: 'Y-m-d',
                              labelWidth: 60,
                              width: 160,
                              labelAlign: "right",
                              name:'buyDate1'
                            },
                            {
                              fieldLabel: "到",
                              format: 'Y-m-d',
                              labelWidth: 20,
                              width: 120,
                              labelAlign: "right",
                              name:'buyDate2'
                            }
                          ]
                        }, {
                          xtype: "panel",
                          layout: 'hbox',
                          bodyPadding: 5,
                          border: 0,
                          defaultType: 'datefield',
                          items: [
                            {
                              fieldLabel: "毕业时间",
                              format: 'Y',
                              labelWidth: 60,
                              width: 160,
                              labelAlign: "right",
                              name:'graduationDate'
                            },
                            {
                              xtype: "checkboxfield",
                              fieldLabel: "反选毕业时间",
                              labelWidth: 100,
                              labelAlign: "right",
                              name:'reverseSelectionGraduationDate'
                            }
                          ]
                        }
                      ]
                    },
                    {
                      title: "金额定位",
                      padding: 15,
                      items: [
                        {
                          xtype: "panel",
                          layout: 'hbox',
                          bodyPadding: 5,
                          border: 0,
                          defaultType: 'datefield',
                          items: [
                            {
                              fieldLabel: "参考时间",
                              format: 'Y-m-d',
                              labelWidth: 60,
                              width: 160,
                              labelAlign: "right",
                              name:'referenceDate1'
                            },
                            {
                              fieldLabel: "到",
                              format: 'Y-m-d',
                              labelWidth: 20,
                              width: 120,
                              labelAlign: "right",
                              name:'referenceDate2'
                            }
                          ]
                        }, {
                          xtype: "panel",
                          layout: 'hbox',
                          bodyPadding: 5,
                          border: 0,
                          defaultType: 'textfield',
                          items: [
                            Ext.create('periodical',{
                              fieldLabel:'参考期数',
                              itemId: "periodical1",
                              name:'referencePeriodicalId1'
                            }),
                             Ext.create('periodical',{
                              fieldLabel: "~",
                              itemId: "periodical2",
                              name:'referencePeriodicalId2'
                            })
                          ]
                        }
                      ]
                    },
                    {
                      title: "其它定位",
                      padding: 15,
                      items: [
                        {
                          xtype: "panel",
                          layout: 'hbox',
                          bodyPadding: 5,
                          border: 0,
                          defaultType: 'textfield',
                          items: [
                            {
                              fieldLabel: "期数",
                              labelWidth: 60,
                              width: 120,
                              labelAlign: "right",
                              name:'periodicalId1'
                            },
                            {
                              fieldLabel: "~",
                              labelWidth: 20,
                              width: 80,
                              labelAlign: "right",
                              name:'periodicalId2'
                            },
                            Ext.create("memberType")
                          ]
                        },
                         
                        // +TODO: 位置排序调整
                        {
                          xtype: "panel",
                          layout: 'hbox',
                          bodyPadding: 5,
                          border: 0,
                          defaultType: 'combobox',
                          items: [
                            {
                              fieldLabel: "寄送方式",
                              labelWidth: 60,
                              width: 120,
                              labelAlign: "right",
                              name:'deliveryMethod'
                            },
                            Ext.create("addressType")
                          ]
                        }
                      ]
                    }
                  ]
                }
                ]
              },
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
                          text: "汇总打印",
                          margin: "0 0 0 50",
                          handler: function() {
                            Ext.ux.grid.Printer.opt = {
                              title: "会员汇总打印",
                              name: document.body.dataset.user
                            };
                            Ext.ux.grid.Printer.print(Ext.ComponentQuery.query("grid[itemId=member-grid]")[0]);
                          }
                        },
                        {
                          text: "块状打印",
                          disabled: true,
                          margin: "0 0 0 20"
                        },
                        {
                          text: "条状打印",
                          disabled: true,
                          margin: "0 0 0 20"
                        },
                        {
                          text: "面单打印",
                          margin: "0 0 0 20",
                          handler: function() {
                            var serial = '',
                                vals = Ext.ComponentQuery.query('[itemId=searchForm]')[0].getForm().getValues();
                            Ext.Object.each(vals, function(key, val) {
                              serial += '&' + key + '=' + val;
                            });
                            serial = serial.replace('&', '?');
                            window.open(env.services.web + env.api.search.printExpress + serial);
                          }
                        },
                        {
                          name: "jhd-print",
                          xtype: "button",
                          text: "打印设置",
                          margin: "0 0 0 20",
                          handler: function () {
                            window.printHandle.set("searchmember");
                          }
                        },
                        {
                          text: "批量修改",
                          disabled: true,
                          margin: "0 0 0 20"
                        },{
                          xtype: "button",
                          text: "导出",
                          margin: "0 0 0 10",
                          handler: function() {
                            var params = "",
                                periodicalId_1 =Ext.ComponentQuery.query("[name=periodicalId_1]")[0].value,
                                realName = Ext.ComponentQuery.query("[name=realName]")[0].rawValue,
                                userCode = Ext.ComponentQuery.query("[name=userCode]")[0].rawValue,
                                address =  Ext.ComponentQuery.query("[name=address]")[0].rawValue,
                                zipCode = Ext.ComponentQuery.query("[name=zipCode]")[0].rawValue,
                                addDate1 = Ext.ComponentQuery.query("[name=addDate1]")[0].rawValue,
                                addDate2 = Ext.ComponentQuery.query("[name=addDate2]")[0].rawValue,
                                buyDate1 = Ext.ComponentQuery.query("[name=buyDate1]")[0].rawValue,
                                buyDate2 = Ext.ComponentQuery.query("[name=buyDate2]")[0].rawValue,
                                graduationDate = Ext.ComponentQuery.query("[name=graduationDate]")[0].rawValue,
                                referenceDate1 = Ext.ComponentQuery.query("[name=referenceDate1]")[0].rawValue,
                                referenceDate2=Ext.ComponentQuery.query("[name=referenceDate2]")[0].rawValue,
                                referencePeriodicalId1=Ext.ComponentQuery.query("[name=referencePeriodicalId1]")[0].rawValue,
                                referencePeriodicalId2=Ext.ComponentQuery.query("[name=referencePeriodicalId2]")[0].rawValue,
                                periodicalId1 = Ext.ComponentQuery.query("[name=periodicalId1]")[0].rawValue,
                                periodicalId2=Ext.ComponentQuery.query("[name=periodicalId2]")[0].rawValue,
                                type = memberType[Ext.ComponentQuery.query("[itemId=member-tab]")[0].getActiveTab().title];
                            if(periodicalId_1>0) {
                              params +='/periodicalId_1/'+periodicalId_1;
                            }
                            if(realName!='') {
                              params +='/realName/'+encodeURI(realName);
                            }
                            if(userCode!='') {
                              params +='/userCode/'+userCode;
                            }
                            if(address!='') {
                              params +='/address/'+address;
                            }
                            if(zipCode!='') {
                              params +='/zipCode/'+zipCode;
                            }
                            if(addDate1!='') {
                              params +='/addDate1/'+addDate1;
                            }
                            if(addDate2!='') {
                              params +='/addDate2/'+addDate2;
                            }
                            if(buyDate1!='') {
                              params +='/buyDate1/'+buyDate1;
                            }
                            if(buyDate2!='') {
                              params +='/buyDate2/'+buyDate2;
                            }
                            if(graduationDate!='') {
                              params +='/graduationDate/'+graduationDate;
                            }
                            if(referenceDate1!='') {
                              params +='/referenceDate1/'+referenceDate1;
                            }
                            if(referenceDate2!='') {
                              params +='/referenceDate2/'+referenceDate2;
                            }
                            if(referencePeriodicalId1!='') {
                              params +='/referencePeriodicalId1/'+referencePeriodicalId1;
                            }
                            if(referencePeriodicalId2!='') {
                              params +='/referencePeriodicalId2/'+referencePeriodicalId2;
                            }
                            if(periodicalId1!='') {
                              params +='/periodicalId1/'+periodicalId1;
                            }
                            if(periodicalId2!='') {
                              params +='/periodicalId2/'+periodicalId2;
                            }
                            if(type!='') {
                              params +='/type/'+type;
                            }
                            window.open(env.services.web + env.api.search.export + params);
                          }
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
              itemId: "member-grid",
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

    window.printHandle.get({
      $el: Ext.ComponentQuery.query("[itemId=purchase-btn-panel]")[0],
      form: Ext.ComponentQuery.query("[itemId=purchase-btn-panel]")[0].getForm(),
      type: "searchpurchase",
      margin: "0 0 0 20",
      title: panel.items.items[0].title
    });

    window.printHandle.get({
      $el: Ext.ComponentQuery.query("[itemId=shipment-btn-panel]")[0],
      form: Ext.ComponentQuery.query("[itemId=shipment-btn-panel]")[0].getForm(),
      type: "searchshipment",
      margin: "0 0 0 20",
      title: panel.items.items[0].title
    });
  }
});
