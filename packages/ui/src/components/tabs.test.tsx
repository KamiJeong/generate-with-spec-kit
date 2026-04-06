import { render, screen } from '@testing-library/react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

function renderTabs() {
  return render(
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account content</TabsContent>
      <TabsContent value="password">Password content</TabsContent>
    </Tabs>
  );
}

function renderControlledTabs(value: 'account' | 'password') {
  return render(
    <Tabs value={value}>
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account content</TabsContent>
      <TabsContent value="password">Password content</TabsContent>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('renders the tablist and default content', () => {
    renderTabs();

    expect(screen.getByRole('tablist')).toBeInTheDocument();
    expect(screen.getByText('Account content')).toBeVisible();
  });

  it('shows the matching content when the selected tab changes', () => {
    const { rerender } = renderControlledTabs('account');

    rerender(
      <Tabs value="password">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Account content</TabsContent>
        <TabsContent value="password">Password content</TabsContent>
      </Tabs>
    );

    expect(screen.getByText('Password content')).toBeVisible();
    expect(screen.getByRole('tab', { name: 'Password' })).toHaveAttribute(
      'data-state',
      'active'
    );
  });
});
