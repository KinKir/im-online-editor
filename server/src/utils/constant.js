module.exports = {
    SQL: {
        host: 'localhost',
        user: 'root',
        password: '123456',
        name: 'im_user',
        tables: [
            {
                name: 'registry',
                fields: [
                    'id',
                    'user_name',
                    'user_pw'
                ]
            }
        ]
    }
};