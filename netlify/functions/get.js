const { BigQuery } = require('@google-cloud/bigquery');

const bigquery = new BigQuery({
    credentials: JSON.parse(process.env.BIGQUERY_CREDENTIALS),
});

const projectId = 'my-vue-app-435611';
const datasetId = 'Alifmart';
const tableId = 'Con';

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
