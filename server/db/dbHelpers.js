import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.join(__dirname, 'db.json');


export async function readDb() {
    try {
        const data = await fs.readFile(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading database:', error.message);
        throw error;
    }
}


export async function writeDb(db) {
    try {
        await fs.writeFile(dbPath, JSON.stringify(db, null, 2));
    } catch (error) {
        console.error('Error writing database:', error.message);
        throw error;
    }
}