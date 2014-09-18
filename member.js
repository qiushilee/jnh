Ext.onReady(function() {
  // 会员列表
  var memberList = Ext.create('Ext.data.Store', {
    storeId: 'memberList',
    fields: ['addrList', 'userCode', 'realName', 'source', "address1", "address2", "memberId"],
    layout: "fit",
    autoLoad: true,
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
    fields: ['addrList', 'userCode', 'realName', 'source'],
    layout: "fit",
    autoLoad: true,
    proxy: {
      type: 'ajax',
      url: env.services.web + env.api.member.list,
      reader: {
        type: 'json',
        root: 'list'
      }
    }
  });

  // 流程表
  var folwChartsList = Ext.create('Ext.data.Store', {
    storeId: 'folwChartsList',
    fields: ["key", 'id', 'periodicalName', 'userCode', 'userName', "billNumber", "receiptProceedsOffice", "remitter", "remittanceAmount", "remittanceDate", "paymentMethord", "youthStuck", "unDiscountAmount", "source", "postage", "packageCode", "mailingDate", "isRemittanceReceived", "remittanceReceivedDate", "isOrderReceived", "orderReceivedDate", "deliveryMethod", "memberType"],
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
      success: function(response) {
        var data = Ext.JSON.decode(response.responseText);

        callback(data);
      },
      failure: function(form, action) {
        Ext.Msg.alert("查询失败", "服务器无响应，请稍后再试");
      }
    });
  }

  function showMemberInfo(memberId) {
    getMemberInfo(memberId, function(data) {
      var con = panel.getComponent("memberInfo").getForm();

      window.updateForm(con, data.info);

      // Update address
      if (data.addressList.length > 0) {
        Ext.each(data.addressList, function(item) {
          window.updateForm(con, item);
        });
      } else {
        window.updateForm(con, {"memberType":"","id":"","memberId":"","type":"","address":"","zipCode":"","mobile":"","consignee":"","isDefault":""});
      }
    });
  }

  function showFolwCharts(memberId) {
    Ext.Ajax.request({
      url: env.services.web + env.api.member.folwCharts + memberId,
      success: function(response) {
        folwChartsList.loadData(Ext.JSON.decode(response.responseText).list);
      },
      failure: function(form, action) {
        Ext.Msg.alert("查询失败", "服务器无响应，请稍后再试");
      }
    });
  }

  function addOrderModelHandler(callback) {
    var currentMember = panel.getComponent("grid").getComponent("memberList").getSelectionModel().getSelection()[0];

    if (currentMember) {
      getMemberInfo(currentMember.data.id, function(resp) {
        var data = resp.info;
        data.memberId = data.id;

        callback(data);
      });
    } else {
      Ext.Msg.alert("增加汇款定购", "错误：必须选选择一个会员才可以添加哦！");
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
        layout: "column",
        defaultType: 'textfield',
        fieldDefaults: {
          labelAlign: 'top'
        },
        items: [
          {
            fieldLabel: "会员编号",
            labelAlign: "right",
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
          },
          {
            fieldLabel: "邮编",
            labelAlign: "right",
            name: 'zipCode'
          }
        ]
      }, {
        xtype: "panel",
        border: 0,
        layout: "column",
        defaultType: 'textfield',
        fieldDefaults: {
          labelAlign: 'top'
        },
        margin: "10 0 0 0",
        items: [
          {
            itemId: "hi",
            xtype:"datefield",
            fieldLabel: "加入时间",
            name: "beginDate",
            width: 200,
            labelAlign: "right"
          },
          {
            xtype:"datefield",
            fieldLabel: "到",
            name: "endDate",
            labelWidth: 20,
            width: 120,
            labelAlign: "right"
          },
          Ext.create('memberSource'),
          {
            xtype: 'button',
            margin: "0 5 0 50",
            text: "搜索",
            handler: function() {
              searchHandler.call(this.ownerCt.ownerCt.getComponent("searchBar"), "memberList");
            }
          },
          {
            itemId: "order-button",
            xtype: 'button',
            margin: "0 5",
            text: "<span class=\"key\">E</span> 电话订购",
            handler: function() {
              var record = Ext.ComponentQuery.query("grid[itemId=memberList]")[0]
              .getSelectionModel()
              .getSelection()[0].data;

              location.href = location.origin + location.pathname + "?id=" + record.memberId + "#telorder";
            }
          },
          {
            xtype: 'button',
            margin: "0 5",
            text: "N修改" ,
      handler: function() {
            var form = panel.getComponent("memberInfo").getForm(),
                member = panel.getComponent("grid").getComponent("memberList").getSelectionModel().getSelection()[0].data;
            form.url = env.services.web + env.api.member.change;
            if (form.isValid()) {
              console.log(member.id)
              form.submit({
                params: {
                  id: member.id
                },
                success: function(form, action) {
                  console.log(action)
                },
                failure: function(form, action) {
                  Ext.Msg.alert("修改会员", action.result.msg);
                }
              });
            }
          }
          },
          {
            xtype: 'button',
            margin: "0 5",
            text: "Q增加",
            handler: function() {
              var form = panel.getComponent("memberInfo").getForm();
              form.url = env.services.web + env.api.member.add;
              if (form.isValid()) {
                form.submit({
                  success: function(form, action) {
                    Ext.data.StoreManager.lookup('memberList').loadData(action.result.list);
                    form.reset();
                  },
                  failure: function(form, action) {
                    Ext.Msg.alert("添加会员", action.result.msg);
                  }
                });
              }
            }
          },
          {
            xtype: 'button',
            margin: "0 5",
            text: "删除",
            handler: function() {
              var member = panel.getComponent("grid").getComponent("memberList").getSelectionModel().getSelection()[0].data;

              Ext.Msg.alert("删除会员", "确认删除会员：" + member.realName, function() {
                Ext.Ajax.request({
                  url: env.services.web + env.api.member.del +'id/'+ member.id,
                  success: function(response) {
                    var data = Ext.JSON.decode(response.responseText);
                    Ext.data.StoreManager.lookup("memberList").load();
                  },
                  failure: function(form, action) {
                    Ext.Msg.alert("删除失败", "服务器无响应，请稍后再试");
                  }
                });
              });
            }
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
                text: '来源',
                flex: 1,
                dataIndex: 'source'
              }
            ],
            listeners: {
              itemclick: function(that, record) {
                Ext.Ajax.request({
                  url: env.services.web + env.api.member.counttelorder,
                  params: {
                    memberId: record.data.id
                  },
                  success: function(resp) {
                    var data = Ext.JSON.decode(resp.responseText);
                    var button = Ext.ComponentQuery.query("button[itemId=order-button]")[0]
                    button.setText("<span class=\"key\">E</span> 电话订购（" + data + "）")
                  },
                  failure: function(resp) {
                    var data = Ext.JSON.decode(resp.responseText);
                    console.log(data);
                  }
                });
              },

              itemdblclick: function( that, record, item, index, e, eOpts) {
                showMemberInfo(record.data.id);
                showFolwCharts(record.data.id);
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
            store: Ext.data.StoreManager.lookup('directory'),
            columns: [
              {
                text: '期数',
                dataIndex: 'id'
              },
              {
                text: '寄送方式',
                flex: 1,
                dataIndex: 'adder'
              },
              {
                text: '数量',
                dataIndex: 'id'
              },
              {
                text: '来源',
                flex: 1,
                dataIndex: '1'
              }
            ]
          },
        ]
      },

      {
        itemId: "memberInfo",
        xtype: "form",
        border: 0,
        items: [
          // 第三行
          {
            xtype:'panel',
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
                fieldLabel: "生日",
                labelWidth: 60,
                labelAlign: "right",
                name:"birth"
              },{
                // TODO 缺少name，所以暂时禁用 xtype
                xtype: "datefield",
                fieldLabel: "毕业时间",
                labelWidth: 60,
                labelAlign: "right",
                name:"graduateDate"
              },
              Ext.create("periodical")
            ]
          },

          // 第四行
          {
            itemId: "addressContainer",
            xtype:'panel',
            border: 0,
            items: [ window.address.get() ]
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
         width: 120,
              },
              {
                fieldLabel: "不打折金额",
                labelAlign: "right",
                name: "unDiscountAmount",
                labelWidth: 70,
        width: 180,
              },
              {
                fieldLabel: "青春贴",
                labelAlign: "right",
                name: "youthStuck",
                labelWidth: 50,
         width: 150,
              },
              {
                xtype:"combobox",
                fieldLabel: "代理期数",
                labelAlign: "right",
                labelWidth: 60
              },
              {
                xtype: "datefield",
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
            dataIndex: 'paymentMethord'
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
            dataIndex: 'deliveryMethod'
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
            dataIndex: ''
          },
          {
            text: '来源',
            dataIndex: 'source'
          }
        ],
        listeners: {
          itemdblclick: function (that, record, item, index, e, eOpts) {
            var form = addOrder.getComponent("orderForm").getForm();
            updateForm(form, record.data);
            addOrder.show();
            addOrder.setTitle("修改添加汇款订购");
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
            handler: function() {
              var form = addOrder.getComponent("orderForm").getForm();
              addOrderModelHandler(function(data) {
                updateForm(form, data);
                form.findField("id").setValue("");
                addOrder.show();
                addOrder.setTitle("增加添加汇款订购");
              });
            }
          },
          {
            text: "<span class=\"key\">D</span> 删除",
            margin: "0 0 0 10",
            handler: function() {
              var order = Ext.ComponentQuery.query("grid[itemId=orderlist]")[0].getSelectionModel().getSelection()[0].data;

              Ext.Msg.confirm("删除汇款订购", "确认删除汇款订：" + order.id, function() {
                Ext.Ajax.request({
                  url: env.services.web + env.api.orderremittance.del,
                  params: {
                    id: order.id
                  },
                  success: function(response) {
                  },
                  failure: function(form, action) {
                    Ext.Msg.alert("删除失败", "服务器无响应，请稍后再试");
                  }
                });
              });
            }
          },
          {
            text: "订单详情",
            margin: "0 0 0 10",
            handler: function() {
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
            fieldLabel: "使用青春贴",
            labelAlign: "right",
            name: 'first'
          },
          {
            xtype: "combobox",
            store: Ext.data.StoreManager.lookup('adderList'),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'abbr',
            fieldLabel: "寄送方式",
            labelAlign: "right"
          },{
            xtype: "datefield",
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
          },{
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
    items: [{
      itemId: "orderForm",
      xtype: "form",
      border: 0,
      items: [{
        xtype: "form",
        border: 0,
        items: [{
          xtype: 'panel',
          margin: "20 0 0 0",
          layout: "hbox",
          border: 0,
          defaultType: 'textfield',
          items: [
            Ext.create("periodical"),
            Ext.create("paymentMethord"),
            {
              fieldLabel: '汇票号码',
              name:"billNumber",
              labelAlign: "right",
            },
            {
              fieldLabel: '收汇局',
              labelAlign: "right",
              name: 'receiptProceedsOffice'
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
              name: 'remittanceAmount'
            },
            {
              xtype: "datefield",
              fieldLabel: '汇款日期',
              labelAlign: "right",
              name: 'remittanceDate',
              width:180
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
              fieldLabel: '收款日期',
              labelAlign: "right",
              name: 'remittanceReceivedDate',
              width:180
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
              fieldLabel: "使用青春贴",
              labelAlign: "right",
              name: 'youthStuck'
            },
            Ext.create('deliveryMethod'),
            {
              xtype: "datefield",
              fieldLabel: '收订单日期',
              labelAlign: "right",
              name: 'orderReceivedDate'
            },
            {
              fieldLabel: "邮资",
              labelAlign: "right",
              name: 'postage',
              width:120
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
              name: 'isOrderReceived'
            }, {
              fieldLabel: "不打折金额",
              labelAlign: "right",
              name: 'unDiscountAmount',
              width:150
            },
            {
              fieldLabel: "抵价券",
              labelAlign: "right",
              name: 'preferentialTicket',
              width:150
            },
            {
              fieldLabel: "使用青春贴",
              labelAlign: "right",
              name: 'youthStuck',
              width:150
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
              name: 'realName'
            },{
              fieldLabel: "会员编号",
              labelAlign: "right",
              name: 'userCode'
            },
            {
              fieldLabel: "邮编",
              labelAlign: "right",
              name: 'zipCode'
            },
            {
              fieldLabel: "地址",
              labelAlign: "right",
              name: 'address'
            },
            {
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
              fieldLabel: "折扣",
              labelAlign: "right",
              readOnly:true
            },
            {
              fieldLabel: "邮寄",
              labelAlign: "right",
              name: 'mailingCost'
            },
            {
              fieldLabel: "青春贴",
              labelAlign: "right",
              name: 'youthStuck'
            },
            {
              fieldLabel: "多付款",
              readOnly:true,
              labelAlign: "right"
            }
          ]
        }
      ]
    }, {
      xtype: 'panel',
      layout: "hbox",
      width: 110,
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
          handler: function() {
            var form = this.ownerCt.ownerCt.getForm();
            form.url = env.services.web + env.api.order.add;
            form.submit({
              success: function(form, action) {
                var form = addOrder.getComponent("orderForm").getForm();
                form.reset();
                addOrderModelHandler(function(data) {
                  updateForm(form, data);
                  form.findField("id").setValue("");
                });
              },
              failure: function(form, action) {
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
          handler: function() {
            var form = this.ownerCt.ownerCt.getForm();
            form.url = env.services.web + env.api.order.change;
            form.submit({
              success: function(form, action) {
                addOrder.hide();
              },
              failure: function(form, action) {
                Ext.Msg.alert("修改汇款订购", action.result.msg);
              }
            });
          }
        },
        {
          xtype: 'button',
          scale: "medium",
          margin: "0 0 0 30",
          text: "返回",
          handler: function() {
            addOrder.hide();
          }
        }
      ]
    }]
    }]
  });
});
