/**
   Note: Before use moya.local domain, make sure, that you add alias 127.0.0.1 to hosts file.
 */

var oasrv = require('oauth-server'),
Server = oasrv.server.OAuthServer,
memStore = oasrv.store.memory.OAuthMemoryStore,
store = new memStore();
Consumer = oasrv.Consumer;

var URL = require('url'),
qs = require('querystring');

store.addConsumer(
    new Consumer({name:'oauth-test-consumer', key:'key', secret:'secret',
                  callbackUrl: 'http://moya.local:3000/auth/oauth/callback'}));

server = new Server('moya.local:4000', {}, {}, 4000, store);

server.listen();

