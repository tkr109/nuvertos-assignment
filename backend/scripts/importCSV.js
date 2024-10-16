const fs = require('fs');
const csv = require('csv-parser');
const Compound = require('../models/Compound');  // Ensure the correct path to your model

// Path to your CSV file
const csvFilePath = './compounds.csv';

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', async (row) => {
    try {
      // Insert the data into the MySQL database using Sequelize
      await Compound.create({
        id: row.id,  // Ensure the correct ID field
        CompoundName: row.CompoundName,
        CompounrDescription: row.CompounrDescription,
        strImageSource: row.strImageSource,
        strImageAttribution: row.strImageAttribution,
        dateModified: row.dateModified
      });
      console.log(`Inserted compound: ${row.CompoundName}`);
    } catch (err) {
      console.error('Error inserting data:', err);
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed.');
  })
  .on('error', (err) => {
    console.error('Error reading CSV file:', err);
  });
