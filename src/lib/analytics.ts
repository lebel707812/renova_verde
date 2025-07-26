// Analytics e Core Web Vitals tracking
export function trackWebVitals(metric: any) {
  // Enviar métricas para Google Analytics
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }

  // Log para desenvolvimento
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }

  // Enviar para serviço de analytics personalizado (opcional)
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metric),
    }).catch((error) => {
      console.error('Erro ao enviar métricas:', error);
    });
  }
}

// Função para rastrear eventos personalizados
export function trackEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      ...parameters,
      page_title: document.title,
      page_location: window.location.href,
    });
  }
}

// Função para rastrear visualizações de página
export function trackPageView(url: string, title?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_title: title || document.title,
      page_location: url,
    });
  }
}

// Função para rastrear tempo de leitura
export function trackReadingTime(articleSlug: string, timeSpent: number) {
  trackEvent('reading_time', {
    article_slug: articleSlug,
    time_spent_seconds: timeSpent,
    event_category: 'Engagement',
  });
}

// Função para rastrear busca
export function trackSearch(query: string, resultsCount: number) {
  trackEvent('search', {
    search_term: query,
    results_count: resultsCount,
    event_category: 'Search',
  });
}

// Função para rastrear newsletter signup
export function trackNewsletterSignup(source: string) {
  trackEvent('newsletter_signup', {
    source: source,
    event_category: 'Conversion',
  });
}

// Função para rastrear cliques em artigos
export function trackArticleClick(articleSlug: string, position: number, source: string) {
  trackEvent('article_click', {
    article_slug: articleSlug,
    position: position,
    source: source,
    event_category: 'Content',
  });
}

// Declaração de tipos para TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

