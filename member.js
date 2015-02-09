Ext.onReady(function () {
  // 会员列表
  var memberList = Ext.create('Ext.data.Store', {
    storeId: 'memberList',
    fields: ['addrList', 'userCode', 'realName', 'memberType', "address1", "address2", "memberId"],
    layout: "fit",
    autoLoad: false,
    proxy: {
      type: 'ajax',
      url: env.services.web + env.api.member.list,
      reader: {
        type: 'json',
        root: 'list'
      }
    }
  });

  // 目录寄送
  Ext.create('Ext.data.Store', {
    storeId: 'directoryList',
    fields: ['periodicalName', 'deliveryMethodName', 'number', 'state'],
    layout: "fit",
    proxy: {
      type: 'ajax',
      url: env.services.web + env.api.catalog.record,
      reader: {
        type: 'json',
        root: 'list'
      }
    }
  });

  // 流程表
  var folwChartsList = Ext.create('Ext.data.Store', {
    storeId: 'folwChartsList',
    fields: [
      "periodicalId",
      "consignee",
      "zipCode",
      "address",
      "preferentialTicket",
      "memberId",
      "realName",
      "key",
      'id',
      'periodicalName',
      'userCode',
      'userName',
      "billNumber",
      "receiptProceedsOffice",
      "remitter",
      "remittanceAmount",
      "remittanceDate",
      "paymentMethord",
      "paymentMethordName",
      "youthStuck",
      "unDiscountAmount",
      "memberType",
      "postage",
      "packageCode",
      "mailingDate",
      "isRemittanceReceived",
      "remittanceReceivedDate",
      "isOrderReceived",
      "orderReceivedDate",
      "deliveryMethod",
      "deliveryMethodName",
      "mailTimes",
      "status",
      "orderStatus"
    ],
    layout: "fit",
    autoLoad: true,
    proxy: {
      type: 'ajax',
      url: env.services.web + env.api.member.folwCharts,
      reader: {
        type: 'json',
        root: 'list'
      }
    }
  });

  /**
   * TODO 性能优化，请求list接口时，就返回所有会员数据
   */
  function getMemberInfo(memberId, callback) {
    Ext.Ajax.request({
      url: env.services.web + env.api.member.info + memberId,
      success: function (response) {
        var data = Ext.JSON.decode(response.responseText);

        callback(data);
      },
      failure: function (form, action) {
        Ext.Msg.alert("查询失败", "服务器无响应，请稍后再试");
      }
    });
  }

  function showMemberInfo(memberId) {
    getMemberInfo(memberId, function (data) {
      var con = panel.getComponent("memberInfo").getForm();

      con.reset();
      window.updateForm(con, data.info);

      // Update address
      if (data.addressList) {
        window.updateForm(con, data.addressList);
      } else {
        window.updateForm(con, {
          "memberType": "",
          "id": "",
          "memberId": "",
          "type": "",
          "address": "",
          "zipCode": "",
          "mobile": "",
          "consignee": "",
          "isDefault": ""
        });
      }
    });
  }

  function showFolwCharts(memberId) {
    Ext.Ajax.request({
      url: env.services.web + env.api.member.folwCharts + memberId,
      success: function (response) {
        folwChartsList.loadData(Ext.JSON.decode(response.responseText).list);
      },
      failure: function (form, action) {
        Ext.Msg.alert("查询失败", "服务器无响应，请稍后再试");
      }
    });
  }

  function orderModelHandler(opt) {
    var currentMember = panel.getComponent("grid").getComponent("memberList").getSelectionModel().getSelection()[0];

    if (currentMember) {
      getMemberInfo(currentMember.data.id, function (resp) {
        var data = resp.info;
        data.memberId = data.id;

        opt.success(data);
      });
    } else {
      opt.fail();
    }
  }

  function updateMember(form) {
    var member = panel.getComponent("grid").getComponent("memberList").getSelectionModel().getSelection()[0],
        memberId = '';

    if (member) {
      memberId = member.data.id
    }

    if (form.isValid()) {
      form.submit({
        params: {
          id: memberId
        },
        success: function (form, action) {
          Ext.data.StoreManager.lookup('memberList').loadData(action.result.list);
        },
        failure: function (form, action) {
          Ext.Msg.alert("添加或修改会员", action.result.msg);
        }
      });
    }
  }

  var panel = Ext.create("Ext.panel.Panel", {
    renderTo: window.$bd,
    border: 0,
    items: [
      {
        itemId: "searchBar",
        xtype: "form",
        url: env.services.web + env.api.member.list,
        border: 0,
        items: [
          {
            xtype: "panel",
            border: 0,
            defaultType: 'textfield',
            layout: 'hbox',
            items: [
              Ext.create("periodical",{
                  store: Ext.create("Ext.data.Store", {
                    fields: ["name", "value"],
                    data: JSON.parse(document.body.dataset.periodicalall)
                  })
              }),
              {
                fieldLabel: "会员编号",
                labelAlign: "right",
                labelWidth: 60,
                margin: '0 0 0 95',
                name: 'userCode'
              },
              {
                fieldLabel: "姓名",
                labelAlign: "right",
                name: 'realName'
              },
              {
                fieldLabel: "地址",
                labelAlign: "right",
                name: 'address'
              },
              {
                fieldLabel: "电话",
                labelAlign: "right",
                name: 'mobile'
              }
            ]
          },
          {
            xtype: "panel",
            border: 0,
            defaultType: 'textfield',
            margin: "10 0 0 0",
            layout: 'hbox',
            items: [
              {
                fieldLabel: "邮编",
                labelAlign: "right",
                labelWidth: 40,
                name: 'zipCode'
              },
              {
                itemId: "hi",
                xtype: "datefield",
                format: 'Y-m-d',
                fieldLabel: "加入时间",
                name: "beginDate",
                width: 200,
                labelAlign: "right"
              },
              {
                xtype: "datefield",
                format: 'Y-m-d',
                fieldLabel: "到",
                name: "endDate",
                labelWidth: 20,
                width: 120,
                labelAlign: "right"
              },
              Ext.create('memberType',{
                store: Ext.create("Ext.data.Store", {
                    fields: ["name", "value"],
                    data: JSON.parse(document.body.dataset.membertypeall)
                })
              }),
              Ext.create("addressType",{
                store: Ext.create("Ext.data.Store", {
                    fields: ["name", "value"],
                    data: JSON.parse(document.body.dataset.addresstypeall)
                })
              }),
              {
                xtype: 'button',
                margin: "0 5 0 50",
                text: "搜索",
                handler: function () {
                  searchHandler.call(Ext.ComponentQuery.query("[itemId=searchBar]")[0], "memberList");
                }
              },
              {
                itemId: "order-button",
                xtype: 'button',
                margin: "0 5",
                text: "<span class=\"key\">E</span> 电话订购",
                handler: function () {
                  var record = Ext.ComponentQuery.query("grid[itemId=memberList]")[0]
                    .getSelectionModel()
                    .getSelection()[0].data;
                  location.href = location.origin + location.pathname + "?id=" + record.memberId + "#telorder";
                }
              },
              {
                xtype: 'button',
                margin: "0 5",
                text: "<span class=\"key\">N</span> 保存",
                handler: function () {
                  var form = panel.getComponent("memberInfo").getForm(),
                      member = panel.getComponent("grid").getComponent("memberList").getSelectionModel().getSelection()[0],
                      memberId = '';

                  if (member) {
                    memberId = member.data.id
                  }

                  Ext.Ajax.request({
                    url: env.services.web + env.api.member.checkMobile,
                    params: {
                      id: memberId,
                      mobile0: form.findField('mobile0').getValue(),
                      mobile1: form.findField('mobile1').getValue()
                    },
                    success: function (resp) {
                      var data = Ext.JSON.decode(resp.responseText);
                      if (data.success) {
                        updateMember(form);
                        searchHandler.call(Ext.ComponentQuery.query("[itemId=searchBar]")[0], "memberList");
                      
                        /*if(memberId>0){
                          showFolwCharts(memberId);
                        }else{
                          showFolwCharts(0);
                        }*/
                         showFolwCharts(0);

                      } else {
                        Ext.Msg.confirm("新增会员", data.msg, function (type) {
                          if (type === 'yes') {
                            updateMember(form);
                          }
                        });
                      }
                    }
                  });
                }
              },
              {
                xtype: 'button',
                margin: "0 5",
                text: "<span class=\"key\">Q</span> 新增",
                handler: function () {
                  var form = panel.getComponent("memberInfo").getForm();
                  form.reset();

                  showFolwCharts(0);
                }
              },
              {
                xtype: 'button',
                margin: "0 5",
                text: "删除",
                handler: function () {
                  window.removeGridRow({
                    grid: panel.getComponent("grid").getComponent("memberList"),
                    api: env.services.web + env.api.member.del,
                    success: function (form, action) {
                      var form = panel.getComponent("memberInfo").getForm();
                      form.reset();
                      Ext.data.StoreManager.lookup("memberList").loadData({});
                    }
                  });
                }
              }
            ]
          }
        ]
      },

      // 第二行
      {
        itemId: "grid",
        xtype: "panel",
        margin: "20 0 0 0",
        border: 0,
        layout: "column",
        items: [
          {
            // +TODO: 参照 module9.js 地址，索取数量不要
            itemId: "memberList",
            title: "会员列表",
            xtype: "grid",
            height: 155,
            columnWidth: 0.5,
            height: 155,
            store: Ext.data.StoreManager.lookup('memberList'),
            columns: [
              {
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
                text: '会员类型',
                flex: 1,
                dataIndex: 'memberType'
              }
            ],
            listeners: {
              itemclick: function (that, record) {
                Ext.Ajax.request({
                  url: env.services.web + env.api.member.counttelorder,
                  params: {
                    memberId: record.data.id
                  },
                  success: function (resp) {
                    var data = Ext.JSON.decode(resp.responseText);
                    var button = Ext.ComponentQuery.query("button[itemId=order-button]")[0]
                    button.setText("<span class=\"key\">E</span> 电话订购（" + data + "）")
                  },
                  failure: function (resp) {
                    var data = Ext.JSON.decode(resp.responseText);
                    console.log(data);
                  }
                });
              },

              itemdblclick: function (that, record, item, index, e, eOpts) {
                showMemberInfo(record.data.id);
                showFolwCharts(record.data.id);
                Ext.data.StoreManager.lookup('directoryList').load({
                  params: {
                    id: record.data.id
                  }
                });
              }
            }
          },
          {
            xtype: "grid",
            height: 155,
            columnWidth: 0.4,
            margin: "0 0 0 100",
            height: 155,
            title: "目录寄送",
            store: Ext.data.StoreManager.lookup('directoryList'),
            columns: [
              {
                text: '期数',
                dataIndex: 'periodicalName'
              },
              {
                text: '寄送方式',
                flex: 1,
                dataIndex: 'deliveryMethodName'
              },
              {
                text: '数量',
                dataIndex: 'number'
              },
              {
                text: '状态',
                flex: 1,
                dataIndex: 'state'
              }
            ]
          },
        ]
      },

      {
        itemId: "memberInfo",
        xtype: "form",
        url: env.services.web + env.api.member.add,
        border: 0,
        items: [
          // 第三行
          {
            xtype: 'panel',
            layout: "hbox",
            border: 0,
            defaultType: 'textfield',
            margin: "10 0 0 0",
            items: [
              Ext.create("memberType"),
              {
                fieldLabel: "姓名",
                labelWidth: 60,
                name: "realName",
                width: 200,
                labelAlign: "right",
                blankText: "姓名为必填项"
              }, Ext.create("deliveryMethod"),
              {
                xtype: "datefield",
                format: 'Y-m-d',
                fieldLabel: "生日",
                labelWidth: 60,
                labelAlign: "right",
                name: "birth"
              }, {
                // TODO 缺少name，所以暂时禁用 xtype
                xtype: "datefield",
                format: 'Y',
                fieldLabel: "毕业时间",
                labelWidth: 60,
                labelAlign: "right",
                name: "graduateDate"
              },
              Ext.create("periodical")
            ]
          },

          // 第四行
          {
            xtype: 'panel',
            layout: "hbox",
            border: 0,
            defaultType: 'textfield',
            margin: "10 0 0 0",
            items: [{
              xtype: "hiddenfield",
              name: "addressDefault0"
            },
              Ext.create("addressType", {
                name: "type0"
              }),
              Ext.create("zipCode", {
                name: "zipCode0",
                input: "address0"
              }),
              {
                xtype: 'textfield',
                fieldLabel: "地址",
                labelWidth: 60,
                name: "address0",
                width: 300,
                labelAlign: "right"
              },
              {
                xtype: 'textfield',
                fieldLabel: "电话",
                labelWidth: 40,
                name: "mobile0",
                width: 145,
                labelAlign: "right"
              },
              {
                xtype: 'textfield',
                fieldLabel: "收件人",
                labelWidth: 60,
                name: "consignee0",
                width: 180,
                labelAlign: "right"
              },
              {
                xtype: 'radio',
                id: 'isDefault0',
                fieldLabel: '默认地址',
                labelAlign: 'right',
                labelWidth: 80,
                name: 'isDefault',
                inputValue: '0',
                checked: true
              }
            ]
          },
          // 第五行
          {
            xtype: 'panel',
            layout: "hbox",
            border: 0,
            defaultType: 'textfield',
            margin: "10 0 0 0",
            items: [{
              xtype: "hiddenfield",
              name: "addressDefault1"
            },
              Ext.create("addressType", {
                name: "type1"
              }),
              Ext.create("zipCode", {
                name: "zipCode1",
                input: "address1"
              }),
              {
                xtype: 'textfield',
                fieldLabel: "地址",
                labelWidth: 60,
                name: "address1",
                width: 300,
                labelAlign: "right"
              },
              {
                xtype: 'textfield',
                fieldLabel: "电话",
                labelWidth: 40,
                name: "mobile1",
                width: 145,
                labelAlign: "right"
              },
              {
                xtype: 'textfield',
                fieldLabel: "收件人",
                labelWidth: 60,
                name: "consignee1",
                width: 180,
                labelAlign: "right"
              }, {
                xtype: 'radio',
                id: 'isDefault1',
                labelAlign: 'right',
                fieldLabel: '默认地址',
                labelWidth: 80,
                name: 'isDefault',
                inputValue: '1'
              }]
          },
          // 第六行
          {
            xtype: "panel",
            margin: "20 0 0 0",
            border: 0,
            layout: {
              type: "hbox",
              align: "stretch"
            },
            defaultType: 'textfield',
            fieldDefaults: {
              labelAlign: 'right'
            },
            items: [
              {
                fieldLabel: "抵价券",
                labelAlign: "right",
                name: "preferentialTicket",
                labelWidth: 50,
                width: 120
              },
              {
                fieldLabel: "不打折金额",
                labelAlign: "right",
                name: "unDiscountAmount",
                labelWidth: 70,
                width: 180
              },
              {
                fieldLabel: "青春贴",
                labelAlign: "right",
                name: "youthStuck",
                labelWidth: 50,
                width: 150
              },
               Ext.create("periodical", {
                fieldLabel:"代理期数",
                name: "agentPeriodicalId"
              }),
              {
                xtype: "datefield",
                format: 'Y-m-d',
                fieldLabel: "加入时间",
                labelAlign: "right",
                name: "addDate",
                labelWidth: 60
              }
            ]
          },

          // 第七行
          {
            xtype: "textfield",
            margin: "20 0 0 0",
            width: 1000,
            fieldLabel: "备注",
            labelAlign: "right",
            name: "remark",
            labelWidth: 40
          }
        ]
      },

      // 第八行
      // +TODO: 增加补寄详情
      {
        itemId: "orderlist",
        xtype: "grid",
        height: 155,
        title: "流程表",
        margin: "20 0 0 0",
        columnWidth: 0.5,
        height: 155,
        store: Ext.data.StoreManager.lookup('folwChartsList'),
        columns: [
          {
            text: '序号',
            dataIndex: 'key'
          },
          {
            text: '期数',
            dataIndex: 'periodicalName'
          },
          {
            text: '付款方式',
            dataIndex: 'paymentMethordName'
          },
          {
            text: '会员编号',
            dataIndex: 'userCode'
          },
          {
            text: '付款日期',
            dataIndex: 'remittanceDate'
          },
          {
            text: '付款金额',
            dataIndex: 'remittanceAmount'
          },
          {
            text: '汇票号码',
            dataIndex: 'billNumber'
          },
          {
            text: '寄送方式',
            dataIndex: 'deliveryMethodName'
          },
          {
            text: '邮资',
            dataIndex: 'postage'
          },
          {
            text: '收订单日',
            dataIndex: 'orderReceivedDate'
          },
          {
            text: '寄出日期',
            dataIndex: 'mailingDate'
          },
          {
            text: '包裹编号',
            dataIndex: 'packageCode'
          },
          // 点击后跳转到补寄界面
          {
            text: '补寄',
            dataIndex: 'mailTimes'
          },
          {
            text: '状态',
            dataIndex: 'orderStatus'
          }
        ],
        listeners: {
          itemdblclick: function (that, record, item, index, e, eOpts) {
            var form = addOrder.getComponent("orderForm").getForm();
            addOrder.show();
            updateForm(form, record.data);
            addOrder.setTitle("修改汇款订购");
          }
        }
      },
      {
        xtype: "panel",
        layout: "hbox",
        defaultType: "button",
        border: 0,
        margin: "20 0 0 0",
        items: [
          {
            text: "<span class=\"key\">A</span> 增加",
            handler: function () {
              var form = addOrder.getComponent("orderForm").getForm();
              form.reset();
              orderModelHandler({
                success: function (data) {
                  updateForm(form, data);
                  form.findField("id").setValue("");
                  addOrder.show();
                  addOrder.setTitle("增加汇款订购");
                },
                fail: function () {
                  Ext.Msg.alert("增加汇款定购", "错误：必须选选择一个会员才可以添加哦！");
                }
              });
            }
          },
          {
            text: "<span class=\"key\">D</span> 删除",
            margin: "0 0 0 10",
            handler: function () {
              window.removeGridRow({
                grid: Ext.ComponentQuery.query("grid[itemId=orderlist]")[0],
                api: env.services.web + env.api.orderremittance.del,
                success: function () {
                  var record = Ext.ComponentQuery.query("grid[itemId=memberList]")[0]
                    .getSelectionModel()
                    .getSelection()[0].data;
                  showFolwCharts(record.memberId);
                }
              });
            }
          },
          {
            text: "订单详情",
            margin: "0 0 0 10",
            handler: function () {
              var record = Ext.ComponentQuery.query("grid[itemId=memberList]")[0]
                .getSelectionModel()
                .getSelection()[0].data;

              location.href = location.origin + location.pathname + "?id=" + record.memberId + "#deliverorder";
            }
          }
        ]
      }
    ]
  });

  var add = Ext.create("Ext.window.Window", {
    title: "购买记录详情",
    width: 1000,
    layout: 'form',
    bodyPadding: 5,
    defaultType: 'textfield',
    fieldDefaults: {
      labelAlign: 'top'
    },
    bodyStyle: {
      background: "#fff"
    },
    items: [
      {
        xtype: 'panel',
        margin: "20 0 0 0",
        layout: "hbox",
        border: 0,
        defaultType: 'textfield',
        items: [
          Ext.create("periodical"),
          {
            xtype: "combobox",
            store: Ext.data.StoreManager.lookup('adderList'),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'abbr',
            fieldLabel: "付款方式",
            labelAlign: "right"
          },
          {
            fieldLabel: '汇票号码',
            labelAlign: "right",
            name: 'billNumber'
          },
          {
            fieldLabel: '编号',
            labelAlign: "right",
            name: 'userCode',
          }
        ]
      },
      {
        xtype: 'panel',
        layout: "hbox",
        margin: "10 0 0 0",
        border: 0,
        defaultType: 'textfield',
        items: [
          {
            fieldLabel: "付款金额",
            labelAlign: "right",
            name: 'first'
          },
          {
            xtype: "datefield",
            format: 'Y-m-d',
            fieldLabel: '付款日期',
            labelAlign: "right",
            name: 'company'
          },
          {
            xtype: "checkboxfield",
            boxLabel: "收到货款",
            margin: "0 0 0 37",
            inputValue: 1,
            labelAlign: "right",
            name: 'last'
          },
          {
            xtype: "datefield",
            format: 'Y-m-d',
            fieldLabel: '收款日期',
            labelAlign: "right",
            name: 'email',
          }
        ]
      },
      {
        xtype: 'panel',
        layout: "hbox",
        margin: "10 0 0 0",
        border: 0,
        defaultType: 'textfield',
        items: [
          {
            xtype: "combobox",
            store: Ext.data.StoreManager.lookup('adderList'),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'abbr',
            fieldLabel: "寄送方式",
            labelAlign: "right"
          }, {
            xtype: "datefield",
            format: 'Y-m-d',
            fieldLabel: '收订单日期',
            labelAlign: "right",
            name: 'company'
          },
          {
            fieldLabel: "邮资",
            labelAlign: "right",
            name: 'first'
          }
        ]
      },
      {
        xtype: 'panel',
        layout: "hbox",
        margin: "10 0 0 0",
        border: 0,
        defaultType: 'textfield',
        items: [
          {
            xtype: "checkboxfield",
            boxLabel: "收到订单",
            margin: "0 0 0 37",
            inputValue: 1,
            labelAlign: "right",
            name: 'last'
          }, {
            fieldLabel: "不打折金额",
            labelAlign: "right",
            name: 'first'
          },
          {
            fieldLabel: "抵价券",
            labelAlign: "right",
            name: 'first'
          }
        ]
      },
      {
        xtype: 'panel',
        layout: "hbox",
        margin: "10 0 0 0",
        border: 0,
        defaultType: 'textfield',
        items: [
          {
            fieldLabel: "姓名",
            labelAlign: "right",
            name: 'first'
          }, {
            fieldLabel: "会员编号",
            labelAlign: "right",
            name: 'first'
          },
          {
            fieldLabel: "邮编",
            labelAlign: "right",
            name: 'first'
          },
          {
            fieldLabel: "地址",
            labelAlign: "right",
            name: 'first'
          },
          {
            fieldLabel: "收件人",
            labelAlign: "right",
            width: 170,
            name: 'first'
          }
        ]
      },
      {
        xtype: 'panel',
        layout: "hbox",
        margin: "10 0 0 0",
        border: 0,
        defaultType: 'textfield',
        items: [
          {
            fieldLabel: "折扣",
            labelAlign: "right",
            name: 'first'
          },
          {
            fieldLabel: "邮寄",
            labelAlign: "right",
            name: 'first'
          },
          {
            fieldLabel: "青春贴",
            labelAlign: "right",
            name: 'first'
          },
          {
            fieldLabel: "多付款",
            labelAlign: "right",
            name: 'first'
          }
        ]
      },
      {
        xtype: 'panel',
        layout: "hbox",
        width: 110,
        margin: "30 auto",
        border: 0,
        bodyStyle: {
          background: 'transparent'
        },
        items: [
          {
            xtype: 'button',
            scale: "medium",
            disabled: true,
            text: "保存"
          },
          {
            xtype: 'button',
            scale: "medium",
            margin: "0 0 0 30",
            disabled: true,
            text: "返回"
          }
        ]
      }
    ]
  });

  var bujiDetail = Ext.create("Ext.window.Window", {
    title: "补寄详情",
    width: 700,
    layout: 'form',
    bodyPadding: 5,
    defaultType: 'textfield',
    fieldDefaults: {
      labelAlign: 'top'
    },
    bodyStyle: {
      background: "#fff"
    },
    items: [
      {
        xtype: "grid",
        height: 155,
        margin: "20 0 0 0",
        store: Ext.data.StoreManager.lookup('memberList'),
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
          disabled: true,
          text: "修改"
        }, {
          disabled: true,
          text: "保存",
          margin: "0 0 0 10"
        }]
      }
    ]
  });

  var addOrder = Ext.create("Ext.window.Window", {
    title: "增加汇款订购",
    width: 1000,
    closeAction: 'hide',
    layout: 'form',
    bodyPadding: 5,
    defaultType: 'textfield',
    fieldDefaults: {
      labelAlign: 'top'
    },
    closeAction: 'hide',
    bodyStyle: {
      background: "#fff"
    },
    items: [
      {
        itemId: "orderForm",
        xtype: "form",
        border: 0,
        items: [
          {
            xtype: "form",
            border: 0,
            items: [
              {
                xtype: 'panel',
                margin: "20 0 0 0",
                layout: "hbox",
                border: 0,
                defaultType: 'textfield',
                items: [
                  Ext.create("periodical", {
                    labelWidth: 40
                  }),
                  Ext.create("paymentMethord", {
                    labelWidth: 145,
                    width: 260
                  }),
                  {
                    fieldLabel: '汇票号码',
                    name: "billNumber",
                    labelAlign: "right",
                    labelWidth: 90
                  },
                  {
                    fieldLabel: '收汇局',
                    labelAlign: "right",
                    name: 'receiptProceedsOffice',
                    labelWidth: 90
                  }
                ]
              },
              {
                xtype: 'panel',
                layout: "hbox",
                margin: "10 0 0 0",
                border: 0,
                defaultType: 'textfield',
                items: [
                  {
                    xtype: "hiddenfield",
                    name: 'id'
                  },
                  {
                    xtype: "hiddenfield",
                    name: 'memberId'
                  },
                  {
                    fieldLabel: "汇款金额",
                    labelAlign: "right",
                    labelWidth: 60,
                    name: 'remittanceAmount'
                  },
                  {
                    xtype: "datefield",
                    format: 'Y-m-d',
                    fieldLabel: '汇款日期',
                    labelAlign: "right",
                    name: 'remittanceDate',
                    width: 220
                  },
                  {
                    xtype: "checkboxfield",
                    boxLabel: "收到货款",
                    margin: "0 0 0 37",
                    inputValue: 1,
                    labelAlign: "right",
                    name: 'isRemittanceReceived'
                  },
                  {
                    xtype: "datefield",
                    format: 'Y-m-d',
                    fieldLabel: '收款日期',
                    labelAlign: "right",
                    name: 'remittanceReceivedDate',
                    labelWidth: 220
                  }
                ]
              },
              {
                xtype: 'panel',
                layout: "hbox",
                margin: "30 0 0 0",
                border: 0,
                defaultType: 'textfield',
                items: [
                  Ext.create('deliveryMethod', {
                    labelWidth: 60,
                    width: 160
                  }),
                  {
                    xtype: "datefield",
                    format: 'Y-m-d',
                    fieldLabel: '收订单日期',
                    labelAlign: "right",
                    name: 'orderReceivedDate',
                    labelWidth: 145,
                    width: 250
                  },
                  {
                    fieldLabel: "邮资",
                    labelAlign: "right",
                    name: 'postage',
                    labelWidth: 65,
                    width: 180
                  }
                ]
              },
              {
                xtype: 'panel',
                layout: "hbox",
                margin: "10 0 0 0",
                border: 0,
                defaultType: 'textfield',
                items: [
                  {
                    xtype: "checkboxfield",
                    boxLabel: "收到订单",
                    margin: "0 0 0 10",
                    inputValue: 1,
                    labelAlign: "right",
                    name: 'isOrderReceived'
                  }, {
                    fieldLabel: "不打折金额",
                    labelAlign: "right",
                    name: 'unDiscountAmount',
                    labelWidth: 230,
                    width: 330
                  },
                  {
                    fieldLabel: "抵价券",
                    labelAlign: "right",
                    name: 'preferentialTicket',
                    labelWidth: 80,
                    width: 185
                  },
                  {
                    fieldLabel: "使用青春贴",
                    labelAlign: "right",
                    name: 'youthStuck',
                    labelWidth: 160
                  }
                ]
              },
              {
                xtype: 'panel',
                layout: "hbox",
                margin: "30 0 0 0",
                border: 0,
                defaultType: 'textfield',
                items: [
                  {
                    labelWidth: 40,
                    fieldLabel: "姓名",
                    labelAlign: "right",
                    name: 'realName',
                    width: 180
                  },
                  {
                    labelWidth: 60,
                    fieldLabel: "会员编号",
                    labelAlign: "right",
                    name: 'userCode',
                    margin: "0 0 0 10",
                    width: 220
                  },
                  {
                    labelWidth: 60,
                    fieldLabel: "邮编",
                    labelAlign: "right",
                    name: 'zipCode',
                    width: 180
                  },
                  {
                    labelWidth: 60,
                    fieldLabel: "地址",
                    labelAlign: "right",
                    name: 'address'
                  },
                  {
                    labelWidth: 60,
                    fieldLabel: "收件人",
                    labelAlign: "right",
                    width: 170,
                    name: 'consignee'
                  }
                ]
              },
              {
                xtype: 'panel',
                layout: "hbox",
                margin: "10 0 0 0",
                border: 0,
                defaultType: 'textfield',
                items: [
                  {
                    labelWidth: 80,
                    fieldLabel: "折扣",
                    labelAlign: "right",
                    disabled: true,
                    name: 'orderDiscount',
                    readOnly: true,
                    labelWidth: 40
                  },
                  {
                    labelWidth: 80,
                    fieldLabel: "邮寄",
                    labelAlign: "right",
                    disabled: true,
                    name: 'mailingCost',
                    width: 180
                  },
                  {
                    fieldLabel: "青春贴",
                    labelAlign: "right",
                    disabled: true,
                    name: 'orderYouthStuck',
                    margin: "0 0 0 30",
                    width: 180
                  },
                  {
                    fieldLabel: "多付款",
                    readOnly: true,
                    labelAlign: "right",
                    disabled: true,
                    name: 'orderMoreAmount',
                    width: 180
                  },
                  Ext.create("orderStatus"),
                ]
              }
            ]
          },
          {
            xtype: 'panel',
            layout: "hbox",
            width: 410,
            margin: "30 0 30 100",
            border: 0,
            bodyStyle: {
              background: 'transparent'
            },
            items: [
              {
                xtype: 'button',
                scale: "medium",
                text: "新增",
                handler: function () {
                  var form = this.ownerCt.ownerCt.getForm();
                  form.url = env.services.web + env.api.order.save;
                  form.submit({
                    success: function (form, action) {
                      var form = addOrder.getComponent("orderForm").getForm();
                      form.reset();
                      orderModelHandler({
                        success: function (data) {
                          var record = Ext.ComponentQuery.query("grid[itemId=memberList]")[0]
                            .getSelectionModel()
                            .getSelection()[0].data;
                          updateForm(form, data);
                          form.findField("id").setValue("");
                          showFolwCharts(record.memberId);
                        },
                        fail: function () {
                          Ext.Msg.alert("增加汇款定购", "错误：必须选选择一个会员才可以添加哦！");
                        }
                      });
                    },
                    failure: function (form, action) {
                      Ext.Msg.alert("新增汇款订购", action.result.msg);
                    }
                  });
                }
              },
              {
                xtype: 'button',
                scale: "medium",
                margin: "0 0 0 30",
                text: "保存",
                handler: function () {
                  var form = this.ownerCt.ownerCt.getForm();
                  form.url = env.services.web + env.api.order.save;
                  form.submit({
                    success: function (form, action) {
                      addOrder.hide();
                      var form = addOrder.getComponent("orderForm").getForm();
                      form.reset();
                      orderModelHandler({
                        success: function (data) {
                          var record = Ext.ComponentQuery.query("grid[itemId=memberList]")[0]
                            .getSelectionModel()
                            .getSelection()[0].data;
                          showFolwCharts(record.memberId);
                        },
                        fail: function () {
                          Ext.Msg.alert("增加汇款定购", "错误：必须选选择一个会员才可以添加哦！");
                        }
                      });
                    },
                    failure: function (form, action) {
                      Ext.Msg.alert("修改汇款订购", action.result.msg);
                    }
                  });
                }
              },
              {
                xtype: 'button',
                scale: "medium",
                margin: "0 0 0 30",
                text: "修改",
                handler: function () {
                  var form = this.ownerCt.ownerCt.getForm(),
                      record = Ext.ComponentQuery.query("grid[itemId=memberList]")[0]
                        .getSelectionModel()
                        .getSelection()[0].data;

                  Ext.Ajax.request({
                    url: env.services.web + env.api.member.getDefaultAddr,
                    params: {
                      memberId: record.memberId
                    },
                    success: function (resp) {
                      var data = Ext.JSON.decode(resp.responseText);
                      if (data.success) {
                        window.updateForm(form, data.info);
                      } else {
                        Ext.Msg.alert("填充地址", data.msg);
                      }
                    }
                  });

                }
              },
              {
                xtype: 'button',
                scale: "medium",
                margin: "0 0 0 30",
                text: "返回",
                handler: function () {
                  addOrder.hide();
                }
              }
            ]
          }
        ]
      }
    ]
  });
});
