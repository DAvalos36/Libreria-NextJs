/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../../db/config';

type Data = {
    name: string
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.query;
    switch(req.method) {
        case 'GET':
            try {
                const connection = await pool.getConnection();
                const resp = await connection.query("SELECT * FROM libros WHERE id = ?", [id]);
                connection.release();  
                res.status(200).json(resp[0]);
            } catch (error: any) {
                res.status(500).json({error});
            }
            break
        case 'DELETE':
            res.status(204).json({name: 'John Doe'});
          break
        default:
            res.status(405).json({name: 'John Doe'});
            break
}}