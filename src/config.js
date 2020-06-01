export default {
  s3: {
    REGION: "us-east-1",
    BUCKET: "notes-app-uploads-tae"
  },
  apiGateway: {
    REGION: "us-west-2",
    URL: "https://h6k29ognoi.execute-api.us-west-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "us-west-2",
    USER_POOL_ID: "us-west-2_lbtLbDc00",
    APP_CLIENT_ID: "2jfndpki780o610qa3eg831g69",
    IDENTITY_POOL_ID: "us-west-2:c2d72089-6335-4a80-bf33-7995e3d97035"
  },
  MAX_ATTACHMENT_SIZE: 5000000,
}