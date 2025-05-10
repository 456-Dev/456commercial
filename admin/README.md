# Admin System Setup Guide

This guide explains how to set up the admin system and Firebase integration for your event booking system.

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Once your project is created, click "Web" to add a web app to your project
4. Register your app with a nickname (e.g., "THEY SAID YOU CAN'T")
5. Copy the Firebase configuration object which looks like:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## 2. Set Up Firestore Database

1. In the Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Start in test mode for development (you can adjust security rules later)
4. Choose a location closest to your target audience

## 3. Set Up Authentication

1. In the Firebase Console, go to "Authentication"
2. Click "Get started"
3. Enable the "Email/Password" sign-in method
4. Go to "Users" tab and click "Add user"
5. Create an admin user with your email and a secure password

## 4. Update Configuration in Files

Replace the Firebase configuration in these files with your actual Firebase config:

- `index.html` (main site)
- `admin/index.html` (admin login)
- `admin/dashboard.html` (admin dashboard)

Look for this section in each file and replace it:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project-id.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project-id.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

## 5. Access the Admin Dashboard

1. Upload all files to your web server
2. Navigate to `/admin/` in your browser
3. Log in with the admin email and password you created
4. You can now manage events and view bookings

## 6. Firestore Data Structure

The system uses two main collections:

### Events Collection

This stores all the event information:

```
events/
  {event_id}/
    name: "Event Name"
    date: "Sat, November 9th, 2024 | 11:00 AM - 3:00 PM"
    location: "Meet near the South Plaza fountain."
    totalSlots: 25
    bookedSlots: 0
```

### Bookings Collection

This stores all the booking information:

```
bookings/
  {booking_id}/
    eventName: "Event Name"
    eventId: "{event_id}"
    bookEdition: "Standard Edition - $20"
    email: "customer@example.com"
    phone: "555-123-4567"
    instagram: "@username"
    timestamp: Timestamp
```

## 7. Security Considerations

For production deployment:

1. Update Firestore security rules to restrict access
2. Configure proper authentication rules
3. Consider adding email verification
4. Set up backups for your Firestore data

## 8. Troubleshooting

If you encounter issues:

- Check browser console for JavaScript errors
- Verify your Firebase credentials are correct
- Ensure your Firebase project has Firestore and Authentication enabled
- Check that you have proper permissions in your Firebase project 