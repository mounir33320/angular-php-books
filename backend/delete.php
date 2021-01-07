<?php 
require "DatabaseBooks.class.php";
$db = new DatabaseBooks();

if(isset($_GET["id"])){
    $id = (int) $_GET["id"];
    $db->delete($id);

}
