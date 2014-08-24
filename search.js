Ext.application({
  name: "search",
  launch: function () {

    // 进货清单数据
    Ext.create('Ext.data.Store', {
      storeId: 'purchaseList',
      fields: ["id", "productCode", "name", 'number', 'receiptCode','companyName','addDate','remark'],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.productrecord.list,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });


    //进货清单列表
    var panel = Ext.create('Ext.tab.Panel', {
      renderTo: document.body,
      layout: "fit",
      activeItem: 1,
      items: [
        {
          title: '进货清单',
          padding: 15,
          items: [
            {
              xtype: "form",
              layout: 'hbox',
              bodyPadding: 5,
              border: 0,
              defaultType: 'datefield',
              items: [
                {
                  fieldLabel: "起始日期",
                  labelAlign: "right",
                  name:'startDate'
                },
                {
                  fieldLabel: "终止日期",
                  labelAlign: "right",
                  name:'endDate'
                },
                {
                  xtype: "button",
                  text: "搜索",
                  margin: "0 0 0 50",
                  handler:function(){
                    var form = this.ownerCt.getForm();
                    if (form.isValid()) {
                      form.submit({
                        success: function(form, action) {
                          console.log(action)
                        },
                        failure: function(form, action) {
                          purchaseList.loadData(action.result.list);
                        }
                      });
                    }
                  }
                },
                {
                  xtype: "button",
                  text: "重置",
                  margin: "0 0 0 20",
                  handler:function(){
                    var form = this.ownerCt.getForm();
                    form.reset();
                  }
                }
              ]
            },
            {
              xtype: "grid",
              margin: "20 0 0 0",
              store: Ext.data.StoreManager.lookup('jhdDataList'),
              columns: [
                {
                  text: '序号',
                  dataIndex: 'id',
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
                  text: '进货编号',
                  dataIndex: 'receiptCode',
                  flex: 1
                },
                {
                  text: '厂商',
                  dataIndex: 'companyName',
                  flex: 1
                },
                {
                  text: '进货日期',
                  dataIndex: 'addDate',
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
              xtype: "panel",
              layout: 'hbox',
              bodyPadding: 5,
              border: 0,
              defaultType: 'datefield',
              items: [
                {
                  fieldLabel: "起始日期",
                  labelAlign: "right",
                  name:'startDate'
                },
                {
                  fieldLabel: "终止日期",
                  labelAlign: "right",
                  name:'endDate'
                },
                {
                  xtype: "button",
                  text: "搜索",
                  margin: "0 0 0 50"
                },
                {
                  xtype: "button",
                  text: "重置",
                  margin: "0 0 0 20"
                }
              ]
            },
            {
              xtype: "grid",
              margin: "20 0 0 0",
              store: Ext.data.StoreManager.lookup('jzs'),
              columns: [
                {
                  text: '序号',
                  dataIndex: 'id',
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
                  dataIndex: 'shipments',
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
              xtype: "panel",
              layout: 'hbox',
              bodyPadding: 5,
              border: 0,
              defaultType: 'textfield',
              items: [
                {
                  fieldLabel: "厂商编号",
                  labelWidth: 60,
                  labelAlign: "right",
                  name:'companyCode'
                },
                {
                  fieldLabel: "~~~~",
                  labelWidth: 45,
                  labelAlign: "right"
                },
                {
                  fieldLabel: "预估单量",
                  labelWidth: 60,
                  width: 120,
                  labelAlign: "right",
                  name:'estimateNumber'

                },
                {
                  fieldLabel: "全期单数",
                  labelWidth: 60,
                  width: 120,
                  labelAlign: "right",
                  name:'allPeriodNumber'
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
                },
                {
                  xtype: "label",
                  text: "本期单量：4561",
                  margin: "3 0 0 10"
                },
                {
                  xtype: "label",
                  text: "拆分单量：4561",
                  margin: "3 0 0 10"
                }
              ]
            },
            {
              xtype: "grid",
              margin: "20 0 0 0",
              store: Ext.data.StoreManager.lookup('jzs'),
              columns: [
                {
                  text: '序号',
                  dataIndex: 'id',
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
                  dataIndex: 'stock',
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
                  text: "查询"
                },
                {
                  xtype: "button",
                  text: "日报表",
                  margin: "0 0 0 10"
                },
                {
                  xtype: "button",
                  text: "订货单",
                  margin: "0 0 0 10"
                },
                {
                  xtype: "button",
                  text: "预估缺货",
                  margin: "0 0 0 10"
                },
                {
                  xtype: "button",
                  text: "下架表",
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
                  xtype: "tabpanel",
                  width: 500,
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
                            {
                              fieldLabel: "姓名",
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
                              labelWidth: 60,
                              width: 160,
                              labelAlign: "right",
                              name:'startDate'
                            },
                            {
                              fieldLabel: "到",
                              labelWidth: 20,
                              width: 120,
                              labelAlign: "right",
                              name:'endDate'
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
                              labelWidth: 60,
                              width: 160,
                              labelAlign: "right",
                              name:'buyStartDate'
                            },
                            {
                              fieldLabel: "到",
                              labelWidth: 20,
                              width: 120,
                              labelAlign: "right",
                              name:'buyEndDate'
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
                              name:'unGraduationDate'
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
                              labelWidth: 60,
                              width: 160,
                              labelAlign: "right"
                            },
                            {
                              fieldLabel: "到",
                              labelWidth: 20,
                              width: 120,
                              labelAlign: "right"
                            }
                          ]
                        }, {
                          xtype: "panel",
                          layout: 'hbox',
                          bodyPadding: 5,
                          border: 0,
                          defaultType: 'textfield',
                          items: [
                            {
                              fieldLabel: "参考期数",
                              labelWidth: 60,
                              width: 160,
                              labelAlign: "right"
                            },
                            {
                              fieldLabel: "到",
                              labelWidth: 20,
                              width: 120,
                              labelAlign: "right"
                            }
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
                              labelAlign: "right"
                            },
                            {
                              fieldLabel: "~",
                              labelWidth: 20,
                              width: 80,
                              labelAlign: "right"
                            },
                            {
                              xtype: "combobox",
                              fieldLabel: "来源",
                              labelWidth: 40,
                              width: 120,
                              labelAlign: "right"
                            },
                            {
                              xtype: "radiofield",
                              fieldLabel: "代理会员",
                              labelWidth: 60,
                              labelAlign: "right"
                            },
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
                              labelAlign: "right"
                            },
                            {
                              fieldLabel: "类型",
                              labelWidth: 40,
                              width: 120,
                              labelAlign: "right"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                // +TODO: 增加搜索、重置按钮
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
                      items: [{
                        text: "块状打印",
                        margin: "0 0 0 50"
                      },
                        {
                          text: "条状打印",
                          margin: "0 0 0 20"
                        },
                        {
                          text: "面单打印",
                          margin: "0 0 0 20"
                        },
                        {
                          text: "批量修改",
                          margin: "0 0 0 20"
                        }]
                    },
                    {
                      xtype: "panel",
                      layout: "hbox",
                      bodyPadding: 5,
                      border: 0,
                      defaultType: "button",
                      items: [{
                        text: "搜索",
                        margin: "0 0 0 50"
                      },
                        {
                          text: "重置",
                          margin: "0 0 0 20"
                        }]
                    }
                  ]
                }
              ]
            },
            {
              xtype: "grid",
              margin: "20 0 0 0",
              store: Ext.data.StoreManager.lookup('jzs'),
              columns: [
                {
                  text: '序号',
                  dataIndex: 'id1',
                  flex: 1
                },
                {
                  text: '会员编号',
                  dataIndex: 'iid1',
                  flex: 2
                },
                {
                  text: '姓名',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '电话',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '默认地址',
                  dataIndex: 'bnum1',
                  flex: 2
                },
                {
                  text: '邮编',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '地址2',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '邮编2',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '购买金额',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '抵价券',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '青春贴',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '不打折抵价券',
                  dataIndex: 'bnum1',
                  flex: 2
                },
                {
                  text: '毕业时间',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '备注',
                  dataIndex: 'bnum1',
                  flex: 1
                }
              ]
            }
          ]
        }
      ]
    });

    var button = Ext.create("Ext.panel.Panel", {
      renderTo: Ext.getBody(),
      margin: "20 0 0 17",
      border: 0,
      layout: "column",
      items: [
        {
          xtype: "button",
          text: "<span class=\"key\">C</span> 查询",
          scale: "medium"
        },
        {
          xtype: "button",
          text: "<span class=\"key\">P</span> 打印",
          margin: "0 0 0 20",
          scale: "medium"
        },
        {
          xtype: "button",
          text: "<span class=\"key\">R</span> 重打",
          margin: "0 0 0 20",
          scale: "medium"
        }
      ]
    });
  }
});
