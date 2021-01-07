<?php 
require "DatabaseBooks.class.php";
$db = new DatabaseBooks();

$book = file_get_contents("php://input");

if(isset($book) && !empty($book)){
    $bookDecode = json_decode($book);
    $db->addBook($bookDecode);
    
    $idBook = $db->getIdBook($bookDecode->title);
    echo json_encode($idBook);
}

