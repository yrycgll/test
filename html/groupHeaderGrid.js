var win;
var store = new Ext.data.Store({
	reader : new Ext.data.JsonReader({
		totalProperty : 'total',
		root : "rows"
	}, [ {name:"linkId",mapping:"RESOURCE_LINK_ID"}, 
	     {name:"collectDate",mapping:"COLLECT_DATE"},
	     {name:"length",mapping:"LENGTH"},
	     {name:"attCoefficientTheory",mapping:"ATT_COEFFICIENT_THEORY"},
	     {name:"attCoefficientBuild",mapping:"ATT_COEFFICIENT_BUILD"},
	     {name:"attCoefficientExperience",mapping:"ATT_COEFFICIENT_EXPERIENCE"},
	     {name:"workRange",mapping:"WORK_RANGE"},
	     {name:"standardAttenuation",mapping:"ATT_STD"},
	     
	     {name:"projectsName",mapping:"PROJECTS_NAME"},
	     {name:"projectName",mapping:"PROJECT_NAME"},
	     {name:"linkName",mapping:"LINK_NAME"},
	     {name:"offsetLevel",mapping:"OFFSET_LEVEL"},
	     {name:"attenuationValue",mapping:"ATT_VALUE"},
	     {name:"offsetAttenuation",mapping:"ATT_OFFSET"},
	     {name:"balanceDegree",mapping:"BALANCE_DEGREE"},
	     {name:"attCoefficient",mapping:"ATT_COEFFICIENT"},
	     {name:"att",mapping:"ATT"},
	     
	     {name:"zNe",mapping:"Z_NE_NAME"},
	     {name:"zStationName",mapping:"Z_END_STATION"},
	     {name:"zPtp",mapping:"Z_PTP_NAME"},
	     {name:"aNe",mapping:"A_NE_NAME"},
	     {name:"aStationName",mapping:"A_END_STATION"},
	     {name:"aPtp",mapping:"A_PTP_NAME"},
	     {name:"sendOP",mapping:"SEND_OP"},
	     {name:"recOP",mapping:"REC_OP"},
	     
	     {name:"aPtpOsc",mapping:"A_OSC_PTP_NAME"},
	     {name:"zPtpOsc",mapping:"Z_OSC_PTP_NAME"},
	     {name:"attOsc",mapping:"ATT_OSC"},
	     {name:"attenuationValueOsc",mapping:"ATT_VALUE_OSC"},
	     {name:"offsetAttenuationOsc",mapping:"ATT_OFFSET_OSC"},
	     {name:"attCoefficientOsc",mapping:"ATT_COEFFICIENT_OSC"},
	     {name:"sendOPOsc",mapping:"SEND_OP_OSC"},
	     {name:"recOPOsc",mapping:"REC_OP_OSC"},
	     {name:"offsetLevelOsc",mapping:"OFFSET_LEVEL_OSC"},
	     {name:"balanceDegreeOsc",mapping:"BALANCE_DEGREE_OSC"}]),
	listeners:{
		"exception": function(proxy,type,action,options,response,arg){
			Ext.Msg.alert("提示","查询失败"+
					"<BR>Status:"+response.statusText||"unknow");
		}
	}
});

store.loadData({
	total:5,
	rows:[{},{},{},{},{}]
})
// ==========================page=============================
var rows=[[{header:''},
	       {header:''},
	       {header:''},
	       {header:''},
	       {header:''},
	       {header: '等级',align: 'center',colspan: 2},
	       {header:''},
	       {header:''},
	       {header: '成绩', align: 'center', colspan: 3}]]
;
var checkboxSelectionModel = new Ext.ux.grid.LockingCheckboxSelectionModel({
	header:'<div class="x-grid3-hd-checker" style="height:23px;"></div>',
	singleSelect:true});

var cm = new Ext.ux.grid.LockingColumnModel({
	// specify any defaults for each column
	defaults : {
		sortable : true
	// columns are not sortable by default
	},
	stateId : "opticalLinkEvaluateGridId",
	rows: rows,
	columns : [new Ext.grid.RowNumberer({
		width:26,
		locked:true
	}),checkboxSelectionModel,{
		id : 'projectsName',
		header : '学校',
		dataIndex : 'projectsName',
		width : 80,
		locked:true
	}, {
		id : 'projectName',
		header : '班级',
		dataIndex : 'projectName',
		width : 80,
		locked:true
	}, {
		id : 'linkName',
		header : '姓名',
		dataIndex : 'linkName',
		width : 80,
		locked:true
	}, {
		id : 'offsetLevel',
		header : '期中',
		dataIndex : 'offsetLevel',
		width : 60,
		renderer : colorGrid,
		locked:true
	}, {
		id : 'offsetLevelOsc',
		header : '期末',
		dataIndex : 'offsetLevelOsc',
		width : 60,
		renderer : colorGrid,
		locked:true
	}, {
		id : 'collectDate',
		header : '学号',
		dataIndex : 'collectDate',
		width : 80
	}, {
		id : 'length',
		header : '性别',
		dataIndex : 'length',
		width : 60
	}, {
		id : 'attenuationValue',
		header : '期中',
		dataIndex : 'attenuationValue',
		width : 60
	}, {
		id : 'attenuationValueOsc',
		header : '期末',
		dataIndex : 'attenuationValueOsc',
		width : 60
	}, {
		id : 'standardAttenuation',
		header : '平均',
		dataIndex : 'standardAttenuation',
		width : 60
	}]
});

var pageTool = new Ext.PagingToolbar({
	id : 'pageTool',
	pageSize : 200,// 每页显示的记录值
	store : store,
	displayInfo : true,
	displayMsg : '当前 {0} - {1} ，总数 {2}',
	emptyMsg : "没有记录"
});

var gridPanel = new Ext.grid.GridPanel({
	id : "gridPanel",
	region : "center",
	colModel : cm,
	store : store,
	stripeRows : true, // 交替行效果
	loadMask : true,
	selModel : checkboxSelectionModel, // 必须加不然不能选checkbox
	view : new Ext.ux.grid.LockingGridView(),
	plugins:[new Ext.ux.plugins.LockedGroupHeaderGrid()],
	bbar : pageTool
});

function colorGrid(v, m, r) {
	if(v == 1){
		m.css = 'x-grid-background-green';
		return 'A级';
	}
	else if(v == 2){
		m.css = 'x-grid-background-blue';
		return 'B级';
	}
	else if(v == 3){
		m.css = 'x-grid-background-yellow';
		return 'C级';
	}
	else if(v == 4){
		m.css = 'x-grid-background-orange';
		return 'D级';
	}
	return v;
}

Ext.onReady(function() {
	Ext.BLANK_IMAGE_URL = "../resource/ext/resources/images/default/s.gif";
	win = new Ext.Viewport({
		id : 'win',
		title : "光纤链路评估",
		layout : 'border',
		items : [ gridPanel],
		renderTo : Ext.getBody()
	});
	win.show();
});