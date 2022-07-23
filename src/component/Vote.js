import {Modal, Button, Form, Col, Row, ProgressBar, Alert} from 'react-bootstrap'
import React, { useEffect, useState } from "react";

function Vote(props) {
    const [voteElement, setVoteElement] = useState([])
    const [progressBar, setProgressBar] = useState([])
    const [voteKey, setVoteKey] = useState(undefined)
    const [voting, setVoting] = useState(undefined);
    const [keyVote, setKey] = useState(undefined)
    const [numVotes, setNumVotes] = useState([])
    const [voteTx, setVoteTx] = useState(false)
    const [alertOn, setAlert] = useState(false)
    const [title, setTitle] = useState(false);
    const [show, setShow] = useState(false);


    useEffect(()=>{
        setVoteElement(props.voteElement)
        setProgressBar(props.numVotes)
        setNumVotes(props.numVotes)
        setVoting(props.voting)
        setTitle(props.title)
        setKey(props.keyVote)
        handleProgressBar()
    },[props.voteElement, props.numVotes, props.numVotes, props.voting, props.title, props.keyVote]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function vote_tx(){
        const _voteKey = voteKey
        const _key = keyVote
        
        console.log(_key)
        console.log(_voteKey)
        try{
            const voteTx = await voting.vote(_key, _voteKey)
            setVoteTx(voteTx.hash)
            handleAlertShow()
            closeAlert()
        }catch(err){
            console.log("error: "+err)
        }
    }

    function handleProgressBar(){
        let temp = []
        let sum = 0
        for(let i = 0; i < numVotes.length; i++)
            sum += parseInt(numVotes[i])

        for(let i = 0; i < numVotes.length; i++)
            temp.push((numVotes[i]/sum) * 100)

        setProgressBar(temp)
        console.log(sum)
        console.log(progressBar)
    }
    
    function handler(){
        handleShow()
        handleProgressBar()
    }

    async function closeAlert(){
        setTimeout(function() {
            handleAlertClose()
        }, 10000)
    }

    const handleAlertClose = () => setAlert(false)
    const handleAlertShow = () => setAlert(true)

    return (
        <div className="container">
            <Button variant="primary" onClick={() => handler()}>
                Vote
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Col sm="4"></Col>
                <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Alert variant="success" hidden={!alertOn} transition >
                    <Alert.Heading>Vote sent !</Alert.Heading>
                    <p>at : {voteTx}</p>
                    <hr/>
                    <div className="d-flex justify-content-end">
                    <Button onClick={() => handleAlertClose()} variant="outline-success">
                        Close
                    </Button>
                    </div>
                </Alert>
                <Modal.Body>
                    {
                        voteElement.map((input, idx) => {
                            return(
                                <Form.Group key={input+"_vote"} as={Row} className="mb-3" id={input+"_vote"}>
                                    <Col sm="1">
                                        <Form.Label column sm="2">
                                            {input}
                                        </Form.Label>
                                    </Col>
                                    <Col sm="1"></Col>
                                    <Col sm="8">
                                    <ProgressBar sm="8" now={progressBar[idx]}/>
                                    </Col>
                                    <Col sm="1">
                                        <Form.Control
                                                type="radio"
                                                placeholder="vote.."
                                                className={title+"_radio"}
                                                onClick={() => setVoteKey(idx)}
                                                />
                                    </Col>
                                    <Col sm="3">
                                        total : {numVotes[idx].toString()}
                                    </Col>
                                </Form.Group>
                            )
                        })
                    }
                </Modal.Body>
                <Modal.Footer>
        
                <Button variant="primary" onClick={() => vote_tx()}>
                    Vote
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Vote;