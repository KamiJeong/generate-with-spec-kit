import type { TestRunnerConfig } from '@storybook/test-runner';
import { injectAxe } from 'axe-playwright';
import { postVisitSnapshot } from './test-runner-setup.ts';

const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page, context) {
    await postVisitSnapshot(page, context);
  },
};

export default config;
