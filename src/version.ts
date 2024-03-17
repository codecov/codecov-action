import * as core from '@actions/core';
import {request} from 'undici';

const versionInfo = async (
    platform: string,
    version: string,
): Promise<void> => {
  core.info(`==> Running version ${version}`);

  try {
    const metadataRes = await request(`https://cli.codecov.io/${platform}/${version}`, {
      headers: {'Accept': 'application/json'},
    });
    const metadata = await metadataRes.body.json();
    core.info(`==> Running version ${metadata['version']}`);
  } catch (err) {
    core.info(`Could not pull latest version information: ${err}`);
  }
};
export default versionInfo;
