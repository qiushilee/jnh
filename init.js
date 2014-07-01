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

  window.env = env;

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
    }
  });
})();