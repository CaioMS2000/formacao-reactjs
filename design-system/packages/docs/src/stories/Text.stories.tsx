import { Text, TextProps } from "@ignite-ui/react";
import { StoryObj, Meta } from '@storybook/react';

export default {
    title: 'Typography/Text',
    component: Text,
    args: {
        children: "Exemplo de texto",
    }
} as Meta<TextProps>

export const Primary: StoryObj<TextProps> = {}
export const CustomTag: StoryObj<TextProps> = {
    args: {
        children: "Strong text",
        as: 'strong',
    }
}