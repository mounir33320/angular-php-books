<?php 
require "DatabaseBooks.class.php";
$db = new DatabaseBooks();

if(isset($_GET["id"])){
    $singleBook = $db->getSingleBook($_GET["id"]);
    $singleBookJson = json_encode($singleBook);

    echo $singleBookJson;
}

else{
    $books = $db->getBooks();    
    echo json_encode($books);
}

