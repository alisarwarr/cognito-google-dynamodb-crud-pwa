#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CdkCognitoSocialDynamodbCrudStack } from '../lib/cdk-cognito-social-dynamodb-crud-stack';


const app = new cdk.App();
new CdkCognitoSocialDynamodbCrudStack(app, 'CdkCognitoSocialDynamodbCrudStack');