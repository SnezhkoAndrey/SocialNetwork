import React from 'react';
import { sendMessageCreator } from '../../redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import {withAuthRedirect} from '../../hoc/withAuthRedirect';
import {compose} from 'redux';

// const DialogsContainer = (props) => {

//     return (
//         <StoreContext.Consumer > 
//             { (store) => {
//             let state = store.getState();

//             let onSendMessageClick = () => {
//                 store.dispatch(sendMessageCreator());
//             }

//             let onNewMessageChange = (body) => {
//                 store.dispatch(updateNewMessageBodyCreator(body));
//             };
//             return <Dialogs 
//                 updateNewMessageBody={onNewMessageChange} 
//                 sendMessage={onSendMessageClick} 
//                 dialogs={state.dialogsPage.dialogs}
//                 messages={state.dialogsPage.messages}
//                 newMessageBody={state.dialogsPage.newMessageBody} />
//             }} 
//            </StoreContext.Consumer>
//     )
// }

let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}
let mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: (message) => {
            dispatch(sendMessageCreator(message));
        },
    }
}

// let AuthRedirectComponent = withAuthRedirect(Dialogs);

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (AuthRedirectComponent);

export default compose (
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
) (Dialogs); 