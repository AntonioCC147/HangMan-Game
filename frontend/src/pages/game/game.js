import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import WinModal from '../../components/modals/winModal';
import FailModal from '../../components/modals/failModal';

import { words } from '../../components/words';

import './game.css';

export default function Game() {
    const [showModal, setShowModal] = useState(true);

    const [wrong, setWrong] = useState(5);
    const [correct, setCorrect] = useState(0);

    const [word] = useState(() => {
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

    const alphabet1 = 'ABCDEFGHIJKLMN';
    const alphabet2 = 'OPQRSTUVWXYZ';
    const [activeLetters, setActiveLetters] = useState([]);

    function showLetter(characterToShow) {
        if(!activeLetters.includes(characterToShow))
            setActiveLetters([...activeLetters, characterToShow]);

        let verify = false;
        const updatedDisplayWord = [...displayWord];
    
        for(let i = 0; i < updatedDisplayWord.length; i = i + 2)
            if(word[i / 2] === characterToShow) {
                updatedDisplayWord[i] = word[i / 2];
                verify = true;
            }
        
        if(verify){
            setDisplayWord(updatedDisplayWord.join(''));
            setCorrect(correct + 1);
        }
        else if(!verify) {
            setWrong(wrong - 1);
            if(wrong - 1 === 0)
                setShowModal(false);
        }
    }
    
    const [time, setTime] = useState(150);
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
                                        disabled={activeLetters.includes(letter)}
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
                                        disabled={activeLetters.includes(letter)}
                                    >
                                        {letter}
                                    </Button>{' '}
                                </>
                            ))}
                        </Col>
                    </Col>
                </Row>
            )}
            {(correct === word.length) && <WinModal/>}
            {(wrong === 0 || time === 0) && <FailModal/>}
        </Container>
    );
}
