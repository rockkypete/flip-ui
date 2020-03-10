# Intro
---

Flip-Ui is theme changing application built on node js using the express framewokrk.

# Description
***
## Frontend

at the front end a simple select form control is designed to make a *POST* request to the server with the theme selection along with it. Additionally, Two `<a>` tags with href attribute point to the [bootswatch api endpoint](https://bootswatch.com/api/4.json) from which a *GET* to consume the free themes api via Ajax and Fetch asynchronous calls.

## Backend
At the server, a _defaultUi.js_ file is created with object of 5 predefined bootswatch themes exported. this exported theme object is then imported into a **theme.js** route file. 
once a *POST* request is made to  /themes/local, the endpoint; a loop is made  through the imported themes object and an _if statement_ used to match each theme name to the selection submmited together with the form. once matched the server renders the home page together with an object of page title, Ui and msg.

- title : title of the page 
- Ui : the cdn of the selected theme applied to the `<link href="">`of the site.
- msg : a dismissible alert message display the name of the current  selected.

Also, if either of the Ajax or fetch button is clicked...sending a *GET* request to /themes/apiAjax or /themes/apiFetch; the respective asynchronuos function call is made to the bootswatch api to collect the object of 21 free themes. The response data is looped over and using a custom sleep async function a 2 seconds delay is set before rendering the home page with the appropriate theme cdn applied. see the code block below
***
javascript
let themeObjList = data.themes;
themeObjList.forEach( (theme, i)=>{
    sleep(i * 2000).then(()=>{
        res.render('home', {
            title: title, 
            Ui: `${theme.cssCdn }`, 
            msg: `theme ${theme.name} is now active!`
        });
    });
});
***

---

# Summary
---
Flip-Ui logic can be applied in applications that offers users the extra functionality of choosing different design template such as a music player skin changing feature or better still dashboard customization effect.

# links
- [git repo](https://github.com/rockkypete/flip-ui)
- [heroku link](https://flip-ui@heroku-apps.com) 



