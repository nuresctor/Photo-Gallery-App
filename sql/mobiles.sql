CREATE OR REPLACE TABLE Mobiles (
  mobileId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  model VARCHAR(128) NOT NULL,
  system varchar(128) NOT NULL,
  releaseDate DATE DEFAULT NULL,
  photoURL VARCHAR(1024) 
);

DELETE FROM Mobiles;
INSERT INTO Mobiles VALUES
    (1, 'iPhone 12 Pro Max', 'iPhone OS', '2020-11-13', 'https://media.revistagq.com/photos/5fa9344a6484a93e065fb46d/master/pass/Apple_iphone12mini-iphone12max-homepodmini-availability_iphone12promax-geo_110520.jpg'),
    (2, 'iPhone 13 Pro Max', 'iPhone OS', '2021-04-21', 'https://media.revistagq.com/photos/5fc60aeebe088082688e9830/3:2/w_1854,h_1236,c_limit/Captura%20de%20pantalla%202020-12-01%20a%20las%2010.20.34.png'),
    (3, 'Samsung Galaxy Z Fold3 5G', 'Android', '2021-08-27', 'https://assets.mmsrg.com/isr/166325/c1/-/ASSET_MMS_86424532/fee_786_587_png'),
    (4, 'Samsung Galaxy Z Flip 3 5G', 'Android', '2021-08-27', 'https://i.blogs.es/a2aa8a/samsung-galaxy-z-flip3-01/1366_2000.jpg'),
    (5, 'HTC Dream', 'Android', '2008-10-22', 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/T-Mobile_G1_launch_event_2.jpg/245px-T-Mobile_G1_launch_event_2.jpg'),
    (6, 'iPhone 1', 'iPhone OS', '2007-06-29', 'https://i.ebayimg.com/images/g/-ywAAOSwcZ1cR8fD/s-l500.jpg');
    