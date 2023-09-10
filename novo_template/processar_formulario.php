<?php
// Configuração do banco de dados
$servername = "localhost"; // Hostname (ou endereço IP) do servidor
$username = "root"; // Nome de usuário do banco de dados
$password = ""; // Senha do banco de dados (deixe em branco se não houver senha)
$dbname = "infocao"; // Nome do banco de dados que você deseja usar

// Crie uma conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifique a conexão
if ($conn->connect_error) {
    die("Erro de conexão: " . $conn->connect_error);
}

// Recupere os valores dos campos do formulário
$ongName = $_POST["nomeOng"];
$ongStory = $_POST["historiaOng"];
$ongLink = $_POST["linkOng"];

// Upload da imagem
$imagemOng = $_FILES["imagemOng"]["name"];
$imagemTempPath = $_FILES["imagemOng"]["tmp_name"];
$imagemOngPath = "src/img/ongs/" . $imagemOng; // Substitua pelo caminho correto no seu servidor

if (move_uploaded_file($imagemTempPath, $imagemOngPath)) {
    echo "Imagem enviada com sucesso!";
} else {
    echo "Erro ao enviar a imagem.";
}

// Inserir dados no banco de dados
$sql = "INSERT INTO ongs (nome, historia, link, imagem) VALUES ('$ongName', '$ongStory', '$ongLink', '$imagemOngPath')";

if ($conn->query($sql) === TRUE) {
    echo "Dados inseridos com sucesso!";
} else {
    echo "Erro ao inserir dados: " . $conn->error;
}

// Feche a conexão
$conn->close();
?>
