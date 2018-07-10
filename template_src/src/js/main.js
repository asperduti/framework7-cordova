export default {
   init() {
      let admobid = {
         banner: 'ca-app-pub-3940256099942544/6300978111',
         interstitial: 'ca-app-pub-3940256099942544/1033173712',
      }

      window.admob.banner.config({
         id: admobid.banner,
         isTesting: true,
         autoShow: true,
      })
      window.admob.banner.prepare()

      window.admob.interstitial.config({
         id: admobid.interstitial,
         isTesting: true,
         autoShow: true,
      })

      window.admob.interstitial.prepare()
   }
}
