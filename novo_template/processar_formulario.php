<?php
// Verifique se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Recupere os dados do formulário
    $ongName = $_POST["nomeOng"];
    $ongStory = $_POST["historiaOng"];
    $ongLink = $_POST["linkOng"];

    // Faça o que você quiser com os dados aqui, por exemplo, salvar em um banco de dados
    // Conexão com o banco de dados (substitua com suas próprias informações)
    $servername = "localhost";
    $username = "seu_usuario";
    $password = "sua_senha";
    $dbname = "seu_banco_de_dados";

    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verifique a conexão
    if ($conn->connect_error) {
        die("Erro de conexão: " . $conn->connect_error);
    }

    // Prepare e execute a consulta SQL para inserir os dados no banco de dados
    $sql = "INSERT INTO ongs (nome, historia, link) VALUES ('$ongName', '$ongStory', '$ongLink')";

    if ($conn->query($sql) === TRUE) {
        echo "Dados inseridos com sucesso!";
    } else {
        echo "Erro ao inserir dados: " . $conn->error;
    }

    // Feche a conexão com o banco de dados
    $conn->close();
}
?>
