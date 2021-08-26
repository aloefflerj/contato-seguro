-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 26, 2021 at 06:14 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `contato_seguro_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(40) NOT NULL,
  `mail` varchar(70) NOT NULL,
  `phone` varchar(22) DEFAULT NULL,
  `birth` varchar(10) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `mail`, `phone`, `birth`, `city`, `created_at`, `updated_at`) VALUES
(7, 'Henrique Fogaça', 'henrique.fogaca', '321321321', '1974', 'São Paulo', '2021-08-25 23:09:14', '2021-08-25 23:09:14'),
(8, 'Paola Carosella', 'paolla.carosella.j@gmail.com', '(51)99999-9999', '30/10/1972', 'Buenos Aires', '2021-08-25 23:10:27', '2021-08-25 23:10:27'),
(9, 'Érick Jacquin', 'erick.jacquin@gmail.com', '(51)88888-8888', '09/12/1964', 'Saint-Amand-Montrond', '2021-08-25 23:11:22', '2021-08-25 23:11:22'),
(28, 'Érick Jacquin', 'erick.jacquin@gmail.com', '(51)88888-8888', '09/12/1964', 'Saint-Amand-Montrond', '2021-08-26 00:56:09', '2021-08-26 01:05:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
