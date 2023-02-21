import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, set, ref, get } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import { firebaseConfig } from "../firebase.js"

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();


const creatingRegForm = () => {
    const mainLoginFormContainer = document.querySelector('.mainLoginFormContainer');
    mainLoginFormContainer.innerHTML =
        `<div class="row justify-content-center">
        <div class="col-md-3">
            <div class="card">
                <h2 class="card-title text-center">Login form</h2>
                <div class="card-body py-md-4">
                    <form>
                        <div class="form-group">
                            <input type="email" class="form-control" id="loginEmail" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="loginPassword" placeholder="Password">
                        </div>
                        <div class="d-flex flex-row align-items-center justify-content-between">
                            <button class="btn btn-primary login-btn">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="col-md-3">
            <div class="card">
                <h2 class="card-title text-center">Registration form</h2>
                <div class="card-body py-md-4">
                    <form>
                        <div class="form-group">
                            <input type="email" class="form-control" id="regEmail" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" id="regPassword" placeholder="Password">
                        </div>
                        <div class="d-flex flex-row-reverse align-items-center justify-content-between">
                            <button class="btn btn-primary register-btn">Create Account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>`

    const loginBtnFunction = (e) => {
        e.preventDefault();
        const user_email = document.getElementById("loginEmail").value;
        const user_pass = document.getElementById("loginPassword").value;


        get(ref(database, 'Users/')).then((userSnapshot) => {
            const userData = userSnapshot.val();
            for (let data in userData) {
                if (user_email === userData[data].email && userData[data].banStatus === true) {
                    alert('jus esate uzbanintas')
                    
                } 
               
                
                if (user_email === userData[data].email && userData[data].banStatus === false) {
                    signInWithEmailAndPassword(auth, user_email, user_pass)
                        .then((userCredential) => {
                            console.log(userCredential.user.email)

                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            // ...
                        });
                } 
                // else if (user_email !== userData[data].email) {
                //     alert('nera paskyros');
                //     break;
                // }
            }

        })



    };

    const registerUserFunction = (e) => {
        e.preventDefault();
        console.log('paspaudziau')

        const email = document.getElementById('regEmail').value;
        console.log(email)
        
        const passwd = document.getElementById('regPassword').value;
        console.log(passwd)

        createUserWithEmailAndPassword(auth, email, passwd)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(`new user created ${user}`)

                const loginTime = new Date();
                set(ref(database, 'Users/' + user.uid), {
                    email: email,
                    role: 'simple_user',
                    timestamp: `${loginTime}`,
                    banStatus: false
                });
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                console.log(errorMessage)
            });
    };

    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');

    registerBtn.addEventListener('click', registerUserFunction);
    loginBtn.addEventListener('click', loginBtnFunction);
};





export { creatingRegForm }