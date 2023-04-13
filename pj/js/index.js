/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
 

    document.addEventListener("deviceready", function(){
          	
          	var db = openDatabase("belf_db", "1.0", "infos", 1024 * 1024, function () { });
			if (!db) {
			alert("Database Create Failed！");
			} else {
			alert("Database Create Successed！");
			}

			this.createTable=function() {
			db.transaction( function(tx) { 
			tx.executeSql(
			"create table if not exists infs (Name TEXT , Categories TEXT , Tag TEXT , Location TEXT)",  
			function(tx,result){ alert('Create infs Successed！'); }, 
			function(tx, error){ alert('Create infs Failed！:' + error.message); 
			});
			});
			}

    }, false);

         $("#store").on("click",function()
          {
          	var Name = $("#name").val();
          	var Categories = $("#categories").val();
          	var Tag = $("#tag").val();
          	var Location = $("#location").val();


          	if(Name == "")
          	{
          		alert("Please enter name");
          		return;
          	}

          	if(Categories == "")
          	{
          		alert("Please enter categories");
          		return;
          	}
          	if(Tag == "")
          	{
          		alert("Please enter tags");
          		return;
          	}
          	if(Location == "")
          	{
          		alert("Please enter adress");
          		return;
          	}

          	
			db.transaction(function (tx) {
			tx.executeSql(
			"insert into infs (Name, Categories, Tag, Location) values (?,?,?,?)", 
			[Name,Categories,Tag,Location],
			function () { alert('添加数据成功'); },
			function (tx, error) { alert('添加数据失败: ' + error.message); 
			} );
			});
            
          	
          	/*db.transaction(function(tx) {
          		tx.executeSql("insert into infs (Name, Categories, Tag, Location) values (?,?,?,?)", [Name, Categories, Tag, Location], 
          			function(){
          			alert("Note Added");	
          		});
          	}, function(err){
          		alert("An error occured while saving the note");
          	});*/
            
            })

          
          
          
          
          $("#delnote").click(function()
            {
                   db.transaction(function(tx) {
   var executeQuery = "delete from infs";
         tx.executeSql(executeQuery, [],function(tx, result) {alert('All notes deleted successfully.');});},
     function(err){alert('Error occurred while deleting notes.');}
         );
       })

          $(document).on("pagebeforeshow", "#viewall", function(){
          	db.transaction(function(tx) {
          		tx.executeSql("SELECT (Name) FROM infs", [], function(tx,res){
          			$("#data-list").html("");
                      for(var i = 0; i < res.rows.length; i++)
                      {
                      	$("#data-list").html($("#data-list").html() + 
                      	"<li><a href='javascript:displayNote(\"" + res.rows.item(i).name + "\")'>" + res.rows.item(i).name + "</a></li>");
                      }
          		});
          		
          	}, function(err){
          		alert("An error occured while displaying saved notes");
          	});
          });

          function displayNote(name)
          {
          	db.transaction(function(tx) {
          		tx.executeSql("SELECT * FROM notesv1 WHERE Name = ?", [Name], function(tx,res){
                      var name = res.rows.item(0).Name;
                      var cate = res.rows.item(0).Categories;
                      var tgs = res.rows.item(0).Tag;
                      var loc = res.rows.item(0).Location;
                    
                     	$("#note-title").html(name);
                     	$("#note-cat").html(cate);
                     	$("#note-tag").html(tgs);
                     	$("#note-loc").html(loc);

                     	$.mobile.changePage("#single-note");
          		});
          	}, function(err){
          		alert(err.message);
          		alert("An error occured while displaying the note");
          	});
          }


function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}
