## Save Tuba Teacher Interface

This is our teacher interface for the Save Tuba platform. Please refer to the main [/saveTuba README](https://github.com/SaveTubaTeam/saveTuba?tab=readme-ov-file#savetuba) for non-technical project descriptions, learning resources, developer access, etc.


https://github.com/user-attachments/assets/efb5abd2-ccd2-46e9-b23e-5345a85679ae


### Tech Stack

We use React, Redux, Firebase, and a few other notable libraries:

- [React Router](https://reactrouter.com/en/main/start/tutorial) - page router built by the Remix.js team
- [Moment.js](https://momentjs.com/docs/#/use-it/) - for handling international JS dates/timezones (should be migrated to [Luxon](https://momentjs.com/docs/#/-project-status/))
- [Recharts](https://recharts.org/en-US/) - customizable React chart components
- [MUI](https://mui.com/material-ui/getting-started/) - for a few custom styled components
- [i18next](https://react.i18next.com/) - Javascript internationalization framework.

### Screen Requirment
- Screens need to have a resolution width of 1920 x (#)

### To get started:
```
git clone https://github.com/SaveTubaTeam/saveTubaTeacher.git
cd ./saveTubaTeacher
npm install
or
npx npm install
```

### Run the following to open up dev environment in localhost:
```
npm run dev
or
npx vite
```

## Deployment

As of 2024 the savetuba.com domain is paid for by our faculty advisor Sean Vassilaros. All DNS Records for the domain can be accessed via the team's WordPress account. For this repo, we are using Firebase Hosting for deployment onto our subdomain https://teacher.savetuba.com

In order to deploy with Firebase Hosting, we first need to install the Firebase CLI. Follow the instructions here to install: https://firebase.google.com/docs/cli

    Windows:
        npm install -g firebase-tools
        OR
        npx npm install -g firebase-tools

    Login:
        Used savetuba email login


To build our application bundle, run the following: 

```
npm run build
OR 
npx npm run build
```

After running you will see that a gitignored 'dist' folder has been created; this is where our application bundle lives. Next, to deploy to Hosting, run the below command:

```
firebase deploy --only hosting
```


# Connecting a new database environment:

    Add the new database 
        ```
        firebase use --add
        ```
    Select the database and name it's alias

    Ensure you have added the "authDomain" from firebase.js into Firebase console:
        Console --> Authentication --> Settings --> Authorized Domains
        **look at the existing domains in the console, there's two domains you have to add for 1 database



Switch between databases:
```
firebase use production  (savetuba-t)
or
firebase use default   (savetuba-5e519)
```


Ensure you are accessing the right domain:
    Production:
        https://savetuba-t.web.app

    Development:
        https://savetuba-5e519.web.app/




Documentation for the above instructions can be found here: https://firebase.google.com/docs/hosting/quickstart

*@jac927 11/2/24 | I've  set up deployment so that our public build folder is set to 'dist' (see the firebase.json config file), so every time you want to deploy you should follow the above steps for manual deployment. In the future, a proper [GitHub Actions pipeline](https://firebase.google.com/docs/hosting/github-integration) can be set up to avoid manual deployment to prod. Use the below command to start configuring GitHub Actions:*

```
firebase init hosting:github
```

*You might also look into a pre-prod staging environment using Firebase Hosting's preview feature: https://firebase.google.com/docs/hosting/test-preview-deploy*