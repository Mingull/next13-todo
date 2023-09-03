-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 06 aug 2023 om 18:24
-- Serverversie: 10.4.24-MariaDB
-- PHP-versie: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todo_app`
--

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified`, `image`, `role`) VALUES
('clky6muvz0000t2tc81s7vuov', 'niels plug', 'niels.plug9@gmail.com', NULL, 'https://lh3.googleusercontent.com/a/AAcHTtdrWd-uix-gBQqCfmaTN41gH2sAq-2qIdiMI1MQHyfM118=s96-c', 'ADMIN'),
('clky6nata0003t2tc5qnhugso', 'Mingull', 'nielsplug@outlook.com', NULL, 'https://avatars.githubusercontent.com/u/60094450?v=4', 'USER');

--
-- Gegevens worden geëxporteerd voor tabel `accounts`
--

INSERT INTO `accounts` (`id`, `user_id`, `type`, `provider`, `provider_account_id`, `refresh_token`, `access_token`, `expires_at`, `token_type`, `scope`, `token_id`, `session_state`) VALUES
('clky6muwc0002t2tcidhpbnm7', 'clky6muvz0000t2tc81s7vuov', 'oauth', 'google', '111062487773756064382', NULL, 'ya29.a0AfB_byDERi0b1wceRWeh6YENb7076Cw6OoeqPx9-scbT7Em5YhuW3HYjXWqLQP5UrsnfdPdhpPMN1MOXXSuvEgOU8Kw4yG-4Yj76EbLTx1T8ANk7_wHnOqLiro5Ivgk-I2JGG3bU1iSucWI6orCoykCe9QJa0AaCgYKAWASARMSFQHsvYlssarDW7mvP-VygKBL6aV0Yg0165', 1691253683, 'Bearer', 'https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email', 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImZkNDhhNzUxMzhkOWQ0OGYwYWE2MzVlZjU2OWM0ZTE5NmY3YWU4ZDYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI3NjE5MjY4NzYxMTItMTBkN21mYWdwOTIxcWxrZHJnOG5pZm9paWlsMXRsZnIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI3NjE5MjY4NzYxMTItMTBkN21mYWdwOTIxcWxrZHJnOG5pZm9paWlsMXRsZnIuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTEwNjI0ODc3NzM3NTYwNjQzODIiLCJlbWFpbCI6Im5pZWxzLnBsdWc5QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoicHBtN1dENDhOVE42MEYwUjZBVDNUZyIsIm5hbWUiOiJuaWVscyBwbHVnIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBY0hUdGRyV2QtdWl4LWdCUXFDZm1hVE40MWdIMnNBcS0ycUlkaU1JMU1RSHlmTTExOD1zOTYtYyIsImdpdmVuX25hbWUiOiJuaWVscyIsImZhbWlseV9uYW1lIjoicGx1ZyIsImxvY2FsZSI6Im5sIiwiaWF0IjoxNjkxMjUwMDgzLCJleHAiOjE2OTEyNTM2ODN9.Iix2Z-zMUNXUapBcgyFZafAWIDyJXqmLb38qH26hl5PSzVYq3wgAZK6DatDCBm6oXAm9fJNXdBTOoRK7pX0FSFJYbikj7l45xUpmaeo5qpvX0B57HaKU7KkVD4QJpYf0jccK2PfapfFWn1xGdald4sefjIDhVw6JHXCp20Ur_J3YhPETYbvFvxxZJpQSTSd9gVqqnsR5qFyX2CJV5Imfr3joaDOqviGZGvtU-2oK-1gBxlImllkbCalYWfdAICPeY91WjIXckBWn-KbocMeGCWyBdkZtvybS6iXZT1-QYWc3TCX1LNWpdESsvzqX7o1GdtklVG0ZldvXh1Ff9DHgJw', NULL),
('clky6natk0005t2tcc0p3uzr2', 'clky6nata0003t2tc5qnhugso', 'oauth', 'github', '60094450', NULL, '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', NULL, 'bearer', 'read:user,user:email', NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
