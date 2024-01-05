 define("UsrClientUnit", [], function() {
	return {
		"IsNew": {
        dataValueType: BPMSoft.DataValueType.BOOLEAN,
        type: BPMSoft.ViewModelColumnType.VIRTUAL_COLUMN,
        value: false
     	 },
		entitySchemaName: "DvpPics",
		attributes: {
			"VisibleButton": {
				dataValueType: BPMSoft.DataValueType.BOOLEAN,
				type: BPMSoft.ViewModelColumnType.VIRTUAL_COLUMN,
				value: true
			  }
		},
		modules: /**SCHEMA_MODULES*/{}/**SCHEMA_MODULES*/,
		details: /**SCHEMA_DETAILS*/{
			"Files": {
				"schemaName": "FileDetailV2",
				"entitySchemaName": "DvpPicsFile",
				"filter": {
					"masterColumn": "Id",
					"detailColumn": "DvpPics"
				}
			},
			"DvpPicAuthor": {
				"schemaName": "DvpSchema9c905d68Detail",
				"entitySchemaName": "DvpAuthorPic",
				"filter": {
					"detailColumn": "DvpDvpPics",
					"masterColumn": "Id"
				}
			}
		}/**SCHEMA_DETAILS*/,
		businessRules: /**SCHEMA_BUSINESS_RULES*/{
			"Dvp_discount2": {
				"ef6dfa86-3e0e-4705-b170-e8ad44d7d522": {
					"uId": "ef6dfa86-3e0e-4705-b170-e8ad44d7d522",
					"enabled": true,
					"removed": false,
					"ruleType": 0,
					"property": 0,
					"logical": 0,
					"conditions": [
						{
							"comparisonType": 3,
							"leftExpression": {
								"type": 1,
								"attribute": "Dvp_discountYN"
							},
							"rightExpression": {
								"type": 0,
								"value": true,
								"dataValueType": 12
							}
						}
					]
				}
			}
		}/**SCHEMA_BUSINESS_RULES*/,
		methods: {
			
			save: function(){
      //this.isNew - new card
      this.set("IsNew",this.isNew);
      this.callParent(arguments);
    },
  hideButton: function(){
      //this.callParent(arguments);
      this.set("VisibleButton",false);
      
      console.log('метод hideButton');
    },
    showButton: function(){
      //this.callParent(arguments);
      this.set("VisibleButton",true);
      console.log('метод showButton');
    }, 
   onSaved: function() {
      this.callParent(arguments);
      
      console.log('метод onSaved');
      
      console.log(this.get('DvpPicAuthor'));
   var idComp = this.get('Id').toString();
      console.log(idComp);
      var esqQuery = Ext.create('BPMSoft.EntitySchemaQuery', {
    rootSchemaName: "Usr_Foto_PC"
});
          esqQuery.addColumn("UsrUsrComp");
  var filter = esqQuery.createColumnFilterWithParameter(
   BPMSoft.ComparisonType.EQUAL, "UsrUsrComp", idComp);
    esqQuery.filters.addItem(filter);
   var count = 0; 
  esqQuery.getEntityCollection(function(response){
   var text = "";
   
   if(response.success){
    BPMSoft.each(response.collection.getItems(), function(item){
     if(count >= 3){
      var text = item.values.Id;
      
      
      var query1 = Ext.create("BPMSoft.DeleteQuery", {
            rootSchemaName: "Usr_Foto_PC"
         });

         var filter = BPMSoft.createColumnFilterWithParameter(BPMSoft.ComparisonType.EQUAL, "Id", text);
         query1.filters.addItem(filter);
      query1.execute();
      
      
      console.log("delete: " + text); 
      count = count + 1;
     }else{
      var textt = item.values.Id;
      console.log(textt); 
      count = count + 1; 
     }
     
    }, this);
    console.log(count);
    while(count < 3){
     var insert = Ext.create('BPMSoft.InsertQuery', {
      rootSchemaName: "Usr_Foto_PC"
       });
       insert.setParameterValue('Id', "",
      BPMSoft.DataValueType.GUID);
   insert.setParameterValue('UsrName', "Test" + count,
      BPMSoft.DataValueType.TEXT);
   
   insert.setParameterValue('UsrUsrComp', idComp,
      BPMSoft.DataValueType.GUID);
       insert.execute();
     count = count + 1;
    }
   }
  }, this);
   
    },
   getMyButtonEnable: function(){return true;},
          
	getMyButtonVisible: function(){return true;},

			myActionClick: function(){

				BPMSoft.showInformation(
					Ext.String.format(
						this.get("Resources.Strings.MyActionMessage"),
						new Date().toLocaleString())
				); 
    	return true; 
      },
	  getActions: function() {
			/* Вызов базовой реализации метода для получения проиниализированных действий страницы. */
			let actions = this.callParent(arguments);
			/* Добавление линии-разделителя между вкладками действий. */
			actions.addItem(this.getButtonMenuItem({
			  Type: "BPMSoft.MenuSeparator",
			  Caption: ""
			}));
			/* Добавление кастомного пункта в список действий. */
			actions.addItem(this.getButtonMenuItem({
			  /* Привязка заголовка действия к локализуемой строке. */
			  "Tag": "myActionClick",
			  "Caption": {"bindTo": "Resources.Strings.MyActionCaption"},
			  "enable": {"bindTo": "getMyButtonEnable"},
		"Click" : {"bindTo": "showButton"}
			}));

			/* Возвращение коллекции действий страницы. */
			return actions;
		  },
		},
		dataModels: /**SCHEMA_DATA_MODELS*/{}/**SCHEMA_DATA_MODELS*/,
		diff: /**SCHEMA_DIFF*/[
				{
					"operation": "insert",
					"name": "UsrNamefsasa",
					"values": {"layout": {
					  "colSpan": 24,
					  "rowSpan": 1,
					  "column": 0,
					  "row": 0,
					  "layoutName": "ProfileContainer"
					 },
							   /* Тип добавляемого элемента — кнопка. */
							   "itemType": BPMSoft.ViewItemType.BUTTON,
							   /* Привязка заголовка кнопки к локализуемой строке схемы. */
							   "caption":{bindTo:"Resources.Strings.UsrCancelEventButton"},
							   /* Привязка метода-обработчика нажатия кнопки. */
							   "click": { bindTo: "hideButton" },
							   /* Стиль отображения кнопки. */
							   "style": BPMSoft.controls.ButtonEnums.style.DEFAULT,
							 /* Стиль видимости кнопки. */
							 "visible": { bindTo: "VisibleButton" },
										 },
					"parentName": "ProfileContainer",
					"propertyName": "items",
					"index": 1
	 	 	},
			{
				"operation": "insert",
				"name": "DvpNamef789429f-20ee-4541-ad02-87113f4a943f",
				"values": {
					"layout": {
						"colSpan": 24,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "ProfileContainer"
					},
					"bindTo": "DvpName"
				},
				"parentName": "ProfileContainer",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "STRING97b28d33-ad28-47d7-91c3-a9fca7bfe5e6",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 0,
						"layoutName": "Header"
					},
					"bindTo": "Dvp_name",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "LOOKUPb907c102-f803-4504-a139-f336cb6dec9e",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 1,
						"layoutName": "Header"
					},
					"bindTo": "Dvp_type",
					"enabled": false,
					"contentType": 3
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "DATETIMEf4296503-4819-4e64-af4d-db90ae78c46e",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 2,
						"layoutName": "Header"
					},
					"bindTo": "Dvp_deadline",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 2
			},
			{
				"operation": "insert",
				"name": "BOOLEANafa8d836-b3da-42e1-b9fd-bd6f0984cc32",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 3,
						"layoutName": "Header"
					},
					"bindTo": "Dvp_discountYN",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 3
			},
			{
				"operation": "insert",
				"name": "INTEGER039c66f9-69c7-4dee-8da5-e2839dc78d88",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 4,
						"layoutName": "Header"
					},
					"bindTo": "Dvp_discount2",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 4
			},
			{
				"operation": "insert",
				"name": "INTEGER7fa077c9-5cb5-42d8-aaf7-fc056742efed",
				"values": {
					"layout": {
						"colSpan": 11,
						"rowSpan": 1,
						"column": 0,
						"row": 6,
						"layoutName": "Header"
					},
					"bindTo": "Dvp_price",
					"enabled": true
				},
				"parentName": "Header",
				"propertyName": "items",
				"index": 5
			},
			{
				"operation": "insert",
				"name": "NotesAndFilesTab",
				"values": {
					"caption": {
						"bindTo": "Resources.Strings.NotesAndFilesTabCaption"
					},
					"items": [],
					"order": 0
				},
				"parentName": "Tabs",
				"propertyName": "tabs",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "Files",
				"values": {
					"itemType": 2
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "insert",
				"name": "NotesControlGroup",
				"values": {
					"itemType": 15,
					"caption": {
						"bindTo": "Resources.Strings.NotesGroupCaption"
					},
					"items": []
				},
				"parentName": "NotesAndFilesTab",
				"propertyName": "items",
				"index": 1
			},
			{
				"operation": "insert",
				"name": "Notes",
				"values": {
					"bindTo": "DvpNotes",
					"dataValueType": 1,
					"contentType": 4,
					"layout": {
						"column": 0,
						"row": 0,
						"colSpan": 24
					},
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"imageLoaded": {
							"bindTo": "insertImagesToNotes"
						},
						"images": {
							"bindTo": "NotesImagesCollection"
						}
					}
				},
				"parentName": "NotesControlGroup",
				"propertyName": "items",
				"index": 0
			},
			{
				"operation": "merge",
				"name": "ESNTab",
				"values": {
					"order": 1
				}
			},
			{
				"operation": "insert",
				"name": "DvpPicAuthor",
				"values": {
					"itemType": 2,
					"markerValue": "added-detail"
				},
				"parentName": "ESNTab",
				"propertyName": "items",
				"index": 1
			}
		]/**SCHEMA_DIFF*/
	};
 });