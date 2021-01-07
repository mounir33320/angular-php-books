<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

class DatabaseBooks{
    protected $host = "localhost",
            $dbname = "books-php",
            $user = "root",
            $password = "root",
            $db;
            
    public function __construct($host = null, $dbname = null, $user = null, $password = null){
        if($host != null){
            $this->host = $host;
            $this->dbname = $dbname;
            $this->user = $user;
            $this->password = $password;
        }

        try{
            $this->db = new PDO("mysql:host=$this->host;dbname=$this->dbname;charset=utf8", $this->user, $this->password);
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch(Exception $e){
            die("<h1>Une erreur avec la base de donnée est survenue : " .$e->getMessage());
        }
    }

    public function addBook($book){
        $q = $this->db->prepare("INSERT INTO books(title, author, synopsis) VALUES(:title, :author, :synopsis)");
        $q->bindValue(":title", htmlspecialchars($book->title));
        $q->bindValue(":author", htmlspecialchars($book->author));
        $q->bindValue(":synopsis", htmlspecialchars($book->synopsis));
        $q->execute();
    }

    public function delete($id){
        $id = (int) $id;
        $q = $this->db->prepare("DELETE FROM books WHERE id = :id");
        $q->bindValue(":id", $id, PDO::PARAM_INT);
        $q->execute();
    }

    public function getBooks(){
        $q = $this->db->query("SELECT * FROM books");
        
        $books = [];
        while($data = $q->fetch(PDO::FETCH_OBJ)){
            $books[] = $data;
        }
        return $books;
    }

    public function getIdBook($info){
        $q = $this->db->prepare("SELECT * FROM books WHERE title = :title");
        $q->bindValue(":title", $info);
        $q->execute();

        $book = $q->fetch(PDO::FETCH_OBJ);
        return $book->id;
        
    }

    public function getSingleBook($info){       
        $info = (int) $info;
        $q = $this->db->prepare("SELECT * FROM books WHERE id = :id");
        $q->bindValue(":id", $info, PDO::PARAM_INT);
        $q->execute();

        return $book = $q->fetch(PDO::FETCH_OBJ);        
    }

}