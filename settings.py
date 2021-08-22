###############################################################################
# Project-specific settings
###############################################################################

# Shows debug messages while Silence is running
DEBUG_ENABLED = False

# Database connection details
DB_CONN = {
    "host": "127.0.0.1",
    "port": 3306,
    "username": "root",
    "password": "nuresctor",
    "database": "pf",
}

# The sequence of SQL scripts located in the sql/ folder that must
# be ran when the 'silence createdb' command is issued
SQL_SCRIPTS = [
    # Reference your sql files here, e.g. "create_tables.sql"
    "create_tables.sql",
    "create_views.sql",
    "populate_database.sql",
    "create_triggers.sql"
]

# The port in which the API and the web server will be deployed
HTTP_PORT = 8080

# The URL prefix for all API endpoints
API_PREFIX = "/api/v1"

# Table and fields that are used for both login and register
# Uncomment this and set up your own table and columns:

#USER_AUTH_DATA = {
#    "table": "Employees",
#    "identifier": "email",
#    "password": "password",
#}

# A random string that is used for security purposes
# (this has been generated automatically upon project creation)
SECRET_KEY = "9QF6idwywp2v7TN1GqLpt-OuCogOF9ayrVB_mxM8Vss"
