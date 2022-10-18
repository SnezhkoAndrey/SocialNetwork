import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Input,
  ErrorForm,
} from "../common/Preloader/FormsControl/FormsControl";
import {
  validateLoginForm,
  validationSchemaLoginForm,
} from "./LoginValidation";
import { logIn } from "../../redux/auth-reducer";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import s from "../common/Preloader/FormsControl/FormsControl.module.css";
import st from "./Login.module.css";
import { AppStateType } from "../../redux/redux-store";
import { AnyAction } from "redux";

type PropsType = {};

const Login: React.FC<PropsType> = (props) => {
  const captchaUrl = useSelector(
    (state: AppStateType) => state.auth.captchaUrl
  );
  const messages = useSelector((state: AppStateType) => state.auth.messages);
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);

  const dispatch = useDispatch();

  const login = (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ) => {
    dispatch(
      (logIn(email, password, rememberMe, captcha) as unknown) as AnyAction
    );
  };

  if (isAuth) {
    return <Navigate to="/profile" />;
  }
  return (
    <div className={st.loginContainer}>
      <h2>Login</h2>

      <LoginForm logIn={login} messages={messages} captchaUrl={captchaUrl} />
    </div>
  );
};

type PropsLoginFormType = {
  logIn: (
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string | null
  ) => void;
  messages: Array<string> | null;
  captchaUrl: string | null;
};

const LoginForm: React.FC<PropsLoginFormType> = (props) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        rememberMe: false,
        captcha: null,
      }}
      validate={validateLoginForm}
      validationSchema={validationSchemaLoginForm}
      onSubmit={(values) => {
        props.logIn(
          values.email,
          values.password,
          values.rememberMe,
          values.captcha
        );
      }}
    >
      {() => (
        <Form>
          <div>
            <Field
              name={"email"}
              type={"text"}
              placeholder={"e-mail"}
              component={Input}
            />
          </div>
          <ErrorMessage name="email" component={ErrorForm} />

          <div>
            <Field
              name={"password"}
              type={"password"}
              placeholder={"password"}
              component={Input}
            />
          </div>
          <ErrorMessage name="password" component={ErrorForm} />
          <div className={s.errorForm}>{props.messages}</div>
          {props.captchaUrl && <img src={props.captchaUrl} />}
          {props.captchaUrl && (
            <div>
              <Field
                name={"captcha"}
                type={"text"}
                placeholder={"captcha"}
                component={Input}
              />
            </div>
          )}
          <div>
            <Field type={"checkbox"} name={"rememberMe"} id="rememberMe" />
            <label htmlFor={"rememberMe"}> remember me </label>
          </div>

          <button type={"submit"}>Login</button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;
