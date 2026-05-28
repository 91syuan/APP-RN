import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { fetchGroqChatResponse } from '../.././services/groqChatService';

export default function App() {
  
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  
  const systemPrompt = {
    role: 'system',
    content: '你是一位親切、有禮貌且博學多聞的 AI 助理，請用繁體中文回答所有問題。'
  };

  const handleSendMessage = async () => {
    if (inputText.trim() === '' || isLoading) return;

    const userMessageText = inputText.trim();
    setInputText('');
    setIsLoading(true);

    const newUserMessage = {
      role: 'user',
      content: userMessageText,
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);

    const apiMessages = [systemPrompt, ...updatedMessages];

    try {
      const replyText = await fetchGroqChatResponse(apiMessages);

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: replyText,
      }]);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderChatItem = ({ item }: { item: { role: string; content: string } }) => {
    const isUser = item.role === 'user';
    return (
      <View style={[styles.messageRow, isUser ? styles.userRow : styles.botRow]}>
        <View style={[styles.bubble, isUser ? styles.userBubble : styles.botBubble]}>
          <Text style={isUser ? styles.userText : styles.botText}>{item.content}</Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* 頂部導覽列 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>聊天室</Text>
      </View>

      {/* 聊天訊息對話 FlatList 列表 */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderChatItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatList}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      {/* 底部文字輸入欄位 */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={isLoading ? "正在思考中..." : "輸入訊息..."}
          value={inputText}
          onChangeText={setInputText}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[styles.sendButton, isLoading && styles.disabledButton]}
          onPress={handleSendMessage}
          disabled={isLoading}
        >
          <Text style={styles.sendButtonText}>發送</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3F4F6' },
  header: {
    paddingTop: 60,
    paddingBottom: 15,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#1F2937' },
  chatList: { padding: 15 },
  messageRow: { marginVertical: 6, flexDirection: 'row', width: '100%' },
  userRow: { justifyContent: 'flex-end' },
  botRow: { justifyContent: 'flex-start' },
  bubble: { maxWidth: '75%', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 16 },
  userBubble: { backgroundColor: '#976bd1', borderBottomRightRadius: 4 },
  botBubble: { backgroundColor: '#FFFFFF', borderBottomLeftRadius: 4, borderWidth: 1, borderColor: '#E5E7EB' },
  userText: { color: '#FFFFFF', fontSize: 16 },
  botText: { color: '#374151', fontSize: 16, lineHeight: 22 },
  inputContainer: { flexDirection: 'row', padding: 12, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#E5E7EB', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#F3F4F6', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 8, fontSize: 16, color: '#1F2937' },
  sendButton: { marginLeft: 10, backgroundColor: '#976bd1', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16 },
  disabledButton: { backgroundColor: '#9CA3AF' },
  sendButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});