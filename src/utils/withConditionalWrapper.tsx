import React, { ReactNode } from 'react';

interface WrapperProps {
  children: ReactNode;
}

type WithConditionalWrapperType = (
  WrapperComponent: React.ComponentType<WrapperProps>,
  WrapperComponent2: React.ComponentType<WrapperProps>,
  children: ReactNode,
  condition: boolean,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any,
) => ReactNode;

const withConditionalWrapper: WithConditionalWrapperType = (
  WrapperComponent,
  WrapperComponent2,
  children,
  condition,
  props,
) => {
  if (condition) {
    console.log(`${Date()}, item goes`);
    return <WrapperComponent {...props}>{children}</WrapperComponent>;
  }
  console.log('button goes');
  return <WrapperComponent2 {...props}>{children}</WrapperComponent2>;
};

export default withConditionalWrapper;
