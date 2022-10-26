const fs = require('fs');
const path = require('path');

const COLUMNS_ID = [1, 2, 3, 4];
const COLUMNS = {
  1: { id: 1, name: 'Apple', ticketIDs: [] },
  2: { id: 2, name: 'Samsung', ticketIDs: [] },
  3: { id: 3, name: 'Panasonic', ticketIDs: [] },
  4: { id: 4, name: 'Microsoft', ticketIDs: [] },
};

const ticketPath = path.join(__dirname, 'tickets.json');
const columnPath = path.join(__dirname, 'columns.json');

const IMAGE_PREFIX = 'assets/images';
const IMAGES = [1, 2, 3, 4, 5, 6, 7, 8];

(async () => {
  // process.exit();
  const data = fs.readFileSync(path.join(__dirname, 'raw.json'), 'utf8');

  console.log('Generating JSON');
  const items = JSON.parse(data);
  const filters = items.splice(0, 10);

  const tickets = {};
  for (const ticket of filters) {
    const { id } = ticket;
    const randomImage = IMAGES[Math.floor(Math.random() * IMAGES.length)];
    const columnID = COLUMNS_ID[Math.floor(Math.random() * COLUMNS_ID.length)];

    COLUMNS[columnID].ticketIDs.push(id);
    tickets[id] = { ...ticket, image: `${IMAGE_PREFIX}/${randomImage}.jpeg` };
  }

  console.log('Writing JSON files');
  fs.writeFileSync(ticketPath, JSON.stringify(tickets, null, 2));
  fs.writeFileSync(columnPath, JSON.stringify(COLUMNS, null, 2));
  console.info('Finish! Exiting...');
})();
