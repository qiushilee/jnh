Ext.onReady(function() {
    // 会员列表
    var memberList = Ext.create('Ext.data.Store', {
      storeId: 'memberList',
      fields: ['addrList', 'userCode', 'realName', 'status', "address1", "address2"],
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
      fields: ['addrList', 'userCode', 'realName', 'status'],
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
      fields: ['id', 'periodicalId', 'userCode', 'userName', "billNumber", "receiptProceedsOffice", "remitter", "remittanceAmount", "remittanceDate", "preferentialTicket", "youthStuck", "unDiscountAmount", "source", "postage", "zipCode", "address", "isRemittanceReceived", "remittanceReceivedDate", "isOrderReceived", "orderReceivedDate", "status", "status"],
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

    function showMemberInfo(memberId) {
      Ext.Ajax.request({
        url: env.services.web + env.api.member.info + memberId,
        success: function(response) {
          var data = Ext.JSON.decode(response.responseText),
              con = panel.getComponent("memberInfo").getForm();
          
          function update(formValue) {
            Ext.Object.each(formValue, function(item, index) {
              if (con.findField(item)) {
                con.findField(item).setValue(index);
              }
            });
          }

          update(data.info);

          // Update address
          if (data.addressList.length > 0) {
            Ext.each(data.addressList, function(item) {
              update(item);
            });
          } else {
            update({"status":"","id":"","memberId":"","type":"","address":"","zipCode":"","mobile":"","consignee":"","isDefault":""});
          }
        },
        failure: function(form, action) {
          Ext.Msg.alert("查询失败", "服务器无响应，请稍后再试");
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

    var panel = Ext.create("Ext.panel.Panel", {
      renderTo: Ext.getBody(),
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
            {
              xtype:"combobox",
              fieldLabel: "来源",
              name: "source",
              labelAlign: "right"
            },
            {
              xtype: 'button',
              margin: "0 5 0 50",
              text: "搜索",
              handler: function() {
                var form = this.ownerCt.ownerCt.getComponent("searchBar");
                if (form.isValid()) {
                  // TODO 接口需要加上 success: true
                  form.submit({
                    success: function(form, action) {
                      console.log(action)
                    },
                    failure: function(form, action) {
                      memberList.loadData(action.result.list);
                    }
                  });
                }
              }
            },
            {
              // TODO 有电话订购颜色不一样并显示数量
              xtype: 'button',
              margin: "0 5",
              text: "E电话订购"
            },
            {
              xtype: 'button',
              margin: "0 5",
              text: "N修改"
            },
            {
              xtype: 'button',
              margin: "0 5",
              text: "Q增加"
            },
            {
              xtype: 'button',
              margin: "0 5",
              text: "删除"
            },
            {
              xtype: 'button',
              margin: "0 5",
              text: "W保存"
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
                  text: '状态',
                  flex: 1,
                  dataIndex: 'status'
                }
              ],
              listeners: {
                itemdblclick: function( that, record, item, index, e, eOpts) {
                  showMemberInfo(record.data.id);
                  showFolwCharts(record.data.id);
                }
              }
            },
            {
              xtype: "grid",
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
                  text: '状态',
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
              items: [{
                xtype: "radiofield",
                fieldLabel: "代理",
                labelWidth: 40,
                labelAlign: "right"
              }, {
                xtype: "radiofield",
                fieldLabel: "会员",
                labelWidth: 40,
                labelAlign: "right"
              }, {
                fieldLabel: "姓名",
                labelWidth: 60,
                name: "realName",
                width: 120,
                labelAlign: "right"
              }, {
                xtype: "combobox",
                fieldLabel: "寄送方式",
                labelWidth: 102,
                name: "deliveryMethod",
                width: 185,
                labelAlign: "right"
              }, {
                fieldLabel: "毕业时间",
                labelWidth: 60,
                labelAlign: "right"
              }, {
                xtype: "combobox",
                fieldLabel: "期数",
                name: "id",
                labelWidth: 60,
                labelAlign: "right"
              }]
            },

            // 第四行
            {
              xtype:'panel',
              layout: "hbox",
              border: 0,
              defaultType: 'textfield',
              margin: "10 0 0 0",
              items: [{
                xtype: "combobox",
                fieldLabel: "类型",
                labelWidth: 40,
                store: new Ext.data.Store({
                  fields: ["index", "name"],
                  data: [{
                    index: "0",
                    name: "学校"
                  }, {
                    index: "1",
                    name: "家庭"
                  }]
                }),
                name: "status",
                displayField: "name",
                valueField: "index",
                width: 105,
                labelAlign: "right"
              }, {
                xtype: 'textfield',
                fieldLabel: "邮编",
                name: "zipCode",
                labelWidth: 40,
                width: 100,
                labelAlign: "right"
              }, {
                xtype: 'textfield',
                fieldLabel: "地址",
                labelWidth: 60,
                name: "address",
                width: 300,
                labelAlign: "right"
              }, {
                xtype: 'textfield',
                fieldLabel: "电话",
                labelWidth: 40,
                name: "mobile",
                width: 145,
                labelAlign: "right"
              }, {
                xtype: 'textfield',
                fieldLabel: "收件人",
                labelWidth: 60,
                name: "consignee",
                width: 120,
                labelAlign: "right"
              }, {
                xtype: 'button',
                text: "设为默认",
                name: "isDefault",
                margin: "0 0 0 10"
              }, {
                xtype: 'button',
                text: "删除",
                margin: "0 0 0 10"
              }, {
                xtype: 'button',
                text: "增加地址",
                margin: "0 0 0 10"
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
                  labelWidth: 50
                },
                {
                  fieldLabel: "不打折金额",
                  labelAlign: "right",
                  name: "unDiscountAmount",
                  labelWidth: 70
                },
                {
                  fieldLabel: "青春贴",
                  labelAlign: "right",
                  name: "youthStuck",
                  labelWidth: 50
                },
                {
                  xtype:"combobox",
                  fieldLabel: "代理期数",
                  labelAlign: "right",
                  labelWidth: 60
                },
                {
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
          xtype: "grid",
          title: "流程表",
          margin: "20 0 0 0",
          columnWidth: 0.5,
          height: 155,
          store: Ext.data.StoreManager.lookup('folwChartsList'),
          columns: [
            {
              text: '序号',
              dataIndex: 'id'
            },
            {
              text: '期数',
              dataIndex: 'periodicalId'
            },
            {
              text: '付款方式',
              dataIndex: ''
            },
            {
              text: '编号',
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
              dataIndex: 'asdder2'
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
              dataIndex: ''
            },
            {
              text: '包裹单号',
              dataIndex: ''
            },
            // 点击后跳转到补寄界面
            {
              text: '补寄',
              dataIndex: ''
            },
            {
              text: '状态',
              dataIndex: 'status'
            }
          ]
        },

        {
          xtype: "panel",
          layout: "hbox",
          defaultType: "button",
          border: 0,
          margin: "20 0 0 0",
          items: [{
            text: "<span class=\"key\">A</span> 增加",
            handler: function() {
              add.show();
            }
          }, {
            text: "<span class=\"key\">M</span> 修改",
            margin: "0 0 0 10"
          }, {
            text: "<span class=\"key\">D</span> 删除",
            margin: "0 0 0 10",
            handler: function() {
              var member = panel.getComponent("grid").getComponent("memberList").getSelectionModel().getSelection()[0].data;

              Ext.Msg.alert("删除会员", "确认删除会员：" + member.realName, function() {
                Ext.Ajax.request({
                  url: env.services.web + env.api.member.del + member.userCode,
                  success: function(response) {
                    Ext.Msg.alert("删除成功", "您已成功删除会员：" + member.realName);
                  },
                  failure: function(form, action) {
                    Ext.Msg.alert("删除失败", "服务器无响应，请稍后再试");
                  }
                });
              });
            }
          }]
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
            {
              xtype:"combobox",
              fieldLabel: "期数",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
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
              name: 'company'
            },
            {
              fieldLabel: '编号',
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
              fieldLabel: "付款金额",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
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
              name: 'first',
              allowBlank: false
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
              name: 'first',
              allowBlank: false
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
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "抵价券",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
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
              name: 'first',
              allowBlank: false
            },{
              fieldLabel: "会员编号",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "邮编",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "地址",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "收件人",
              labelAlign: "right",
              width: 170,
              name: 'first',
              allowBlank: false
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
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "邮寄",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "青春贴",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
            },
            {
              fieldLabel: "多付款",
              labelAlign: "right",
              name: 'first',
              allowBlank: false
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
              text: "保存"
            },
            {
              xtype: 'button',
              scale: "medium",
              margin: "0 0 0 30",
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
            text: "修改"
          }, {
            text: "保存",
            margin: "0 0 0 10"
          }]
        }
      ]
    });

    /** 
     * +TODO 增加按钮：
     *    A增加
     *    M修改
     *    D删除
     */
    // add.show();
    // bujiDetail.show();

});