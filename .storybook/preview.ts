import type { Preview } from '@storybook/nextjs'
import '../src/app/globals.css'; // ✅ Import Tailwind styles here

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
  },
};

export default preview;