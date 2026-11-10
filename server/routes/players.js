import express from 'express';
import { readDb, writeDb } from '../db/dbHelpers.js';
import { time } from 'console';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const db = await readDb();
        const players = db.players || [];
        const name = req.query.name;

        if (name) {
            const filteredPlayers = players.filter(
                p => p.name.toLowerCase() === name.toLowerCase()
            );
            return res.json(filteredPlayers);
        }

        res.json(players);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/', async (req, res) => {
    try {
        const db = await readDb();
        if (!db.players) db.players = [];

        const {name, times} = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Player name is required' });
        }

        const nextId = db.players.length > 0 
            ? Math.max(...db.players.map(p => p.id)) + 1 
            : 1;

        const newPlayer = {
            id: nextId,
            name: req.body.name,
            times: Array.isArray(times) ? times : [], 
            lowestTime: null
        };

        db.players.push(newPlayer);
        await writeDb(db);

        res.status(201).json(newPlayer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const db = await readDb();
        const players = db.players || [];
        const id = Number(req.params.id);
        const { times, lowestTime } = req.body;

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const playerIndex = players.findIndex(p => p.id === id);

        if (playerIndex === -1) {
            return res.status(404).json({ error: 'Player does not exist' });
        }

        players[playerIndex].times = req.body.times !== undefined ? times : null;
        players[playerIndex].lowestTime = req.body.lowestTime !== undefined ? lowestTime : null;

        await writeDb(db);

        res.status(200).json({
            message: "Player's lowest time updated successfully",
            player: players[playerIndex]
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
