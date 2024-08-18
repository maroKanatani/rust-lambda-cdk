#!/bin/sh

cargo zigbuild --release --target aarch64-unknown-linux-musl
cd target/aarch64-unknown-linux-musl/release
mv rust-lambda-cdk bootstrap
zip -j rust_lambda.zip bootstrap
