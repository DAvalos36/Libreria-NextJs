import {InferType, object, string, TypeOf} from "yup";

const EsquemaLogin = object({
    usuario: string().required().min(3).max(15),
    contra: string().required().min(8).max(30),
})

interface login extends InferType<typeof EsquemaLogin>{}

export {EsquemaLogin}
export type {login}
