/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt';
import pool from '../../../db/config';
import {Usuario} from '../../../types/tipos';

type Data = {
    name: string,
    nose: number[]
}

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { usuario, contra } = req.body;
    console.log(usuario, contra);
    try {
        const connection = await pool.getConnection();
        const resp = await connection.query("SELECT * FROM usuarios WHERE nom_usuario = ?", [usuario]);
        connection.release();
        const usuarioDB = resp[0] as Usuario[];
        if (usuarioDB.length === 1) {
            const match = await bcrypt.compare(contra, usuarioDB[0].pass);
            if (match) {
                res.status(200).json(usuarioDB[0]);
            } else {
                res.status(401).json({error: 'Contraseña incorrecta'});
            }
        }
        else {
            res.status(401).json({error: 'Usuario no encontrado'});
        }
        // bcrypt.compare()
    } catch (error: any) {
        console.log(typeof error);
        res.status(500).json({ status: 'error', error })
    }
}