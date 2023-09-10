import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import StopModal from '../../components/modals/stopModal';

import { words } from '../../components/words';

import './game.css';

export default function Game() {
    const [showModal, setShowModal] = useState(true);
    const [wrong, setWrong] = useState(6);
    const [time, setTime] = useState(100);

    const [word, setWord] = useState(() => {
        const randomIndex = Math.floor(Math.random() * words.length);
        return words[randomIndex];
    });

    function repeatCharacter(character, times) {
        let result = '';

        for(let i = 0; i < times; i++)
            result += character + " ";

        return result;
    }

    const character = "_";
    const times = word.length;
    const repeatedString = repeatCharacter(character, times);

    const [displayWord, setDisplayWord] = useState(repeatedString);

    function showLetter(characterToShow) {
        let verify = false;
        const updatedDisplayWord = [...displayWord];
    
        for(let i = 0; i < updatedDisplayWord.length; i = i + 2)
            if(word[i / 2] === characterToShow) {
                updatedDisplayWord[i] = word[i / 2];
                verify = true;
            }
        
        if(verify) setDisplayWord(updatedDisplayWord.join(''));
        else if(!verify) {
            setWrong(wrong - 1);
            if(wrong - 1 === 0)
                setShowModal(false);
        }
    }
    
    useEffect(() => {
        const timerId = setInterval(countdown, 1000);

        function countdown() {
            if(time === 0)
                setShowModal(false);
            else
                setTime(time - 1);
        }

        return () => {
            clearInterval(timerId);
        };
    }, [time]);

    const alphabet1 = 'ABCDEFGHIJKLMN';
    const alphabet2 = 'OPQRSTUVWXYZ';

    return (
        <Container fluid>
            {showModal && (
                <Row>
                    <Col sm={4} className="text-center">
                        Ceva
                    </Col>
                    <Col sm={8}>
                        <Col sm={12} className="text-center">
                            <h1>{displayWord}</h1>
                            Wrong: {wrong}<br/>
                            Time: {time}
                        </Col>
                        <Col sm={12} className="text-center">
                            {alphabet1.split('').map(letter => (
                                <>
                                    <Button
                                        size="lg"
                                        key={letter}
                                        variant="secondary"
                                        onClick={() => showLetter(letter)}
                                    >
                                        {letter}
                                    </Button>{' '}
                                </>
                            ))}
                            <br/><br/>
                            {alphabet2.split('').map(letter => (
                                <>
                                    <Button
                                        size="lg"
                                        key={letter}
                                        variant="secondary"
                                        onClick={() => showLetter(letter)}
                                    >
                                        {letter}
                                    </Button>{' '}
                                </>
                            ))}
                        </Col>
                    </Col>
                </Row>
            )}
            {(wrong === 0 || time === 0) && <StopModal />}
        </Container>
    );
}
