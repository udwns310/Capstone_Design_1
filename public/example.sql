--
-- Table structure for table `profile`
--

CREATE TABLE `profile` (
  `email` varchar(30) NOT NULL,
  `password` varchar(80) NOT NULL,
  `name` varchar(20) NOT NULL,
  `gender` int(1) NOT NULL,
  `phoneNum` varchar(20) NOT NULL,
  `stdId` int(8) NOT NULL,
  `nickname` varchar(20),
  `salt` varchar(80),
  PRIMARY KEY (`stdId`)
);

--
-- Dumping data for table `profile`
--

INSERT INTO `profile` VALUES ('test@test.com','Xsc+HAlHasoKQy/Ct5EdOU5gFnaOT3PUdPFc1Qn6g9pYby1emDhvp83oWSFlxr9I5x4YNNkVpMpX3FUJzeRYdA==','test',0,'010-1234-5678', '20231111', 'testNick', "OlHm8Do1/0Oj8mrtpgVIyO6XTl0X0V6JQtUlzyONNx3SyY32B648B95t6UxS8ki+Tax7BkidTMp66tlpxbtGYA==");
