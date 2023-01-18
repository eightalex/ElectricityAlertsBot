import {MessageConfigParser, MessageConfigParserInterface} from './MessageConfigParser';

describe('MessageConfigParser', () => {
    let parser: MessageConfigParserInterface;

    beforeEach(() => {
        parser = new MessageConfigParser();
    });

    test('parses config strings correctly', () => {
        const config = '@chat1,@chat2:456';
        const expected = [
            { chat_id: '@chat1' },
            { chat_id: '@chat2', message_thread_id: 456 },
        ];
        expect(parser.parse(config)).toEqual(expected);
    });

    test('returns empty config for empty config string', () => {
        expect(parser.parse('')).toEqual([{chat_id: ''}]);
    });

    test('handles config strings with only chat_id', () => {
        const config = '@chat1,@chat2,@chat3';
        const expected = [
            { chat_id: '@chat1' },
            { chat_id: '@chat2' },
            { chat_id: '@chat3' },
        ];
        expect(parser.parse(config)).toEqual(expected);
    });
});
