import { FieldGroup, Host, Icon, ListItem, Text } from '@expo/ui';
import type { SFSymbol } from 'sf-symbols-typescript';

import { GUARDRAILS, STATUS_LABEL } from '@/safety/guardrails';
import { colors } from '@/theme';

const secondary = (text: string) => <Text textStyle={{ fontSize: 15, color: '#6C6C70' }}>{text}</Text>;

/** How each Meta model is kept to one narrow job. */
export function Safety() {
  return (
    <Host style={{ flex: 1 }}>
      <FieldGroup>
        <FieldGroup.Section>
          <ListItem leading={<Icon name="hand.tap.fill" size={22} color={colors.brand} style={{ width: 28 }} />} supportingText={secondary('AccessPoint never taps, pays or types for you. The models suggest; the camera and the code confirm.')}>
            You press every button yourself
          </ListItem>
        </FieldGroup.Section>
        {GUARDRAILS.map((g) => (
          <FieldGroup.Section key={g.model} title={`${g.model}: ${g.job}`}>
            {g.rules.map((r) => (
              <ListItem
                key={r.title}
                testID={`guardrail-${r.title}`}
                leading={
                  <Icon
                    name={(r.status === 'built' ? 'checkmark.circle.fill' : 'clock') as SFSymbol}
                    size={20}
                    color={r.status === 'built' ? colors.go : '#8E8E93'}
                    style={{ width: 28 }}
                  />
                }
                supportingText={secondary(`${r.how} ${STATUS_LABEL[r.status]}.`)}>
                {r.title}
              </ListItem>
            ))}
          </FieldGroup.Section>
        ))}
        <FieldGroup.Section>
          <FieldGroup.SectionFooter>
            <Text>Green check: working in the app today. Clock: designed, and switches on with the live camera and Meta model pipeline.</Text>
          </FieldGroup.SectionFooter>
        </FieldGroup.Section>
      </FieldGroup>
    </Host>
  );
}
