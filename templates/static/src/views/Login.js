import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Form,
  Alert
} from "shards-react";

import Forms from "../components/components-overview/Forms";
import PageTitle from "../components/common/PageTitle";
import FormValidation from "../components/components-overview/FormValidation";


import "./Login.css";

export default function Login(props) {

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <div className="Login">
      <Container fluid className="px-0">
        <Alert className="mb-0">
          <i className="fa fa-info mx-2"></i> Should enter credentials to continue
        </Alert>
      </Container>

    <Container fluid className="main-content-container px-4">
      <Row noGutters className="page-header py-4">
        <PageTitle
          sm="4"
          title="Login & Create List For Spotify"
          subtitle="Login"
          className="text-center"
          md={{ span: 6, offset: 4 }}
        />
      </Row>

      <Row>
        <Col md={{ span: 6, offset: 3 }} lg="5" className="mb-4">
          <Card small className="text-center">
            <CardHeader className="border-bottom">
              <h6 className="m-0">Username/Email & Password</h6>
            </CardHeader>
              <ListGroup flush className="FormItems">
               <ListGroupItem className="p-3">
                <Row>
                  <FormValidation />
                </Row>
                </ListGroupItem>
            </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>

    </div>
  );
}
