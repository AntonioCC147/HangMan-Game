import React, { useState, useEffect } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import WinModal from '../../components/modals/winModal';
import FailModal from '../../components/modals/failModal';

import { words } from '../../components/words';

import heart from '../../assets/icons/heart.png';
import gallows1 from '../../assets/gallows/gallows1.png';
import gallows2 from '../../assets/gallows/gallows2.png';
import gallows3 from '../../assets/gallows/gallows3.png';
import gallows4 from '../../assets/gallows/gallows4.png';
import gallows5 from '../../assets/gallows/gallows5.png';

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
            if(word[i] !== '-')
                result += character + " ";
            else
                result += "- ";

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
            if(correct + 1 === word.length)
                setShowModal(false);
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
                    <p className="title">HangMan Game</p>
                    <Row className="right">
                        {(() => {
                            const hearts = [];
                            for(let i = 0; i < wrong; i++)
                                hearts.push(<img key={i} src={heart} className="heart" alt="Heart" />);
                            return hearts;
                        })()}
                        <p className="right time">Time left: {time} seconds</p>
                    </Row>
                    <Row>
                        <Col sm={4} className="text-center">
                            {wrong === 5 && ( <img src={gallows1} alt="Gallows1"/> )}
                            {wrong === 4 && ( <img src={gallows2} alt="Gallows2"/> )}
                            {wrong === 3 && ( <img src={gallows3} alt="Gallows3"/> )}
                            {wrong === 2 && ( <img src={gallows4} alt="Gallows4"/> )}
                            {wrong === 1 && ( <img src={gallows5} alt="Gallows5"/> )}
                        </Col>
                        <Col sm={8}>
                            <Col sm={12} className="text-center">
                                <p className="displayWord">{displayWord}</p>
                            </Col>
                            <Col sm={12} className="text-center">
                                <div>
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
                                    <br /><br />
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
                                </div>
                            </Col>
                        </Col>
                    </Row>
                </Row>
            )}
            {(correct === word.length) && <WinModal word={word}/>}
            {(wrong === 0 || time === 0) && <FailModal word={word}/>}
        </Container>
    );
}
