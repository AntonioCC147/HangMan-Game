import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Game from '../../pages/game/game';

export default function StartModal() {
    const [show, setShow] = useState(true);

    const [gameStarted, setGameStarted] = useState(false);

    return (
        <div>
            <Modal show={show} size="lg">
                <Modal.Header>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you are reading this text in a modal!
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={() => {setShow(false); setGameStarted(true)}}>
                    Start
                </Button>
                </Modal.Footer>
            </Modal>

            {gameStarted && <Game/>}
        </div>
    );
}