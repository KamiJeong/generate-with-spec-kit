import * as React from 'react';
import { defaultRoleId } from '@wiki/mock/roles';
import type { RoleId } from '@wiki/types';

interface RolePerspectiveContextValue {
  roleId: RoleId;
  setRoleId: (roleId: RoleId) => void;
}

const RolePerspectiveContext = React.createContext<RolePerspectiveContextValue | null>(null);

export function RolePerspectiveProvider({ children }: { children: React.ReactNode }) {
  const [roleId, setRoleId] = React.useState<RoleId>(defaultRoleId);

  return (
    <RolePerspectiveContext.Provider value={{ roleId, setRoleId }}>
      {children}
    </RolePerspectiveContext.Provider>
  );
}

export function useRolePerspective() {
  const context = React.useContext(RolePerspectiveContext);
  if (!context) {
    throw new Error('useRolePerspective must be used inside RolePerspectiveProvider');
  }
  return context;
}
