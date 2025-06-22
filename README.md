1. How to Run the Project Locally :

Step 1: Clone Both Repositories
git clone https://github.com/Deepak-Sagar-007/music-library.git
git clone https://github.com/Deepak-Sagar-007/main-app.git

Step 2: Setup and Serve music-library (Micro Frontend)
cd music-library
npm install
npm run build
npx serve dist --cors -l 3000

This builds and serves the music-library app.

It exposes the remote module at:
: http://localhost:3000/assets/remoteEntry.js

Step 3: Setup and Run main-app (Container)

cd main-app
npm install

edit vite.config.js in main-app
remotes: {
  music_library: 'http://localhost:3000/assets/remoteEntry.js',
}
npm run dev
 visit - http://localhost:5173
--------------------------------------------------------------------------------------------------------------------------
2. How You Deployed It :
The project is split into two separate apps and deployed independently on Netlify:

 A. Deployment of music-library (Micro Frontend)
Steps:
1 Pushed to GitHub → music-library GitHub Repo
2 Logged into Netlify and selected "Import from Git"
3 Selected the music-library GitHub repository
4 Set the following build settings:
5 Build command: npm run build
6 Publish directory: dist
7 Clicked Deploy Site

Final Deployed URL: https://music-container.netlify.app/

 Important CORS Fix:
To allow the main-app to load this remote app, a _headers file was added to music-library/public:
/assets/*
  Access-Control-Allow-Origin: *
  This enabled cross-origin loading of remoteEntry.js.

B. Deployment of main-app (Container App)
Steps:
1 Pushed to GitHub → main-app GitHub Repo
2 Logged into Netlify and selected "Import from Git"
3 Selected the main-app GitHub repository
4 Set the following build settings:
5 Build command: npm run build
6 Publish directory: dist
7 Clicked Deploy Site

Final Deployed URL: https://main-application.netlify.app/

 Remote Config in vite.config.js:
In main-app/vite.config.js, the micro frontend was connected like this:
remotes: {
  music_library: 'https://music-container.netlify.app/assets/remoteEntry.js',
}
This lets the container app dynamically load the remote MusicLibrary component at runtime.
--------------------------------------------------------------------------------------------------------------------------

3. 	Credentials for demo (admin and user) :

| Role   | Username | Password   |
|--------|----------|------------|
| Admin  | admin    | admin123   |
| User   | user     | user123    |
Use the above login credentials to test the application.
--------------------------------------------------------------------------------------------------------------------------

4. Explanation of how micro frontend and role-based auth work :

A. Micro Frontend Architecture (Using Module Federation):
The app is split into two separate projects:
main-app – the container application
music-library – the micro frontend remote app
The music-library exposes its main component (MusicLibrary) via Module Federation using the vite-plugin-federation plugin:
// music-library/vite.config.js
exposes: {
  './MusicLibrary': './src/MusicLibrary.jsx'
}

The main-app dynamically loads this remote component using:
const MusicLibrary = React.lazy(() => import('music_library/MusicLibrary'));
The remote is defined in the vite.config.js of the main app like this:
remotes: {
  music_library: 'https://music-container.netlify.app//assets/remoteEntry.js',
}
This allows the main-app to consume a component from a completely separate deployed app at runtime.

B. Role-Based Authentication System
When a user logs in, their credentials are checked locally (no backend) and a fake JWT-like token is saved to localStorage.
This user information is stored in a global AuthContext (using React Context API) and is available throughout the app.
When the MusicLibrary component is loaded, the user info is passed down via props:
<MusicLibrary user={currentUser} />
Inside MusicLibrary.jsx, role-based conditions are applied to render certain actions:
{user?.role === 'admin' && <button>Add Song</button>}
As a result:
Admins can see "Add" and "Delete" buttons
Users only see the list with sorting and filtering options.

-------------------------------------------------------END----------------------------------------------------------------
