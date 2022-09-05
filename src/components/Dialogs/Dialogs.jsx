import s from './Dialogs.module.css';
import React from 'react';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import {Formik, Form, Field, ErrorMessage} from "formik";
import {validationSchemaMessageForm} from './DialogsValidation'
import {Textarea, ErrorForm} from '../common/Preloader/FormsControl/FormsControl'

const Dialogs = (props) => {
    
    let dialogsElements = props.dialogsPage.dialogs.map( d => <DialogItem name={d.name} key={d.id} id={d.id} />); 
    let messagesElements = props.dialogsPage.messages.map( m => <Message message={m.message} key={m.id} />);

    // let newMessageElement = React.createRef();

    let onSendMessageClick = (message) => {
        props.sendMessage(message);
    }
    
    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
                <div>
                    { messagesElements }
                </div>
                <AddNewMessageForm 
                    onSendMessageClick={onSendMessageClick} />
            </div>
        </div>
    )
}

const AddNewMessageForm = (props) => {
    return (
        <Formik
                initialValues={{
                    message: "",
                }}
                validationSchema = {validationSchemaMessageForm}
                onSubmit={(values) => {
                    if(values.message.length >= 1) {
                        console.log( values )
                        props.onSendMessageClick(values.message)}
                }}>
                    {() => (
                        <Form>
                            <div>
                                <Field name={'message'}
                                    type={'text'} 
                                    component={Textarea}
                                    placeholder='Enter your message...' 
                                    // onChange={onNewMessageChange} 
                                    // value={props.dialogsPage.newMessageBody} 
                                    />
                            </div>
                            <ErrorMessage name="message" component={ErrorForm} />
                            <div className={s.messageButton}>
                                <button type={'submit'} /*onClick={onSendMessageClick}*/>Send message</button>
                            </div>
                        </Form>
                    )}
        </Formik>
    )
}

export default Dialogs; 