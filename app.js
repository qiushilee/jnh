var paths = {};

if (env.debug) {
  paths = {
    Ext: "extjs/src",
    "Ext.ux": "extjs/src/ux/"
  };  
} else {
  paths = {
    Ext: window.path + "extjs/src",
    "Ext.ux": window.path + "extjs/src/ux/"
  };
}

Ext.Loader.setConfig({
  enabled: true,
  paths: paths
});

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
