const fs = require('fs');
const path = require('path');

const COLUMNS_ID = [1, 2, 3, 4];
const COLUMNS = {
  1: { id: 1, name: 'Apple', ticketIDs: [] },
  2: { id: 2, name: 'Samsung', ticketIDs: [] },
  3: { id: 3, name: 'Panasonic', ticketIDs: [] },
  4: { id: 4, name: 'Microsoft', ticketIDs: [] },
};

const IMAGE_PREFIX = 'assets/images';
const IMAGES = [1, 2, 3, 4, 5, 6, 7, 8];

(async () => {
  const data = fs.readFileSync(path.join(__dirname, 'raw.json'), 'utf8');

  console.log('Generating JSON');
  const items = JSON.parse(data);
  const filters = items.splice(0, 20);

  const tickets = {};
  for (const ticket of filters) {
    const { id } = ticket;
    const randomImage = IMAGES[Math.floor(Math.random() * IMAGES.length)];
    const columnID = COLUMNS_ID[Math.floor(Math.random() * COLUMNS_ID.length)];

    COLUMNS[columnID].ticketIDs.push(id);
    tickets[id] = { ...ticket, image: `${IMAGE_PREFIX}/${randomImage}.jpeg` };
  }

  const state = { columnsOrder: COLUMNS_ID, tickets, columns: COLUMNS };

  console.log('Writing JSON files');
  fs.writeFileSync(path.join(__dirname, 'state.json'), JSON.stringify(state, null, 2));
  console.info('Finish! Exiting...');
})();
