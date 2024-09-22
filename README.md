Demonstrates the issue [Slow response times with large documents](https://github.com/graphql/graphql-js/issues/723) and how Rust and Go have an advantage over Node on this CPU-bound problem.
I don't claim to be an expert on either Rust or Go, so take these results with a pinch of salt :-)

### Results on Mac Mini M1:

- Node (Apollo Server) - 172s
- Rust (async-graphql) - 48s
- Go (gqlgen) - 82s

gqlgen has some form of concurrency built-in, so it's running on several cores. It's probably not a fair comparison, as Node/Rust are not by default doing that.

### Running

- Node:

```
cd node
npm install
npm run benchmark:js
```

- Rust:

```
cd rust
cargo run --release
```

- Go:

```
cd golang
go build
./example
```
