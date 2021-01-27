let STORE_URL = 'https://www.amd.com/en/direct-buy/5450881500/fr'

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('refresh', { periodInMinutes: 0.1 })
  chrome.notifications.onClicked.addListener(() => { 
    chrome.tabs.create({ url: STORE_URL }) 
  })
})

chrome.alarms.onAlarm.addListener(async () => {
  let page = await fetch(STORE_URL).then(res => res.text())
  if (!page.includes('Out of stock')) {
    chrome.notifications.create('BUY NOW', { 
      type: 'basic',
      title: 'BUY NOW',
      message: 'BUY NOW',
      iconUrl: 'alert.png'
    })
  }
})
