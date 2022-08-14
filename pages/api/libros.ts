import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../db/config'

type Data = {
    name: string
}

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
    // res.status(200).json({ name: 'Example' })
    switch (req.method) {
        case 'GET':
            const {nombre} = req.query;
            console.log("====================");
            console.log(nombre);
            console.log("====================");
            try{
                const connection = await pool.getConnection();
                if (nombre !== undefined) {
                    const resp = await connection.query(`SELECT * FROM libros WHERE titulo LIKE '%${connection.escape(nombre).replaceAll("'","")}%'`);
                    connection.release();
                    res.status(200).json(resp[0]);
                }
                else{
                    const resp = await connection.execute('SELECT * FROM libros LIMIT 100');
                    connection.release();
                    res.status(200).json(resp[0]);
                }
            }
            catch (error) {
                res.status(500).json({error})
            }

            
            break
        case 'POST':
            res.status(201).json({ name: 'John Doe' })
            break
}}