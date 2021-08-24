CREATE OR REPLACE VIEW PhotosWithUsers AS
    SELECT P.photoId, U.userId
    FROM Photos P NATURAL JOIN Users U;

CREATE OR REPLACE VIEW Valorations AS
    SELECT P.photoId, U.userId, R.value
    FROM Photos P NATURAL JOIN Users U NATURAL JOIN Ratings R;

CREATE OR REPLACE VIEW Fallos AS
   SELECT U.userId, COUNT(*) AS NUM FROM users U NATURAL JOIN photos P GROUP BY U.userId;


