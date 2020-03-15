import React from 'react';
const bcrypt = require('bcryptjs');

export default function Backdoor () {
    
    let hashedPassword = '';


    bcrypt.hash('Alohomora6ta', 10, function(err, hash){
        console.log(hash);
        hashedPassword = hash;
    });

    return (
        <p>{hashedPassword}</p>
    )

};