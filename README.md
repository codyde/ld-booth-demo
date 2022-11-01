## LaunchDarkly DevRel Team Demo 

This application is a frontend built in ReactJS with a Python API tier built in. This demo has had design input on the visuals to optimize the look and feel of the page, and has a integrated API to allow for backend feature flag demonstrations as well. 

The database demo requires a connection to DynamoDB in AWS so ensure that you have created that, associated IAM roles, and modified the code as needed.

## Important note regarding environment configs 

This project uses a .env file to control secrets. For obvious reasons this is not part of the git repo. At minimum you must create a .env file at the root of the project, and include in it the `LD_SERVER_KEY` variable with your server SDK from LaunchDarkly and a `TEAM_ID` variable with the number 1. 

If you use the Terraform manifest to provision your feature flags, you can access the server key by using a `terraform output LaunchDarkly_Server_Key`
