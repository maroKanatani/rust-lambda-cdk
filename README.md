＃ Setup

```sh
# for cross compile
$ cargo install cargo-zigbuild
$ brew install zig
$ rustup target add aarch64-unknown-linux-musl
$ cargo build --release --target aarch64-unknown-linux-musl
```
