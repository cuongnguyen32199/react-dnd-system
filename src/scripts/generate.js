const fs = require('fs');
const path = require('path');

const COLUMNS_ID = [1, 2, 3, 4];
const COLUMNS = {
  1: { id: 1, name: 'Apple', ticketIDs: [] },
  2: { id: 2, name: 'Samsung', ticketIDs: [] },
  3: { id: 3, name: 'Panasonic', ticketIDs: [] },
  4: { id: 4, name: 'Microsoft', ticketIDs: [] },
};
const TICKETS = fs.readFileSync(path.join(__dirname, 'raw.json'), 'utf8');

const tickets = path.join(__dirname, 'tickets.json');
const columns = path.join(__dirname, 'columns.json');

const IMAGE_PREFIX = '/assets/images';
const IMAGES = [1, 2, 3, 4, 5, 6, 7, 8];

(async () => {
  process.exit();
  console.log('Generating JSON');
  const items = JSON.parse(TICKETS);
  const normalize = {};
  for (const ticket of items) {
    const { id } = ticket;
    const random = IMAGES[Math.floor(Math.random() * IMAGES.length)];
    const columnID = COLUMNS_ID[Math.floor(Math.random() * COLUMNS_ID.length)];

    COLUMNS[columnID].ticketIDs.push(id);
    normalize[id] = { ...ticket, image: `${IMAGE_PREFIX}/${random}.jpeg` };
  }

  console.log('Writing JSON into files');
  fs.writeFileSync(tickets, JSON.stringify(normalize, null, 2));
  fs.writeFileSync(columns, JSON.stringify(COLUMNS, null, 2));
  console.info('Finish! Exiting...');
})();
