# Amazon Prime Video Clone

![logo](https://m.media-amazon.com/images/G/01/primevideo/seo//primevideo-seo-logo._CB1544649803_.png)
This project is amazon prime video  clone build in MERN Stack. 

**Features** 

* Registered and Guest users can Watch the trailer of movies
* Select movies in different languages
* Only registered user can add movies and tv shows to their watchlist
* While resetting the password registered user will receive email and through the link present inside the email user will reset the password 


## **Gifs**

### Weclome page
* Desktop view

![Desktop view welcome page](./static/desktopwelcomepage.gif)

* Mobile view 

![Mobile view welcome page](./static/mobilewelcomepage.gif)

### Signin page
![Signin page](./static/signin.gif)


### Signup page
![Signup page](./static/signup.gif)

### Home page
![Home page](./static/home.gif)

### Watch in your language
![Watch in your language](./static/watchinyourlanguage.gif)

### Tv Shows page
![Tv Shows page](./static/tvshows.gif)

### Movies page
![Movies page](./static/movies.gif)

### Kids page
![Kids page](./static/kids.gif)

### Watch Trailer
![Watch Trailer](./static/watchtrailer.gif)

### Feedback form 
![Feedback form](./static/feedbackform.gif)

### Form footer
![Form footer](./static/formfooter.gif)

### Password reset link is inactive
![inactive password reset link](./static/passwordresetlinkinactive.gif)


**Reference** : 

* Icons are used from  material ui  
    https://material-ui.com/components/material-icons/

* All movie and tv shows information taken  from TMDB API 
    https://developers.themoviedb.org/3

* To play trailer react-youtube npm package used 
    https://www.npmjs.com/package/react-youtube 


**There are two methods for getting started with this repo.**


#### Familiar with Git ?

```
> git clone https://github.com/bhagat-hrishi/amazon-prime-clone.git
> cd client
> npm install
> npm start
> cd server 
> npm install
> node index
```

#### Not Familiar with Git ?
download the .zip file.  Extract the contents of the zip file, then open your terminal, change to the project directory, and:

```
> cd client
> npm install
> npm start
> cd server 
> npm install
> node index
```

**Configuration for .env file** 
* Note 
    
    Create *.env*  file in client and server folder

*  Content of .env For client

    REACT_APP_API_KEY = Enter your tmdb api key

* Content of .env For server

    MONGO_ATLAS_PW = dbpassword

    DB_URL = db url from mongodb atlas

    FEEDBACK_GMAIL = email id

    CLIENT_ID = client id

    CLIENT_SECRET = client secret

    REDIRECT_URI = https://developers.google.com/oauthplayground

    REFRESH_TOKEN = refresh token




