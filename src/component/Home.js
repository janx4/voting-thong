import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

function Home() {
    return (
        <div className="container">
            <br />
            <Row>
                <Col style={{ textAlign: "center" }}>
                    <h2>
                        Đồ án nhóm DS 441 - Ứng dụng bầu cử sử dụng BlockChain
                    </h2>
                    <p style={{ textAlign: "center" }}>
                        You can start by exploring all the on-going votes in the{" "}
                        <b>'Votes'</b> tabs
                    </p>
                    <p style={{ textAlign: "center" }}>
                        Then why not create a vote, by clicking on{" "}
                        <b>'Create vote'</b>
                    </p>
                    <p style={{ textAlign: "center" }}>
                        <i>
                            For information each accounts can only vote{" "}
                            <b>once</b> for a specific vote.
                        </i>
                    </p>
                </Col>
            </Row>
            <Row>
                <Col sm={{ offset: 3 }}>
                    <img src="/voting.gif" height={600} />
                </Col>
            </Row>
        </div>
    );
}

export default Home;
