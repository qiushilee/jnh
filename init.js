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

  env.api.paymentmethord = "/ajax/paymentmethord";
  env.api.sendmethord = "/ajax/sendmethord";

  env.api.order = {
    list: "/orderremittance/index",
    info: "/orderremittance/view/id/",
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
    list: "/periodical/index"
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

      //TODO 参数可配置
      Ext.define("periodical", {
        extend: "Ext.form.ComboBox",
        fieldLabel: "期数",
        store: Ext.create("Ext.data.Store", {
          fields: ["title", "id"],
          autoLoad: true,
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
        width: 300,
        labelAlign: "right",
        name: "periodicalId"
      });
    }
  });
})();
