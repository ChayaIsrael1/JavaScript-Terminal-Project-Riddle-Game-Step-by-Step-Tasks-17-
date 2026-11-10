import express from 'express';
import { readDb, writeDb } from '../db/dbHelpers.js';

const router = express.Router()

router.get('/', async(req, res) => {
    try{
        const db = await readDb()
        res.json(db.riddles)
    }
    catch(err){
        console.log("error")
        res.status(500).json({error:'error'})
    }
});

router.get('/:id', async (req, res) => {
    const id = Number(req.params.id);
    try {
        const db = await readDb();
        const riddle = db.riddles.find(r => r.id === id);
       if (riddle) {
           res.status(200).json(riddle);
       } else {
           res.status(404).json({ error: 'Riddle not found' });
       }
    } catch (error) {
        console.error('Error fetching riddle:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const db = await readDb();
        const readyRiddle = req.body; 
        readyRiddle.id = Number(db.riddles.length+1)
        db.riddles.push(readyRiddle)
        await writeDb(db);
        res.status(201).json({ 
            message: 'Riddle added successfully', 
            totalRiddles: db.riddles.length 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const db = await readDb();
        const id = Number(req.params.id);
        const readyRiddle = req.body;
        
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const riddleIndex = db.riddles.findIndex(riddle => riddle.id === id);

        if (riddleIndex === -1) {
            return res.status(404).json({ error: 'Riddle not found' });
        }         

        readyRiddle.id = id;

        db.riddles.splice(riddleIndex, 1, readyRiddle);
        await writeDb(db);

        res.status(200).json({ 
            message: 'Riddle updated successfully', 
            totalRiddles: db.riddles.length 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const db = await readDb();
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }
        const riddleIndex = db.riddles.findIndex(riddle => riddle.id === id);

        if (riddleIndex === -1) {
            return res.status(404).json({ error: 'Riddle not found' });
        } 

        db.riddles.splice(riddleIndex, 1);
        await writeDb(db);

        res.status(200).json({ 
            message: 'Riddle deleted successfully', 
            totalRiddles: db.riddles.length 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


export default router;