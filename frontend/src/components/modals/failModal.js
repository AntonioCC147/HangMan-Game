import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import gallows6 from '../../assets/gallows/gallows6.png';

export default function FailModal(props) {
    const { word } = props;

    const handleRefreshClick = () => {
        window.location.reload();
    };

    return (
        <div>
            <Modal show={true} size="lg">
                <Modal.Header>
                    <Modal.Title>You Failed the Game</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <img src={gallows6} alt="Gallows6"/>
                    </div>
                    <br/>
                    <div>
                        <h4>Tou just failed the game. The correct word was <b>{word}</b>.</h4>
                    </div>
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