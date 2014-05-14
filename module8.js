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
      activeItem: 7,
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
                  labelAlign: "right"
                },
                {
                  xtype:"datefield",
                  fieldLabel: "到",
                  labelWidth: 60,
                  labelAlign: "right"
                },
                {
                  xtype: "label",
                  text: "本期现单量：4561",
                  labelWidth: 60,
                  margin: "3 0 0 50"
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
                  text: '调整前/后累进量',
                  dataIndex: 'bnum1',
                  flex: 1
                },

                {
                  text: '调整前/后出货数',
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
                  text: '调整前/后预计出货数',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '调整前/后补货数',
                  dataIndex: 'bnum1',
                  flex: 1
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
            }
          ]
        },

        {
          title: '库存明细',
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
                },
                {
                  xtype: "fieldset",
                  tiele: "库存类别",
                  defaultType: 'radiofield',
                  margin: "0 0 0 50",
                  layout: "hbox",
                  items: [
                    {
                      boxLabel: "你玩安全库存量一览表",
                      margin: "0 0 0 10"
                    },
                    {
                      boxLabel: "下架库存明细表",
                      margin: "0 0 0 10"
                    },
                    {
                      boxLabel: "库存结存明细表",
                      margin: "0 0 0 10"
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
                  text: '货号',
                  dataIndex: 'iid1',
                  flex: 1
                },
                {
                  text: '品名',
                  dataIndex: 'bnum1',
                  flex: 2
                },
                {
                  text: '规格',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '包装',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '售价',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '进价',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '成本',
                  dataIndex: 'bnum1',
                  flex: 1
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
                  text: '本期总进数',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '本期总出数',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '总额',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '厂家名称',
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
          title: '缺货统计表',
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
                  xtype: "button",
                  text: "缺货处理"
                },
                {
                  xtype: "progressbar",
                  width: 300,
                  margin: "0 0 0 50"
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
                  flex: 2
                },
                {
                  text: '规格',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '厂商编号',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '厂商名称',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '库存数量',
                  dataIndex: 'bnum1',
                  flex: 1
                }
              ]
            }
          ]
        },
        {
          title: '出货单打印',
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
                  xtype: "combobox",
                  fieldLabel: "期数",
                  labelWidth: 40,
                  width: 120,
                  labelAlign: "right"
                },
                {
                  fieldLabel: "出货单编号从",
                  labelAlign: "right"
                },
                {
                  fieldLabel: "~~~~~~~",
                  labelWidth: 57,
                  labelAlign: "right"
                },
                {
                  xtype: "button",
                  text: "会员卡查询",
                  margin: "0 0 0 50"
                },
                {
                  xtype: "button",
                  text: "会员卡预览",
                  margin: "0 0 0 20"
                },
                {
                  xtype: "button",
                  text: "会员卡打印",
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
                  dataIndex: 'id1'
                },
                {
                  text: '出货单编号',
                  dataIndex: 'iid1'
                },
                {
                  text: '汇票号码',
                  dataIndex: 'bnum1'
                },
                {
                  text: '会员编号',
                  dataIndex: 'bnum1'
                },
                {
                  text: '姓名',
                  dataIndex: 'bnum1'
                },
                {
                  text: '地址',
                  dataIndex: 'bnum1',
                  flex: 1
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
                              fieldLabel: "年份选择",
                              labelWidth: 60,
                              labelAlign: "right"
                            },
                            {
                              xtype: "button",
                              text: "查询",
                              margin: "0 0 0 30"
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
                            }
                          ]
                        },
                        {
                          xtype: "panel",
                          layout: 'hbox',
                          bodyPadding: 5,
                          border: 0,
                          defaultType: 'combobox',
                          items: [
                            {
                              xtype: "radiofield",
                              fieldLabel: "代理",
                              labelWidth: 40,
                              labelAlign: "right"
                            },
                            {
                              fieldLabel: "寄送方式",
                              labelWidth: 60,
                              width: 120,
                              labelAlign: "right"
                            },
                            {
                              xtype: "checkboxfield",
                              fieldLabel: "寄送方式选择",
                              labelWidth: 80,
                              labelAlign: "right"
                            },
                            {
                              fieldLabel: "类型",
                              labelWidth: 40,
                              width: 120,
                              labelAlign: "right"
                            }
                          ]
                        },
                        {
                          xtype: "panel",
                          layout: 'hbox',
                          bodyPadding: 5,
                          border: 0,
                          items: [
                            {
                              xtype: "button",
                              text: "查询",
                              margin: "0 0 0 150"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                {
                  xtype: "button",
                  text: "块状打印",
                  margin: "0 0 0 50"
                },
                {
                  xtype: "button",
                  text: "条状打印",
                  margin: "0 0 0 20"
                },
                {
                  xtype: "button",
                  text: "面单打印",
                  margin: "0 0 0 20"
                },
                {
                  xtype: "button",
                  text: "批量修改",
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
        },
        {
          title: '预估缺货',
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
                  fieldLabel: "预估单量",
                  labelAlign: "right"
                },
                {
                  fieldLabel: "全期单数",
                  labelWidth: 65,
                  labelAlign: "right"
                },
                {
                  xtype: "button",
                  text: "搜索",
                  margin: "0 0 0 30"
                },
                {
                  xtype: "button",
                  text: "重置",
                  margin: "0 0 0 20"
                },
                {
                  xtype: "label",
                  text: "本期单量：4561",
                  margin: "3 0 0 50"
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
                  flex: 2
                },
                {
                  text: '累进量',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '出货数',
                  dataIndex: 'bnum1',
                  flex: 1
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
                  text: '预计出货数',
                  dataIndex: 'bnum1',
                  flex: 1
                },
                {
                  text: '补货数',
                  dataIndex: 'bnum1',
                  flex: 1
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


    // panel.hide();
    // button.hide();
  }
});