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
 
	var db = null;

    document.addEventListener("deviceready", function(){
          	
          	db = openDatabase('belf_db', '1.0', 'Test DB', 2 * 1024 * 1024);
			if (!db) {
			alert("Database Create Failed!");
			} else {
			alert("Database Create Successed!");
			}

			db.transaction( function(tx) { 
			tx.executeSql(
			"create table if not exists infs (Name text primary key, Categories text , Tag text , Location text)",
			[],  
			function(tx,result){ alert('Create infs Successed!'); }, 
			function(tx, error){ alert('Create infs Failed!:' + error.message); 
			});
			});
   		},
   		false
 );

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
			function () { alert('Add data Successed!'); },
			function (tx, error) { alert('Add data Failed!: ' + error.message); 
			} );
			});
            
            })

          
          
          
          
   $("#dall").click(function()
   {
   db.transaction(function(tx) 
   {
   var executeQuery = "delete from infs";
   tx.executeSql(executeQuery, [],function(tx, result) {alert('All notes deleted successfully.');});},
   function(err){alert('Error occurred while deleting notes.');}
   );
   })

   
   $(document).on("pagebeforeshow", "#display", function(){
   db.transaction(function(tx) {
   tx.executeSql("SELECT (Name) FROM infs", [], function(tx,res){
   $("#data-list").html("");
        for(var i = 0; i < res.rows.length; i++)
        {
            $("#data-list").html($("#data-list").html() + 
            "<li><a href='javascript:displayNote(\"" + res.rows.item(i).Name + "\")'>" + res.rows.item(i).Name + "</a></li>");
        }
    });
          		
    }, function(err){
    alert("An error occured while displaying saved notes");
    });
    });

    
    function displayNote(name)
    {
        db.transaction(function(tx) {
        tx.executeSql("SELECT * FROM infs WHERE Name = ?", [name], function(tx,res){
            var name = res.rows.item(0).Name;
            var cate = res.rows.item(0).Categories;
            var tgs = res.rows.item(0).Tag;
            var loc = res.rows.item(0).Location;
                    
            $("#note-title").html(name);
            $("#note-cate").html(cate);
            $("#note-tgs").html(tgs);
            $("#note-loc").html(loc);

            $.mobile.changePage("#single-note");
    });
    }, function(err){
        alert(err.message);
        alert("An error occured while displaying the note");
    });
    }

    $("#submit").click(function(e){
        
             
        e.preventDefault();
 
        $.ajax({ 
               type :"GET",
             url: 'listeuser.php',
             dataType: "jsonp",
             data:{
                username : $("#username").val(),  // récupération des input que l'on fait passer à connexion.php
              
            },
 
             
            success :function(data){
                         //  $d=json_decode(data);
                             //  console.log("error");
                              if(data!=0)
                              {
                                $("#resultat").html("<p> <b> Fiche de lieu </b> <br> Name:"+data.Name+"<br> Category :" + data.Categories + "<br> Tags :"+ data.Tag + "<br> Location :"+ data.Location + "</p>");
                                }
                                else {
                                   $("#resultat").html("Utilisateur inconnu !"); 
                                  }
                      },
            
            error : function () 
              {
            console.log("error");
              }            
           } );
            
            }
         );

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    
}


function getLocation()
{

    navigator.geolocation.getCurrentPosition
    (onMapSuccess, onMapError, { enableHighAccuracy: true });
}

// Success callback for get geo coordinates

var onMapSuccess = function (position) {

    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;

    getMap(Latitude, Longitude);

}

// Get map by using coordinates

function getMap(latitude, longitude) {

    var mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map
    (document.getElementById("map"), mapOptions);


    var latLong = new google.maps.LatLng(latitude, longitude);

    var marker = new google.maps.Marker({
        position: latLong
    });

    marker.setMap(map);
    map.setZoom(15);
    map.setCenter(marker.getPosition());
}

function onMapError(error) {
    console.log('code: ' + error.code + '\n' +
        'message: ' + error.message + '\n');
}

