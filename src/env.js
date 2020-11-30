
let user = JSON.parse( localStorage.getItem('token') );

module.exports = {
    secret: "secret",
    config: {
        headers: { Authorization: `Bearer ${ user !== null ? user.token : null }` }
    },
    api_uri: "http://localhost:8000"
};