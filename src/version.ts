import * as core from '@actions/core';
import * as fetch from 'node-fetch';

const versionInfo = async (platform: string, version?: string) => {
  if (version) {
    core.info(`==> Running version ${version}`);
  }

  try {
    const metadataRes = await fetch( `https://uploader.codecov.io/${platform}/latest`, {
      headers: {'Accept': 'application/json'},
    });
    const metadata = await metadataRes.json();
    core.info(`==> Running version ${metadata['version']}`);
  } catch (err) {
    core.info(`Could not pull latest version information: ${err}`);
  }
};
export default versionInfo;
