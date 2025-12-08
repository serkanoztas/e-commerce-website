import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { FaGoogle } from "react-icons/fa";
import { useFormik } from 'formik';
import { AuthSchema } from '../schemas/AuthSchema';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../FireBase';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function SignUp() {

    const navigate = useNavigate();

    const submit = (values, action) => {
        setTimeout(() => {
            action.resetForm();
        }, 2000);
    }

    const { values, errors, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            name: '',
            password: '',
        },
        validationSchema: AuthSchema,
        onSubmit: submit
    });

    const signup = async () => {
        try {
            const response = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = response.user;
            if (user) {
                toast.success("SignUp succesfull");
                navigate('/auth');
            }
        } catch (error) {
            toast.error("SignUp failed");
        }
    }

    const provider = new GoogleAuthProvider;
    const signWithGoogle = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(response);
            const token = credential.accessToken;
            const user = response.user;
            if (user) {
                toast.success("Google ile kayıt başarılı");
                setTimeout(() => {
                   navigate('/auth'); 
                }, 2000);
            }
        } catch (error) {
            toast.error("Google ile kayıt başarısız");
        }
    }

    return (
        <div>
            <div className='register-main' onSubmit={handleSubmit}>
                <h3 className='register-title'>SignUp</h3>
                <input type="text" placeholder='name' className='register-input' value={values.name} onChange={handleChange} id='name' />
                {errors.name && <p className='errors'> {errors.name} </p>}
                <input type="email" className='register-input' placeholder='email' value={values.email} id='email' onChange={handleChange} />
                {errors.email && <p className='errors'> {errors.email} </p>}
                <input type="password" className='register-input' placeholder='password' value={values.password} onChange={handleChange} id='password' />
                {errors.password && <p className='errors'> {errors.password} </p>}
                <button className='register-button' type='submit' onClick={signup} >SignUp</button>
                <button className='register-button' type='submit' onClick={signWithGoogle}> <FaGoogle /> SignUp With Google </button>
            </div>
        </div>
    )
}

export default SignUp