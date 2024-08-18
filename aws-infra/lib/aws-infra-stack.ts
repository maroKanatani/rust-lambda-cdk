import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import path = require("path");

export class AwsInfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloWorldFunction = new lambda.DockerImageFunction(
      this,
      "HelloWorldFunction",
      {
        code: lambda.DockerImageCode.fromImageAsset(
          path.join(__dirname, "../../")
        ),
        // For ARM-based Lambda functions, specify the architecture
        architecture: lambda.Architecture.ARM_64,
      }
    );

    const helloWorldFunction2 = new lambda.Function(
      this,
      "HelloWorldFunction2",
      {
        runtime: lambda.Runtime.PROVIDED_AL2023,
        code: lambda.Code.fromAsset(
          path.join(
            __dirname,
            "../../target/aarch64-unknown-linux-musl/release/rust_lambda.zip"
          )
        ),
        handler: "not.required",
        // For ARM-based Lambda functions, specify the architecture
        architecture: lambda.Architecture.ARM_64,
      }
    );

    // Define the API Gateway resource
    const api = new apigateway.RestApi(this, "HelloWorldApi", {
      restApiName: "Hello World API",
    });

    const helloResource = api.root.addResource("hello");
    helloResource.addMethod(
      "GET",
      new apigateway.LambdaIntegration(helloWorldFunction)
    );

    const helloResource2 = api.root.addResource("hello2");
    helloResource2.addMethod(
      "GET",
      new apigateway.LambdaIntegration(helloWorldFunction2)
    );
  }
}
