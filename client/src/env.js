
let user = JSON.parse( localStorage.getItem('token') );

module.exports = {
    secret: "secret",
    config: {
        headers: { Authorization: `Bearer ${ user !== null ? user.token : null }` }
    },
    api_uri: "https://morning-forest-31355.herokuapp.com"
};