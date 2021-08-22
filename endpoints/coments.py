from silence.decorators import endpoint

@endpoint(
    route="/coments",
    method="POST",
    sql="INSERT INTO Coments (texto, userId, photoId) VALUES ($texto, $userId, $photoId)",
    description="Nuevo comentario",
    auth_required=True,
)
def create(texto, userId, photoId):
    pass
