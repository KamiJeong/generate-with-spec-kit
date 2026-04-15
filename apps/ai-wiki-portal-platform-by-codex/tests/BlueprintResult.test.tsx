import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BlueprintReadiness } from '@wiki/components/blueprint/BlueprintReadiness';
import { BlueprintResult } from '@wiki/components/blueprint/BlueprintResult';
import { missingInputBlueprint, sampleBlueprint } from '@wiki/mock/blueprints';
import { renderWithProviders } from './test-utils';

describe('Blueprint result components', () => {
  it('renders output sections and next guide link', () => {
    renderWithProviders(
      <>
        <BlueprintReadiness blueprint={sampleBlueprint} />
        <BlueprintResult blueprint={sampleBlueprint} />
      </>,
    );
    expect(screen.getByText('System Design')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '다음 실행 가이드 열기' })).toBeInTheDocument();
  });

  it('renders missing input guidance', () => {
    renderWithProviders(<BlueprintReadiness blueprint={missingInputBlueprint} />);
    expect(screen.getByText('입력 보강 필요')).toBeInTheDocument();
    expect(screen.getByText(/주요 사용자/)).toBeInTheDocument();
  });
});
