import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const metric = await request.json();
    
    // Validar dados da métrica
    if (!metric.name || !metric.value || !metric.id) {
      return NextResponse.json(
        { error: 'Dados de métrica inválidos' },
        { status: 400 }
      );
    }

    // Log das métricas (em produção, você pode enviar para um serviço de analytics)
    console.log('Web Vital recebida:', {
      name: metric.name,
      value: metric.value,
      id: metric.id,
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent'),
      url: metric.url || 'unknown',
    });

    // Aqui você pode:
    // 1. Salvar no banco de dados
    // 2. Enviar para serviços como DataDog, New Relic, etc.
    // 3. Processar e agregar métricas

    // Exemplo de categorização das métricas
    const metricCategory = categorizeMetric(metric.name, metric.value);
    
    if (metricCategory === 'poor') {
      // Alertar sobre performance ruim
      console.warn(`Performance ruim detectada: ${metric.name} = ${metric.value}`);
    }

    return NextResponse.json({ 
      success: true,
      category: metricCategory 
    });

  } catch (error) {
    console.error('Erro ao processar métrica Web Vital:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}

// Função para categorizar métricas baseada nos thresholds do Google
function categorizeMetric(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const thresholds = {
    CLS: { good: 0.1, poor: 0.25 },
    FID: { good: 100, poor: 300 },
    FCP: { good: 1800, poor: 3000 },
    LCP: { good: 2500, poor: 4000 },
    TTFB: { good: 800, poor: 1800 },
    INP: { good: 200, poor: 500 },
  };

  const threshold = thresholds[name as keyof typeof thresholds];
  
  if (!threshold) {
    return 'good'; // Métrica desconhecida
  }

  if (value <= threshold.good) {
    return 'good';
  } else if (value <= threshold.poor) {
    return 'needs-improvement';
  } else {
    return 'poor';
  }
}

