Ext.Loader.setConfig({
  enabled: true,
  paths: {
    Ext: "/app/extjs/src",
    "Ext.ux": "/app/extjs/src/ux/"
  }
});

Ext.Loader.setPath("Ext", "http://jnh.www.webwei.cn/app/extjs/src");

Ext.application({
  name: "JNH",
  launch: function() {
    var basePanel = Ext.create("Ext.panel.Panel", {
      title: "嘉年华管理系统",
      layout: "fit",
      html: document.getElementById("menu").value,
      renderTo: Ext.getBody()
    });

    basePanel.addClass("base-panel").addBodyCls("base-panel-body");

    window.$bd = document.querySelector(".mod .bd div");

    var model = location.hash.slice(1, location.hash.length);
    document.querySelector("." + model).classList.add("active");
  }
});
