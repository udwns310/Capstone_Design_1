--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `email` varchar(30) NOT NULL,
  `password` varchar(200) NOT NULL,
  `name` varchar(20) NOT NULL,
  `gender` int(1) NOT NULL,
  `phoneNum` varchar(20) NOT NULL,
  `stdId` varchar(10) NOT NULL,
  `nickname` varchar(20),
  `salt` varchar(200),
  PRIMARY KEY (`stdId`)
);

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` VALUES ('test@test.com', 'Xsc+HAlHasoKQy/Ct5EdOU5gFnaOT3PUdPFc1Qn6g9pYby1emDhvp83oWSFlxr9I5x4YNNkVpMpX3FUJzeRYdA==', 'test', 0, '010-1234-5678', '20231111', 'testNick', 'OlHm8Do1/0Oj8mrtpgVIyO6XTl0X0V6JQtUlzyONNx3SyY32B648B95t6UxS8ki+Tax7BkidTMp66tlpxbtGYA==');

--password = qwer


--
-- Table structure for table `chatlist`
--

CREATE TABLE `chatlist` (
  `origin` varchar(30) NOT NULL,
  `destination` varchar(30) NOT NULL,
  `date` DATETIME NOT NULL,
  `count` int NOT NULL,
  `user` varchar(10) NOT NULL,
  `emergency` int NOT NULL,
  PRIMARY KEY (`user`)
);

--
-- Dumping data for table `chatlist`
--

INSERT INTO `chatlist` VALUES ('동의대역', '자대로터리', '2023-11-26 13:00', 3, '20231111', 1),
('가야1치안', '수덕전', '2023-11-26 13:10', 2, '20231234', 0),
('가야1치안', '행복기숙사', '2023-11-26 12:55', 1, '22222222', 0),
('동의대역', '본관', '2023-11-26 13:05', 1, '22222343', 0);