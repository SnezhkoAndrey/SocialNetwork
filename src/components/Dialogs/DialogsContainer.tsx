import React from "react";
import { actions, InitialStateType } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";

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

type MapStateToPropsType = {
  dialogsPage: InitialStateType;
};
type MapDispatchToPropsType = {
  sendMessage: (message: string) => void;
};

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    dialogsPage: state.dialogsPage,
  };
};
// let mapDispatchToProps = (dispatch) => {
//   return {
//     sendMessage: (message) => {
//       dispatch(actions.sendMessageCreator(message));
//     },
//   };
// };

// let AuthRedirectComponent = withAuthRedirect(Dialogs);

// const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (AuthRedirectComponent);

export default compose<React.ComponentType>(
  connect<
    MapStateToPropsType,
    MapDispatchToPropsType,
    /*OwnPropsType*/ null,
    AppStateType
  >(mapStateToProps, { sendMessage: actions.sendMessageCreator }),
  withAuthRedirect
)(Dialogs);
