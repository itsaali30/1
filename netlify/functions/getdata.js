const { BigQuery } = require('@google-cloud/bigquery');

// Check if the environment variable is set
if (!process.env.GOOGLE_CREDENTIALS) {
    console.error('GOOGLE_CREDENTIALS environment variable is not set');
    process.exit(1);
}

let credentials;
try {
    // Parse the credentials directly from the environment variable
    credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
} catch (error) {
    console.error('Error parsing GOOGLE_CREDENTIALS:', error);
    process.exit(1);
}

const bigquery = new BigQuery({
    credentials,
});

const projectId = 'my-vue-app-435611'; // Replace with your project ID
const datasetId = 'Alifmart';           // Replace with your dataset ID
const tableId = 'Con';                   // Replace with your table ID

exports.handler = async (event) => {
    try {
        const query = `SELECT * FROM \`${projectId}.${datasetId}.${tableId}\``;
        console.log('Running query:', query);
        const options = {
            query: query,
            location: 'US',
        };

        const [rows] = await bigquery.query(options);
        return {
            statusCode: 200,
            body: JSON.stringify(rows),
        };
    } catch (error) {
        console.error('Error fetching data from BigQuery:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
