from silence.decorators import endpoint

@endpoint(
    route="/coments",
    method="POST",
    sql="INSERT INTO Coments (texto, userId) VALUES ($texto, $userId)",
    description="Nuevo comentario",
    auth_required=True,
)
def create(texto, userId):
    pass
