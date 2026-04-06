import fs from 'node:fs/promises';
import path from 'node:path';
import type { TestHook } from '@storybook/test-runner';
import { waitForPageReady } from '@storybook/test-runner';

const snapshotDir = path.resolve(process.cwd(), '__snapshots__');
const actualDir = path.join(snapshotDir, '__actual__');
const maxDiffPixelRatio = 0.02;
const updateSnapshots =
  process.argv.includes('-u') ||
  process.argv.includes('--updateSnapshot') ||
  process.env.STORYBOOK_UPDATE_SNAPSHOTS === 'true';

function getSnapshotPath(storyId: string) {
  return path.join(snapshotDir, `${storyId}.png`);
}

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function getDiffPixelRatio(
  page: Parameters<TestHook>[0],
  baseline: Buffer,
  actual: Buffer
) {
  return page.evaluate(
    async ({ actualImage, baselineImage }) => {
      function loadImage(src: string) {
        return new Promise<HTMLImageElement>((resolve, reject) => {
          const image = new Image();
          image.onload = () => resolve(image);
          image.onerror = () =>
            reject(new Error(`Failed to load image: ${src}`));
          image.src = src;
        });
      }

      const [baselinePng, actualPng] = await Promise.all([
        loadImage(baselineImage),
        loadImage(actualImage),
      ]);

      if (
        baselinePng.width !== actualPng.width ||
        baselinePng.height !== actualPng.height
      ) {
        return 1;
      }

      const width = baselinePng.width;
      const height = baselinePng.height;
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        throw new Error('Unable to create canvas context for visual diff.');
      }

      canvas.width = width;
      canvas.height = height;
      context.drawImage(baselinePng, 0, 0);
      const baselinePixels = context.getImageData(0, 0, width, height).data;

      context.clearRect(0, 0, width, height);
      context.drawImage(actualPng, 0, 0);
      const actualPixels = context.getImageData(0, 0, width, height).data;

      let diffPixels = 0;
      for (let index = 0; index < baselinePixels.length; index += 4) {
        const baselineChanged =
          baselinePixels[index] !== actualPixels[index] ||
          baselinePixels[index + 1] !== actualPixels[index + 1] ||
          baselinePixels[index + 2] !== actualPixels[index + 2] ||
          baselinePixels[index + 3] !== actualPixels[index + 3];

        if (baselineChanged) {
          diffPixels += 1;
        }
      }

      return diffPixels / (width * height);
    },
    {
      actualImage: `data:image/png;base64,${actual.toString('base64')}`,
      baselineImage: `data:image/png;base64,${baseline.toString('base64')}`,
    }
  );
}

export const postVisitSnapshot: TestHook = async (page, context) => {
  await waitForPageReady(page);

  const image = await page.screenshot({
    animations: 'disabled',
  });
  const baselinePath = getSnapshotPath(context.id);

  await fs.mkdir(snapshotDir, { recursive: true });

  if (updateSnapshots || !(await fileExists(baselinePath))) {
    await fs.writeFile(baselinePath, image);
    return;
  }

  const baseline = await fs.readFile(baselinePath);
  const diffPixelRatio = await getDiffPixelRatio(page, baseline, image);

  if (diffPixelRatio <= maxDiffPixelRatio) {
    return;
  }

  await fs.mkdir(actualDir, { recursive: true });
  const actualPath = path.join(actualDir, `${context.id}.png`);
  await fs.writeFile(actualPath, image);

  throw new Error(
    `Visual snapshot mismatch for ${context.id} (diffPixelRatio=${diffPixelRatio.toFixed(4)}). Baseline: ${baselinePath}. Actual: ${actualPath}.`
  );
};
