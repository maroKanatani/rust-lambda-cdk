FROM public.ecr.aws/docker/library/rust:1.80.1 as builder
WORKDIR /usr/src/rust-lambda-cdk
COPY . .
RUN cargo build --release

FROM public.ecr.aws/lambda/provided:al2023.2024.08.09.13 as rust-lambda-cdk
COPY --from=builder \
    /usr/src/rust-lambda-cdk/target/release/rust-lambda-cdk \
    ${LAMBDA_RUNTIME_DIR}/bootstrap
CMD [ "lambda-handler" ]