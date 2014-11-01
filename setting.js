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
  }
});
