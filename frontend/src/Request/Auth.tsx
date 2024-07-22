import React, { useState } from 'react'
import { RegisterInputs } from '../type'

export const addNewUser = async (inputs: RegisterInputs) => {
    const requestConfig: RequestInit = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(inputs)
    }
    try {
        const response = await fetch('http://localhost:5000/api/auth/register', requestConfig

        )
        if (!response.ok) {
            console.log('Registration successful')
        } else {
            console.log('Registration successful')
            return response.ok
        }
    }
    catch (err) {
        console.log(err)
    }
}