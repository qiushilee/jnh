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
    change: "/member/update"
  };

  env.api.paymentmethord = "/ajax/paymentmethor";//支付方式
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
    //TODO-url 删除失败，接口需要调试
    del: "/orderremittance/del/id/",
    add: "/orderremittance/create",
    change: "/orderremittance/update"
  };


  env.api.company = {
    list: "/company/index",
    info: "/company/view/companyId/",
    del: "/company/del/companyId/",
    add: "/company/create",
    change: "/company/update"
  };

  env.api.product = {
    list: "/product/index",
    change: "/product/update",
    add: "/product/create"
  };

  env.api.receipt = {
    list: "/receipt/index",
    change: "/receipt/update",
    add: "/receipt/create",
    del: "/receipt/delete"
  };

  env.api.orderremittance = {
    list: "/orderremittance/index",
    add: "/orderremittance/create"
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
    code: "/deliverorder/generationcode",
    view: "/deliverorder/vieworderdetail",
	saveorderproduct: "/deliverorder/saveorderproduct",
	deleteorderproduct: "/deliverorder/deleteorderproduct"
  };
  
  env.api.package = {
    list: "/package/index",
    change: "/package/update",
    add: "/package/create",
    del: "/package/delete"
  };
  //
  env.api.productrecord = {
    list: "/productrecord/index",
    change: "/productrecord/update",
    add: "/productrecord/create",
    del: "/productrecord/delete"
  };

  //TODO-url 业务管理
  env.api.business = {
    list: "",
    change: "",
    add: "",
    del: "",
    save: "",
    create: ""
  };

  //TODO-url 电话订购
  env.api.telorder = {
    list: "",
    change: "",
    add: "",
    del: "",
    save: "",
    create: ""
  };
  window.env = env;

  window.updateForm = function(form, data) {
    Ext.Object.each(data, function(item, index) {
      if (form.findField(item)) {
        // TODO datefield 不能写入
        form.findField(item).setValue(index);
      }
    });
  }

  /**
   * 通用的搜索功能
   * Usage: search.call(this, "store");
   * TODO 替换所有的搜索事件
   */
  window.searchHandler = function(store) {
    var form = this.up("form").getForm();
    if (form.isValid()) {
      form.submit({
        failure: function(form, action) {
          try {
            if (action.result.list.length > 0) {
              Ext.data.StoreManager.lookup(store).loadData(action.result.list);
            } else {
              Ext.Msg.alert("搜索", "对不起，没有找到符合条件的结果。");
            }
          } catch(e) {
            console.error(e.stack);
          }
        }
      });
    }
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

      //期数
      Ext.define("periodical", {
        extend: "Ext.form.ComboBox",
        fieldLabel: "期数",
        store: Ext.create("Ext.data.Store", {
          fields: ["title", "id"],
          autoLoad: false,
          proxy: {
            type: 'ajax',
            url: env.services.web + env.api.periodical.list,
            reader: {
              type: 'json',
              root: 'list'
            }
          }
        }),
        labelWidth: 60,
        displayField: "title",
        valueField: "id",
        labelAlign: "right",
        name: "periodicalId"
      });
	  
	  //学校类型
	   Ext.define("addressType", {
        extend: "Ext.form.ComboBox",
        fieldLabel: "类型",
        store: Ext.create("Ext.data.Store", {
          fields: ["name", "value"],
          autoLoad: false,
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
      });
	  
	   //会员分类
	   Ext.define("memberType", {
        extend: "Ext.form.ComboBox",
        fieldLabel: "会员类型",
        store: Ext.create("Ext.data.Store", {
          fields: ["name", "value"],
          autoLoad: false,
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
      });
	  
	  //寄送方式
	   Ext.define("deliveryMethod", {
        extend: "Ext.form.ComboBox",
        fieldLabel: "寄送方式",
        store: Ext.create("Ext.data.Store", {
          fields: ["name", "value"],
          autoLoad: false,
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
      });
	  
	   //支付方式
	   Ext.define("paymentMethord", {
        extend: "Ext.form.ComboBox",
        fieldLabel: "支付方式",
        store: Ext.create("Ext.data.Store", {
          fields: ["name", "value"],
          autoLoad: false,
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
		width: 185,
      });
	  
	  
	  //供货商分类
	   Ext.define("companyType", {
        extend: "Ext.form.ComboBox",
        fieldLabel: "支付方式",
        store: Ext.create("Ext.data.Store", {
          fields: ["name", "value"],
          autoLoad: false,
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
      });
	  
	 //订单来源分类
	   Ext.define("orderSource", {
        extend: "Ext.form.ComboBox",
        fieldLabel: "支付方式",
        store: Ext.create("Ext.data.Store", {
          fields: ["name", "value"],
          autoLoad: false,
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
      });
	   //进转损分类
	   Ext.define("jzsType", {
        extend: "Ext.form.ComboBox",
        fieldLabel: "类型",
        store: Ext.create("Ext.data.Store", {
          fields: ["name", "value"],
          autoLoad: false,
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
      });
	  
	   //会员来源
	   Ext.define("memberSource", {
        extend: "Ext.form.ComboBox",
        fieldLabel: "来源",
        store: Ext.create("Ext.data.Store", {
          fields: ["name", "value"],
          autoLoad: false,
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
      });
	  
	  
	  
	  
    }
  });
})();
