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
            	
          var db = null;

          document.addEventListener("deviceready", function(){
          	
          	db = window.sqlitePlugin.openDatabase({name: "notes.db", location: 'default'});
          	db.transaction(function(tx) {
          		tx.executeSql("CREATE TABLE IF NOT EXISTS notesv1 (name text primary key, data text, d text)");
          	}, function(err){
          		alert("An error occured while initializing the app");
          	},function successCB() {
        alert(" Table created with success!");
    }
 );
          }, false);

         $("#adb").on("click",function()
          {
          	var name = $("#name").val();
          	var text = $("#note-text").val();
          	var d = $("#dnote").val();


          	if(name == "")
          	{
          		alert("Please enter name");
          		return;
          	}

          	if(text == "")
          	{
          		alert("Please enter text");
          		return;
          	}
          		if(d == "")
          	{
          		alert("Please enter date");
          		return;
          	}

          	db.transaction(function(tx) {
          		var query ="INSERT INTO notesv1 (name, data, d) VALUES (?,?,?)";
          		tx.executeSql(query, [name, text, d], function(tx,res){
          			alert("Note Added");	
          		});
          	}, function(err){
          		alert("An error occured while saving the note");
          	});
          })
          
          
          
          
          $("#delnote").click(function()
            {
                   db.transaction(function(tx) {
   var executeQuery = "delete from notesv1";
         tx.executeSql(executeQuery, [],function(tx, result) {alert('All notes deleted successfully.');});},
     function(err){alert('Error occurred while deleting notes.');}
         );
       })

          $(document).on("pagebeforeshow", "#display", function(){
          	db.transaction(function(tx) {
          		tx.executeSql("SELECT (name) FROM notesv1", [], function(tx,res){
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
          		tx.executeSql("SELECT * FROM notesv1 WHERE name = ?", [name], function(tx,res){
                      var name = res.rows.item(0).name;
                      var data = res.rows.item(0).data;
                       var date = res.rows.item(0).d;
                    
                     	$("#note-title").html(name);
                     	$("#note-data").html(data);
                     	$("#note-date").html(date);

                     	$.mobile.changePage("#single-note");
          		});
          	}, function(err){
          		alert(err.message);
          		alert("An error occured while displaying the note");
          	});
          }
       