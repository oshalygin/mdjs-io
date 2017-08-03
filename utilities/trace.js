module.exports = {
  // Log levels: 0-disabled,1-error,2-warn,3-info,4-debug
  // Default: 1
  logLevel: 2,

  // Default: true
  enabled: true,

  // If true, information about query parameters and results will be
  // attached to spans representing database operations.
  // Default: false
  enhancedDatabaseReporting: true,

  // The maximum number of characters reported on a label value. This
  // cannot exceed 16383, the maximum value accepted by the service.
  // Default: 512
  maximumLabelValueSize: 512,

  // @type {number} max number of frames to include on traces (0 disables)
  // Default: 10
  stackTraceLimit: 10,

  // We buffer the captured traces for `flushDelaySeconds` before publishing
  // to the trace API; unless the buffer fills up before then.
  // See `bufferSize`.
  // Default: 30
  flushDelaySeconds: 30,

  // If paths are present in this array, then these paths will be ignored before
  // `samplingRate` based decisions are made. Paths must include a leading
  // forward slash and be of the form:
  //   /componentOne/componentTwo/...
  // Paths can additionally be classified by regex in which case any path matching
  // any provided regex will be ignored.
  // We ignore the health checker probes (/_ah/health) by default.
  ignoreUrls: ['/_ah/health', '/healthz'],

  // An upper bound on the number of traces to gather each second. If set to 0,
  // sampling is disabled and all traces are recorded. Sampling rates greater
  // than 1000 are not supported and will result in at most 1000 samples per
  // second. Some Google Cloud environments may further limit this rate.
  // Default: 10
  samplingRate: 10,

  // The number of transactions we buffer before we publish to the trace
  // API, unless we hit `flushDelaySeconds` first.
  // Default: 1000
  bufferSize: 1000,

  // Specifies the behavior of the trace agent in the case of an uncaught exception.
  // Possible values are:
  //   `ignore`: Take no action. Note that the process may terminate before all the
  //            traces currently buffered have been flushed to the network.
  //   `flush`: Handle the uncaught exception and attempt to publish the traces to
  //            the API. Note that if you have other uncaught exception handlers in your
  //            application, they may chose to terminate the process before the
  //            buffer has been flushed to the network. Also note that if you have no
  //            other terminating uncaught exception handlers in your application, the
  //            error will get swallowed and the application will keep on running. You
  //            should use this option if you have other uncaught exception handlers
  //            that you want to be responsible for terminating the application.
  //   `flushAndExit`: Handle the uncaught exception, make a best effort attempt to
  //            publish the traces to the API, and then terminate the application after
  //            a delay. Note that presence of other uncaught exception handlers may
  //            chose to terminate the application before the buffer has been flushed to
  //            the network.
  // Default: 'ignore'
  onUncaughtException: 'ignore',

  // EXPERIMENTAL:
  // Allows to ignore the requests X-Cloud-Trace-Context -header if set. Setting this
  // to true will cause traces generated by this module to appear separately from other
  // distributed work done by other services on behalf of the same income request. Setting
  // this will also cause sampling decisions made by other distributed components to be
  // ignored. This is useful for aggregating traces generated by different cloud platform
  // projects.
  // Default: false
  ignoreContextHeader: false,

  // The contents of a key file. If this field is set, its contents will be
  // used for authentication instead of your application default credentials.
  // Default: null
  credentials: null,

  // A path to a key file relative to the current working directory. If this
  // field is set, the contents of the pointed file will be used for
  // authentication instead of your application default credentials.
  // If credentials is also set, the value of keyFilename will be ignored.
  // Default: null
  keyFilename: null,

  // For testing purposes only.
  // Used by unit tests to force loading of a new agent if one exists already.
  // Default: false
  forceNewAgent_: false,

  // Specifies the service context with which traces from this application
  // will be associated. This may be useful in filtering traces originating
  // from a specific service within a project. These fields will automatically
  // be set through environment variables on Google App Engine.
  // Default: {service: null, version: null, minorVersion: null}
  serviceContext: {
    service: 'web',
    version: null,
    minorVersion: null,
  },
};