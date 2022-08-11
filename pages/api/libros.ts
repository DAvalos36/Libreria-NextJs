import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../db/config'

type Data = {
    name: string
}

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    // res.status(200).json({ name: 'Example' })
    switch (req.method) {
        case 'GET':
            const connection = await pool.getConnection();
            const resp = await connection.execute('SELECT * FROM libros');
            connection.release();
            res.status(200).json(resp[0]);
            break
        case 'POST':
            res.status(201).json({ name: 'John Doe' })
            break
}}