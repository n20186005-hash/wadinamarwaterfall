const host = 'wadinamarwaterfall.com';
export default {
  /** @param {Request} request @param {{ASSETS:{fetch:(request:Request)=>Promise<Response>}}} env */
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.hostname === 'www.' + host || (url.hostname === host && url.protocol === 'http:')) {
      url.protocol = 'https:'; url.hostname = host; url.port = '';
      return new Response(null, {status:308,headers:{Location:url.href}});
    }
    const head = request.method === 'HEAD';
    const alias = /^\/(?:404(?:\.html|\/)?|index\.html)$/.test(url.pathname);
    if (url.pathname === '/index.html') return new Response(null,{status:308,headers:{Location:new URL('/'+url.search,url).href}});
    let response = alias ? null : await env.ASSETS.fetch(request);
    if (!response || response.status === 404) {
      response = await env.ASSETS.fetch(new Request(new URL('/404.html',url),{method:'GET'}));
      if (response.status>=300 && response.status<400 && response.headers.get('Location')) {
        const next=new URL(response.headers.get('Location'),url);
        if (next.origin===url.origin && /^\/404(?:\.html|\/)?$/.test(next.pathname)) response=await env.ASSETS.fetch(new Request(next,{method:'GET'}));
      }
      const headers=new Headers(response.headers);headers.delete('Location');headers.set('X-Robots-Tag','noindex');headers.set('Cache-Control','no-store');
      return new Response(head?null:response.body,{status:404,headers});
    }
    return head?new Response(null,{status:response.status,headers:response.headers}):response;
  }
};
