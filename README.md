# Set a newsletter who save users data in real time. 
## We'll need a page service that can save the mail data in the cloud, we are using Mail chimp for this.

1- First go to mailchimp.com, if you're new, then create an account.

2- You need two data numbers to start working, an API key and an Audience List Id.

    - API key is found clicking in your profile name > Account, then look for Extras drop menu > API keys (copy this number and save it on a notepad).

    - Audience List Id, this one is tricky, because for the first time there will be no audience.  
    For the first time, in left menu select Contacts > All contacts. If you have just created your account, there should be only your user account.   
    Select Settings drop menu > Audience name and defaults. Check Audiennce ID section, copy that number and save it on a notepad.   
    Once your audience is created and filled with other emails, the "Contacts" menu turned into "Audience".

3- This is the actual endpoint you will need in order to post to your list -
After create an account in Mailchimp, here are the credentials you need to use:

    const url = " https://<dc>.api.mailchimp.com/3.0/lists/<YOUR LIST ID>";

    <dc> stands for data center, and you should get that from the last few characters in your api key. 
    Eg: Your API Key : b54xxxxxxxxxxxxxxxxxxa1e65d274c9-us13 | <dc> = us13.

    const options = {
        method: "POST",
        auth: "ANYTHING-HERE:b54xxxxxxxxxxxxxxxxxxa1e65dxxxc9-us13"
    }

***The API key and list(Audience) Id can expire with time, be sure to constantly check mail chimp for these two values and update accordingly in your app.js file.***

## Publish online:

To make this api visible in the internet we are using the free website https://render.com/
If you don't have an account, create one. 
(For a better performance, connect render with GitHub account, and make sure to upload your finished API in a GitHub repository)

  - In your account page click on NEW +
  - Select web service 
  - As you have GitHub and Render synchronized, just select the repository with your API
  - Then fill the required fields, the most important ones are:
      - The name of your project
      - The environment, in this case Node js
      - The build command, these are the commands necessary to build the project, for example:
          npm install
      - The run command, necessary to start the api, in this case: 
          node app.js
