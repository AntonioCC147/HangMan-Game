import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function FailModal() {
    const [show, setShow] = useState(true);

    return (
        <div>
            <Modal show={show} size="lg">
                <Modal.Header>
                    <Modal.Title>You Failed the Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Woohoo, you are reading this text in a modal!
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={() => {setShow(false)}}>
                    Restart
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}