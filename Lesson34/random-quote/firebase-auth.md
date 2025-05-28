# Firebase Auth + React Context (CRA, Firebase v9+)

### ✅ Step 1: Create a Firebase Project

1. Go to [https://console.firebase.google.com](https://console.firebase.google.com)
2. Click **"Add project"** → follow the wizard
3. After the project is created, go to **Project settings**
4. Under **"Your apps"**, choose `</>` (Web)
5. Register your app and copy the Firebase config

---

### ✅ Step 2: Install Firebase SDK

In your React project root:

```bash
npm install firebase
```

---

### ✅ Step 3: Initialize Firebase

Create `src/firebase.js`:

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  appId: "YOUR_APP_ID",
  // Include other keys if needed (e.g., storageBucket)
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

> 🔐 Replace `firebaseConfig` with your own Firebase project details.

---

### ✅ Step 4: Enable Authentication Method

1. In the Firebase Console
2. Go to **Authentication** > **Sign-in method**
3. Enable:

   * **Email/Password**
   * (Optional: Google, GitHub, etc.)

---

### ✅ Step 5: Create an Auth Context

### ✅ Step 6: Wrap Your App with `AuthProvider`

### ✅ Step 7: Build Your Auth UI

### ✅ Step 8: Use Auth in `App.js`

