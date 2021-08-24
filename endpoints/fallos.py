from silence.decorators import endpoint
@endpoint(
    route="/fallos",
    method="GET",
    description="Tabla relacion",
    sql="SELECT * FROM Fallos"
)
def get_all():
    pass