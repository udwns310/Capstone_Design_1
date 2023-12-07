import React, { useState } from 'react';
import { Input } from '@mui/base/Input';
import { Button } from '@mui/base/Button';
import './InputField.css';

function InputField(props) {
    return (
        <div>
            <div className="input-area">
                <div className="plus-button">+</div>
                <form className="input-container">
                    <Input placeholder="Type in here…" value={props.message} multiline={false} rows={1} />

                    <Button disabled={props.message === ''} type="submit" className="send-button">
                        전송
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default InputField;
