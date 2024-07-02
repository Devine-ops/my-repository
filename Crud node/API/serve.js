import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app = express();
app.use(express.json());
app.use(cors());

/* Create user and send to the database */
app.post('/usuarios', async (req, res) => {
    try {
        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age
            }
        });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the user.' });
    }
});

/* List users */
app.get('/usuarios', async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        console.log(users);
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching users.' });
    }
});

/* Edit user */
app.put('/usuarios/:id', async (req, res) => {
    try {
        const user = await prisma.user.update({
            where: { 
                id: 
                req.params.id },
            data: {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age
            }
        });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating the user.' });
    }
});

/* Delete user */
app.delete('/usuarios/:id', async (req, res) => {
    try {
        await prisma.user.delete({
            where:{ 
                id: 
                req.params.id }
        });
        res.status(200).json({ message: "Usuário deletado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(501).json({ error: 'An error occurred while deleting the user.' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
