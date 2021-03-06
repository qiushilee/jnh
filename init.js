(function () {
  var env = {},
    ValidIpAddressRegex = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

  env.api = {};

  if (["localhost", "127.0.0.1", "localhost.com", "0.0.0.0"].indexOf(window.location.hostname) !== -1 || window.location.hostname.match(ValidIpAddressRegex)) { //enable debug mode
    env.debug = true;
  } else {
    env.debug = false;
  }

  env.services = {
    web: "http://jnh.www.webwei.cn/index.php"
  };

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
    counttelorder: "/member/counttelorder", //会员电话订购数量
    getDefaultAddr: "/member/getdefaultaddr", //获取会员默认地址
    checkMobile:"/member/checkmobile"//检测电话是否存在
  };

  env.api.paymentmethord = "/ajax/paymentmethord";//支付方式
  env.api.addresstype = "/ajax/addresstype";//地址类型
  env.api.ordersource = "/ajax/ordersource";//订单来源
  env.api.companytype = "/ajax/companytype";//供货商类型
  env.api.jzstype = "/ajax/jzstype";//进转损分类
  env.api.membertype = "/ajax/membertype";
  env.api.searchmembertype = "/ajax/searchmembertype";
  env.api.managerRoles = "/ajax/managerrole";
  env.api.orderStatus = "/ajax/orderstatus";
  env.api.periodicals = "/ajax/periodicals";

  //汇款订购
  env.api.order = {
    list: "/orderremittance/index",
    info: "/orderremittance/view/id/",
    del: "/orderremittance/delete/id/",
    save: "/orderremittance/save"
  };


  env.api.company = {
    list: "/company/index",
    info: "/company/view",
    del: "/company/delete",
    add: "/company/create",
    change: "/company/update",
    copy: "/company/copy",   //厂商复制
    findByCompanyCode: "/company/findbycompanycode",//根据厂商编号获取企业信息
    import: "/company/import",   //导入
    print: "/company/print", //打印，参数 btId
    receipt: '/company/receipt'
  };

  env.api.product = {
    list: "/product/index",
    change: "/product/update",
    add: "/product/create",
    del: "/product/delete",
    shipmentDetails: '/product/shipmentdetails',//出货明细
    delShipmentDetails: '/product/delshipmentdetail',//删除出货明细
    transitionLoss: '/product/transitionLoss',//进转损
    addTransitionLoss: '/product/addtransitionloss',//添加进转损
    delTransitionLoss: '/product/deletetransitionloss',//删除进转损
    changeTransitionLoss: '/product/updatetransitionloss',//修改进转损
    import: "/product/import",  //导入
    print: "/product/print" //打印，参数 btId
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
    del: "/catalog/delete",

    record:"/catalog/catalogissuerecord"
  };

  //期数
  env.api.periodical = {
    list: "/periodical/index",
    save: "/periodical/save",
    del: "/periodical/delete"
  };

  //寄送方式
  env.api.sendmethord = {
    opetion: "/ajax/sendmethord",
    list: "/sendmethord/index",
    save: "/sendmethord/save",
    del: "/sendmethord/delete"
  }


  //支付方式
  env.api.paymentmethord = {
    list: "/paymentmethord/index",
    save: "/paymentmethord/save",
    del: "/paymentmethord/delete"
  }

  //出货单
  env.api.deliverorder = {
    list: "/deliverorder/index",
    change: "/deliverorder/update",
    add: "/deliverorder/create",
    del: "/deliverorder/delete",
    remorderdelivercode: "/deliverorder/remorderdelivercode",
    telorderdelivercode: "/deliverorder/telorderdelivercode",
    view: "/deliverorder/vieworderdetail",
    saveorderproduct: "/deliverorder/saveorderproduct",//右侧保存产品
    deleteorderproduct: "/deliverorder/deleteorderproduct",//右侧删除产品
    import: "/deliverorder/import",   //导入
    viewticketproduct: "/deliverorder/viewticketproduct",//查看抵价券产品，参数deliveryOrderId,memberId
    viewticket: "/deliverorder/viewticket",//查看抵价券，参数deliveryOrderId,memberId
    addticket: "/deliverorder/createticket",//加入抵价券
    generateticket: "/deliverorder/generateticket",//生成抵价券
    changenumber: "/deliverorder/changenumber",//修改抵价券中商品数量
    delticket: "/deliverorder/delticket",//删除抵价券
    delticketproduct: "/deliverorder/delticketproduct"//删除抵价券商品
  };

  //包裹管理
  env.api.package = {
    list: "/package/index",
    change: "/package/update",
    add: "/package/create",
    del: "/package/delete",
    sendlist: '/package/sendreplacement',//补寄列表
    sendadd: '/package/savesendreplacement',//补寄添加
    sendchange: '/package/savesendreplacement',//补寄修改
    createserialcode: '/package/serialcode',//生成流水单号
    export: "/package/export",
    print: '/package/print',
    batchprint: '/package/batchprint',//批量打印
    scanningparcel:'/package/scanningparcel',//扫描单号
    batchUpate:"/package/batchupdate"//批量修改
  };

  env.api.productrecord = {
    list: "/productrecord/index",
    save: "/productrecord/save",
    del: "/productrecord/delete",
    //根据进转损查看产品
    viewProductRecord: '/productrecord/viewproductrecord',
    print: '/productrecord/printproductrecord'
  };

  //业务管理
  env.api.business = {
    list: "/business/memberlist",
    change: "/business/savemember",
    add: "/business/savemember",
    del: "/business/deletemember",
  
    export: '/printcart/export',//导出
    printmember: "/business/printmember", //会员名单打印，参数 btId
    printcart: '/printcart/printcart'//打印购物车打印，参数 btId
  };

  //打印购物车
   env.api.printcart = {
      businesslist: "/printcart/businessindex",//打印购物车列表
      businessadd: "/printcart/businesscreate",//添加打印购物车
      businessdel: "/printcart/businessdelete",//删除打印购物车
      checkbusiness:"/printcart/checkbusiness",
      packagelist: "/printcart/packageindex",
      packageadd: "/printcart/packagecreate",
      packagedel: "/printcart/packagedelete",
      packagechange: "/printcart/packageupdate",
      checkpackage:"/printcart/checkpackage",
      printExpress:"/printcart/printexpress",
      batchupdatebusiness:"/printcart/batchupdatebusiness",//业务管理打印购物车批量修改
   }

  //电话订购
  env.api.telorder = {
    list: {
      member: "/telorder/memberlist",
      order: "/telorder/orderlist",//出货单
      orderproduct: "/deliverorder/vieworderdetail"//出货单产品搜索
    },
    change: {
      member: "/telorder/savemember",
      order: "/deliverorder/saveorderproduct"
    },
    add: {
      member: "/telorder/savemember",
      order: "/deliverorder/saveorderproduct"
    },
    del: {
      //左侧顶部删除订单
      all: "/telorder/deleteall",
      //左侧底部删除记录
      record: "/telorder/deleteorder",
      //左侧底部删除
      member: "/telorder/deletemember",
      //右侧删除出货单产品
      order: "/telorder/deleteorderproduct"
    },
    print: '/telorder/print',
    exportToDeliverorder: "/telorder/exporttodeliverorder"
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
    member: "/search/member",
    export: '/search/export',//导出
    print: '/search/print',
    printExpress: '/search/printexpress'
  };

//管理员
  env.api.manager = {
    list: "/manager/index",
    save: "/manager/save",
    del: "/manager/delete"
  };

  //管理员角色
  env.api.managerrole = {
    list: "/managerrole/index",
    save: "/managerrole/save",
    del: "/managerrole/delete",
    //设置权限
    setting: "/managerrole/setting"
  };

  //地区
  env.api.areaList = {
    province: "/area/province",//省
    city: "/area/city",//市
    district: "/area/district",//区
    save: "/area/save",
    setting: "/area/setting", //邮资批量设置
    del: "/area/delete",
    //通过邮编获得地区
    get: "/area/getareabyzipcode"
  };


  //权限
  env.api.privaction = {
    list: "/privaction/index"
  };

  //打印记录
  env.api.printlog = {
    save: "/printlog/save" //记录打印记录
  };

  //打印设置
  env.api.print = {
    //保存打印设置
    save: "/printsetting/save",
    set: "/printsetting",
    get: "/printsetting/getprintbutton",
    list: "/printsetting/getprintbutton/module"
  };

  //目录重量
  env.api.weight = {
    get: "/setting/index",
    set: "/setting/save",
    setcompany:"/setting/company"
  };

  //折扣设置
  env.api.discount = {
    list: "/discountsetting/index",
    save: "/discountsetting/save",
    product: "/discountsetting/products",
    del: "/discountsetting/delate"
  }


  window.env = env;

  /**
   * 设置表单子元素值
   * @param {Form} form 表单，需要使用getForm()转换后传入
   * @param {Object} data 表单数据
   * TODO datefield 不能写入
   */
  window.updateForm = function (form, data) {
    var fields = [];

    function eachField(form) {
      if (form.items) {
        form.items.each(function (item, index, length) {
          try {
            item.getName();
            fields.push(item);
          } catch (e) {
            eachField(item);
          }
        });
      }
    }
    
    eachField(form.owner);

    Ext.Object.each(data, function (name, value) {
      Ext.Array.each(fields, function (item, index) {
        //期数选择
        if (item.xtype === "combobox" && item.getName() === name) {
          item.fireEvent("setvalue", item, value);
        } else if (item.xtype === "checkboxfield" && item.getName() === name) {
          value === "y" ? item.setValue(true) : item.setValue(false);
        } else if (item.getName() === name) {
          item.setValue(value);
        }
      });
    });
  };

  /**
   * 重置指定的表单项
   * @param opt.list 表单项name
   * @param opt.root selector 父级
   */
  window.resetForm = function(opt) {
    Ext.Array.each(opt.list, function (item) {
      opt.root.findField(item).setValue();
    });
  };

  /**
   * 通用的搜索功能
   * Usage: search.call(this, "store");
   * @param {Object|Form} this
   *    情景一：this.up("form") 直接获取到form；
   *    情景二：直接传入form；
   */
  window.searchHandler = function (store, success) {
    var form = this.up && this.up("form") ? this.up("form").getForm() : this;
    if (form.isValid()) {
      form.submit({
        success: function (form, action) {
          try {
            Ext.data.StoreManager.lookup(store).loadData(action.result.list);
            if (Ext.isFunction(success)) {
              success(Ext.data.StoreManager.lookup(store));
            }
          } catch (e) {
            console.error(e.stack);
          }
        },
        failure: function (form, action) {
          try {
            Ext.data.StoreManager.lookup(store).loadData(action.result.list);
            if (action.result.msg) {
              Ext.Msg.alert("搜索", action.result.msg);
            }
          } catch (e) {
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
   * @param {Function} success 删除成功后的回调函数，一般可以用来刷新grid数据
   */
  window.removeGridRow = function (opt) {
    try {
      var current = opt.grid.getSelectionModel().getSelection()[0],
        title = "删除" + (opt.grid.title || ""),
        index = opt.index || current.index;

      Ext.Msg.confirm(title, "确认删除？", function (type) {
        if (type === "yes") {
          Ext.Ajax.request({
            url: opt.api,
            params: {
              id: current.data.id
            },
            success: function (resp) {
              resp = Ext.decode(resp.responseText);

              if (resp.success === false) {
                Ext.Msg.alert(title, resp.msg);
              } else {
                if (Ext.isFunction(opt.success)) {
                  opt.success(resp);
                }
              }
            },
            failure: function (resp) {
              var msg = "";
              try {
                msg = Ext.decode(resp.responseText).result.msg;
              } catch(e) {
                msg = "服务器故障，删除失败！！！"
                console.error(e.stack);
              }

              Ext.Msg.alert(title, msg);
            }
          });
        }
      });
    } catch(e) {
      Ext.Msg.alert("删除" + (opt.grid.title || ""), "请选中列表中的一项后再操作");
      console.error(e.stack);
    }
  };

  /**
   * 打印
   */
  window.printHandle = {
    _extend: function(obja, objb) {
      var config = {};
      for (var i in obja) {
        config[i] = obja[i];
      }
      for (var n in objb) {
        config[n] = objb[n];
      }

      return config;
    },

    set: function (type) {
      if (type) {
        window.open(env.services.web + env.api.print.set + "?module=" + type);
      } else {
        throw "type 不能为空";
      }
    },

    /**
     * @param {ExtComponent} $el: 父级容器，用来放打印按钮，必选
     * @param {String} type: 类型，必选
     * @param {String} margin: 按钮边距，可选
     * @param {ExtComponent} form: 某些页面有搜索框，在获取打印数据时需要带上form中的搜索项，可选
     * @param {Object} formParam: 某些页面有搜索框，在获取打印数据时需要带上form中的搜索项，可选
     */
    get: function (opt) {
      var that = this;
      opt.margin = opt.margin || "";

      if (opt.type) {
        Ext.Ajax.request({
          url: env.services.web + env.api.print.get,
          method: "POST",
          params: {
            module: opt.type
          },
          success: function (response) {
            var data = Ext.JSON.decode(response.responseText);
            Ext.Array.each(data.list, function (item) {
              var button = that.create.button(that._extend(opt, item));
              opt.$el.add(button);
            });
          },
          failure: function (response) {
            throw "打印列表查询失败, 服务器无响应，请稍后再试";
          }
        });
      } else {
        throw "type 不能为空";
      }
    },

    create: {
      button: function(opt) {
        var that = this;
        var $btn = Ext.create("Ext.Button", {
          text: opt.printButtonName,
          margin: opt.margin,
          handler: function () {
            var val = {};
            if (opt.form) {
              val = opt.form.getValues();
            } else if (opt.formParam) {
              val = opt.formParam;
            }
            val["btId"] = opt.id;
            Ext.Ajax.request({
              url: env.services.web + opt.url,
              params: val,
              success: function (resp) {
                var data = Ext.JSON.decode(resp.responseText);

                if (data.list.length > 0) {
                  Ext.ux.grid.Printer.opt = {
                    title: opt.printPageTitle,
                    name: document.body.dataset.user,
                    api: env.services.web + env.api.printlog.save,
                    type: opt.type,
                    callback: function () {
                      var xhr = new XMLHttpRequest();
                      xhr.open("POST", opt.api, true);
                      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                      xhr.send("module=" + opt.type);
                      xhr.onreadystatechange = function (a) {
                        if (xhr.readyState == 4 && xhr.status == 200) {
                          console.log(xhr, a);
                        }
                      }
                    }
                  };
                  Ext.ux.grid.Printer.print(that.grid(data));
                } else {
                  Ext.Msg.alert("打印-" + opt.title, "没有数据可供打印，请先搜索、筛选数据！");
                }
              },
              failure: function () {
                throw "打印列表查询失败, 服务器无响应，请稍后再试";
              }
            });
          }
        });

        return $btn;
      },

      grid: function(data) {
        var fields = [];

        if (typeof data.columns === 'undefined') {
          throw '缺少 data.columns';
        }

        Ext.Object.each(data.list[0], function(item, i) {
          fields.push(item);
        });
        Ext.create('Ext.data.Store', {
          storeId:'print',
          fields: fields,
          data: data.list,
          proxy: {
            type: 'memory',
            reader: {
              type: 'json',
              rootProperty: 'list'
            }
          }
        });

        var grid = Ext.create('Ext.grid.Panel', {
          title: ' ',
          store: Ext.data.StoreManager.lookup('print'),
          columns: data.columns,
          height: 200,
          width: 400
        });

        return grid;
      }
    }
  };

  /**
   * 切换视图
   */
  window.switchView = function (opt) {
    if (opt.key && opt.val) {
      localStorage.setItem(opt.key, opt.val);
    }
    window.location.href = window.location.origin + window.location.pathname + "#" + opt.view;
  };

  /**
   * 提交批量修改的数据
   * @param store grid.store
   * @param api 保存数据接口
   */
  window.batchEditHandle = function(store, api) {
    var records = store.getUpdatedRecords();// 获取修改的行的数据，无法获取幻影数据
    var phantoms = store.getNewRecords();//获得幻影行
    records = records.concat(phantoms);//将幻影数据与真实数据合并
    if (records.length > 0) {
      Ext.Msg.confirm("请确认", "是否真的要修改数据？", function (button, text) {
        if (button == "yes") {
          var data = [];
          Ext.Array.each(records, function (record) {
            data.push(record.data);
          });

          Ext.Ajax.request({
            url: api,
            params: {
              data: Ext.encode(data)
            },
            method: 'POST',
            timeout: 2000,

            success: function (response, opts) {
              var success = Ext.decode(response.responseText).success;
              // 当后台数据同步成功时
              if (success) {
                Ext.Array.each(records, function (record) {
                  // data.push(record.data);
                  record.commit();// 向store提交修改数据，页面效果
                });
              } else {
                Ext.MessageBox.show({
                  title: "提示",
                  msg: "数据修改失败!"
                  // icon: Ext.MessageBox.INFO
                });
              }
            }
          });
        }
      });
    }
  };

  if (document.body.dataset.login === 'false') {
    Ext.application({
      name: "JNH",
      launch: function () {


        function comboboxSetValue(combobox, value) {
          combobox.store.data.each(function (item, i) {
            if (item.data.value == value) {
              combobox.setValue(item.data.value);
            }
          });
        }

        //期数
        Ext.define("periodical", {
          itemId: "periodical",
          extend: "Ext.form.ComboBox",
          fieldLabel: "期数",
          queryMode: "local",
          editable: false,
          store: Ext.create("Ext.data.Store", {
            fields: ["name", "value"],
            data: JSON.parse(document.body.dataset.periodical)
          }),
          labelWidth: 40,
          displayField: "name",
          valueField: "value",
          labelAlign: "right",
          name: "periodicalId",
          width: 130,
          initComponent: function() {
            this.callParent();
            this.on({
              render: function (combobox) {
                combobox.store.load(function (data) {
                  combobox.setValue(data[0]);
                });
              },
              setvalue: comboboxSetValue
            });
          }
        });

        //学校类型
        Ext.define("addressType", {
          extend: "Ext.form.ComboBox",
          fieldLabel: "类别",
          queryMode: "local",
          editable: false,
          store: Ext.create("Ext.data.Store", {
            fields: ["name", "value"],
            data: JSON.parse(document.body.dataset.addresstype)
          }),
          labelWidth: 60,
          displayField: "name",
          valueField: "value",
          labelAlign: "right",
          name: "type",
          width: 120,
          listeners: {
            render: function (combobox) {
              combobox.store.load(function (data) {
                combobox.setValue(data[0]);
              });
            },
            setvalue: comboboxSetValue
          }
        });

        //会员类型
        Ext.define("memberType", {
          extend: "Ext.form.ComboBox",
          fieldLabel: "会员类型",
          queryMode: "local",
          editable: false,
          store: Ext.create("Ext.data.Store", {
            fields: ["name", "value"],
            data: JSON.parse(document.body.dataset.membertype)
          }),
          labelWidth: 60,
          displayField: "name",
          valueField: "value",
          labelAlign: "right",
          name: "memberType",
          width: 150,
          listeners: {
            render: function (combobox) {
              combobox.store.load(function (data) {
                combobox.setValue(data[0]);
              });
            },
            setvalue: comboboxSetValue
          }
        });

        //寄送方式
        Ext.define("deliveryMethod", {
          extend: "Ext.form.ComboBox",
          fieldLabel: "寄送方式",
          queryMode: "local",
          editable: false,
          store: Ext.create("Ext.data.Store", {
            fields: ["name", "value"],
            data: JSON.parse(document.body.dataset.deliverymethod)
          }),
          displayField: "name",
          valueField: "value",
          labelAlign: "right",
          name: "deliveryMethod",
          width: 185,
          listeners: {
            render: function (combobox) {
              combobox.store.load(function (data) {
                combobox.setValue(data[0]);
              });
            },
            setvalue: comboboxSetValue
          }
        });

        //支付方式
        Ext.define("paymentMethord", {
          extend: "Ext.form.ComboBox",
          fieldLabel: "支付方式",
          queryMode: "local",
          editable: false,
          store: Ext.create("Ext.data.Store", {
            fields: ["name", "value"],
            data: JSON.parse(document.body.dataset.paymentmethord)
          }),
          labelWidth: 60,
          displayField: "name",
          valueField: "value",
          labelAlign: "right",
          name: "paymentMethord",
          width: 155,
          listeners: {
            render: function (combobox) {
              combobox.store.load(function (data) {
                combobox.setValue(data[0]);
              });
            },
            setvalue: comboboxSetValue
          }
        });


        //供货商分类
        Ext.define("companyType", {
          extend: "Ext.form.ComboBox",
          fieldLabel: "支付方式",
          queryMode: "local",
          editable: false,
          store: Ext.create("Ext.data.Store", {
            fields: ["name", "value"],
            data: JSON.parse(document.body.dataset.companytype)
          }),
          labelWidth: 60,
          displayField: "name",
          valueField: "value",
          labelAlign: "right",
          name: "companyType",
          width: 185,
          listeners: {
            render: function (combobox) {
              combobox.store.load(function (data) {
                combobox.setValue(data[0]);
              });
            },
            setvalue: comboboxSetValue
          }
        });

        //订单来源分类
        Ext.define("orderSource", {
          extend: "Ext.form.ComboBox",
          fieldLabel: "支付方式",
          queryMode: "local",
          editable: false,
          store: Ext.create("Ext.data.Store", {
            fields: ["name", "value"],
            data: JSON.parse(document.body.dataset.ordersource)
          }),
          labelWidth: 60,
          displayField: "name",
          valueField: "value",
          labelAlign: "right",
          name: "orderSource",
          width: 185,
          listeners: {
            render: function (combobox) {
              combobox.store.load(function (data) {
                combobox.setValue(data[0]);
              });
            },
            setvalue: comboboxSetValue
          }
        });

        //进转损分类
        Ext.define("jzsType", {
          extend: "Ext.form.ComboBox",
          fieldLabel: "类型",
          queryMode: "local",
          editable: false,
          store: Ext.create("Ext.data.Store", {
            fields: ["name", "value"],
            data: JSON.parse(document.body.dataset.jzstype)
          }),
          labelWidth: 60,
          displayField: "name",
          valueField: "value",
          labelAlign: "right",
          name: "type",
          width: 150,
          listeners: {
            render: function (combobox) {
              combobox.store.load(function (data) {
                combobox.setValue(data[0]);
              });
            },
            setvalue: comboboxSetValue
          }
        });

        //搜索模块会员类型
        Ext.define("searchMemberType", {
          extend: "Ext.form.ComboBox",
          fieldLabel: "会员类型",
          queryMode: "local",
          editable: false,
          store: Ext.create("Ext.data.Store", {
            fields: ["name", "value"],
            data: JSON.parse(document.body.dataset.searchmembertype)
          }),
          labelWidth: 60,
          displayField: "name",
          valueField: "value",
          labelAlign: "right",
          name: "memberType",
          width: 150,
          listeners: {
            render: function (combobox) {
              combobox.store.load(function (data) {
                combobox.setValue(data[0]);
              });
            },
            setvalue: comboboxSetValue
          }
        });


        //管理员角色
        Ext.define("managerRoles", {
          extend: "Ext.form.ComboBox",
          fieldLabel: "角色",
          queryMode: "local",
          editable: false,
          store: Ext.create("Ext.data.Store", {
            fields: ["name", "value"],
            data: JSON.parse(document.body.dataset.managerroles)
          }),

          displayField: "name",
          valueField: "value",
          labelAlign: "right",
          name: "roleId",
          listeners: {
            render: function (combobox) {
              combobox.store.load(function (data) {
                combobox.setValue(data[0]);
              });
            },
            setvalue: comboboxSetValue
          }
        });

        //订单状态
        Ext.define("orderStatus", {
          extend: "Ext.form.ComboBox",
          fieldLabel: "订单状态",
          queryMode: "local",
          editable: false,
          store: Ext.create("Ext.data.Store", {
            fields: ["name", "value"],
            data: JSON.parse(document.body.dataset.orderstatus)
          }),
          labelWidth: 60,
          displayField: "name",
          valueField: "value",
          labelAlign: "right",
          name: "status",
          width: 120,
          listeners: {
            render: function (combobox) {
              combobox.store.load(function (data) {
                combobox.setValue(data[0]);
              });
            },
            setvalue: comboboxSetValue
          }
        });


        //包裹状态
        Ext.define("packageStatus", {
          extend: "Ext.form.ComboBox",
          fieldLabel: "包裹状态",
          queryMode: "local",
          editable: false,
          store: Ext.create("Ext.data.Store", {
            fields: ["name", "value"],
            data: JSON.parse(document.body.dataset.packagestatus)
          }),
          labelWidth: 60,
          displayField: "name",
          valueField: "value",
          labelAlign: "right",
          name: "packageStatus",
          width: 120,
          listeners: {
            render: function (combobox) {
              combobox.store.load(function (data) {
                combobox.setValue(data[0]);
              });
            },
            setvalue: comboboxSetValue
          }
        });

         //出货单状态
        Ext.define("deliverorderStatus", {
          extend: "Ext.form.ComboBox",
          fieldLabel: "出货单状态",
          queryMode: "local",
          editable: false,
          store: Ext.create("Ext.data.Store", {
            fields: ["name", "value"],
            data: JSON.parse(document.body.dataset.deliverorderstatus)
          }),
          labelWidth: 60,
          displayField: "name",
          valueField: "value",
          labelAlign: "right",
          name: "deliverorderStatus",
          width: 120,
          listeners: {
            render: function (combobox) {
              combobox.store.load(function (data) {
                combobox.setValue(data[0]);
              });
            },
            setvalue: comboboxSetValue
          }
        });

        //邮编
        Ext.define("zipCode", {
          extend: "Ext.form.field.Text",
          fieldLabel: "邮编",
          name: "zipCode",
          labelWidth: 40,
          width: 100,
          labelAlign: "right",
          value: "",
          beforeVal: "",
          listeners: {
            blur: function (that) {
              var val = that.value;

              if (val === that.beforeVal) {
                return;
              }

              that.beforeVal = val;

              Ext.Ajax.request({
                url: env.services.web + env.api.areaList.get,
                params: {
                  code: val
                },
                success: function (resp) {
                  var data = Ext.JSON.decode(resp.responseText);
                  if (data.success) {
                    Ext.ComponentQuery.query("[name=" + that.input + "]")[0].setValue(data.area);
                  }
                }
              });
            }
          }
        });

        //折扣类型
        Ext.define("discountType", {
          extend: "Ext.form.ComboBox",
          fieldLabel: " 折扣类型",
          queryMode: "local",
          editable: false,
          store: Ext.create("Ext.data.Store", {
            fields: ["name", "value"],
            data: [
              {
                name: "折扣A类",
                value: 1
              },
              {
                name: "折扣B类",
                value: 2
              },
              {
                name: "折扣C类",
                value: 3
              },
              {
                name: "折扣D类",
                value: 4
              },
              {
                name: "折扣E类",
                value: 5
              }
            ]
          }),
          labelWidth: 60,
          displayField: "name",
          valueField: "value",
          labelAlign: "right",
          name: "discountType",
          width: 160,
          initComponent: function() {
            this.callParent();
            this.on({
              render: function (combobox) {
                combobox.store.load(function (data) {
                  combobox.setValue(data[0]);
                });
              },
              setvalue: comboboxSetValue
            });
          }
        });

        /**
         * 获取文件后缀
         */
        window.getExt = function (file) {
          return (/[.]/.exec(file)) ? /[^.]+$/.exec(file.toLowerCase()) : '';
        }

      }
    });
  }
})();
