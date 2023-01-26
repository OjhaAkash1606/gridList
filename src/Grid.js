import React, { useMemo, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";
import "./App.css";

function Grid() {
  const [storeData, setStoreData] = useState();
  const [view, setView] = useState("list");
  // To fetch data from the api at first time
  useMemo(
    () =>
      axios("https://jsonplaceholder.typicode.com/posts").then((result) =>
        // store result in state
        setStoreData(result.data)
      ),
    []
  );

  // To change grid and list view based on this function calling
  const gridType = (type) => {
    setView(type);
  };

  return (
    <>
      {/* here difining funtion for list and grid view */}
      <div className="text-center">
        <Button
          onClick={() => gridType("list")}
          variant="outline-success"
          size="lg"
          className="m-3"
        >
          List
        </Button>
        <Button
          variant="outline-primary"
          size="lg"
          onClick={() => gridType("grid")}
          className="m-3"
        >
          Grid
        </Button>
      </div>
      {/* here difine logic of grid and view list   */}
      <Container>
        {/* here i used ternary operator for list and grid view */}
        {view === "list"
          ? // it is called when require list view
            storeData?.map((item) => (
              <Row className=" m-3" key={item.id}>
                <Col>
                  <div className="card" id="list">
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{item.body}</p>
                    </div>
                  </div>
                </Col>
              </Row>
            ))
          : // it is called when grid view require
            (() => {
              let td = [];
              for (let i = 0; i < storeData.length; i += 3) {
                // here i used optional chaining when the previous is undefined then it doesn't give error

                td.push(
                  <Row className=" m-3" key={storeData[i]?.id}>
                    <Col>
                      <div className="card" id="grid">
                        <div className="card-body">
                          <h5 className="card-title">{storeData[i]?.title}</h5>
                          <p className="card-text">{storeData[i]?.body}</p>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="card" id="grid">
                        <div className="card-body">
                          <h5 className="card-title">
                            {storeData[i + 1]?.title}
                          </h5>
                          <p className="card-text">{storeData[i + 1]?.body}</p>
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="card" id="grid">
                        <div className="card-body">
                          <h5 className="card-title">
                            {storeData[i + 2]?.title}
                          </h5>
                          <p className="card-text">{storeData[i + 2]?.body}</p>
                        </div>
                      </div>
                    </Col>
                  </Row>
                );
              }
              return td;
            })()}
      </Container>
    </>
  );
}

export default Grid;
