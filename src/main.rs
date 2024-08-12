use serde_json::json;

use lambda_http::{service_fn, tower::ServiceBuilder, tracing, Body, Error, Request, Response};

#[tokio::main]
async fn main() -> Result<(), Error> {
    tracing::init_default_subscriber();

    let handler = ServiceBuilder::new().service(service_fn(func));

    lambda_http::run(handler).await?;
    Ok(())
}

async fn func(event: Request) -> Result<Response<Body>, Error> {
    let body = json!({
        "message": "Hello, World!"
    });
    Ok(Response::builder()
        .status(200)
        .header("Content-Type", "text/plain")
        .body(Body::from(body.to_string()))
        .unwrap())
}
