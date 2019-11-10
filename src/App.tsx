import React, { useEffect, useState } from "react";
import { Container, Spinner, Row, Col } from "reactstrap";

import List from "./components/List/List";
import { fetchBullshit } from "./services/bullshitService";
import { BullshitDetector } from "./tools/BullshitDetector";
import CeasarDecoder from "./tools/CeasarDecoder";

const classes = require("./App.module.scss");

const App: React.FC = () => {
  const [isLoading, setLoading] = useState(true);
  const [bullshitSentences, setBullshitSentences] = useState<string[]>([]);
  const [plainSentences, setPlainSentences] = useState<string[]>([]);

  useEffect(() => {
    fetchBullshit().then(bullshits => {
      setLoading(false);

      // Create decoders
      const decoders = CeasarDecoder.createDecoders();

      // Loop bullshit to bullshitArray and plain to plainArray
      const bullshitArray = [];
      const plainArray = [];
      for (let bullshit of bullshits) {
        const { isBullshit, sentence } = new BullshitDetector(
          bullshit.message,
          decoders
        ).detect();

        if (isBullshit) {
          bullshitArray.push(sentence);
        } else {
          plainArray.push(sentence);
        }
      }

      setBullshitSentences(bullshitArray);
      setPlainSentences(plainArray);
    });
  }, []);

  return (
    <div className={classes.Container}>
      {isLoading ? (
        <div className={classes.SpinnerContainer}>
          <Spinner color="primary" />
        </div>
      ) : (
        <Container>
          <h1 className="text-primary">Solidabis koodihaaste</h1>
          <p className="text-muted">
            Enemmän bullshittia kuin selkeetä, mutta suattaapi olla ettei oo
            ihan paras toi algoritmi. :)
          </p>
          <Row>
            <Col md={6}>
              <List
                items={bullshitSentences}
                title="Bullshit"
                className="text-danger"
              />
            </Col>
            <Col md={6}>
              <List
                items={plainSentences}
                title="Selkee"
                className="text-success"
              />
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default App;
