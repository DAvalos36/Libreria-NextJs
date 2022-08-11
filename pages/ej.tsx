import { Grid, Card, Row, Text, Container } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CardLibro } from "../modules/CardLibro";
import {Libro} from "../types/tipos";


export default function App() {
  const [libros, setLibros] = useState<Libro[]>([])

  const cargarTodosLibros = async () => {
    const res = await fetch("/api/libros");
    const info: Libro[] = await res.json();
    setLibros(info);
    console.log(info.length);
  }

  useEffect(() => {
    cargarTodosLibros();
  }, [])
  

  return (
    <Container >
      <Grid.Container gap={3}>
      {libros.map(i => (
        // <Grid xs={6} md={4} key={i}>
          <CardLibro key={i.id}/>
        // </Grid>
      ))}
      </Grid.Container>
    </Container>
  );
}
