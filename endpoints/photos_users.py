from silence.decorators import endpoint
@endpoint(
    route="/photos_users",
    method="GET",
    description="Tabla relacion fotos-usuarios",
    sql="SELECT * FROM PhotosWithUsers"
)
def get_all():
    pass

###############################################################################

@endpoint(
    route="/photos_users/$userId",
    method="GET",
    description="Para un usuario, las fotos que ha subido",
    sql="SELECT * FROM PhotosWithUsers P WHERE P.userId = $userId"
)
def get_by_id():
    pass
