## Add Firebase Firestore to Your React App


### ✅ Step 1: Enable Firestore in Firebase Console

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Select your project
3. In the left sidebar, go to **Firestore Database**
4. Click **Create database**
5. Choose **Start in test mode** (for dev/testing) → **Next**
6. Choose region → **Enable**

### ✅ Step 2: Initialize Firestore in `firebase.js`

Add `src/firebase.js`:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
```
### ✅ Step 3: Set up rules in Firestore

### ✅ Step 4: Add Data to Firestore


### ✅ Step 5: Read Data from Firestore

### ✅ Step 6: Update Data
