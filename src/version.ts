import * as core from '@actions/core';
import * as fetch from 'node-fetch';

const versionInfo = async (
    platform: string,
    version?: string,
): Promise<void> => {
  if (version) {
    core.info(`==> Using override version ${version}`);
  }

  try {
    const metadataRes = await fetch.default( `https://uploader.codecov.io/${platform}/${version}`, {
      headers: {'Accept': 'application/json'},
    });
    const metadata = await metadataRes.json();
    core.info(`==> Running version ${metadata['version']}`);
  } catch (err) {
    core.info(`Could not pull ${version} version information: ${err}`);
  }
};
export default versionInfo;
