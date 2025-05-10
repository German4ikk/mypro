<?php
// Прокси-скрипт для отправки сообщений в Telegram API
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Обработка preflight запросов
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Проверяем, что запрос POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Только POST запросы разрешены']);
    exit;
}

// Получаем данные из запроса
$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

// Проверяем наличие всех необходимых параметров
if (!isset($data['botToken']) || !isset($data['chatId']) || !isset($data['message'])) {
    echo json_encode(['success' => false, 'error' => 'Отсутствуют обязательные параметры']);
    exit;
}

$bot_token = $data['botToken'];
$chat_id = $data['chatId'];
$message = $data['message'];

// Формируем URL для Telegram API
$telegram_api_url = "https://api.telegram.org/bot{$bot_token}/sendMessage";

// Подготавливаем данные для отправки
$telegram_data = [
    'chat_id' => $chat_id,
    'text' => $message,
    'parse_mode' => 'HTML'
];

// Инициализируем cURL
$curl = curl_init();

// Настраиваем параметры запроса
curl_setopt_array($curl, [
    CURLOPT_URL => $telegram_api_url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => json_encode($telegram_data),
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json'
    ]
]);

// Выполняем запрос
$response = curl_exec($curl);
$error = curl_error($curl);
$http_code = curl_getinfo($curl, CURLINFO_HTTP_CODE);

// Закрываем cURL
curl_close($curl);

// Проверяем результат
if ($error) {
    echo json_encode(['success' => false, 'error' => $error]);
} else {
    $response_data = json_decode($response, true);
    if ($http_code === 200 && isset($response_data['ok']) && $response_data['ok'] === true) {
        echo json_encode(['success' => true, 'data' => $response_data]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Ошибка Telegram API', 'response' => $response_data]);
    }
}
