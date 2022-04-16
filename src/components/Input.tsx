import React from 'react';
import {ReturnKeyTypeOptions, StyleSheet, TextInput} from 'react-native';

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  returnKeyType: ReturnKeyTypeOptions;
  onSubmit: () => void;
  maxLength?: number;
}

const Input = React.forwardRef<TextInput, Props>(
  ({value, onChange, placeholder, returnKeyType, onSubmit, maxLength}, ref) => {
    return (
      <TextInput
        ref={ref}
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#C9C9C5"
        autoCapitalize="characters"
        returnKeyType={returnKeyType}
        blurOnSubmit={false}
        onSubmitEditing={onSubmit}
        maxLength={maxLength}
      />
    );
  },
);

const styles = StyleSheet.create({
  input: {
    fontSize: 17,
    lineHeight: 22,
    fontFamily: 'SFProRounded-Heavy',
    color: '#000000',
    letterSpacing: 0.59,
    textTransform: 'uppercase',
  },
});

export default Input;
