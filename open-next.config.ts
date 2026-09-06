import {defineCloudflareConfig} from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

// Public pages change through deployments, not ISR. No R2 bucket is required.
// Dynamic API and authenticated admin routes still execute on the Worker.
export default defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  // Keep Next's request routing in charge. The adapter's interception fast path
  // currently causes repeated segment-prefetch requests with Next 16.3.
  enableCacheInterception: false,
});
