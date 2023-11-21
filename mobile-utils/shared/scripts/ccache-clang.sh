#!/bin/sh
eval "$(brew shellenv)"
if type -p ccache >/dev/null 2>&1; then
  echo "Using ccache"
  export CCACHE_LOGFILE='/tmp/CCache.log'
  export CCACHE_MAXSIZE=10G
  export CCACHE_CPP2=true
  export CCACHE_HARDLINK=true
  export CCACHE_SLOPPINESS=modules,include_file_mtime,include_file_ctime,time_macros,pch_defines,file_stat_matches,clang_index_store,system_headers,ivfsoverlay
  export CCACHE_DIRECT=true
  export CCACHE_DEPEND=true
  exec ccache /usr/bin/clang "$@"
else
  echo "Using clang"
  exec clang "$@"
fi
