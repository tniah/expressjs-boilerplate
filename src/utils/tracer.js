import {NodeSDK} from '@opentelemetry/sdk-node';
import {OTLPTraceExporter} from '@opentelemetry/exporter-trace-otlp-grpc';

const otelSDK = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTLP_EXPORTER_OTLP_ENDPOINT || 'http://127.0.0.1:4317',
    headers: {},
  }),
  instrumentations: [
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