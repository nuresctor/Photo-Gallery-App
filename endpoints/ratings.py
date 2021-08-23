from silence.decorators import endpoint

@endpoint(
    route="/ratings",
    method="GET",
    sql="SELECT * FROM Ratings",
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/ratings/$photoId",
    method="GET",
    sql="SELECT AVG(value)avgrating FROM Ratings WHERE photoId = $photoId",
)
def get_by_id():
    pass

###############################################################################

@endpoint(
    route="/ratings",
    method="POST",
    sql="INSERT INTO Ratings (date, value, userId, photoId) VALUES ($date, $value, $userId, $photoId)",
    auth_required=True,
)
def add(date, value, userId, photoId):
    pass

