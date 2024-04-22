<?php
// Verbindung zur Datenbank herstellen
$servername = "w0188670.kasserver.com"; // Der Hostname deiner Datenbank
$username = "d04009b"; // Dein Datenbank-Benutzername
$password = "javapw"; // Dein Datenbank-Passwort
$dbname = "d04009b1"; // Der Name deiner Datenbank

// Verbindung herstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Verbindung überprüfen
if ($conn->connect_error) {
    die("Verbindung fehlgeschlagen: " . $conn->connect_error);
}

// SQL-Abfrage ausführen
$sql = "SELECT text FROM deine_tabelle WHERE id = 1"; // Ersetze 'deine_tabelle' durch den Namen deiner Tabelle
$result = $conn->query($sql);

// Überprüfen, ob Daten vorhanden sind
if ($result->num_rows > 0) {
    // Daten ausgeben
    $row = $result->fetch_assoc();
    $text = $row["text"];
    echo $text;
} else {
    echo "Keine Daten gefunden.";
}

// Verbindung schließen
$conn->close();
?>
