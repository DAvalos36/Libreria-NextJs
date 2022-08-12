import { Grid, Card, Row, Text, Container } from "@nextui-org/react";
import { GetServerSideProps } from 'next'
import { useEffect, useState } from "react";
import { CardLibro } from "../modules/CardLibro";
import {Libro} from "../types/tipos";


export default function App(props: {data: Libro[]}) {
  const [libros, setLibros] = useState<Libro[]>(props.data);
  console.log(props)

  const cargarTodosLibros = async () => {
    const res = await fetch("/api/libros");
    const info: Libro[] = await res.json();
    setLibros(info);
    console.log(info.length);
  }

  useEffect(() => {
    // cargarTodosLibros();
  }, [])
  

  return (
    <Container >
      <Grid.Container gap={3}>
        {libros.map(info=> (
          <CardLibro key={info.id} {...info}/>
        ))}

        {/* {JSON.stringify(libros)} */}
      </Grid.Container>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const res = await fetch(`http://${ctx.req.headers.host}/api/libros/`)  // your fetch function here 
  const data:Libro[] = await res.json()


  return {
    props: {data}
  }
}
