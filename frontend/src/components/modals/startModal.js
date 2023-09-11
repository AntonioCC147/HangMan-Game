import { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import Game from '../../pages/game/game';

export default function StartModal() {
    const [show, setShow] = useState(true);

    const [gameStarted, setGameStarted] = useState(false);

    return (
        <div>
            <Modal show={show} size="lg" className="background">
                <Modal.Header>
                    <Modal.Title style={{fontSize: "40px"}}>HangMan - Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{marginLeft: "10px", marginRight: "10px"}}>
                        <p>
                            The HangMan's game is one of the oldest games known and played by people.
                        </p>
                        <p>
                            All you have to do in this game is to guess the word hidden behind the dotted lines, in a maximum time of
                            150 seconds and with 5 lives available.
                        </p>
                        <p>
                            You can choose any letter from the alphabet, and if it is found in the word, it will be replaced in all
                            the positions it appears.
                        </p>
                        <p>
                            The game ends when time runs out, all lives are lost or the word is discovered.
                        </p>
                    </div>
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