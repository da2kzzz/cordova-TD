<?php

include"connect_pdo.php";
$user= $_GET["username"];
$result=$bdd->prepare("select * from user where nom=:nom");
$result->bindParam(':nom', $user);
$result->execute();
$n=$result->rowCount();
 

if ($n!=0)
{
   $data= $result->fetch();
   
 }
 else {
 	$data=0;
 }  
		 echo $_GET['callback'] . '(' . json_encode($data) . ')';	 
		




?>

