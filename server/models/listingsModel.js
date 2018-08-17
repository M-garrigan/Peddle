const db = require('../../db/index.js').pool;


module.exports = {
  getItems: (query) => {
    console.log(query);
    return db.connect()
      .then(client => {
        return client.query(
          `SELECT listing.*, category.category, array_agg(image_url) AS images
          FROM listing INNER JOIN category ON listing.id_category = category.id_category 
          FULL JOIN listing_image ON listing.id_listing = listing_image.id_listing 
          WHERE title LIKE '%${query}%' OR description LIKE '%${query}%' OR category LIKE '%${query}%'
          GROUP BY listing.id_listing, category.category`)
          .then(res => {
            client.release();
            
            return res.rows;
          })
          .catch(e => {
            client.release();
            console.log('[model] error fetching listing: ', e);
          })
      })
      .catch(e => {
        console.error('[model] error getting pool connection: ', e);
      });
  },
  getListingById: (id) => {
    return db.connect()
      .then(client => {
        return client.query(`SELECT * FROM listing WHERE id_listing=${id}`)
          .then(res => {
            client.release();
            return res.rows;
          })
          .catch(e => {
            client.release();
            console.log('[model] error fetching listing by id: ', e);
          })
      })
      .catch(e => {
        console.error('[model] error getting pool connection', e);
      });
  }
};