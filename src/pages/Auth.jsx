import React from 'react'
import Navbar from '../components/Navbar'
import { FaGoogle } from "react-icons/fa";
import { useFormik } from 'formik';
import { AuthSchema } from '../schemas/AuthSchema';
import { auth } from '../FireBase';
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function Auth() {

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

    const login = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, values.email, values.password);
            const user = response.user;
            if (user) {
                toast.success("SignIn Succesfull");
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            toast.error("SignIn Failed");
        }
    }

    const provider = new GoogleAuthProvider();

    const loginWithGoogle = async () => {
        try {
            const response = await signInWithPopup(auth, provider);
            const credential = GoogleAuthProvider.credentialFromResult(response);
            const token = credential.accessToken;
            const user = response.user;
            if (user) {
                toast.success("SignIn with google is succesfull");
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (error) {
            toast.error("SignIn with google is failed");
        }
    }

    return (
        <div>
            <div className='register-main' onSubmit={handleSubmit}>
                <h3 className='register-title'>SignIn</h3>
                <input id='email' type="email" className='register-input' placeholder='email' onChange={handleChange} value={values.email} />
                {errors.email && <p className='errors'> {errors.email} </p>}
                <input id='password' type="password" className='register-input' placeholder='password' onChange={handleChange} value={values.password} />
                {errors.password && <p className='errors'> {errors.password} </p>}
                <button className='register-button' type='submit' onClick={loginWithGoogle}> <FaGoogle /> SignIn With Google </button>
                <button className='register-button' type='submit' onClick={login}>SignIn</button>
                <button className='register-button' type='submit' onClick={() => navigate('/signup')} >SignUp</button>
            </div>
        </div>

    )
}

export default Auth