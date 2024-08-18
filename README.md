＃ Setup

```sh
# for cross compile
$ cargo install cargo-zigbuild
$ brew install zig
$ rustup target add x86_64-unknown-linux-musl
$ cargo build --release --target x86_64-unknown-linux-musl
```
