const STORE_URL = 'https://www.amd.com/en/direct-buy/5450881500/fr'
const TEXT_SEARCH = 'Out of stock'

chrome.runtime.onInstalled.addListener(() => {
  chrome.alarms.create('refresh', { periodInMinutes: 0.1 })
  chrome.notifications.onClicked.addListener(() => { 
    chrome.tabs.create({ url: STORE_URL }) 
  })
})

chrome.alarms.onAlarm.addListener(async () => {
  const page = await fetch(STORE_URL).then(res => res.text())
  if (!page.includes(TEXT_SEARCH)) {
    chrome.notifications.create('BUY NOW', { 
      type: 'basic',
      title: 'BUY NOW',
      message: 'BUY NOW',
      iconUrl: 'alert.png'
    })
  }
})
