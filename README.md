Demonstrates the issue [Slow response times with large documents](https://github.com/graphql/graphql-js/issues/723) and how Rust and Go have an advantage over Node on this CPU-bound problem.
I don't claim to be an expert on either Rust or Go, so take these results with a pinch of salt :-)

### Results on Mac Mini M1 (without web server):

- Node (Apollo Server) - 172s
- Rust (async-graphql) - 48s
- Go (gqlgen) - 82s

### Results on Mac Mini M1 (web server):

- Node

```
┌─────────┬─────────┬─────────┬─────────┬─────────┬────────────┬───────────┬─────────┐
│ Stat    │ 2.5%    │ 50%     │ 97.5%   │ 99%     │ Avg        │ Stdev     │ Max     │
├─────────┼─────────┼─────────┼─────────┼─────────┼────────────┼───────────┼─────────┤
│ Latency │ 3468 ms │ 3851 ms │ 4246 ms │ 4248 ms │ 3862.06 ms │ 362.27 ms │ 4269 ms │
└─────────┴─────────┴─────────┴─────────┴─────────┴────────────┴───────────┴─────────┘
┌───────────┬─────┬──────┬─────┬───────┬─────────┬─────────┬────────┐
│ Stat      │ 1%  │ 2.5% │ 50% │ 97.5% │ Avg     │ Stdev   │ Min    │
├───────────┼─────┼──────┼─────┼───────┼─────────┼─────────┼────────┤
│ Req/Sec   │ 0   │ 0    │ 0   │ 10    │ 2.54    │ 3.97    │ 1      │
├───────────┼─────┼──────┼─────┼───────┼─────────┼─────────┼────────┤
│ Bytes/Sec │ 0 B │ 0 B  │ 0 B │ 65 MB │ 16.5 MB │ 25.8 MB │ 6.5 MB │
└───────────┴─────┴──────┴─────┴───────┴─────────┴─────────┴────────┘
```

- Node (PM2 cluster mode - max == 8 CPUs)

```
┌─────────┬────────┬────────┬─────────┬─────────┬────────────┬──────────┬─────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%   │ 99%     │ Avg        │ Stdev    │ Max     │
├─────────┼────────┼────────┼─────────┼─────────┼────────────┼──────────┼─────────┤
│ Latency │ 711 ms │ 881 ms │ 2498 ms │ 3085 ms │ 1126.69 ms │ 522.4 ms │ 5049 ms │
└─────────┴────────┴────────┴─────────┴─────────┴────────────┴──────────┴─────────┘
┌───────────┬────────┬───────┬─────────┬─────────┬─────────┬───────┬────────┐
│ Stat      │ 1%     │ 2.5%  │ 50%     │ 97.5%   │ Avg     │ Stdev │ Min    │
├───────────┼────────┼───────┼─────────┼─────────┼─────────┼───────┼────────┤
│ Req/Sec   │ 1      │ 2     │ 9       │ 13      │ 8.81    │ 2.47  │ 1      │
├───────────┼────────┼───────┼─────────┼─────────┼─────────┼───────┼────────┤
│ Bytes/Sec │ 6.5 MB │ 13 MB │ 58.5 MB │ 84.5 MB │ 57.2 MB │ 16 MB │ 6.5 MB │
└───────────┴────────┴───────┴─────────┴─────────┴─────────┴───────┴────────┘
```

```
data_received..................: 4.4 GB  73 MB/s
data_sent......................: 255 kB  4.2 kB/s
http_req_blocked...............: avg=28.99µs  min=2µs      med=6µs      max=1.8ms p(90)=7µs     p(95)=8µs
http_req_connecting............: avg=8.85µs   min=0s       med=0s       max=854µs p(90)=0s      p(95)=0s
http_req_duration..............: avg=883.89ms min=538.76ms med=741.03ms max=2.81s p(90)=1.44s   p(95)=1.56s
{ expected_response:true }...: avg=883.89ms min=538.76ms med=741.03ms max=2.81s p(90)=1.44s   p(95)=1.56s
http_req_failed................: 0.00%   ✓ 0        ✗ 683
http_req_receiving.............: avg=25.7ms   min=1.08ms   med=5.55ms   max=1.54s p(90)=11.48ms p(95)=23.14ms
http_req_sending...............: avg=233.11µs min=9µs      med=39µs     max=20ms  p(90)=92.6µs  p(95)=842.09µs
http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s    p(90)=0s      p(95)=0s
http_req_waiting...............: avg=857.95ms min=531.91ms med=733.64ms max=2.6s  p(90)=1.39s   p(95)=1.5s
http_reqs......................: 683     11.22435/s
iteration_duration.............: avg=884.25ms min=538.94ms med=741.57ms max=2.81s p(90)=1.44s   p(95)=1.56s
iterations.....................: 683     11.22435/s
vus............................: 10      min=10     max=10
vus_max........................: 10      min=10     max=10
```

- Rust

```
┌─────────┬────────┬────────┬────────┬────────┬───────────┬──────────┬────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%  │ 99%    │ Avg       │ Stdev    │ Max    │
├─────────┼────────┼────────┼────────┼────────┼───────────┼──────────┼────────┤
│ Latency │ 215 ms │ 289 ms │ 391 ms │ 423 ms │ 292.59 ms │ 47.84 ms │ 566 ms │
└─────────┴────────┴────────┴────────┴────────┴───────────┴──────────┴────────┘
┌───────────┬────────┬────────┬────────┬────────┬────────┬─────────┬────────┐
│ Stat      │ 1%     │ 2.5%   │ 50%    │ 97.5%  │ Avg    │ Stdev   │ Min    │
├───────────┼────────┼────────┼────────┼────────┼────────┼─────────┼────────┤
│ Req/Sec   │ 22     │ 32     │ 34     │ 37     │ 34.1   │ 1.96    │ 22     │
├───────────┼────────┼────────┼────────┼────────┼────────┼─────────┼────────┤
│ Bytes/Sec │ 149 MB │ 217 MB │ 230 MB │ 250 MB │ 231 MB │ 13.2 MB │ 149 MB │
└───────────┴────────┴────────┴────────┴────────┴────────┴─────────┴────────┘
```

```
data_received..................: 14 GB   240 MB/s
data_sent......................: 799 kB  13 kB/s
http_req_blocked...............: avg=12.74µs  min=1µs      med=6µs      max=1.34ms   p(90)=7µs      p(95)=8µs
http_req_connecting............: avg=2.36µs   min=0s       med=0s       max=609µs    p(90)=0s       p(95)=0s
http_req_duration..............: avg=281.29ms min=158.33ms med=276.47ms max=520.58ms p(90)=350.15ms p(95)=370.98ms
{ expected_response:true }...: avg=281.29ms min=158.33ms med=276.47ms max=520.58ms p(90)=350.15ms p(95)=370.98ms
http_req_failed................: 0.00%   ✓ 0         ✗ 2136
http_req_receiving.............: avg=7.99ms   min=1.01ms   med=4.55ms   max=192.22ms p(90)=13.08ms  p(95)=19.53ms
http_req_sending...............: avg=346.12µs min=8µs      med=38µs     max=22.1ms   p(90)=159.5µs  p(95)=2.2ms
http_req_tls_handshaking.......: avg=0s       min=0s       med=0s       max=0s       p(90)=0s       p(95)=0s
http_req_waiting...............: avg=272.95ms min=155.55ms med=269.81ms max=464.48ms p(90)=340.31ms p(95)=358.52ms
http_reqs......................: 2136    35.452906/s
iteration_duration.............: avg=281.63ms min=158.46ms med=276.86ms max=520.76ms p(90)=350.43ms p(95)=372.25ms
iterations.....................: 2136    35.452906/s
vus............................: 10      min=10      max=10
vus_max........................: 10      min=10      max=10
```

- Golang

```
┌─────────┬────────┬────────┬─────────┬─────────┬───────────┬───────────┬─────────┐
│ Stat    │ 2.5%   │ 50%    │ 97.5%   │ 99%     │ Avg       │ Stdev     │ Max     │
├─────────┼────────┼────────┼─────────┼─────────┼───────────┼───────────┼─────────┤
│ Latency │ 391 ms │ 661 ms │ 1012 ms │ 1084 ms │ 663.66 ms │ 155.45 ms │ 1251 ms │
└─────────┴────────┴────────┴─────────┴─────────┴───────────┴───────────┴─────────┘
┌───────────┬───────┬───────┬─────────┬────────┬─────────┬─────────┬───────┐
│ Stat      │ 1%    │ 2.5%  │ 50%     │ 97.5%  │ Avg     │ Stdev   │ Min   │
├───────────┼───────┼───────┼─────────┼────────┼─────────┼─────────┼───────┤
│ Req/Sec   │ 10    │ 10    │ 15      │ 20     │ 15.02   │ 2.52    │ 10    │
├───────────┼───────┼───────┼─────────┼────────┼─────────┼─────────┼───────┤
│ Bytes/Sec │ 65 MB │ 65 MB │ 97.5 MB │ 130 MB │ 97.6 MB │ 16.4 MB │ 65 MB │
└───────────┴───────┴───────┴─────────┴────────┴─────────┴─────────┴───────┘
```

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
