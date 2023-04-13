<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "BD_shop";
//connect_pdo.php
try {
    $bdd = new PDO("mysql:host=$servername;dbname=$dbname;
    charset=utf8",
     $username,
     $password, array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
    // set the PDO error mode to exception
      }
catch(PDOException $e)
    {
    echo "Error: " . $e->getMessage();
    }

?>

