import type { NextApiRequest, NextApiResponse } from 'next'
import pool from '../../db/config'

type Data = {
    name: string
}

export default function handler (req: NextApiRequest, res: NextApiResponse) {
    // res.status(200).json({ name: 'Example' })
    switch (req.method) {
        case 'GET':
            res.status(200).json({ name2: 'John Doe' })
            break
        case 'POST':
            res.status(201).json({ name: 'John Doe' })
            break
        case 'PUT':
}}