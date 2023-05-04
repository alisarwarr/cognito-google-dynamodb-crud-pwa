const awsmobile = {
    "aws_project_region": process.env.GATSBY_REGION,
    "aws_appsync_graphqlEndpoint": process.env.GATSBY_APPSYNC_ENDPOINT,
    "aws_appsync_region": process.env.GATSBY_REGION,
    "aws_appsync_authenticationType": "API_KEY",
    "aws_appsync_apiKey": process.env.GATSBY_APPSYNC_APIKEY,
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    "aws_cognito_region": process.env.GATSBY_REGION,                                   // REGION
    "aws_user_pools_id": process.env.GATSBY_COGINITO__USERPOOL_ID,                     // ENTER YOUR USER POOL ID
    "aws_user_pools_web_client_id": process.env.GATSBY_COGINITO_USERPOOL_WEBCLIENT_ID, // ENTER YOUR CLIENT ID
    "oauth": {
        "domain": process.env.GATSBY_COGINITO__DOMAIN,                                 // ENTER COGNITO DOMAIN LIKE: eru-test-pool.auth.eu-central-1.amazoncognito.com
        "scope": [
            "phone",
            "email",
            "openid",
            "profile"
        ],
        "redirectSignIn": process.env.GATSBY_URL_REDIRECT,                             // ENTER YOUR SITE (enter http://localhost:8000 if testing frontend locally) 
        "redirectSignOut": process.env.GATSBY_URL_REDIRECT,                            // ENTER YOUR SITE (enter http://localhost:8000 if testing frontend locally) 
        "responseType": "code"
    },
    "federationTarget": "COGNITO_USER_POOLS"
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
}

export default awsmobile;