# node-js-mysql-login-app

![image](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)![image](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)![image](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

![image](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)![image](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)![image](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)

## App overview
This web application is a login and registration application. It is built using `node.js` and `mysql` as backend. It makes use of `jsonWebToken` in order to record the login sessions. It uses `handlebars` as its **view engine**. The application is tested on `google chrome` browser.

This application is built by keeping in mind the best practices which can be used to develop node application. Although, perfection and learning is an life-long process so I will continue to make use of best practices going along.

## Key features
**SECURITY:**
1. Password is encrypted inside of mysql table.
2. Database is hosted on **clearDB** platform which provides its own security mechanisms.
3. The application is made **sql-injection and xss** proof. Although, some more work might be needed.
4. Vulnerabilities are dealt in the best possible way.

**CURRENT FEATURES:**
1. **Login** route is successfully handled.
2. **Register** route is successfully handled.
3. The **name of user and his/her email** is successfully rendered according to current logged in user.
4. **Profile** page is shown to only those users who are logged in.
5. **The navbar** of each page is maintained according to the current status of user.

**CHECKLIST [TODO]:**
- [x] Compress the slug size.
- [x] Implement user-friendly logger using best practices.
- [ ] Make efficient use of cluster.
- [x] Set up various HTTP headers to prevent attacks like Cross-Site-Scripting(XSS), click-jacking, etc.
- [ ] Implement forgot password and change password functionality in the app.
- [ ] Implement different user registration options.
- [ ] Implement an admin account which has root-level access.  

## References
1. [Free Code Camp](https://www.youtube.com/watch?v=fsCjFHuMXj0)
2. [Stack overflow Link 1](https://stackoverflow.com/q/40119964)
3. [Stack overflow Link 2](https://stackoverflow.com/q/51849010)
4. [Stack overflow Link 3](https://stackoverflow.com/questions/54641529/cleardb-connecting-with-npm-run-start-but-not-with-heroku-deploy-err-connecti)
5. [Stack overflow Link 4](https://stackoverflow.com/questions/10974360/heroku-error-h12-request-timeout-issue)
6. [Stack overflow Link 5](https://stackoverflow.com/a/62789964)
7. [Blog post](https://bezkoder.com/deploy-node-js-app-heroku-cleardb-mysql/)
8. [ClearDB](https://devcenter.heroku.com/articles/cleardb#:~:text=Local%20setup,-The%20ClearDB%20dedicated&text=done-,Once%20in%20the%20ClearDB%20portal%2C%20simply%20click%20on%20the%20Databases,to%20build%20your%20new%20DATABASE_URL.)
9. [nodejs best practices with heroku](https://devcenter.heroku.com/articles/node-best-practices)
10. [HELPFUL REPO](https://github.com/paschmann/rasa-ui)

## Deployment Link
**The app is deployed [here](https://login-registration-oyster.herokuapp.com/).**
