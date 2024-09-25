/**
 * Storing this like this for this example for ease.
 * Depending on requirements, per environment config could go here and be switched by an environment variable,
 * or instead could go directly in the environment or be loaded from an external source (e.g. AWS S3).
 *
 * Sensitive config like database credentials would go in a secure place (e.g. AWS Secrets Manager or SSM Parameter Store),
 * and be loaded at run time.
 */
const config = {
  apiPort: 3001,
  xeroApiUrl: 'http://localhost:3000/api.xro/2.0/Reports/BalanceSheet',
};

export default config;
