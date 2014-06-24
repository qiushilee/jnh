Ext.application({
  name: "JNH",
  launch: function() {
  	Ext.create("Ext.form.Panel", {
      title: "登录",
      layout: "hbox",
      bodyPadding: 10,
      defaultType: 'textfield',
      margin: "10 0",
      renderTo: document.body,
      border: 0,
      url: env.services.web + env.api.uc.login,
      method: "POST",
      items: [
        {
          fieldLabel: "用户名",
          name: "username",
          labelWidth: 40,
          width: 120,
          labelAlign: "right"
        }, {
          inputType: "password",
          name: "password",
          fieldLabel: "密码",
          labelWidth: 40,
          width: 120,
          labelAlign: "right"
        }, {
          xtype: "button",
          formBind: true,
          text: "登录",
          handler: function() {
            var form = this.up('form').getForm();
            if (form.isValid()) {
              form.submit({
                success: function() {
                  location.href = "index.html";
                },
                failure: function(form, action) {
                  Ext.Msg.alert("登录失败", action.result.errors.msg, function() {
                    location.href = "login.html";
                  });
                }
              });
            }
          }
        }
      ]
  	});
  }
});