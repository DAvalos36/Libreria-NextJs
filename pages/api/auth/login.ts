/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import "dotenv/config";
import bcrypt from 'bcrypt';
import * as jose from 'jose';
import cookie from "cookie";

import pool from '../../../db/config';
import validar from "../../../middlewares/validaciones";


import {Usuario} from '../../../types/tipos';
import {EsquemaLoginPost, loginPost} from "../../../schemas/login";

async function loginHandler (req: NextApiRequest, res: NextApiResponse) {
    const { usuario, contra} = req.body as loginPost;
    // console.log(usuario, contra);
    try {
        const connection = await pool.getConnection();
        const resp = await connection.query("SELECT * FROM usuarios WHERE nom_usuario = ?", [usuario]);
        connection.release();
        const usuarioDB = resp[0] as Usuario[];
        if (usuarioDB.length === 1) {
            const match = await bcrypt.compare(contra, usuarioDB[0].pass);
            if (match) {
                const encoder = new TextEncoder();
                const jwt = await new jose.SignJWT({id: usuarioDB[0].id, rango: usuarioDB[0].rango})
                .setProtectedHeader({alg: 'HS256', typ: 'JWT'})
                .setExpirationTime("2h")
                .sign(new Uint8Array(encoder.encode(process.env.JWT_SECRET)));
                const serialize = cookie.serialize("token", jwt, {
                    httpOnly: true,
                    maxAge:  2 * 60 * 60 * 1000,
                    sameSite: 'strict',
                    path: '/'
                })
                res.setHeader("Set-Token", serialize);
                res.status(200).json({usuario: usuarioDB[0], jwt});
            } else {
                res.status(401).json({error: 'Contraseña incorrecta'});
            }
        }
        else {
            res.status(401).json({error: 'Usuario no encontrado'});
        }
    } catch (error: any) {
        console.log(typeof error);
        res.status(500).json({ status: 'error', error })
    }
}

export default validar(loginHandler, EsquemaLoginPost);