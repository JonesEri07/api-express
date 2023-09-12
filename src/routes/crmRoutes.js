const routes =  (app) => {
    app.route('/contact')
    .get((req, res) => {
        res.send('contact get');
    })
    .post((req, res) => {
        res.send('contact post');
    });

    app.route('/contact/:contactId')
    .put((req, res) => {
        res.send(`contact put, ${req.params.contactId}`);
    })
    .delete((req, res) => {
        res.send('contact delete');
    });
}

export default routes;