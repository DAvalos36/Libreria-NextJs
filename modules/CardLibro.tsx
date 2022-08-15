import { Card, Col, Row, Button, Text, Grid } from "@nextui-org/react";
import Link from "next/link";
import { Libro } from "../types/tipos";


export const CardLibro = (info: Libro) => (
  <Grid xs={12} sm={6} md={4}>
    <Card css={{ w: "100%", h: "400px" }}>
    <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
      <Col>
        <Text size={12} weight="bold" transform="uppercase" color="secondary">
          IT-Parral
        </Text>
        {/* <Text h3 color="error" margin={2}>
          {info.titulo}
        </Text> */}
      </Col>
    </Card.Header>
    <Card.Body css={{ p: 0}}>
      <Card.Image
        src={info.link_imagen}
        width="100%"
        height="100%"
        objectFit="cover"
        alt="Card example background"
      />
    </Card.Body>
    <Card.Footer
      isBlurred
      css={{
        position: "absolute",
        bgBlur: "#ffffff66",
        borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
        bottom: 0,
        zIndex: 1,
      }}
    >
      <Row>
        <Col>
          <Text color="#000" size={16} weight="bold" >
            {info.titulo}
          </Text>
          <Text color="#000" size={12}>
            {info.fecha.toLocaleString()}
            {/* Get notified. */}
          </Text>
        </Col>
        <Col>
          <Row justify="flex-end">
            <Link href={"/libro/"+info.id}>
              <Button flat auto rounded shadow color="secondary">
                <Text
                  css={{ color: "inherit" }}
                  size={12}
                  weight="bold"
                  transform="uppercase"
                >
                  VER
                </Text>
              </Button>
            </Link>
          </Row>
        </Col>
      </Row>
    </Card.Footer>
  </Card>
  </Grid>
);
