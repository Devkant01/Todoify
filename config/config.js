module.exports = {
    db_connection: process.env.DATABASE, //replace with your_mongodb_connection_string
    jwt_secret_key: process.env.JWT_SECRET_KEY, 
    session_secret: process.env.SESSION_SECRET
}