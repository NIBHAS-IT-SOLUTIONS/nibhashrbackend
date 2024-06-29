const nibhas = require("../models/servicemodel");




module.exports = {

    service:  async (req, res) => {
                
                const { from_name, frommail, phone, message, service } = req.body.data;
                const servicedata = new nibhas({
                name: from_name,
                email: frommail,
                phone: parseInt(phone),
                message: message,
                service: service,
                });
                try {
                const addeddata = await servicedata.save();
                res.json(addeddata);
                } catch (err) {
                console.log(err);
                }
            }
};
