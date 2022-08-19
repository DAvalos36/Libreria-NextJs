import {string, object, InferType} from "yup";

const EsquemaLibroPost = object({
    titulo: string().required().min(3).max(100),
    link_google: string().required().min(3).max(200),
});

interface libroPost extends InferType<typeof EsquemaLibroPost>{}

export {EsquemaLibroPost};
export type {libroPost};