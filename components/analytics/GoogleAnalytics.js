import Script from 'next/script'

const GAScript = () => {
  // Replace 'YOUR_GOOGLE_ANALYTICS_ID' with your actual Google Analytics ID
  const googleAnalyticsId = 'G-4QQ0HZWMM3'

  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
      />

      <Script strategy="lazyOnload" id="ga-script">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}', {page_path: window.location.pathname});
        `}
      </Script>
    </>
  )
}

export default GAScript

// You can use logEvent function as is
export const logEvent = (action, category, label, value) => {
  window.gtag?.('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
