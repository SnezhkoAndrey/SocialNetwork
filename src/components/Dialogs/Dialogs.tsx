import s from "./Dialogs.module.css";
import React from "react";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validationSchemaMessageForm } from "./DialogsValidation";
import {
  Textarea,
  ErrorForm,
} from "../common/Preloader/FormsControl/FormsControl";
import { InitialStateType } from "../../redux/dialogs-reducer";

type MapStateToPropsType = {
  dialogsPage: InitialStateType;
};
type MapDispatchToPropsType = {
  sendMessage: (message: string) => void;
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const Dialogs: React.FC<PropsType> = (props) => {
  let dialogsElements = props.dialogsPage.dialogs.map((d) => (
    <DialogItem name={d.name} key={d.id} id={d.id} />
  ));
  let messagesElements = props.dialogsPage.messages.map((m) => (
    <Message message={m.message} key={m.id} />
  ));

  // let newMessageElement = React.createRef();

  let onSendMessageClick = (message: string) => {
    props.sendMessage(message);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
        <AddNewMessageForm onSendMessageClick={onSendMessageClick} />
      </div>
    </div>
  );
};

type AddMessagePropsType = {
  onSendMessageClick: (message: string) => void;
};

const AddNewMessageForm: React.FC<AddMessagePropsType> = (props) => {
  return (
    <Formik
      initialValues={{
        message: "",
      }}
      validationSchema={validationSchemaMessageForm}
      onSubmit={(values) => {
        if (values.message.length >= 1) {
          console.log(values);
          props.onSendMessageClick(values.message);
        }
      }}
    >
      {() => (
        <Form>
          <div>
            <Field
              name={"message"}
              type={"text"}
              component={Textarea}
              placeholder="Enter your message..."
              // onChange={onNewMessageChange}
              // value={props.dialogsPage.newMessageBody}
            />
          </div>
          <ErrorMessage name="message" component={ErrorForm} />
          <div className={s.messageButton}>
            <button type={"submit"} /*onClick={onSendMessageClick}*/>
              Send message
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default Dialogs;
