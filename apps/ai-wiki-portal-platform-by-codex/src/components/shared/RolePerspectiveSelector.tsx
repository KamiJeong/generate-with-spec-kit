import { Field, NativeSelect } from '@myorg/ui';
import { rolePerspectives } from '@wiki/mock/roles';
import type { RoleId } from '@wiki/types';

interface RolePerspectiveSelectorProps {
  value: RoleId;
  onChange: (value: RoleId) => void;
}

export function RolePerspectiveSelector({ value, onChange }: RolePerspectiveSelectorProps) {
  return (
    <Field label="역할 관점">
      <NativeSelect
        aria-label="역할 관점 선택"
        value={value}
        onChange={(event) => onChange(event.target.value as RoleId)}
      >
        {rolePerspectives.map((role) => (
          <option key={role.id} value={role.id}>
            {role.label}
          </option>
        ))}
      </NativeSelect>
    </Field>
  );
}
