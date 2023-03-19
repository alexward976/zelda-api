const validator = require('../helpers/validate');

const saveEquipment = (req, res, next) => {
    const validationRule = {
        name: 'required|string',
        games: 'required|array',
        locations: 'required|array'
    }

    validator(req.body, validationRule, {}, (err, status) => {
        if(!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    })
}

module.exports = { saveEquipment };