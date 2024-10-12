import { Box, BoxProps, Text } from "@ignite-ui/react";
import { StoryObj, Meta } from '@storybook/react';

export default {
    title: 'Form/Box',
    component: Box,
    args: {
        children: (<><Text>Teste do elemento Box</Text></>),
    }
} as Meta<BoxProps>

export const Primary: StoryObj<BoxProps> = {}