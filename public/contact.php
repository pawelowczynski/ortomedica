<?php
/**
 * Obsługa formularza kontaktowego (POST). Wgraj razem z buildem strony na hosting z PHP.
 * Opcjonalnie ustaw zmienną środowiskową CONTACT_MAIL_TO (np. w panelu hostingu).
 */
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'message' => 'Niedozwolona metoda.'], JSON_UNESCAPED_UNICODE);
  exit;
}

session_start();
$now = time();
if (!empty($_SESSION['contact_last']) && ($now - (int) $_SESSION['contact_last']) < 25) {
  http_response_code(429);
  echo json_encode(['ok' => false, 'message' => 'Proszę odczekać chwilę przed kolejną wiadomością.'], JSON_UNESCAPED_UNICODE);
  exit;
}

$bot = isset($_POST['bot_check']) ? trim((string) $_POST['bot_check']) : '';
if ($bot !== '') {
  echo json_encode(['ok' => true, 'message' => 'OK'], JSON_UNESCAPED_UNICODE);
  exit;
}

$name = isset($_POST['name']) ? trim((string) $_POST['name']) : '';
$phone = isset($_POST['phone']) ? trim((string) $_POST['phone']) : '';
$subjectKey = isset($_POST['subject']) ? trim((string) $_POST['subject']) : '';

$stripNl = static function (string $s): string {
  return str_replace(["\r", "\n"], '', $s);
};

$trunc = static function (string $s, int $max): string {
  if (function_exists('mb_substr')) {
    return mb_substr($s, 0, $max, 'UTF-8');
  }
  return substr($s, 0, $max);
};

$name = $stripNl($trunc($name, 120));
$phone = $stripNl($trunc($phone, 40));
$subjectKey = $stripNl($trunc($subjectKey, 80));

$allowedSubjects = [
  'stomatologia-dziecko' => 'Stomatologia dziecięca / pierwsza wizyta',
  'profilaktyka' => 'Profilaktyka / lakowanie / higiena dziecka',
  'chirurgia' => 'Chirurgia stomatologiczna',
  'gnatologia' => 'Gnatologia / ból żuchwy / TMJ',
  'ortodoncja' => 'Ortodoncja dziecko lub młodzież',
  'invisalign' => 'Invisalign',
  'inne' => 'Inne zapytanie',
];

$nameLen = function_exists('mb_strlen') ? mb_strlen($name, 'UTF-8') : strlen($name);
if ($name === '' || $nameLen < 3) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'message' => 'Podaj poprawne imię (min. 3 znaki).'], JSON_UNESCAPED_UNICODE);
  exit;
}

$digits = preg_replace('/\D+/', '', $phone);
if ($digits === '' || strlen($digits) < 9) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'message' => 'Podaj numer telefonu (min. 9 cyfr).'], JSON_UNESCAPED_UNICODE);
  exit;
}

if ($subjectKey === '' || !isset($allowedSubjects[$subjectKey])) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'message' => 'Wybierz cel wizyty z listy.'], JSON_UNESCAPED_UNICODE);
  exit;
}

$subjectLabel = $allowedSubjects[$subjectKey];

$readEnv = static function (string $key): string {
  $v = getenv($key);
  if (is_string($v) && trim($v) !== '') {
    return trim($v);
  }
  if (!empty($_SERVER[$key]) && is_string($_SERVER[$key]) && trim((string) $_SERVER[$key]) !== '') {
    return trim((string) $_SERVER[$key]);
  }
  if (function_exists('apache_getenv')) {
    $a = @apache_getenv($key);
    if (is_string($a) && trim($a) !== '') {
      return trim($a);
    }
  }
  return '';
};

$defaultRecipients = 'rejestracja@orthomedica-lubin.pl,szpadel@gmail.com';
$toRaw = $readEnv('CONTACT_MAIL_TO');
$explicitTo = $toRaw !== '';
if (!$explicitTo) {
  $toRaw = $defaultRecipients;
}
$toRaw = trim($stripNl($toRaw), " \t\"'");
$parts = preg_split('/[,;]+/', $toRaw, -1, PREG_SPLIT_NO_EMPTY) ?: [];
$toList = [];
foreach ($parts as $p) {
  $addr = trim((string) $p, " \t\"'");
  if ($addr === '') {
    continue;
  }
  if (filter_var($addr, FILTER_VALIDATE_EMAIL)) {
    $toList[] = $addr;
  }
}
if ($toList === []) {
  if ($explicitTo) {
    http_response_code(500);
    echo json_encode(
      [
        'ok' => false,
        'message' =>
          'Nieprawidłowy CONTACT_MAIL_TO. W .htaccess użyj dwóch adresów rozdzielonych przecinkiem (bez cudzysłowów wokół całej listy), np. SetEnv CONTACT_MAIL_TO rejestracja@orthomedica-lubin.pl,szpadel@gmail.com — albo usuń zmienną.',
      ],
      JSON_UNESCAPED_UNICODE
    );
    exit;
  }
  foreach (preg_split('/[,;]+/', $defaultRecipients, -1, PREG_SPLIT_NO_EMPTY) ?: [] as $p) {
    $addr = trim((string) $p);
    if (filter_var($addr, FILTER_VALIDATE_EMAIL)) {
      $toList[] = $addr;
    }
  }
}
if ($toList === []) {
  http_response_code(500);
  echo json_encode(['ok' => false, 'message' => 'Błąd konfiguracji serwera. Skontaktuj się telefonicznie.'], JSON_UNESCAPED_UNICODE);
  exit;
}
$to = implode(',', $toList);

$mailSubject = '[ORTHOMEDICA WWW] ' . $subjectLabel;
$bodyLines = [
  'Nowe zapytanie ze strony www.',
  '',
  'Imię: ' . $name,
  'Telefon: ' . $phone,
  'Cel wizyty: ' . $subjectLabel,
  '',
  '---',
  'IP: ' . ($stripNl($_SERVER['REMOTE_ADDR'] ?? '')),
  'Data: ' . gmdate('Y-m-d H:i:s') . ' UTC',
];
$body = implode("\r\n", $bodyLines);

$fromAddr = $readEnv('CONTACT_MAIL_FROM');
if ($fromAddr === '') {
  $fromAddr = 'noreply@orthomedica.lubin.pl';
}
$fromAddr = trim($stripNl($fromAddr), " \t\"'");
if (!filter_var($fromAddr, FILTER_VALIDATE_EMAIL)) {
  $fromAddr = $toList[0];
}

$headers = [
  'MIME-Version: 1.0',
  'Content-Type: text/plain; charset=UTF-8',
  'From: ORTHOMEDICA WWW <' . $fromAddr . '>',
  'Reply-To: ' . $fromAddr,
  'X-Mailer: PHP/' . PHP_VERSION,
];

$sent = @mail($to, '=?UTF-8?B?' . base64_encode($mailSubject) . '?=', $body, implode("\r\n", $headers), '-f' . $fromAddr);

if (!$sent) {
  http_response_code(500);
  echo json_encode(
    ['ok' => false, 'message' => 'Nie udało się wysłać wiadomości. Zadzwoń lub napisz na rejestracja@orthomedica-lubin.pl'],
    JSON_UNESCAPED_UNICODE
  );
  exit;
}

$_SESSION['contact_last'] = $now;

echo json_encode(['ok' => true, 'message' => 'Wiadomość została wysłana. Odezwiemy się niezwłocznie.'], JSON_UNESCAPED_UNICODE);
