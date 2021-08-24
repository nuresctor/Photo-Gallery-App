DROP TABLE IF EXISTS Coments;
DROP TABLE IF EXISTS Ratings;
DROP TABLE IF EXISTS BadWords;
DROP TABLE IF EXISTS Photos;
DROP TABLE IF EXISTS Users;

CREATE TABLE Users (
	userId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	firstName VARCHAR(128) NOT NULL,
	lastName VARCHAR(128) NOT NULL,
	telephone VARCHAR(32) NOT NULL,
	email VARCHAR(128) UNIQUE NOT NULL,
	username VARCHAR(64) UNIQUE NOT NULL,
	password VARCHAR(256) NOT NULL,
	avatarUrl VARCHAR(512)
);

CREATE TABLE Photos (
	photoId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(128) NOT NULL,
	description VARCHAR(512) NOT NULL,
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	url VARCHAR(512) NOT NULL,
	visibility VARCHAR(16) NOT NULL,
	userId INT NOT NULL,
	FOREIGN KEY (userId) REFERENCES Users (userId),
	CONSTRAINT ValidVisibility CHECK (visibility in ('Public', 'Private'))
);

-- Create the rest of your tables...

CREATE TABLE BadWords (
	badWordId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	palabra VARCHAR(16) NOT NULL
);

CREATE TABLE Ratings(
	ratingId INT NOT NULL AUTO_INCREMENT,
	userId INT NOT NULL,
	photoId INT NOT NULL,
	date DATE,
	value INT,
	PRIMARY KEY (ratingId),
	FOREIGN KEY (userId) REFERENCES Users (userId),
	FOREIGN KEY (photoId) REFERENCES Photos (photoId) ON DELETE CASCADE,
	CONSTRAINT invalidValue CHECK (value >= 1 AND value <= 5)
);

CREATE TABLE Coments(
	comentId INT NOT NULL AUTO_INCREMENT,
	userId INT NOT NULL,
	photoId INT NOT NULL,
	value VARCHAR(100),
	date DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (comentId),
	FOREIGN KEY (userId) REFERENCES Users (userId),
	FOREIGN KEY (photoId) REFERENCES Photos (photoId) ON DELETE CASCADE
);


