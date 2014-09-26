(function() {
  var env = {},
      ValidIpAddressRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

  env.api = {};

  if (["localhost", "127.0.0.1", "localhost.com", "0.0.0.0"].indexOf(window.location.hostname) !== -1 || window.location.hostname.match(ValidIpAddressRegex)) { //enable debug mode
    env.debug = true;
    env.services = {
      web: "http://" + window.location.hostname + "/index.php"
    };
  } else {
    env.debug = false;
    env.services = {
      web: "http://jnh.www.webwei.cn/index.php"
    };
  }

  env.api.uc = {
    login: "/site/login",
    session: "/site/islogin"
  };

  env.api.member = {
    list: "/member/index",
    info: "/member/view/memberId/",
    directory: "",
    del: "/member/delete/",
    folwCharts: "/member/orderremittance/memberId/",
    add: "/member/create",
    change: "/member/update",
    counttelorder: "/member/counttelorder" //会员电话订购数量
  };

  env.api.paymentmethord = "/ajax/paymentmethord";//支付方式
  env.api.sendmethord = "/ajax/sendmethord";//寄送方式
  env.api.addresstype = "/ajax/addresstype";//地址类型
  env.api.ordersource = "/ajax/ordersource";//订单来源
  env.api.companytype = "/ajax/companytype";//供货商类型
  env.api.jzstype = "/ajax/jzstype";//进转损分类
  env.api.membertype = "/ajax/membertype";	  
  env.api.membersource = "/ajax/membersource";

  //汇款订购
  env.api.order = {
    list: "/orderremittance/index",
    info: "/orderremittance/view/id/",
    del: "/orderremittance/delete/id/",
    add: "/orderremittance/create",
    change: "/orderremittance/update"
  };


  env.api.company = {
    list: "/company/index",
    info: "/company/view",
    del: "/company/delete",
    add: "/company/create",
    change: "/company/update",
    copy: "/company/copy",   //厂商复制
    findByCompanyCode:"/company/findbycompanycode",//根据厂商编号获取企业信息
    import: "/company/import"   //导入
  };

  env.api.product = {
    list: "/product/index",
    change: "/product/update",
    add: "/product/create",
    del:"/product/delete",
    shipmentDetails:'/product/shipmentdetails',//出货明细
    delShipmentDetails:'',//删除出货明细
    transitionLoss:'/product/transitionLoss',//进转损
    addTransitionLoss:'/product/addtransitionloss',//添加进转损
    delTransitionLoss:'/product/deletetransitionloss',//删除进转损
    changeTransitionLoss:'/product/updatetransitionloss',//修改进转损
  };

  env.api.receipt = {
    list: "/receipt/index",
    change: "/receipt/update",
    add: "/receipt/create",
    del: "/receipt/delete",
    searchReceiptByCode: "/receipt/searchreceiptbycode"
  };

  env.api.orderremittance = {
    list: "/orderremittance/index",
    add: "/orderremittance/create",
    del: "/orderremittance/delete"
  };

  env.api.catalog = {
    list: "/catalog/index",
    change: "/catalog/update",
    add: "/catalog/create",
    del: "/catalog/delete"
  };

  env.api.periodical = {
    list: "/periodical/index",
	change: "/periodical/update",
    add: "/periodical/create",
    del: "/periodical/delete"
  };

  env.api.deliverorder = {
    list: "/deliverorder/index",
    change: "/deliverorder/update",
    add: "/deliverorder/create",
    del: "/deliverorder/delete",
    remorderdelivercode: "/deliverorder/remorderdelivercode",
    telorderdelivercode: "/deliverorder/telorderdelivercode",
    view: "/deliverorder/vieworderdetail",
    saveorderproduct: "/deliverorder/saveorderproduct",
    deleteorderproduct: "/deliverorder/deleteorderproduct"
  };
  
  env.api.package = {
    list: "/package/index",
    change: "/package/update",
    add: "/package/create",
    del: "/package/delete",
    sendlist:'/package/sendreplacement',//补寄列表
    sendadd:'/package/savesendreplacement',//补寄添加
    sendchange:'/package/savesendreplacement'//补寄修改
  };

  env.api.productrecord = {
    list: "/productrecord/index",
    change: "/productrecord/update",
    add: "/productrecord/create",
    del: "/productrecord/delete"
  };

  //业务管理
  env.api.business = {
    list: "/business/memberlist",
    change: "/business/savemember",
    add: "/business/savemember",
    del: "/business/deletemember",
    printcartlist:"/printcart/index",//打印购物车列表
    addprintcart:"/printcart/create",//添加打印购物车
    delprintcart:"/printcart/delete"//删除打印购物车
  };

  //电话订购
  env.api.telorder = {
    list: {
      member: "/telorder/memberlist",
      order: "/telorder/orderlist",//出货单
      orderproduct:"/deliverorder/vieworderdetail",//出货单产品搜索
    },
    change: {
      member: "/telorder/savemember",
      order: "/deliverorder/saveorderproduct",
    },
    add: {
      member: "/telorder/savemember",
      order: "/deliverorder/saveorderproduct",
    },
    del: {
      //左侧顶部删除订单
      all: "/telorder/deleteall",
      //左侧底部删除记录
      record: "/telorder/deleteorder",
      //左侧底部删除
      member: "/telorder/deletemember",
      //右侧删除出货单产品
      order: "/telorder/deleteorderproduct",
    }
  };
  
  env.api.actionlog = {
    list: "/actionlog/index",
    del: "/actionlog/delete"
  };

  //查询模块
  env.api.search = {
    productrecord: env.api.productrecord.list,
    deliverorder: env.api.deliverorder.list,
    searchpurchase: "/search/purchase",
    searchshipment: "/search/shipment",
    estimatepurchase: "/search/estimatepurchase",
    member: "/search/member"
  };



//管理员
  env.api.manager = {
    list: "/manager/index",
    change: "/manager/update",
    add: "/manager/create",
    del: "/manager/delete"
  };

  //管理员角色
  env.api.manager = {
    list: "/managerrole/index",
    change: "/managerrole/update",
    add: "/managerrole/create",
    del: "/managerrole/delete"
  };

  //权限
  env.api.privaction = {
    list: "/privaction/index"
  };



  window.env = env;

  /**
   * 设置表单子元素值
   * @param {Form} form 表单，需要使用getForm()转换后传入
   * @param {Object} data 表单数据
   * TODO datefield 不能写入
   */
  window.updateForm = function(form, data) {
    var fields = [];

    function eachField(form) {
      if (form.items) {
        form.items.each(function(item, index, length) { 
          try {
            item.getName();
            fields.push(item);
          } catch(e) {
            eachField(item);
          }
        });
      }
    }
    
    eachField(form.owner);

    Ext.Object.each(data, function(name, value) {
      Ext.Array.each(fields, function(item, index) {
        //期数选择
        if (item.xtype === "combobox" && item.getName() === name) {
          item.fireEvent("setvalue", item, value);
        } else if (item.getName() === name) {
          item.setValue(value);
        }
      });
    });
  }

  /**
   * 通用的搜索功能
   * Usage: search.call(this, "store");
   * @param {Object|Form} this 
   *    情景一：this.up("form") 直接获取到form；
   *    情景二：直接传入form；
   */
  window.searchHandler = function(store) {
    var form = this.up && this.up("form") ? this.up("form").getForm() : this;
    if (form.isValid()) {
      form.submit({
        success: function(form, action) {
          try {
            Ext.data.StoreManager.lookup(store).loadData(action.result.list);
          } catch(e) {
            console.error(e.stack);
          }
        },
        failure: function(form, action) {
          try {
            Ext.data.StoreManager.lookup(store).loadData(action.result.list);
            if (action.result.msg) {
              Ext.Msg.alert("搜索", action.result.msg);
            }
          } catch(e) {
            console.error(e.stack);
          }
        }
      });
    }
  }

  /**
   * 删除grid一行
   * @param {Object} grid 需要删除的列表
   * @param {Number} index 可选参数，删除指定的行数，默认删除选中的行数
   * @param {String} api 删除接口
   */
  window.removeGridRow = function(opt) {
    var current = opt.grid.getSelectionModel().getSelection()[0],
        index = opt.index || current.index;

    Ext.Msg.confirm("删除", "确认删除？", function(type) {
      if (type === "yes") {
        Ext.Ajax.request({
          url: opt.api,
          params: {
            id: current.data.id
          },
          success: function(resp) {
            resp = Ext.decode(resp.responseText);

            if (resp.success === false) {
              Ext.Msg.alert("删除操作", resp.msg);
            }
          },
          failure: function(resp) {
            resp = Ext.decode(resp.responseText);

            Ext.Msg.alert("删除操作", action.result.msg);
          }
        });
      }
    });
  }

  Ext.application({
    name: "JNH",
    launch: function() {
      Ext.Ajax.request({
        url: env.services.web + env.api.uc.session,
        success: function(response) {
          if (Ext.JSON.decode(response.responseText).success === false && location.href.indexOf("login.html") === -1) {
            location.href = "login.html";
          } else if (Ext.JSON.decode(response.responseText).success) {
            if (location.href.indexOf("login.html") !== -1) {
              location.href = "index.html";
            }
          }
        },
        failure: function(form, action) {
          Ext.Msg.alert("登录超时", action.result.errors.msg, function() {
            location.href = "login.html";
          });
        }
      });

      function comboboxSetValue(combobox, value) {
        combobox.store.data.each(function(item, i) {
          if (item.data.value == value) {
            combobox.setValue(item.data.value);
          }
        });
      }

      var periodicalStore = Ext.create("Ext.data.Store", {
        fields: ["name", "value"],
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

      //期数
      Ext.define("periodical", {
        itemId: "periodical",
        extend: "Ext.form.ComboBox",
        fieldLabel: "期数",
        queryMode: "local",
        store: periodicalStore,
        labelWidth: 60,
        displayField: "name",
        valueField: "value",
        labelAlign: "right",
        name: "periodicalId",
        width:150,
        listeners: {
          render: function(combobox) {
            setTimeout(function() {
              combobox.setValue(combobox.store.data.getAt(0));
            });
          },
          setvalue: comboboxSetValue
        }
      });
	  
	  //学校类型
	   Ext.define("addressType", {
        extend: "Ext.form.ComboBox",
        fieldLabel: "类型",
        queryMode: "local",
        store: Ext.create("Ext.data.Store", {
          fields: ["name", "value"],
          autoLoad: true,
          proxy: {
            type: 'ajax',
            url: env.services.web + env.api.addresstype,
            reader: {
              type: 'json',
              root: 'list'
            }
          }
        }),
        labelWidth: 60,
        displayField: "name",
        valueField: "value",
        labelAlign: "right",
        name: "type",
        width: 120,
        listeners: {
          setvalue: comboboxSetValue
        }
      });
	  
	   //会员分类
	   Ext.define("memberType", {
        extend: "Ext.form.ComboBox",
        fieldLabel: "会员类型",
        queryMode: "local",
        store: Ext.create("Ext.data.Store", {
          fields: ["name", "value"],
          autoLoad: true,
          proxy: {
            type: 'ajax',
            url: env.services.web + env.api.membertype,
            reader: {
              type: 'json',
              root: 'list'
            }
          }
        }),
        labelWidth: 60,
        displayField: "name",
        valueField: "value",
        labelAlign: "right",
        name: "memberType",
        width: 120,
        listeners: {
          setvalue: comboboxSetValue
        }
      });
	  
	  //寄送方式
	   Ext.define("deliveryMethod", {
        extend: "Ext.form.ComboBox",
        fieldLabel: "寄送方式",
        queryMode: "local",
        store: Ext.create("Ext.data.Store", {
          fields: ["name", "value"],
          autoLoad: true,
          proxy: {
            type: 'ajax',
            url: env.services.web + env.api.sendmethord,
            reader: {
              type: 'json',
              root: 'list'
            }
          }
        }),
        displayField: "name",
        valueField: "value",
        labelAlign: "right",
        name: "deliveryMethod",
        width: 185,
        listeners: {
          setvalue: comboboxSetValue
        }
      });
	  
	   //支付方式
	   Ext.define("paymentMethord", {
        extend: "Ext.form.ComboBox",
        fieldLabel: "支付方式",
        queryMode: "local",
        store: Ext.create("Ext.data.Store", {
          fields: ["name", "value"],
          autoLoad: true,
          proxy: {
            type: 'ajax',
            url: env.services.web + env.api.paymentmethord,
            reader: {
              type: 'json',
              root: 'list'
            }
          }
        }),
        labelWidth: 60,
        displayField: "name",
        valueField: "value",
        labelAlign: "right",
        name: "paymentMethord",
        width: 155,
        listeners: {
          setvalue: comboboxSetValue
        }
      });
	  
	  
	  //供货商分类
	   Ext.define("companyType", {
        extend: "Ext.form.ComboBox",
        fieldLabel: "支付方式",
        queryMode: "local",
        store: Ext.create("Ext.data.Store", {
          fields: ["name", "value"],
          autoLoad: true,
          proxy: {
            type: 'ajax',
            url: env.services.web + env.api.companytype,
            reader: {
              type: 'json',
              root: 'list'
            }
          }
        }),
        labelWidth: 60,
        displayField: "name",
        valueField: "value",
        labelAlign: "right",
        name: "companyType",
        width: 185,
        listeners: {
          setvalue: comboboxSetValue
        }
      });
	  
	 //订单来源分类
	   Ext.define("orderSource", {
        extend: "Ext.form.ComboBox",
        fieldLabel: "支付方式",
        queryMode: "local",
        store: Ext.create("Ext.data.Store", {
          fields: ["name", "value"],
          autoLoad: true,
          proxy: {
            type: 'ajax',
            url: env.services.web + env.api.ordersource,
            reader: {
              type: 'json',
              root: 'list'
            }
          }
        }),
        labelWidth: 60,
        displayField: "name",
        valueField: "value",
        labelAlign: "right",
        name: "orderSource",
        width: 185,
        listeners: {
          setvalue: comboboxSetValue
        }
      });
	   //进转损分类
	   Ext.define("jzsType", {
        extend: "Ext.form.ComboBox",
        fieldLabel: "类型",
        queryMode: "local",
        store: Ext.create("Ext.data.Store", {
          fields: ["name", "value"],
          autoLoad: true,
          proxy: {
            type: 'ajax',
            url: env.services.web + env.api.jzstype,
            reader: {
              type: 'json',
              root: 'list'
            }
          }
        }),
        labelWidth: 60,
        displayField: "name",
        valueField: "value",
        labelAlign: "right",
        name: "type",
        width: 150,
        listeners: {
          setvalue: comboboxSetValue
        }
      });
	  
	   //会员来源
	   Ext.define("memberSource", {
        extend: "Ext.form.ComboBox",
        fieldLabel: "来源",
        queryMode: "local",
        store: Ext.create("Ext.data.Store", {
          fields: ["name", "value"],
          autoLoad: true,
          proxy: {
            type: 'ajax',
            url: env.services.web + env.api.membersource,
            reader: {
              type: 'json',
              root: 'list'
            }
          }
        }),
        labelWidth: 60,
        displayField: "name",
        valueField: "value",
        labelAlign: "right",
        name: "source",
        width: 150,
        listeners: {
          setvalue: comboboxSetValue
        }
      });

      window.address = {
        length: 0,
        index: 0,
        get: function() {
          var that = this,
          index = this.index;

          if (index >= 3) {
            Ext.Msg.alert("增加地址", "每个会员地址总数不允许超过3个");
            return;
          }

          this.index++;
          this.length++;

          return Ext.create("Ext.panel.Panel", {
            layout: "hbox",
            border: 0,
            defaultType: 'textfield',
            margin: "10 0 0 0",
            items: [
              {
                xtype: "hiddenfield",
                name: "addressDefault" + index
              },
              Ext.create("addressType", {
                name: "type" + index
              }),
              {
                xtype: 'textfield',
                fieldLabel: "邮编",
                name: "zipCode" + index,
                labelWidth: 40,
                width: 100,
                labelAlign: "right"
              },
              {
                xtype: 'textfield',
                fieldLabel: "地址",
                labelWidth: 60,
                name: "address" + index,
                width: 300,
                labelAlign: "right"
              },
              {
                xtype: 'textfield',
                fieldLabel: "电话",
                labelWidth: 40,
                name: "mobile" + index,
                width: 145,
                labelAlign: "right"
              },
              {
                xtype: 'textfield',
                fieldLabel: "收件人",
                labelWidth: 60,
                name: "consignee" + index,
                width: 180,
                labelAlign: "right"
              },
              {
                xtype: 'button',
                text: "设为默认",
                name: "isDefault",
                margin: "0 0 0 10",
                handler: function() {
                  var addressDefault = Ext.ComponentQuery.query("hiddenfield[name=addressDefault" + index + "]")[0]
                  for (var i = 0; i < that.index; i++) {
                    var item = Ext.ComponentQuery.query("hiddenfield[name=addressDefault" + i + "]")[0]
                    item.setValue("false");
                  }
                  addressDefault.setValue("true");
                }
              },
              {
                xtype: 'button',
                text: "删除",
                margin: "0 0 0 10",
                handler: function() {
                  var $container;

                  console.log(that.length);
                  if (that.length <= 1) {
                    Ext.Msg.alert("删除地址", "地址不可以全部删除哦，必须保留最后一个~");
                    return false;
                  } else {
                    $container = Ext.ComponentQuery.query("panel[itemId=addressContainer]")[0];
                    that.length--;
                    $container.remove(this.ownerCt);
                  }
                }
              },
              {
                xtype: 'button',
                text: "增加地址",
                margin: "0 0 0 10",
                handler: function() {
                  var $container = Ext.ComponentQuery.query("panel[itemId=addressContainer]")[0]
                  $container.add(address.get());
                  $container.doLayout();
                }
              }
            ]
          });
        }
      };

    }
  });
})();
