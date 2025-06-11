import { createContext, FunctionComponent, PropsWithChildren, useCallback } from 'react';
import { KaotoSchemaDefinition } from '../models';
import { PasswordField } from '../fields/PasswordField';
import { StringField } from '../fields/StringField';
import { TextAreaField } from '../fields/TextAreaField';
import { FieldProps } from '../typings';
import { DisabledField } from '../fields/DisabledField';
import { BooleanField } from '../fields/BooleanField';

type FormComponentFactoryContextValue = (schema: KaotoSchemaDefinition['schema']) => FunctionComponent<FieldProps>;

/* Name of the properties that should load TextAreaField */
const TextAreaPropertyNames = ['Expression', 'Description', 'Query', 'Script'];

export const FormComponentFactoryContext = createContext<FormComponentFactoryContextValue | undefined>(undefined);

export const FormComponentFactoryProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const factory = useCallback<FormComponentFactoryContextValue>((schema) => {
    if (schema.format === 'password') {
      return PasswordField;
    } else if (schema.type === 'string' && schema.title && TextAreaPropertyNames.includes(schema.title)) {
      return TextAreaField;
    }

    switch (schema.type) {
      case 'string':
      case 'number':
      case 'integer':
        return StringField;
      case 'boolean':
        return BooleanField;
    }

    return DisabledField;
  }, []);

  return <FormComponentFactoryContext.Provider value={factory}>{children}</FormComponentFactoryContext.Provider>;
};
