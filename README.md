# hypercount

Very simple example of the Redis hyperloglog data structure. A HyperLogLog is a bitmap construct (similar to that of a bloom filter) which is used to estimated the cardinality of a set (number of distinct values).

It is just an estimation. The larger the bitmask, the more accurate the estimate.

## Requirements

- node 8+
- run `npm i`

## Testing

Running `docker-compose up` will test repeatedly until a Ctrl+C
