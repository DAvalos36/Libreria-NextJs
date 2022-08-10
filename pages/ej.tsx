import { Grid, Card, Row, Text, Container } from "@nextui-org/react";
import { CardLibro } from "../modules/CardLibro";

function Idk() {
  const click = () => {
    console.log();
  }


  return (
    <Card css={{ $$cardColor: '$colors$primary' }}>
        <Card.Body>
          <Row justify="center" align="center">
            <Text h6 size={15} color="white" css={{ m: 0 }}>
              NextUI gives you the best developer experience with all the features
              you need for building beautiful and modern websites and
              applications.
            </Text>
          </Row>
        </Card.Body>
      </Card>
  );
}


export default function App() {
  return (
    <Container >
      <Grid.Container gap={3}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
        // <Grid xs={6} md={4} key={i}>
          <CardLibro key={i}/>
        // </Grid>
      ))}
      </Grid.Container>
    </Container>
  );
}
