## Save Tuba Teacher Interface

This is our teacher interface for the Save Tuba platform. Please refer to the main [/saveTuba README](https://github.com/SaveTubaTeam/saveTuba) for non-technical project descriptions, learning resources, developer access, etc.


https://github.com/user-attachments/assets/efb5abd2-ccd2-46e9-b23e-5345a85679ae


### Tech Stack

We use React, Redux, Firebase, and a few other notable libraries:

- [React Router](https://reactrouter.com/en/main/start/tutorial) - page router built by the Remix.js team
- [Moment.js](https://momentjs.com/docs/#/use-it/) - for handling international JS dates/timezones (should be migrated to [Luxon](https://momentjs.com/docs/#/-project-status/))
- [Recharts](https://recharts.org/en-US/) - customizable React chart components
- [MUI](https://mui.com/material-ui/getting-started/) - for a few custom styled components
- [i18next](https://react.i18next.com/) - Javascript internationalization framework.

### To get started:
```
git clone https://github.com/SaveTubaTeam/saveTubaTeacher.git
cd ./saveTubaTeacher
npm install
```

### Run the following to open up in localhost:
```
npm run dev
```

### Deployment

We are using Firebase Hosting for deployment onto our subdomain https://teacher.savetuba.com 

As of 2024 the savetuba.com domain is paid for by our faculty advisor, Sean Vassilaros. All DNS Records for the domain can be accessed via the team's WordPress account. 

To build our website, run the following: 

```
npm run build
```

After running you will see that a 'dist' folder has been made; this is where our application bundle lives. Next, to deploy to Hosting, run the below command.

```
firebase deploy --only hosting
```

Documentation for the above instructions can be found here: https://firebase.google.com/docs/hosting/quickstart

@jac927 11/2/24 | I've  set up deployment so that our public build folder is set to 'dist' (which is gitignored), so every time you want to deploy you should follow the above steps for manual deployment. In the future, a proper [GitHub Actions pipeline](https://firebase.google.com/docs/hosting/github-integration) can be set up to avoid manual deployment to prod. Use the below command to start configuring GitHub Actions:

```
firebase init hosting:github
```

You might also look into a pre-prod staging environment using Firebase Hosting's preview feature: https://firebase.google.com/docs/hosting/test-preview-deploy