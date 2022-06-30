const db = require('../../config/mysql');

const promisifiedQuery = (options) => {
    return new Promise((resolve, reject) => {
        db.query(options, function (error, result) {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

const getUserInfo = async (email) => {
    try {
        const result = await promisifiedQuery(
            `SELECT * FROM user where email='${email}' AND deleted_at is NULL;`
        )
        return {
            status: true,
            result: result
        };
    } catch (error) {
        console.log("User Info Fetch Error: ", error);
        return {
            status: false,
            error: error
        };
    }
}

const userRegistration = async (fullname, email, password) => {
    db.beginTransaction();
    try {
        let userInsertResult, loginInsertResult;
        userInsertResult = await promisifiedQuery(
            `INSERT INTO user (name,email) VALUES ('${fullname}', '${email}');`
        )
        if (!userInsertResult.insertId) {
            db.rollback();
            return {
                status: false,
            }
        }
        const userInfo = await getUserInfo(email);
        if (userInfo.status) {
            loginInsertResult = await promisifiedQuery(
                `INSERT INTO login (user_id,email,password) VALUES (${userInfo.result[0].id}, '${email}','${password}');`
            )
        }
        if (!loginInsertResult.insertId) {
            db.rollback();
            return {
                status: false,
            }
        }
        await db.commit();
        return {
            status: true
        }
    } catch (error) {
        db.rollback();
        console.log("User Registration Error: ", error);
        return {
            status: false,
            error: error
        }
    }
}

module.exports = {
    getUserInfo,
    userRegistration,
}