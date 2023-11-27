# Firebase Chat App with Next.js 14 and Tailwind CSS

Welcome to the Firebase Chat App built with Next.js 14 and Tailwind CSS! This real-time chat application integrates Firebase for authentication and Firestore for managing messages.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/PiyushKalyanpy/cloud-firebase-chatapp.git
   cd my-firebase-chat-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Set up a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
2. Obtain your Firebase configuration (apiKey, authDomain, projectId, etc.).
3. Create a file named `firebase.js` in the project's root with the following content, replacing the placeholder values:

   ```javascript
   // firebase.js
   import firebase from 'firebase/app';
   import 'firebase/auth';
   import 'firebase/firestore';

   const firebaseConfig = {
     apiKey: 'YOUR_API_KEY',
     authDomain: 'YOUR_AUTH_DOMAIN',
     projectId: 'YOUR_PROJECT_ID',
     storageBucket: 'YOUR_STORAGE_BUCKET',
     messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
     appId: 'YOUR_APP_ID',
   };

   if (!firebase.apps.length) {
     firebase.initializeApp(firebaseConfig);
   }

   export const auth = firebase.auth();
   export const firestore = firebase.firestore();
   ```

### Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and visit [http://localhost:3000](http://localhost:3000) to view the chat app.

## Features

- User authentication with Firebase.
- Real-time chat updates using Firestore.
- Simple and intuitive UI.

## Folder Structure

The project follows a structured organization for easy navigation:

```
- /components
- /pages
- /public
- /firebase
- /styles
- /utils
- next.config.js
- tailwind.config.js
- ...
```

## Customization

Feel free to customize the app according to your needs. Explore the components, styles, and utilities to make it your own!

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- This project was built with Next.js, Firebase, and Tailwind CSS.
- Inspiration from [Firebase](https://firebase.google.com/) and [Tailwind CSS](https://tailwindcss.com/).

Thank you for checking out our Firebase Chat App! If you have any questions or suggestions, feel free to open an issue or reach out to us.

Happy coding! 🚀✨