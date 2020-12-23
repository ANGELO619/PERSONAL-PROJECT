import { Modal, Button } from 'react-bootstrap'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from "firebase";


export default function LoginDialog(props) {

    const options = {
        signInFlow: 'popup',
        callbacks: {
            signInSuccessWithAuthResult: () => {
                props.callback(false)
                return false
            },
        },
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        ],
    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Login
        </Modal.Title>
            </Modal.Header>
            <Modal.Body >
                <StyledFirebaseAuth uiConfig={options} firebaseAuth={firebase.auth()} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
