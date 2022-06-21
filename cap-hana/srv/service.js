const cds = require('@sap/cds');
const { BlobServiceClient } = require("@azure/storage-blob");

module.exports = srv => {

    srv.on('UPDATE', 'Functions', async (req, next) => {
        const cfenv = require('cfenv').getAppEnv();
        const credentials = cfenv.isLocal ? require('../db/credentials.json') : cfenv.getService('azure-blob-storage').credentials;
        const content = req.data.content;

        const blobServiceClient = BlobServiceClient.fromConnectionString(credentials.stringConnection);
        const containerName = credentials.containerName;
        const containerClient = blobServiceClient.getContainerClient(containerName);
        const blockBlobClient = containerClient.getBlockBlobClient(req.data.fileName);

        if (content) {

            await blockBlobClient.upload(content, content.length);

        } else {

            await blockBlobClient.deleteIfExists();

        }

        return next();

    });

    srv.after("UPDATE", 'Functions', async (data) => {
        selectedID = data.ID;
        selectedContent = data.content;

        if (selectedContent === null) {

            fileName = 'Empty file';
            fileType = 'NULL';

            await cds.run(UPDATE('Functions').set`fileName=${fileName}`.where`ID=${selectedID}`);

            await cds.run(UPDATE('Functions').set`mediaType=${fileType}`.where`ID=${selectedID}`);
        }

        return data;
    });

}