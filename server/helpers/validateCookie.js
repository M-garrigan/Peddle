const { release } = require('os');
const Cookies = require('universal-cookie');
const db = require('../../db/index.js').pool;

let cookie = new Cookies();

// returns a boolean
let isCookieValid = (token, token_timestamp, callback) => {
  
  // lookup the cookie on db
  db.connect((err, res) => {
    if (err) {
      console.error(err); 
      release();
    } else {
      let text = 'SELECT token, token_timestamp FROM users WHERE token = $1';
      let value = [token];

      db.query(text, value)
        .then(res => {
          
          if (res.rows.length !== 0) {
            let dbtoken = res.rows[0].token;
            let dbtoken_timestamp = res.rows[0].token_timestamp;
            
            let result = (
              JSON.stringify(dbtoken) === JSON.stringify(token) &&
              JSON.stringify(dbtoken_timestamp) === JSON.stringify(token_timestamp));
            
            release();  
            console.log('COOKIEVALIDATE: ', result);
            callback(null, result);
          }
        })
        .catch(err => callback(err));
    }
  });        
};

module.exports = isCookieValid;