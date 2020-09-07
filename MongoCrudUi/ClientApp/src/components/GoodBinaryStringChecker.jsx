import React, { useState } from 'react';
import axios from 'axios';
import { TEXTS } from '../Constants';
import { Button, Input } from 'reactstrap';

export const GoodBinaryStringChecker = () => {
    const [binaryString, setBinaryString] = useState("");
    const [resultStr, setResultStr] = useState("");

    const onChange = value => {
        if (!value) {
            setResultStr("");
        } else {
            setBinaryString(value);
        }
    }

    const onSubmit = e => {
        e.preventDefault();

        if (!binaryString) return;

        axios.get(TEXTS.BASE_URL + 'IsBinaryStringGood', { params: { binaryString } }).then(response => {
            if (response.data) {
                setResultStr("String is Good.");
            } else {
                setResultStr("String is Bad.");
            }

        }).catch(error => {
            console.log(error);
        });
    }

    const divStyle = {
        display: 'flex',
        alignItems: 'center',
    };

    return (
        <div className="container app flex-row align-items-center">
            <form onSubmit={onSubmit}>
                <div style={divStyle}>
                    <Input bsSize="sm" style={{ width: '300px', margin: '7px' }} type="text" name="BinaryStr" id="BinaryStr" placeholder="Binary String"
                        onChange={e => onChange(e.target.value)} />
                    <Button size='sm' style={{ width: '300px', marginRight: '15px' }} type="submit" className="btn btn-info" block><span>Check String</span></Button>
                    <span>{resultStr}</span>
                </div>
            </form>
        </div>
    );
}