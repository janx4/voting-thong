import { Form, Col, Row, Button, Alert } from "react-bootstrap";
import React, { useEffect, useState } from "react";

function Create_vote(props) {
    const [inputs, setInputs] = useState([
        "Ứng viên 1",
        "Ứng viên 2",
        "Ứng viên 3",
    ]);
    const [voting, setVoting] = useState(undefined);
    const [title, setTitle] = useState(undefined);
    const [elements, setElements] = useState([]);
    const [alertOn, setAlert] = useState(false);
    const [voteTx, setVoteTx] = useState(false);
    const [, setState] = useState(); // used to re-render

    useEffect(() => {
        if (voting === "undefined") setVoting(props.voting);
    }, [props.voting]);

    async function create_vote_tx() {
        for (let i = 0; i < inputs.length; i++)
            elements.push(document.getElementById(inputs[i]).value);
        console.log(elements);
        try {
            const createVoteTx = await props.voting.createVote(title, elements);
            setVoteTx(createVoteTx.hash);
            handleAlertShow();
            closeAlert();
        } catch (err) {
            console.log("error: " + err);
        }
    }

    // used to re-render
    function handleUpdate() {
        setState({});
    }

    function addInput() {
        const size = inputs.length + 1;
        const name = "Ứng viên " + size;
        inputs.push(name);

        setInputs(inputs);
        console.log(inputs);
        handleUpdate();
    }

    function removeInput() {
        if (inputs.length > 2) inputs.pop();

        setInputs(inputs);
        console.log(inputs);
        handleUpdate();
    }

    async function closeAlert() {
        setTimeout(function () {
            handleAlertClose();
        }, 10000);
    }

    const handleAlertClose = () => setAlert(false);
    const handleAlertShow = () => setAlert(true);

    return (
        <div className="container">
            <Row>
                <Col sm={2}></Col>
                <Col sm={8}>
                    <Alert variant="success" hidden={!alertOn} transition>
                        <Alert.Heading>Đã tạo vote!</Alert.Heading>
                        <p>tại transaction : {voteTx}</p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button
                                onClick={() => handleAlertClose()}
                                variant="outline-success"
                            >
                                Đóng
                            </Button>
                        </div>
                    </Alert>
                    <br />
                    <Form.Group
                        as={Row}
                        className="mb-3"
                        controlId="formPlaintextTitle"
                    >
                        <Form.Label column sm="2">
                            Tiêu đề vote
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                defaultValue="Viết tiêu đề của cuộc bầu cử..."
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Col>
                    </Form.Group>
                    {inputs.map((input) => {
                        return (
                            <Form.Group
                                key={input}
                                as={Row}
                                className="mb-3"
                                controlId={input}
                            >
                                <Form.Label column sm="2">
                                    {input}
                                </Form.Label>
                                <Col sm="10">
                                    <Form.Control
                                        type="text"
                                        placeholder="Điền tên ứng viên ..."
                                    />
                                </Col>
                            </Form.Group>
                        );
                    })}
                    <Button variant="primary" onClick={() => create_vote_tx()}>
                        Tạo vote
                    </Button>
                    &nbsp;
                    <Button variant="success" onClick={() => addInput()}>
                        Thêm ứng viên
                    </Button>
                    &nbsp;
                    <Button variant="secondary" onClick={() => removeInput()}>
                        Xóa ứng viên
                    </Button>
                </Col>
            </Row>
        </div>
    );
}

export default Create_vote;
