const db = require('../../config/mysql');
const {
    logger
} = require('../utils/logger');


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

const getLoginInfo = async (email) => {
    try {
        const result = await promisifiedQuery(
            `SELECT * FROM login where email='${email}' AND deleted_at is NULL;`
        )
        return {
            status: true,
            result: result
        };
    } catch (error) {
        logger.error(`Login Info Error:  ${error}`);
        return {
            status: false,
            error: error
        };
    }
}

module.exports = {
    getLoginInfo,
}