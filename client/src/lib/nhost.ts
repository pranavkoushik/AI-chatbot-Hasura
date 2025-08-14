import { NhostClient } from '@nhost/nhost-js';

const subdomain = import.meta.env.VITE_NHOST_SUBDOMAIN || 'mtgxujfteudjuldxiehh';
const region = import.meta.env.VITE_NHOST_REGION || 'us-east-1';

export const nhost = new NhostClient({
  subdomain,
  region,
});
