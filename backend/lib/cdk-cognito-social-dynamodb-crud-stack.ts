import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
//APPSYNC
import * as appsync from 'aws-cdk-lib/aws-appsync';
//DYNAMODB
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
//COGNITO
import * as cognito from 'aws-cdk-lib/aws-cognito';


export class CdkCognitoSocialDynamodbCrudStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);





    //*********************************APPSYNC*********************************/
    //APPSYNC's API gives you a graphqlApi with apiKey ( for deploying APPSYNC )
    const api = new appsync.GraphqlApi(this, 'graphlApi', {
      name: 'massageopen-api',
      schema: appsync.SchemaFile.fromAsset('graphql/schema.gql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY
        }
      }
    });
    //print graphqlApi Url on console after deploy APPSYNC
    new cdk.CfnOutput(this, 'GraphQlAPIURL', {
      value: api.graphqlUrl
    });
    //print apiKey on console after deploy APPSYNC
    new cdk.CfnOutput(this, 'GraphQLAPIKey', {
      value: api.apiKey || ''
    });
    //*********************************APPSYNC*********************************/    





    //*******************************DYNAMODB*********************************/
    //creating table
    const myTable = new ddb.Table(this, 'massageopen-table', {
      partitionKey: { name: 'id', type: ddb.AttributeType.STRING },
      billingMode: ddb.BillingMode.PAY_PER_REQUEST
    });
    //*******************************DYNAMODB*********************************/





    //*****************************DATASOURCE********************************/
    //setting table ( as a datasource of endpoint )
    const db_datasource = api.addDynamoDbDataSource('DBDataSource', myTable);
    //*****************************DATASOURCE********************************/





    //***************************QUERY/MUTATION*****************************/
    const operations = [
      {
        typeName: "Mutation",
        fieldName: "createPost",
        requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
          appsync.PrimaryKey.partition("id").auto(),
          appsync.Values.projecting()
        ),
        responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
      },
      {
        typeName: "Mutation",
        fieldName: "deletePost",
        requestMappingTemplate: appsync.MappingTemplate.dynamoDbDeleteItem("id", "id"),
        responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
      },
      {
        typeName: "Mutation",
        fieldName: "updatePost",
        requestMappingTemplate: appsync.MappingTemplate.dynamoDbPutItem(
          appsync.PrimaryKey.partition("id").is("id"),
          appsync.Values.projecting()
        ),
        responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
      },
      {
        typeName: "Query",
        fieldName: "getOnePost",
        requestMappingTemplate: appsync.MappingTemplate.dynamoDbGetItem("id", "id"),
        responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultItem()
      },
      {
        typeName: "Query",
        fieldName: "getAllPosts",
        requestMappingTemplate: appsync.MappingTemplate.dynamoDbScanTable(),
        responseMappingTemplate: appsync.MappingTemplate.dynamoDbResultList()
      },
    ];
    operations.forEach(({ typeName, fieldName, requestMappingTemplate, responseMappingTemplate }) => {
      db_datasource.createResolver(`${typeName}_${fieldName}`, {
        typeName,
        fieldName,
        requestMappingTemplate,
        responseMappingTemplate,
      });
    });
    //***************************QUERY/MUTATION*****************************/





    //*****************************COGNTIO**********************************/
    const userPool = new cognito.UserPool(this, 'massageopen-UserPool', {
      //user can sigin with 'email' & 'username' ( can also include phone, preferredUsername )
      signInAliases: {
        email: true,
        username: true
      },


      //defining policies for 'password' ( default policies are all true )
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false
      },


      //allow users for 'signup' to create account ( so not only administrator makes account )
      selfSignUpEnabled: true,


      //user can recover account with 'email' only ( can also include PHONE_ONLY, PHONE_AND_EMAIL, etc )
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,


      //verification while creating an account using 'email' by sending a verification code ( can also add phone )
      autoVerify: {
        email: true
      },


      //customize your 'email' & 'phone' verification messages
      userVerification: {
        emailSubject: 'Verify your email for Massageopen!',
        emailBody: 'Hello, Thanks for using Massageopen! Your verification code is {####}',
        emailStyle: cognito.VerificationEmailStyle.CODE
      }
    });

    const googleProvider = new cognito.UserPoolIdentityProviderGoogle(this, 'massageopen-googleProvider', {
      userPool: userPool,
      clientId: '1038981135096-51ef9p7tqsip26p0ko8hfbnbalrtg2g8.apps.googleusercontent.com', // Google Client id
      clientSecret: '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',                                   // Google Client Secret
      attributeMapping: {
        email: cognito.ProviderAttribute.GOOGLE_EMAIL,
        givenName: cognito.ProviderAttribute.GOOGLE_GIVEN_NAME,
        phoneNumber: cognito.ProviderAttribute.GOOGLE_PHONE_NUMBERS
      },
      scopes: ["profile", "email", "openid"]
    });

    userPool.registerIdentityProvider(googleProvider);

    const userPoolClient = new cognito.UserPoolClient(this, 'massageopen-userPoolClient-amplify', {
      userPool,
      generateSecret: false,
      oAuth: {
        callbackUrls: ["https://massageopen.com/"],   // This is what user is allowed to be redirected to with the code upon signin. this can be a list of urls.
        logoutUrls: ["https://massageopen.com/"]      // This is what user is allowed to be redirected to after signout. this can be a list of urls.
      }
    });

    new cdk.CfnOutput(this, 'massageopen-userPoolId', {
      value: userPool.userPoolId
    });

    new cdk.CfnOutput(this, 'massageopen-userPoolClientId', {
      value: userPoolClient.userPoolClientId
    });

    const domain = userPool.addDomain('massageopen-cognitoDomain-prefix', {
      cognitoDomain: {
        domainPrefix: "massageopen"                           // SET YOUR OWN Domain PREFIX HERE
      }
    });

    new cdk.CfnOutput(this, 'domain', {
      value: domain.domainName
    });
    //*****************************COGNTIO**********************************/
  }
}