CREATE OR REPLACE VIEW PhotosWithUsers AS
    SELECT P.photoId, U.userId
    FROM Photos P NATURAL JOIN Users U;

CREATE OR REPLACE VIEW Valorations AS
    SELECT P.photoId, U.userId, R.value
    FROM Photos P NATURAL JOIN Users U NATURAL JOIN Ratings R;


