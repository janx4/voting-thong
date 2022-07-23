import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Grid, Col, Row } from "react-bootstrap";

import getBlockchain from "../ethereum.js";
import NavbarComponent from "./Navbar";

import Home from "./Home";
import NotFound from "./PageNoteFound";
import Create_vote from "./create_vote";
import Display_all_votes from "./display_all_votes";

function App() {
    const [voting, setVoting] = useState(undefined);
    const [addressConnected, setAddress] = useState(undefined);
    const [votes, setVotes] = useState([]);

    useEffect(() => {
        const init = async () => {
            const { signerAddress, voting } = await getBlockchain();
            console.log(signerAddress);
            console.log(voting);
            setVoting(voting);
            setAddress(signerAddress);
        };
        init();
    }, []);

    if (typeof voting === "undefined") {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="container">
                <BrowserRouter>
                    <NavbarComponent address={addressConnected} />
                    <Routes>
                        <Route path="/home" element={<Home />} />
                        <Route
                            path="/createvote"
                            element={<Create_vote voting={voting} />}
                        />
                        <Route
                            path="/votes"
                            element={<Display_all_votes voting={voting} />}
                        />
                        <Route path="/" element={<Home />} />
                        <Route element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
                <hr />
                <Col style={{ textAlign: "right" }}>
                    Minh Thong & his friends
                </Col>
                <Col style={{ textAlign: "right" }}>minhthong@gmail.com</Col>
                <Col style={{ textAlign: "right" }}>Project DS441 - 2022</Col>
                <br />
            </div>
        );
    }
}

export default App;
