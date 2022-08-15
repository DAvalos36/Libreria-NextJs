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
        try {
            const res = await fetch(`/api/libros?nombre=${nombre}`);
            const info: Libro[] = await res.json();
            props.cargarLibros(info);
        }
        catch (error) {
            console.log(error)
        }
        setCargando(false);
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