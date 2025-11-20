const EMPTY_PATH = require.resolve('../polyfills/empty.js');

export interface NodePolyfillsOptions {
  sourceMap?: boolean;
  baseDir?: string;
  include?: Array<string | RegExp> | string | RegExp | null;
  exclude?: Array<string | RegExp> | string | RegExp | null;
}

export function builtinsResolver(opts: NodePolyfillsOptions) {
  const libs = new Map();

  libs.set('assert', require.resolve('@plawnekjx/assert'));
  libs.set('base64-js', require.resolve('@plawnekjx/base64-js'));
  libs.set('buffer', require.resolve('@plawnekjx/buffer'));
  libs.set('crypto', require.resolve('@plawnekjx/crypto'));
  libs.set('diagnostics_channel', require.resolve('@plawnekjx/diagnostics_channel'));
  libs.set('events', require.resolve('@plawnekjx/events'));
  libs.set('fs', require.resolve('plawnekjx-fs'));
  libs.set('http', require.resolve('@plawnekjx/http'));
  libs.set('https', require.resolve('@plawnekjx/https'));
  libs.set('http-parser-js', require.resolve('@plawnekjx/http-parser-js'));
  libs.set('ieee754', require.resolve('@plawnekjx/ieee754'));
  libs.set('net', require.resolve('@plawnekjx/net'));
  libs.set('os', require.resolve('@plawnekjx/os'));
  libs.set('path', require.resolve('@plawnekjx/path'));
  libs.set('process', require.resolve('@plawnekjx/process'));
  libs.set('punycode', require.resolve('@plawnekjx/punycode'));
  libs.set('querystring', require.resolve('@plawnekjx/querystring'));
  libs.set('readable-stream', require.resolve('@plawnekjx/readable-stream'));
  libs.set('_stream_duplex', require.resolve('@plawnekjx/readable-stream/lib/duplex'));
  libs.set('_stream_passthrough', require.resolve('@plawnekjx/readable-stream/lib/passthrough'));
  libs.set('_stream_readable', require.resolve('@plawnekjx/readable-stream/lib/readable'));
  libs.set('_stream_writable', require.resolve('@plawnekjx/readable-stream/lib/writable'));
  libs.set('_stream_transform', require.resolve('@plawnekjx/readable-stream/lib/transform'));
  libs.set('stream', require.resolve('@plawnekjx/stream'));
  libs.set('string_decoder', require.resolve('@plawnekjx/string_decoder'));
  libs.set('timers', require.resolve('@plawnekjx/timers'));
  libs.set('tty', require.resolve('@plawnekjx/tty'));
  libs.set('url', require.resolve('@plawnekjx/url'));
  libs.set('util', require.resolve('@plawnekjx/util'));
  libs.set('vm', require.resolve('@plawnekjx/vm'));

  libs.set('console', require.resolve('../polyfills/console'));
  libs.set('constants', require.resolve('../polyfills/constants'));
  libs.set('zlib', require.resolve('../polyfills/zlib'));
  libs.set('domain', require.resolve('../polyfills/domain'));
  libs.set('sys', libs.get('util'));

  // not shimmed
  libs.set('dns', EMPTY_PATH);
  libs.set('dgram', EMPTY_PATH);
  libs.set('child_process', EMPTY_PATH);
  libs.set('cluster', EMPTY_PATH);
  libs.set('module', EMPTY_PATH);
  libs.set('readline', EMPTY_PATH);
  libs.set('repl', EMPTY_PATH);
  libs.set('tls', EMPTY_PATH);

  return (importee: string) => {
    if (importee && importee.slice(-1) === '/') {
      importee === importee.slice(0, -1);
    }
    if (libs.has(importee)) {
      return {id: libs.get(importee), moduleSideEffects: false};
    }
    return null;
  }
}
