async function index(req, res, next) {
    try {   
            res.render('dashboard/index',{
                data: data,
                month: months[monthId - 1].name, 
            });
        } catch (err) {
        res.send("ERROR LOADING PAGE");
    }
}

module.exports = {
    index,
}