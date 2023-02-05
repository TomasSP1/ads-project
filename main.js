// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, 
        set, 
        ref, 
        update,
        child,
        get,
        remove,
        onValue } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";
import { getAuth, 
        createUserWithEmailAndPassword, 
        signInWithEmailAndPassword, 
        signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


import {firebaseConfig} from "./firebase.js"


import {creatingRegForm} from "./modules/regFormModule.js";
import {creatingLogoutBtn} from "./modules/logoutBtnModule.js"       
import {userTable} from "./modules/userTableModule.js";
import {categoryTable} from "./modules/categoryTableModule.js";
import {logoutCleanPage, cleanAllTables, cleanRegForm} from "./modules/cleanPageModule.js";
import {userRoleIdentifikcation} from "./modules/roleIdentificationModule.js";
import {creatingAdsForm} from "./modules/ADSregForm.js";
import {adsTableCreation} from "./modules/AdsTableCreationModule.js";




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
// userio statuso patikrinimas
const user = auth.currentUser;



onAuthStateChanged(auth, (user) => {
    
  if (user) {
        
        logoutCleanPage();

        adsTableCreation(user.uid);
        
        userRoleIdentifikcation().then(data => {

            if (data === 'admin') {
                console.log('admin log in')
                cleanRegForm();
                creatingLogoutBtn();
                userTable();
                categoryTable();
                // adsContainers();

            } else {
                console.log('simple user log in');
                cleanRegForm();
                cleanAllTables();
                creatingLogoutBtn();
                creatingAdsForm();
                
    
                
                
            }
        });
    } else {
        logoutCleanPage();
        creatingRegForm();
        
    }      
});



