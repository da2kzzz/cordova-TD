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

    // Application Constructor
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    function onDeviceReady() {
       $("#submit").click(function(e){
        
             
        e.preventDefault();
 
        $.ajax({ 
               type :"GET",
             url: 'https://etudiants-stgi.pu-pm.univ-fcomte.fr/projets-stgi/applications/schouali/listeuser.php',
             dataType: "jsonp",
             data:{
                username : $("#username").val(),  // récupération des input que l'on fait passer à connexion.php
              
            },
 
             
            success :function(data){
            	           //  $d=json_decode(data);
                             //  console.log("error");
                              if(data!=0)
                              {
                                $("#resultat").html("<p> <b> Fiche de l'utilisateur </b> <br> Nom:"+data.nom+"<br> Prénom :" + data.prenom + "<br> Ville :"+ data.ville + "</p>");
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
         }
         