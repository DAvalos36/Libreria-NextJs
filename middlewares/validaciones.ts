import {NextApiHandler, NextApiRequest, NextApiResponse} from "Next"
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";

function validar(handler: NextApiHandler, esquema: OptionalObjectSchema<ObjectShape>){
    return async function(req: NextApiRequest, res: NextApiResponse){
        if( ['POST', 'PUT'].includes(req.method as string)) {
            try{
               req.body = await esquema.validate(req.body, {stripUnknown: true});
            }
            catch (error) {
                return res.status(400).json({error});
            }
        }
        await handler(req, res);
    }
}

export default validar;
