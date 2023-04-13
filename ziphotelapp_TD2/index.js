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


        document.addEventListener('deviceready', onDeviceReady, false);
     
var db=null;   
    function onDeviceReady() {
        alert("the device is ready !");
        
         db = window.sqlitePlugin.openDatabase
         ({name: "bookings.db", location: 'default'});
	
	
	
	db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS book (id integer primary key,dcheckin text, dcheckout text, adult integer, children integer)");
    
  }, function(tx, res) {
    //console.log('Populated database OK');
    alert("table created");
  }, function(tx, error) {
    console.log('Transaction ERROR: ' + error.message);
  });
	       	       
        
    }
        
        
        
    
    $("#target").submit(function(event) {
    	event.preventDefault();
  var d1=$("#d1").val();
  var d2=$("#d2").val();
  var ad=$("#nbad").val();
   var chi=$("#nbchi").val();
   
          
   
  
     
      	db.transaction(function(tx) {
      	
          		var query ="INSERT INTO book (dcheckin, dcheckout, adult, children) VALUES (?,?,?,?)";
          		tx.executeSql(query, [d1, d2, ad,chi], function(tx,res){
          			alert("Note Added");	
          			alert(" this booking is added date1 "+d1+" date2"+ d2+" nb adults"+ ad+" nb children "+chi);
          		});
          	}, function(tx,error){
          		alert("An error occured while saving the note");
          	});
          	
          	
          }
          
          
     /* cordova.plugins.email.open({
    to:      'samir.chouali@gmail.com',
    //cc:      'erika@mustermann.de',
    //bcc:     ['john@doe.com', 'jane@doe.com'],
    subject: 'Greetings',
    body:    'How are you? Nice greetings from Leipzig'
});    */      
          );
          
          
          $(document).on("pagebeforeshow","#pviewbook",
          function(){
  
  db.transaction(function(tx) {
tx.executeSql('SELECT * FROM book', [], function(tx, results) {
var len = results.rows.length, i;
$("#divtab").html("<table id='tab' border=1 ><tr><th> Id </th> <th>Checkin</th> <th>Checkout</th> <th>NbAdults</th> <th>NBChilds</th></tr>");  


 
  
for (i = 0; i < len; i++)
{
$("#tab").append("<tr><td>"+results.rows.item(i).id+"</td><td>"+results.rows.item(i).dcheckin+"</td><td>"+results.rows.item(i).dcheckout+"</td><td>"
 +results.rows.item(i).adult+"</td><td>"+results.rows.item(i).children+"</td></tr>");
} 
  $("#tab").append("</table>");
  
}, function (error) { alert("error");});
 
  });
  
  });
  
 $("#nbs").click(function(){
          	  alert("this site is not available !"); })
 

    