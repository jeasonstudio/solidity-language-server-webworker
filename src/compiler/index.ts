import { ISolc } from './types';
import wrapper from './wrapper';
import { latestRelease, releases } from './versions.json';

const latestVersion =
  releases[latestRelease as '0.8.19'] || 'soljson-v0.8.19+commit.7dd6d404.js';

export class WebWorkerCompiler {
  // 默认使用 soljson-v0.8.19+commit.7dd6d404.js
  public version: string = latestVersion;
  public solcJson: any;
  public solc!: ISolc;

  public constructor(version?: string) {
    this.use(version || this.version);
  }

  // 使用另一个版本的 solc-bin
  public use(version: string) {
    if (!version.startsWith('soljson-') || !version.endsWith('.js')) {
      console.warn('Invalid soljson version: ' + version);
    } else {
      this.version = version;
    }

    // Load soljson script
    self.importScripts(`https://binaries.soliditylang.org/bin/${this.version}`);

    // @ts-ignore
    this.solcJson = self.Module;
    this.solc = wrapper(this.solcJson) as unknown as ISolc;
  }

  public useSemVer(semVer: string) {
    // TODO
  }
}
