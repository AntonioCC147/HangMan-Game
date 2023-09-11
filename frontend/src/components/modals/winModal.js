import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import happyMan from '../../assets/gallows/happyMan.png';

export default function WinModal(props) {
    const { word } = props;

    const handleRefreshClick = () => {
        window.location.reload();
    };

    return (
        <div>
            <Modal show={true} size="lg">
                <Modal.Header>
                    <Modal.Title>You WIN the Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <img src={happyMan} alt="HappyMan"/>
                    </div>
                    <h4>Congrats! You win this game. The correct word was <b>{word}</b>.</h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleRefreshClick}>
                        Main Menu
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}