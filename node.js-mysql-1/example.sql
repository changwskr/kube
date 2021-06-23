
-------------------------------------------------------------------
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=roian mysql:5.6

guru@docker-ubuntu:~/node.js-sql$ docker ps -a | grep mysql
84837c30b9dc   mysql:5.6                "docker-entrypoint.s…"   17 minutes ago   Created                                                                       charming_galileo
9118e07af8d6   mysql:5.6                "docker-entrypoint.s…"   17 minutes ago   Up 17 minutes                 0.0.0.0:9876->3306/tcp, :::9876->3306/tcp       quirky_swirles

guru@docker-ubuntu:~/node.js-sql$ docker exec -it 9118e07af8d6 /bin/bash
-------------------------------------------------------------------
root@9118e07af8d6:/# mysql -u root -p
(roian)

mysql> CREATE DATABASE opentutorials;
Query OK, 1 row affected (0.00 sec)

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| opentutorials      |
| performance_schema |
| test               |
+--------------------+
mysql> use opentutorials

--
-- Table structure for table `author`
--


CREATE TABLE `author` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `profile` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
 
--
-- Dumping data for table `author`
--
 
INSERT INTO `author` VALUES (1,'egoing','developer');
INSERT INTO `author` VALUES (2,'duru','database administrator');
INSERT INTO `author` VALUES (3,'taeho','data scientist, developer');
 
--
-- Table structure for table `topic`
--
 





mysql> 


+-------------------------+
| Tables_in_opentutorials |
+-------------------------+
| author                  |
| topic                   |
+-------------------------+
2 rows in set (0.00 sec)

mysql> select * from topic;
+----+------------+-------------------+---------------------+-----------+
| id | title      | description       | created             | author_id |
+----+------------+-------------------+---------------------+-----------+
|  1 | MySQL      | MySQL is...       | 2018-01-01 12:10:11 |         1 |
|  2 | Oracle     | Oracle is ...     | 2018-01-03 13:01:10 |         1 |
