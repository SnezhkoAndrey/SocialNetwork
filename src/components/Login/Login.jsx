import React from 'react';
import {Formik, Form, Field, ErrorMessage} from "formik";
import {Input, ErrorForm} from '../common/Preloader/FormsControl/FormsControl'
import {validateLoginForm, validationSchemaLoginForm} from './LoginValidation'
import {login} from '../../redux/auth-reducer';
import { connect } from 'react-redux';
import {Navigate} from 'react-router-dom';
import s from '../common/Preloader/FormsControl/FormsControl.module.css';
import st from './Login.module.css';

const Login = (props) => {
    if(props.isAuth) {
        return <Navigate to="/profile" />
    }
    return (
        <div className={st.loginContainer}>
            <h2>Login</h2>

            <LoginForm 
                login={props.login}
                messages={props.messages} />
        </div>
   )
}

const LoginForm = (props) => {
    return (
        <Formik
            initialValues={{
               email: "",
               password: "",
               rememberMe: false
            }}
            validate={validateLoginForm}
            validationSchema={validationSchemaLoginForm}
            onSubmit={(values) => {
               props.login( values.email, values.password, values.rememberMe )
            }}
         >
            {() => (
               <Form>
                  <div>
                     <Field
                        name={'email'}
                        type={'text'}
                        placeholder={'e-mail'}
                        component={Input} />
                  </div>
                  <ErrorMessage name="email" component={ErrorForm} />

                  <div>
                     <Field
                        name={'password'}
                        type={'password'}
                        placeholder={'password'}
                        component={Input} />
                  </div>
                  <ErrorMessage name="password" component={ErrorForm} />
                    <div className={s.errorForm}>{props.messages}</div>
                  <div>
                     <Field
                        type={'checkbox'}
                        name={'rememberMe'}
                        id='rememberMe' />
                     <label htmlFor={'rememberMe'}> remember me </label>
                  </div>

                  <button type={'submit'}>Login</button>
               </Form>
            )}
    </Formik>
    )
} 

const mapStateToProps = (state) => ({
    isAuth:state.auth.isAuth,
    messages: state.auth.messages,
})

export default connect (mapStateToProps, {login}) (Login);