import { useEffect } from 'react';

function ChatWidget() {
  useEffect(() => {
    let cleanup;

    import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js').then(({ createChat }) => {
      cleanup = createChat({
        webhookUrl: 'https://automations.pathway4.click/webhook/a03216de-13ac-4dd2-9841-ac7c3e510625/chat',
        mode: 'window',
        showWelcomeScreen: true,
        defaultLanguage: 'en',
        initialMessages: ['Hi! How can I help you today?'],
        i18n: {
          en: {
            title: 'Assistant',
            subtitle: 'Ask me anything',
            footer: '',
            getStarted: 'Start Chat',
            inputPlaceholder: 'Type your message...',
          },
        },
      });
    });

    return () => {
      if (cleanup && typeof cleanup === 'function') cleanup();
    };
  }, []);

  return null;
}

export default ChatWidget;
