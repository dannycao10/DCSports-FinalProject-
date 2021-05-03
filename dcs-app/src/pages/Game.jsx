import { Form, Container, Button } from 'react-bootstrap';
import Axios from "axios";
import React, { useState, useContext, useEffect } from 'react'
import { useHistory } from "react-router-dom";
import UserContext from '../context/UserContext.js';
import '../style/Game.css'
import uri from '../context/APIPort';

function Game (){
    const { userData, setUserData } = useContext(UserContext);
    const [dcs, setDCS] = useState(userData.userInfo.dcs);

    const handleChange = async (e) => {
        // e.preventDefault();
        const updatedDCS = {
          user: userData.userInfo._id,
        }
        await Axios.put(uri + "/assets/updateDCS", updatedDCS)
    }

    const changeDCS = () => {
        console.log(dcs)
        setDCS(dcs + 100);
        handleChange();
    }

    return (
        <>
            <Button onClick={changeDCS}>Test</Button>
        </>
    )
}

export default Game;