from silence.decorators import endpoint

@endpoint(
    route="/coments",
    method="POST",
    sql="INSERT INTO Coments (value, userId, photoId) VALUES ($value, $userId, $photoId)",
    description="Nuevo comentario",
    auth_required=True,
)
def create(value, userId, photoId):
    pass

@endpoint(
    route="/coments",
    method="GET",
    sql="SELECT * FROM Coments",
)
def get_all():
    pass

@endpoint(
    route="/coments/$photoId",
    method="GET",
    sql="SELECT * FROM Coments WHERE photoId = $photoId",
)
def get_by_id():
    pass
