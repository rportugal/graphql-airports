// "graphql": "file:/Users/rportugal/workspace/repos_external/graphql-js/dist",


--min_semi_space_size (min size of a semi-space (in MBytes), the new space consists of twosemi-spaces)
        type: int  default: 0
  --max_semi_space_size (max size of a semi-space (in MBytes), the new space consists of twosemi-spaces)
        type: int  default: 0
  --semi_space_growth_factor (factor by which to grow the new space)
        type: int  default: 2
  --experimental_new_space_growth_heuristic (Grow the new space based on the percentage of survivors instead of their absolute value.)
        type: bool  default: false
  --max_old_space_size (max size of the old space (in Mbytes))
        type: int  default: 0
  --initial_old_space_size (initial old space size (in Mbytes))
        type: int  default: 0
  --gc_global (always perform global GCs)
        type: bool  default: false
  --gc_interval (garbage collect after <n> allocations)
        type: int  default: -1



* baseline                                        -> 2.21 req/s
* with --gc_global                                -> 0.4 req/s
* with --experimental_new_space_growth_heuristic  -> 2.21 req/s
* with --min_semi_space_size=100                  -> 2.21
* with --gc_interval=10                           -> 2.21
* with bluebird                                   -> 1.95
* node 10                                         -> 2.21
* with completeLeafValue returning null           -> 3.3
* with completeObjectValue returning null         -> 34.9
