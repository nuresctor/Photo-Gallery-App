CREATE OR REPLACE VIEW PhotosWithUsers AS
    SELECT P.photoId, U.userId
    FROM Photos P NATURAL JOIN Users U;

