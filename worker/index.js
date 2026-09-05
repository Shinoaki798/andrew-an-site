// Edge script in front of the static assets: force https, www → apex, then serve.
const APEX = 'anjunlei.com'
export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const wantsApex = url.hostname === `www.${APEX}`
    if (url.protocol === 'http:' || wantsApex) {
      url.protocol = 'https:'
      if (wantsApex) url.hostname = APEX
      return Response.redirect(url.toString(), 301)
    }
    return env.ASSETS.fetch(request)
  },
}
