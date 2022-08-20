/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt';


import validar from '../../../middlewares/validaciones';
import {EsquemaRegistroPost, registroPost} from "../../../schemas/registrar"
import pool from '../../../db/config';




async function registrar(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({error: "Metodo no permitido"});
    }
    const data = req.body as registroPost;
    try {
        const hash = await bcrypt.hash(data.contra, 10);
        const connection = await pool.getConnection();
        const resp = await connection.query("INSERT INTO usuarios (nom_usuario, pass, nombre, apellido) VALUES (?, ?, ?, ?)", [data.usuario, hash, data.nombre, data.apellido]);
        connection.release();
        res.end();
    } catch (error: any ) {
        if(error.code == "ER_DUP_ENTRY"){
            res.status(409).json({ status: 'error', error: 'Usuario ya existe' })
        }
        res.status(500).json({ status: 'error', error })
    }
}

export default validar(registrar, EsquemaRegistroPost);