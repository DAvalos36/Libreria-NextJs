import {InferType, object, string, TypeOf} from "yup";

const EsquemaLoginPost = object({
    usuario: string().required().min(3).max(15),
    contra: string().required().min(8).max(30),
})

interface loginPost extends InferType<typeof EsquemaLoginPost>{}

export {EsquemaLoginPost}
export type {loginPost}
