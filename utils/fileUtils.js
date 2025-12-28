const path = require('path');
const fs = require('fs').promises;

const DATA_FILE_PATH = path.join(__dirname, '..', 'data', 'task.json');

const readData = async () => {
    try {
        const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf8');
        const parsed = JSON.parse(fileContent);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        if (error.code === 'ENOENT') {
            return [];
        }
        throw error;
    }
};


const writeData = async (data) => {
    try {
        await fs.writeFile(
            DATA_FILE_PATH,
            JSON.stringify(data, null, 2),
            'utf8'
        );
    } catch (error) {
        throw new Error(`Failed to write data: ${error.message}`);
    }
};

module.exports = {
    readData,
    writeData,
};