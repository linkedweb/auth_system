# Auth System

This is a project that demonstrates how you could implement a fully featured JSON Web Token Authentication system in Django and React. This includes showing how to implement features like account activation, password reset, and also social authentication with google and facebook oauth2. Further improvements to make it more production ready would just be to utilize the refresh token to get a new access token when the application reloads and also reloads when you go to an important page such as a checkout page, and having alerts present on the frontend to make things more user friendly.

In order to test out this project, follow these steps:

-   clone the repository
-   in the frontend folder, run: npm install, this will install the required frontend packages
-   in the frontend folder, run: npm run build, this will make a build folder and copy it into the backend folder
-   in the backend folder, run: python3 -m venv venv
-   then activate the virtual environment
-   in the backend folder, run: pip install -r requirements.txt

Then under backend/auth_system/settings.py:

-   under DATABASES, set the PASSWORD field to your database password
-   under EMAIL_HOST_USER, set the email that you want to use
-   under EMAIL_HOST_PASSWORD, set the app password that you setup for your email
-   under SOCIAL_AUTH_GOOGLE_OAUTH2_KEY, paste in your google oauth2 key
-   under SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET, paste in your google oauth2 secret
-   under SOCIAL_AUTH_FACEBOOK_KEY, paste in your facebook oauth2 key
-   under SOCIAL_AUTH_FACEBOOK_SECRET, paste in your facebook oauth2 secret

If you get an error when using social authentication that says "ModuleNotFoundError: No module named 'django.utils.six", then do the following:

-   Open the file "venv/lib/python3.X/site-packages/djoser/social/token/jwt.py"
-   Change the line "from django.utils.six import text_type" to "from six import text_type"
-   With this change you should be able to log in using Google and Facebook OAuth2
