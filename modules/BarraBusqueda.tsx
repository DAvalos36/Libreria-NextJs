import { FormElement, Grid, Input, Loading } from '@nextui-org/react';
import {useState} from 'react'
import {Libro} from "../types/tipos"

type Props = {
    cargarLibros: (libros: Libro[]) => void;
}

const BarraBusqueda = (props: Props) => {
    const [cargando, setCargando] = useState<boolean>(false)

    const teclear = async (e: React.ChangeEvent<FormElement>) => {
        setCargando(true);
        const nombre: string = e.target.value
        const res = await fetch(`/api/libros?nombre=${nombre}`);
        const info: Libro[] = await res.json();
        setCargando(false);
        props.cargarLibros(info);
    }

  return (
    <>
        <Grid sm={12} md={12}>
            <Input size='xl' labelPlaceholder='Buscar...'
            color='secondary' bordered onChange={teclear}
            fullWidth
            {... cargando? {contentRight: <Loading />} : {}}
            />
        </Grid>
    </>
  )
}

export default BarraBusqueda