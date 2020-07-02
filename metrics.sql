-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 03, 2020 at 12:21 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.3.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `business_metrics`
--

-- --------------------------------------------------------

--
-- Table structure for table `metrics`
--

CREATE TABLE `metrics` (
  `service_name` varchar(8) DEFAULT NULL,
  `closed_bugs_count` int(8) DEFAULT NULL,
  `open_bugs_count` int(8) DEFAULT NULL,
  `closed_issues_count` int(8) DEFAULT NULL,
  `open_issues_count` int(88) DEFAULT NULL,
  `revenue` float DEFAULT NULL,
  `cost` float DEFAULT NULL,
  `effort` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `metrics`
--

INSERT INTO `metrics` (`service_name`, `closed_bugs_count`, `open_bugs_count`, `closed_issues_count`, `open_issues_count`, `revenue`, `cost`, `effort`) VALUES
('customer', 23, 12, 50, 10, 1200.4, 600, 200),
('driver', 53, 12, 55, 12, 12444.4, 4600, 100),
('frontend', 60, 8, 300, 100, 20000, 90, 50),
('route', 100, 80, 90, 200, 200, 10090, 400),
('redis', 500, 80, 190, 20, 20000, 10090, 250),
('mysql', 53, 12, 55, 12, 12444.4, 4600, 100);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
