Ext.application({
  name: "JNH",
  launch: function () {
    // 库存表
    Ext.create('Ext.data.Store', {
      storeId: 'kucun',
      fields: ['id', "iid", 'name', 'price', 'price2', 'num', 'num2', 'num3', 'num4', 'style', "desc", "num5", "text"],
      layout: "fit",
      data: {
        'items': [
          {
            'id': '1',
            "iid": '55088',
            "name": "人民邮电出版社",
            "price": 30,
            "price2": 50,
            "num": 100,
            "num2": 80,
            "num3": 90,
            "num4": 100,
            "style": "箱包",
            "desc": "这是商品的简要说明",
            "num5": 5,
            "text": "这是商品的备注信息"
          },
          {
            'id': '2',
            "iid": '55088',
            "name": "人民邮电出版社",
            "price": 30,
            "price2": 50,
            "num": 100,
            "num2": 80,
            "num3": 90,
            "num4": 100,
            "style": "箱包",
            "desc": "这是商品的简要说明",
            "num5": 5,
            "text": "这是商品的备注信息"
          },
          {
            'id': '3',
            "iid": '55088',
            "name": "人民邮电出版社",
            "price": 30,
            "price2": 50,
            "num": 100,
            "num2": 80,
            "num3": 90,
            "num4": 100,
            "style": "箱包",
            "desc": "这是商品的简要说明",
            "num5": 5,
            "text": "这是商品的备注信息"
          },
          {
            'id': '4',
            "iid": '55088',
            "name": "人民邮电出版社",
            "price": 30,
            "price2": 50,
            "num": 100,
            "num2": 80,
            "num3": 90,
            "num4": 100,
            "style": "箱包",
            "desc": "这是商品的简要说明",
            "num5": 5,
            "text": "这是商品的备注信息"
          },
          {
            'id': '5',
            "iid": '55088',
            "name": "人民邮电出版社",
            "price": 30,
            "price2": 50,
            "num": 100,
            "num2": 80,
            "num3": 90,
            "num4": 100,
            "style": "箱包",
            "desc": "这是商品的简要说明",
            "num5": 5,
            "text": "这是商品的备注信息"
          },
          {
            'id': '6',
            "iid": '55088',
            "name": "人民邮电出版社",
            "price": 30,
            "price2": 50,
            "num": 100,
            "num2": 80,
            "num3": 90,
            "num4": 100,
            "style": "箱包",
            "desc": "这是商品的简要说明",
            "num5": 5,
            "text": "这是商品的备注信息"
          },
          {
            'id': '7',
            "iid": '55088',
            "name": "人民邮电出版社",
            "price": 30,
            "price2": 50,
            "num": 100,
            "num2": 80,
            "num3": 90,
            "num4": 100,
            "style": "箱包",
            "desc": "这是商品的简要说明",
            "num5": 5,
            "text": "这是商品的备注信息"
          },
          {
            'id': '8',
            "iid": '55088',
            "name": "人民邮电出版社",
            "price": 30,
            "price2": 50,
            "num": 100,
            "num2": 80,
            "num3": 90,
            "num4": 100,
            "style": "箱包",
            "desc": "这是商品的简要说明",
            "num5": 5,
            "text": "这是商品的备注信息"
          }
        ]
      },
      proxy: {
        type: 'memory',
        reader: {
          type: 'json',
          root: 'items'
        }
      }
    });

    // 进转损
    Ext.create('Ext.data.Store', {
      storeId: 'jzs',
      fields: ['id', 'iid', 'anum', 'bnum', "category"],
      layout: "fit",
      data: {
        'items': [
          {
            'id': '1',
            "category": "进货单",
            "iid": "54001",
            "anum": "2014/04/24",
            "bnum": "30"
          },
          {
            'id': '2',
            "category": "进货单",
            "iid": "54001",
            "anum": "2014/04/24",
            "bnum": "30"
          },
          {
            'id': '3',
            "category": "进货单",
            "iid": "54001",
            "anum": "2014/04/24",
            "bnum": "30"
          },
          {
            'id': '4',
            "category": "进货单",
            "iid": "54001",
            "anum": "2014/04/24",
            "bnum": "30"
          },
          {
            'id': '5',
            "category": "损坏表",
            "iid": "54001",
            "anum": "2014/04/24",
            "bnum": "30"
          },
          {
            'id': '6',
            "iid": "54001",
            "category": "损坏表",
            "anum": "2014/04/24",
            "bnum": "30"
          },
          {
            'id': '7',
            "iid": "54001",
            "anum": "2014/04/24",
            "category": "损坏表",
            "bnum": "30"
          },
          {
            'id': '8',
            "iid": "54001",
            "anum": "2014/04/24",
            "bnum": "30",
            "category": "损坏表"
          },
          {
            'id': '9',
            "iid": "54001",
            "category": "抵价券",
            "anum": "2014/04/24",
            "bnum": "30"
          }
        ]
      },
      proxy: {
        type: 'memory',
        reader: {
          type: 'json',
          root: 'items'
        }
      }
    });

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
              xtype: "panel",
              layout: 'hbox',
              bodyPadding: 5,
              border: 0,
              defaultType: 'datefield',
              items: [
                {
                  fieldLabel: "起始日期",
                  labelAlign: "right"
                },
                {
                  fieldLabel: "终止日期",
                  labelAlign: "right"
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
                  dataIndex: 'id1',
                  flex: 1
                },
                {
                  text: '货号',
                  dataIndex: 'iid1',
                  flex: 1
                },
                {
                  text: '品名',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '数量',
                  dataIndex: 'bnum1',
                  flex: 2
                },
                {
                  text: '进货编号',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '厂商',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '进货日期',
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
                  labelAlign: "right"
                },
                {
                  fieldLabel: "终止日期",
                  labelAlign: "right"
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
                  dataIndex: 'id1',
                  flex: 1
                },
                {
                  text: '货号',
                  dataIndex: 'iid1',
                  flex: 1
                },
                {
                  text: '品名',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '出货量',
                  dataIndex: 'bnum1',
                  flex: 2
                },
                {
                  text: '售价',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '金额',
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
                  labelAlign: "right"
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
                  labelAlign: "right"
                },
                {
                  fieldLabel: "全期单数",
                  labelWidth: 60,
                  width: 120,
                  labelAlign: "right"
                },
                {
                  xtype:"datefield",
                  fieldLabel: "参考日期",
                  labelWidth: 60,
                  width: 160,
                  labelAlign: "right"
                },
                {
                  xtype:"datefield",
                  fieldLabel: "到",
                  labelWidth: 20,
                  width: 120,
                  labelAlign: "right"
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
                  dataIndex: 'id1',
                  flex: 1
                },
                {
                  text: '货号',
                  dataIndex: 'iid1',
                  flex: 1
                },
                {
                  text: '品名',
                  dataIndex: 'iid1',
                  flex: 1
                },
                {
                  text: '调整前累进量',
                  dataIndex: 'bnum1',
                  flex: 2
                },
                {
                  text: '调整后累进量',
                  dataIndex: 'bnum1',
                  flex: 2
                },
                {
                  text: '调整前出货数',
                  dataIndex: 'bnum1',
                  flex: 2
                },
                {
                  text: '调整后出货数',
                  dataIndex: 'bnum1',
                  flex: 2
                },
                {
                  text: '库存量',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '损坏数',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '供应单数',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '进价',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '调整前预计出货数',
                  dataIndex: 'bnum1',
                  flex: 2
                },
                {
                  text: '调整后预计出货数',
                  dataIndex: 'bnum1',
                  flex: 2
                },
                {
                  text: '调整前补货数',
                  dataIndex: 'bnum1',
                  flex: 2
                },
                {
                  text: '调整后补货数',
                  dataIndex: 'bnum1',
                  flex: 2
                },
                {
                  text: '补货金额',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '全期预估',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '全期补货数',
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
                              labelAlign: "right"
                            }, {
                              fieldLabel: "会员编号",
                              labelWidth: 60,
                              labelAlign: "right"
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
                              labelAlign: "right"
                            },
                            {
                              fieldLabel: "邮编",
                              labelWidth: 40,
                              width: 150,
                              labelAlign: "right"
                            },
                            {
                              fieldLabel: "电话",
                              labelWidth: 40,
                              width: 150,
                              labelAlign: "right"
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
                          defaultType: 'datefield',
                          items: [
                            {
                              fieldLabel: "购买时间",
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
                          defaultType: 'datefield',
                          items: [
                            {
                              fieldLabel: "毕业时间",
                              labelWidth: 60,
                              width: 160,
                              labelAlign: "right"
                            },
                            {
                              xtype: "checkboxfield",
                              fieldLabel: "反选毕业时间",
                              labelWidth: 100,
                              labelAlign: "right"
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


    add.show();
  }
});