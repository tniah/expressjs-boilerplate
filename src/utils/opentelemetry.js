import {NodeSDK} from '@opentelemetry/sdk-node';
import {OTLPTraceExporter} from '@opentelemetry/exporter-trace-otlp-grpc';
import {getNodeAutoInstrumentations} from '@opentelemetry/auto-instrumentations-node';
import {PeriodicExportingMetricReader} from '@opentelemetry/sdk-metrics';
import {OTLPMetricExporter} from '@opentelemetry/exporter-metrics-otlp-grpc';
import {containerDetector} from '@opentelemetry/resource-detector-container';
import {envDetector, hostDetector, osDetector, processDetector} from '@opentelemetry/resources';

const otelSDK = new NodeSDK({
  traceExporter: new OTLPTraceExporter(),
  instrumentations: [
    getNodeAutoInstrumentations({
      // only instrument fs if it is part of another trace
      '@opentelemetry/instrumentation-fs': {
        requireParentSpan: true,
      },
    })
  ],
  metricReader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter(),
  }),
  resourceDetectors: [
    containerDetector,
    envDetector,
    hostDetector,
    osDetector,
    processDetector,
  ],
});

otelSDK.start();

// You can also use the shutdown method to gracefully shut down the SDK before process shutdown
// or on some operating system signal.
process.on('SIGTERM', () => {
  otelSDK.shutdown()
    .then(
      () => console.log('OpenTelemetry sdk shut down successfully'),
      (err) => console.log('Error shutting down OpenTelemetry sdk', err),
    )
    .finally(() => process.exit(0));
});