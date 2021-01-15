-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 16, 2020 at 04:35 PM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `api`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(30) NOT NULL,
  `description` varchar(255) NOT NULL,
  `brand` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `description`, `brand`) VALUES
(1, 'Football', 'Adidas'),
(2, 'Basketball', 'Spalding'),
(3, 'HockeyPuck', 'Franklin'),
(4, 'TennisBall', 'Dunlop'),
(5, 'Basketball', 'Nike'),
(6, 'Football', 'Nike'),
(7, 'HockeyPuck', 'Franklin'),
(8, 'Football', 'Nike'),
(9, 'Basketball', 'Nike'),
(10, 'Basketball', 'Spalding'),
(11, 'HockeyPuck', 'TRON'),
(12, 'TennisBall', 'Prince'),
(13, 'Football', 'Puma'),
(14, 'Football', 'Mitre'),
(15, 'HockeyPuck', 'Franklin'),
(16, 'TennisBall', 'Prince'),
(17, 'Football', 'Nike'),
(18, 'Football', 'Nike'),
(19, 'Football', 'Adidas'),
(20, 'Football', 'Mitre'),
(21, 'Basketball', 'Wilson'),
(22, 'Basketball', 'Nike'),
(23, 'Football', 'Nike'),
(24, 'HockeyPuck', 'TRON'),
(25, 'HockeyPuck', 'TRON'),
(26, 'TennisBall', 'Dunlop'),
(27, 'Football', 'Adidas'),
(28, 'Fotball', 'Umbro'),
(29, 'Basketball', 'Spalding'),
(30, 'TennisBall', 'Dunlop');

-- --------------------------------------------------------

--
-- Table structure for table `sales_fact`
--

CREATE TABLE `sales_fact` (
  `storeID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `sales` int(11) NOT NULL,
  `cost` int(11) NOT NULL,
  `profit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sales_fact`
--

INSERT INTO `sales_fact` (`storeID`, `productID`, `sales`, `cost`, `profit`) VALUES
(1, 5, 48, 31, 17),
(1, 3, 50, 32, 18),
(2, 1, 31, 20, 11),
(3, 5, 48, 31, 17),
(5, 6, 37, 24, 13),
(5, 12, 35, 22, 13),
(4, 30, 28, 18, 10),
(2, 29, 39, 25, 14),
(12, 21, 42, 27, 15),
(4, 30, 28, 18, 10),
(23, 15, 60, 38, 22),
(13, 13, 55, 35, 20),
(19, 12, 35, 22, 13),
(21, 18, 34, 22, 12),
(18, 5, 48, 31, 17),
(11, 3, 50, 32, 18),
(8, 9, 76, 49, 27),
(9, 6, 37, 24, 13),
(1, 12, 35, 22, 13),
(3, 13, 55, 35, 20),
(8, 11, 15, 10, 5),
(3, 19, 39, 25, 14),
(4, 24, 50, 32, 18),
(25, 24, 50, 32, 18),
(22, 12, 35, 22, 13),
(30, 8, 21, 13, 8),
(15, 6, 37, 24, 13),
(21, 3, 50, 32, 18),
(14, 14, 27, 17, 10),
(15, 19, 39, 25, 14);

-- --------------------------------------------------------

--
-- Table structure for table `store`
--

CREATE TABLE `store` (
  `id` int(30) NOT NULL,
  `city` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `store`
--

INSERT INTO `store` (`id`, `city`) VALUES
(1, 'Emmen'),
(2, 'Groningen'),
(3, 'Coevorden'),
(4, 'Ter Apel'),
(5, 'Amsterdam'),
(6, 'Den Haag'),
(7, 'Meppel'),
(8, 'Zwolle'),
(9, 'Veendam'),
(10, 'Venlo'),
(11, 'Utrecht'),
(12, 'Eindhoven'),
(13, 'Heerenveen'),
(14, 'Heerenveen'),
(15, 'Leeuwarden'),
(16, 'Amsterdam'),
(17, 'Groningen'),
(18, 'Emmen'),
(19, 'Groningen'),
(20, 'Den Haag'),
(21, 'Amsterdam'),
(22, 'Meppel'),
(23, 'Den Haag'),
(24, 'Venlo'),
(25, 'Utrecht'),
(26, 'Eindhoven'),
(27, 'Heerenveen'),
(28, 'Groningen'),
(29, 'Amsterdam'),
(30, 'Zwolle');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sales_fact`
--
ALTER TABLE `sales_fact`
  ADD KEY `fk_product_store` (`storeID`),
  ADD KEY `productID` (`productID`);

--
-- Indexes for table `store`
--
ALTER TABLE `store`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `store`
--
ALTER TABLE `store`
  MODIFY `id` int(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sales_fact`
--
ALTER TABLE `sales_fact`
  ADD CONSTRAINT `fk_product_store` FOREIGN KEY (`storeID`) REFERENCES `store` (`id`),
  ADD CONSTRAINT `sales_fact_ibfk_1` FOREIGN KEY (`productID`) REFERENCES `product` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
