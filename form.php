<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $email = htmlspecialchars(trim($_POST['email'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo "Неверный формат email.";
        exit;
    }

    $to = "sinigatullinilgam@gmail.com";
    $subject = "Сообщение с сайта Федеральное Право";
    $body = "Имя: $name\nEmail: $email\n\nСообщение:\n$message\n";
    $headers = "From: $email\r\nReply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "Спасибо! Ваше сообщение отправлено.";
    } else {
        http_response_code(500);
        echo "Ошибка при отправке письма. Попробуйте позже.";
    }
} else {
    http_response_code(405);
    echo "Метод не поддерживается.";
}
?>