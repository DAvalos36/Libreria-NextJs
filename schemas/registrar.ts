import {string, object, InferType} from "yup";

const EsquemaRegistroPost = object({
    usuario: string().required().min(3).max(15),
    contra: string().required().min(8).max(30),
    nombre: string().required().min(3).max(30),
    apellido: string().required().min(3).max(30)
});

interface registroPost extends InferType<typeof EsquemaRegistroPost>{}

export {EsquemaRegistroPost};
export type {registroPost};
