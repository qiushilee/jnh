/*业务管理*/
Ext.application({
  name: "JNH",
  launch: function() {
    // 会员列表
    var memberList = Ext.create('Ext.data.Store', {
      storeId: 'memberList',
      fields: ['addrList', 'userCode', 'realName', 'source', "address1", "address2"],
      layout: "fit",
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: env.services.web + env.api.business.list,
        reader: {
          type: 'json',
          root: 'list'
        }
      }
    });



    var panel = Ext.create('Ext.tab.Panel', {
      renderTo: window.$bd,
      layout: "fit",
      items: [
        {
          title: '名单管理',
          padding: 15,
          items: [
            {
              itemId: "searchBar",
              xtype: "form",
              url: env.services.web + env.api.business.list,
              layout: "hbox",
              bodyPadding: 10,
              defaultType: 'textfield',
              margin: "10 0 0 0",
              items: [Ext.create('periodical'), 
              {
                fieldLabel: "会员编号",
                labelWidth: 60,
                width: 140,
                labelAlign: "right",
                name: 'userCode'
              },
              {
                fieldLabel: "姓名",
                labelWidth: 40,
                width: 120,
                labelAlign: "right",
                name: 'realName'
              }, {
                fieldLabel: "地址",
                labelWidth: 40,
                width: 120,
                labelAlign: "right",
                name: 'address'
              }, {
                fieldLabel: "电话",
                labelWidth: 40,
                width: 145,
                labelAlign: "right",
                name: 'mobile'
              }, {
                fieldLabel: "邮编",
                labelWidth: 40,
                width: 100,
                labelAlign: "right",
                name: 'zipCode'
              }, Ext.create('memberSource'), {
                xtype: "button",
                text: "搜索",
                margin: "0 0 0 20",
                handler: function() {
                  searchHandler.call(this.ownerCt.ownerCt.getComponent("searchBar"), "memberList");
                }
              }, {
                xtype: "button",
                text: "重置",
                margin: "0 0 0 20",
                handler: function() {
                  this.ownerCt.ownerCt.getComponent("searchBar").getForm().reset();
                }
              }
            ]
            },
            {
              layout: "column",
              border: 0,
              items: [
                {
                  xtype: "panel",
                  border: 0,
                  columnWidth: 0.5,
                  margin: "47 0 0 0",
                  items: [
                    {
                      itemId: "memberList",
                      xtype: "grid",
                      store: Ext.data.StoreManager.lookup('memberList'),
                      columns: [ {
                        text: '会员号',
                        dataIndex: 'userCode'
                      },
                      {
                        text: '会员姓名',
                        dataIndex: 'realName'
                      },
                      {
                        text: '默认地址',
                        flex: 1,
                        dataIndex: "address1"
                      },
                      {
                        text: '地址2',
                        flex: 1,
                        dataIndex: "address2"
                      },
                      {
                        text: '来源',
                        flex: 1,
                        dataIndex: 'source'
                      }
                    ],
                    listeners: {
                      itemdblclick: function (that, record, item, index, e, eOpts) {
                        var form = this.ownerCt.ownerCt.ownerCt.getComponent("memberContainer").getComponent("member").getForm();

                        window.updateForm(form, record.data);
                      }
                    }
                  }
                ]
                }, {
                  xtype: "panel",
                  border: 0,
                  columnWidth: 0.49,
                  style: {
                    float: "right",
                  },
                  items: [
                    {
                      xtype:'panel',
                      layout: "hbox",
                      border: 0,
                    }, {
                      xtype:'panel',
                      bodyPadding: 5,
                      margin: "10 0 0 0",
                      border: 0,
                      items: [
                        {
                          xtype:'panel',
                          layout: "hbox",
                          border: 0,
                          defaultType: 'textfield',
                          items: [
                            {
                              xtype: "button",
                              text: "目录寄送"
                            }
                          ]
                          }, {
                            xtype: "grid",
                            store: Ext.data.StoreManager.lookup('simpsonsStore'),
                            margin: "10 0 0 0",
                            columns: [
                              {
                                text: '寄送日期',
                                dataIndex: 'id1'
                              }, {
                                text: '寄送方式',
                                dataIndex: 'adder1',
                                flex: 1
                              }, {
                                text: '期数',
                                dataIndex: 'man1',
                                flex: 1
                              }, {
                                text: '索取数',
                                dataIndex: 'phone11',
                                flex: 1
                              }, {
                                text: '数量1',
                                dataIndex: 'phone21',
                                flex: 1
                              }, {
                                text: '数量2',
                                dataIndex: 'qq1',
                                flex: 1
                              }, {
                                text: '单号',
                                dataIndex: 'qq1',
                                flex: 1
                              }, {
                                text: '备注',
                                dataIndex: 'qq1',
                                flex: 1
                              }, {
                                text: '状态',
                                dataIndex: 'qq1',
                                flex: 1
                              }
                            ]
                          }
                        ]
                      }
                    ]
                  }
                ]
                },
                {
                  itemId: "memberContainer",
                  xtype: "panel",
                  layout: "column",
                  border: 0,
                  margin: "15 0 0 0",
                  items: [
                    {
                      xtype: "form",
                      itemId: "member",
                      border: 0,
                      items: [
                        {
                          xtype:'panel',
                          layout: "hbox",
                          border: 0,
                          defaultType: 'textfield',
                          items: [
                            Ext.create("memberType"),
                            {
                              fieldLabel: "姓名",
                              labelWidth: 60,
                              width: 120,
                              labelAlign: "right",
                              name:"realName"
                            },
                            Ext.create("deliveryMethod"),
                            {
                              xtype: "datefield",
                              fieldLabel: "毕业时间",
                              labelWidth: 60,
                              labelAlign: "right",
                              name:"graduateDate"
                            },
                            Ext.create("periodical")
                          ]
                          }, {
                            layout: "hbox",
                            border: 0,
                            defaultType: 'textfield',
                            margin: "10 0 0 0",
                            items: [
                              Ext.create("addressType"),
                              {
                                xtype: 'textfield',
                                fieldLabel: "邮编",
                                name: "zipCode",
                                labelWidth: 40,
                                width: 100,
                                labelAlign: "right"
                              }, {
                                xtype: 'textfield',
                                fieldLabel: "地址",
                                name: "address",
                                labelWidth: 60,
                                width: 300,
                                labelAlign: "right"
                              }, {
                                xtype: 'textfield',
                                fieldLabel: "电话",
                                name: "mobile",
                                labelWidth: 40,
                                width: 145,
                                labelAlign: "right"
                              }, {
                                xtype: 'textfield',
                                fieldLabel: "收件人",
                                name: "consignee",
                                labelWidth: 60,
                                width: 120,
                                labelAlign: "right"
                              }, {
                                xtype: 'textfield',
                                fieldLabel: "索取数量",
                                name: "askNumber",
                                labelWidth: 60,
                                width: 120,
                                labelAlign: "right"
                              }, {
                                xtype: 'button',
                                text: "设为默认",
                                margin: "0 0 0 10"
                              }, {
                                xtype: 'button',
                                text: "删除",
                                margin: "0 0 0 10"
                              }, {
                                xtype: 'button',
                                text: "增加地址",
                                margin: "0 0 0 10"
                              }
                            ]
                          }
                        ]
                        // +TODO: 增加一个按钮：增加地址
                      }, {
                        xtype:'panel',
                        layout: "hbox",
                        border: 0,
                        defaultType: 'textfield',
                        margin: "25 0 0 0",
                        items: [
                          {
                            xtype: "button",
                            text: "<span class=\"key\">A</span> 增加",
                            handler: function() {
                              var form = this.ownerCt.ownerCt.getComponent("member").getForm();
                              form.url = env.services.web + env.api.business.add;
                              form.submit({
                                success: function(form, action) {
                                  Ext.data.StoreManager.lookup("memberList").load();
                                  form.reset();
                                },
                                failure: function(form, action) {
                                  Ext.Msg.alert("增加名单", action.result.msg);
                                }
                              });
                            }
                          }, {
                            xtype: "button",
                            text: "<span class=\"key\">N</span> 修改",
                            handler: function() {
                              var form = this.ownerCt.ownerCt.getComponent("member").getForm();
                              form.url = env.services.web + env.api.business.change;
                              form.submit({
                                success: function(form, action) {
                                  Ext.data.StoreManager.lookup("memberList").load();
                                  form.reset();
                                },
                                failure: function(form, action) {
                                  Ext.Msg.alert("修改名单", action.result.msg);
                                }
                              });
                            },
                            margin: "0 0 0 20"
                          }, {
                            xtype: "button",
                            text: "<span class=\"key\">S</span> 保存",
                            disabled: true,
                            handler: function() {
                              var form = this.ownerCt.ownerCt.getComponent("member").getForm();
                              form.url = env.services.web + env.api.business.save;
                              if (form.isValid()) {
                                form.submit({
                                  success: function(form, action) {
                                    console.log(action)
                                  },
                                  failure: function(form, action) {
                                    Ext.Msg.alert("保存名单", action.result.msg);
                                  }
                                });
                              }
                            },
                            margin: "0 0 0 20"
                          }, {
                            xtype: "button",
                            text: "<span class=\"key\">Q</span> 添加",
                            handler: function() {
                              try {
                                var record = Ext.ComponentQuery.query("grid[itemId=memberList]")[0]
                                .getSelectionModel()
                                .getSelection()[0].data;

                                Ext.Ajax.request({
                                  url: env.services.web + env.api.business.addprintcart,
                                  params: {
                                    memberId: record.id
                                  },
                                  success: function(resp) {
                                    var data = Ext.JSON.decode(resp.responseText);
                                    console.log(data);
                                  },
                                  failure: function(resp) {
                                    try {
                                      var data = Ext.JSON.decode(resp.responseText);
                                      Ext.Msg.alert("添加到打印购物车", data.msg);
                                    } catch(e) {
                                      console.error(e.stack);
                                    }
                                  }
                                });
                              } catch (e) {
                                Ext.Msg.alert("添加打印购物车", "请选中列表中的一项后再操作");
                              }
                            },
                            margin: "0 0 0 20"
                          }, {
                            xtype: "button",
                            text: "删除",
                            margin: "0 0 0 20",
                            handler: function() {
                              var form = this.ownerCt.ownerCt.getComponent("member").getForm();
                              form.url = env.services.web + env.api.business.del;
                              if (form.isValid()) {
                                form.submit({
                                  success: function(form, action) {
                                    console.log(action)
                                  },
                                  failure: function(form, action) {
                                    Ext.Msg.alert("删除名单", action.result.msg);
                                  }
                                });
                              }
                            }
                          }, {
                            xtype: "button",
                            text: "打印",
                            margin: "0 0 0 20"
                          }
                        ]
                      }
                    ]
                  }
                ]
                },
                {
                  title: '管理打印',
                  padding: 15,
                  items: [
                    {
                      layout: "hbox",
                      bodyPadding: 10,
                      border: 0,
                      defaultType: 'textfield',
                      bodyStyle: {
                        "background-color": "transparent"
                      },
                      items: [
                        {
                          xtype: "combobox",
                          fieldLabel: "来源",
                          labelWidth: 40,
                          width: 100,
                          labelAlign: "right"
                        }, {
                          xtype: "combobox",
                          fieldLabel: "类型",
                          labelWidth: 40,
                          width: 100,
                          labelAlign: "right"
                        }, {
                          xtype: "combobox",
                          fieldLabel: "状态",
                          labelWidth: 40,
                          width: 100,
                          labelAlign: "right"
                        }, {
                          fieldLabel: "期数",
                          labelWidth: 40,
                          width: 110,
                          labelAlign: "right",
                          name:'startPeriodical'
                        }, {
                          fieldLabel: "到",
                          labelWidth: 20,
                          width: 90,
                          labelAlign: "right",
                          name:'endPeriodical'
                        }
                      ]
                      }, {
                        layout: "hbox",
                        bodyPadding: 10,
                        border: 0,
                        defaultType: 'textfield',
                        bodyStyle: {
                          "background-color": "transparent"
                        },
                        items: [
                          {
                            fieldLabel: "姓名",
                            labelWidth: 40,
                            width: 120,
                            labelAlign: "right",
                            name:'realName'
                          }, {
                            fieldLabel: "会员编号",
                            labelWidth: 60,
                            width: 140,
                            labelAlign: "right",
                            name:'userCode'
                          }, {
                            xtype: "datefield",
                            fieldLabel: "加入时间",
                            labelWidth: 60,
                            width: 180,
                            format: "Y-m-d H",
                            labelAlign: "right",
                            name:'startDate'
                          }, {
                            xtype: "datefield",
                            fieldLabel: "~",
                            labelWidth: 20,
                            width: 140,
                            format: "Y-m-d H",
                            labelAlign: "right",
                            name:'endDate'
                          }
                        ]
                        }, {
                          layout: "hbox",
                          bodyPadding: 10,
                          border: 0,
                          defaultType: 'textfield',
                          bodyStyle: {
                            "background-color": "transparent"
                          },
                          items: [
                            {
                              xtype: "button",
                              text: "搜索",
                              margin: "0 0 0 20"
                            }, {
                              xtype: "button",
                              text: "重置",
                              margin: "0 0 0 10"
                            }
                          ]
                          }, {
                            xtype: "grid",
                            store: Ext.data.StoreManager.lookup('simpsonsStore'),
                            margin: "10 0 0 0",
                            columns: [
                              {
                                text: '序号',
                                dataIndex: 'id1',
                                flex: 1
                              }, {
                                text: '姓名',
                                dataIndex: 'id1',
                                flex: 1
                              }, {
                                text: '地址',
                                dataIndex: 'id1',
                                flex: 2
                              }, {
                                text: '邮编',
                                dataIndex: 'id1',
                                flex: 1
                              }, {
                                text: '电话',
                                dataIndex: 'id1',
                                flex: 1
                              }, {
                                text: '寄送方式',
                                dataIndex: 'id1',
                                flex: 1
                              }
                            ]
                            }, {
                              layout: "hbox",
                              bodyPadding: 10,
                              border: 0,
                              defaultType: 'textfield',
                              bodyStyle: {
                                "background-color": "transparent"
                              },
                              items: [
                                {
                                  xtype: "button",
                                  text: "<span class=\"key\">Q</span> 添加打印",
                                  margin: "0 0 0 10"
                                }
                              ]
                            }
                          ]
                          },
                          {
                            title: "打印购物车",
                            padding: 15,
                            items: [
                              {
                                layout: "hbox",
                                bodyPadding: 10,
                                border: 0,
                                defaultType: 'textfield',
                                bodyStyle: {
                                  "background-color": "transparent"
                                },
                                items: [
                                  {
                                    xtype: "combobox",
                                    fieldLabel: "寄送方式",
                                    labelWidth: 60,
                                    labelAlign: "right"
                                  }, {
                                    fieldLabel: "编号",
                                    labelWidth: 40,
                                    labelAlign: "right"
                                  }, {
                                    fieldLabel: "参考期数",
                                    labelWidth: 60,
                                    width: 110,
                                    labelAlign: "right"
                                  }, {
                                    fieldLabel: "~",
                                    labelWidth: 20,
                                    width: 70,
                                    labelAlign: "right"
                                  }, {
                                    xtype: "datefield",
                                    fieldLabel: "参考时间",
                                    labelWidth: 60,
                                    width: 160,
                                    labelAlign: "right"
                                  }, {
                                    xtype: "datefield",
                                    fieldLabel: "~",
                                    labelWidth: 20,
                                    width: 120,
                                    labelAlign: "right"
                                  }, {
                                    xtype: "button",
                                    text: "搜索",
                                    margin: "0 0 0 20"
                                  }, {
                                    xtype: "button",
                                    text: "重置",
                                    margin: "0 0 0 10"
                                  }
                                ]
                                }, {
                                  xtype: "grid",
                                  store: Ext.data.StoreManager.lookup('simpsonsStore'),
                                  margin: "10 0 0 0",
                                  columns: [
                                    {
                                      text: '序号',
                                      dataIndex: 'id1',
                                      flex: 1
                                    }, {
                                      text: '流水号',
                                      dataIndex: 'id1',
                                      flex: 1
                                    }, {
                                      text: '姓名',
                                      dataIndex: 'id1',
                                      flex: 1
                                    }, {
                                      text: '地址',
                                      dataIndex: 'id1',
                                      flex: 2
                                    }, {
                                      text: '索取数',
                                      dataIndex: 'id1',
                                      flex: 1
                                    }, {
                                      text: '寄出数量1',
                                      dataIndex: 'id1',
                                      flex: 1
                                    }, {
                                      text: '寄出数量2',
                                      dataIndex: 'id1',
                                      flex: 1
                                    }, {
                                      text: '期数',
                                      dataIndex: 'id1',
                                      flex: 1
                                    }, {
                                      text: '寄出日',
                                      dataIndex: 'id1',
                                      flex: 1
                                    }, {
                                      text: '重量',
                                      dataIndex: 'id1',
                                      flex: 1
                                    }, {
                                      text: '邮资',
                                      dataIndex: 'id1',
                                      flex: 1
                                    }, {
                                      text: '包裹单号',
                                      dataIndex: 'id1',
                                      flex: 1
                                    }, {
                                      text: '备注',
                                      dataIndex: 'id1',
                                      flex: 1
                                    }, {
                                      text: '购买金额',
                                      dataIndex: 'id1',
                                      flex: 1
                                    }
                                    ],
                                    bbar: Ext.create('Ext.PagingToolbar', {
                                      displayMsg: 'Displaying topics {0} - {1} of {2}',
                                      items:['-', {
                                        pressed: false
                                      }
                                    ]
                                    })
                                  }, {
                                    layout: "hbox",
                                    bodyPadding: 10,
                                    border: 0,
                                    defaultType: 'textfield',
                                    width: "56%",
                                    style: {
                                      float: "right"
                                    },
                                    bodyStyle: {
                                      "background-color": "transparent"
                                    },
                                    items: [
                                      {
                                        xtype: "button",
                                        text: "批量修改",
                                        margin: "0 0 0 20"
                                      }, {
                                        xtype: "button",
                                        text: "包裹单号扫描",
                                        margin: "0 0 0 10"
                                      }, {
                                        xtype: "button",
                                        text: "<span class=\"key\">N</span> 修改",
                                        margin: "0 0 0 10"
                                      }, {
                                        xtype: "button",
                                        text: "<span class=\"key\">W</span> 保存",
                                        margin: "0 0 0 10"
                                      }, {
                                        xtype: "button",
                                        text: "面单打印",
                                        margin: "0 0 0 10"
                                      }, {
                                        xtype: "button",
                                        text: "块状打印",
                                        margin: "0 0 0 10"
                                      }, {
                                        xtype: "button",
                                        text: "条状打印",
                                        margin: "0 0 0 10"
                                      }
                                    ]
                                  }
                                ]
                              }
                            ]
                          });

                          // +TODO Tab: [ "名单管理: list, list2", "管理打印", "打印购物车"]
                        }
                      });
