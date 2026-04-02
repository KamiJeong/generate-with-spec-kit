import type { TestRunnerConfig } from '@storybook/test-runner';
import { injectAxe } from 'axe-playwright';

const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit() {
    // Storybook's a11y addon runs axe during story evaluation.
    // Injecting axe here keeps the page ready for explicit future checks
    // without racing the addon and producing false negatives.
  },
};

export default config;
