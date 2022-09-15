module.exports = (sequelize, Type) => {
    const Users = sequelize.define('users', {
        id: {
            type: Type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: { type: Type.STRING},
        email:{ type: Type.STRING},
        password:{ type: Type.STRING(150)}
    })
    return Users;
}