// Edge script in front of the static assets: force https, www → apex, then serve.
const APEX = 'anjunlei.com'
export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const wantsApex = url.hostname === `www.${APEX}`
    // Cloudflare normalises request.url to https; the client's real scheme is in cf-visitor.
    const insecure = url.protocol === 'http:' || (request.headers.get('cf-visitor') || '').includes('"http"')
    if (insecure || wantsApex) {
      url.protocol = 'https:'
      if (wantsApex) url.hostname = APEX
      return Response.redirect(url.toString(), 301)
    }
    return env.ASSETS.fetch(request)
  },
}
