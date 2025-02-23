import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import theme from '@src/styles/theme';
import sizes, {fontSizes, spacing, borderRadius} from '@src/styles/sizes';
import {useAppSelector} from '@src/store/store';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface IMessage {
  id: string;
  userId: string;
  username: string;
  message: string;
  avatar: string;
}

const FAKE_NAMES = [
  'Ahmet',
  'Mehmet',
  'Ayşe',
  'Fatma',
  'Ali',
  'Veli',
  'Zeynep',
  'Elif',
  'Can',
  'Deniz',
];

const COLORS = [
  '#FF6B6B',
  '#4ECDC4',
  '#45B7D1',
  '#96CEB4',
  '#FFEEAD',
  '#D4A5A5',
  '#9B59B6',
  '#3498DB',
  '#1ABC9C',
];

export default function ChatScreen() {
  const colors = theme.useTheme();
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const userColorsRef = useRef<{[key: string]: string}>({});
  const currentUser = useAppSelector((state: any) => state.auth.currentUser);
  const [message, setMessage] = useState('');

  const getUserColor = (userId: string) => {
    if (!userColorsRef.current[userId]) {
      const availableColors = COLORS.filter(
        color => !Object.values(userColorsRef.current).includes(color),
      );
      const colorToUse =
        availableColors.length > 0
          ? availableColors[Math.floor(Math.random() * availableColors.length)]
          : COLORS[Math.floor(Math.random() * COLORS.length)];
      userColorsRef.current[userId] = colorToUse;
    }
    return userColorsRef.current[userId];
  };

  const avatars = [
    'https://storage.googleapis.com/movielt/avatars/1.png',
    'https://storage.googleapis.com/movielt/avatars/2.png',
    'https://storage.googleapis.com/movielt/avatars/3.png',
    'https://storage.googleapis.com/movielt/avatars/4.png',
    'https://storage.googleapis.com/movielt/avatars/5.png',
    'https://storage.googleapis.com/movielt/avatars/6.png',
    'https://storage.googleapis.com/movielt/avatars/7.png',
    'https://storage.googleapis.com/movielt/avatars/8.png',
    'https://storage.googleapis.com/movielt/avatars/9.png',
  ];

  const generateRandomMessage = (userId: string): IMessage => ({
    id: Math.random().toString(),
    userId,
    username: FAKE_NAMES[Math.floor(Math.random() * FAKE_NAMES.length)],
    message: `This is a random message ${Math.floor(Math.random() * 1000)}`,
    avatar: avatars[Math.floor(Math.random() * avatars.length)],
  });

  const [messages, setMessages] = useState<IMessage[]>(() => {
    const initialMessages = [
      generateRandomMessage('user123'),
      generateRandomMessage('user456'),
      generateRandomMessage('user123'),
      generateRandomMessage('user789'),
    ];

    return initialMessages;
  });

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: IMessage = {
        id: Math.random().toString(),
        userId: currentUser?._id || 'currentUser',
        username: currentUser?.userName || 'Me',
        message: message.trim(),
        avatar: avatars[currentUser?.avatarId || 0],
      };

      setMessages(prev => [...prev, newMessage]);
      setMessage('');
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({animated: true});
      }, 100);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.small,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    backButton: {
      padding: spacing.xsmall,
      marginRight: spacing.xsmall,
      backgroundColor: colors.surface,
      borderRadius: borderRadius.small,
    },
    title: {
      fontSize: fontSizes.large,
      color: colors.primaryText,
      fontWeight: 'bold',
    },
    messagesContainer: {
      flex: 1,
      paddingVertical: spacing.small,
      paddingBottom: spacing.large,
    },
    messageWrapper: {
      marginBottom: spacing.xxsmall,
      maxWidth: '75%',
    },
    lastInGroup: {
      marginBottom: spacing.small,
    },
    messageRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    messageContent: {
      maxWidth: '85%',
    },
    avatar: {
      width: sizes.componentSizes.avatar.small * 0.9,
      height: sizes.componentSizes.avatar.small * 0.9,
      borderRadius: borderRadius.circle,
      borderWidth: 1,
      borderColor: colors.border,
      marginHorizontal: spacing.xsmall,
    },
    messageBubble: {
      padding: spacing.small,
      borderRadius: spacing.small,
      backgroundColor: colors.surface,
    },
    messageText: {
      color: colors.primaryText,
      fontSize: fontSizes.small,
    },
    username: {
      fontSize: fontSizes.xsmall,
      marginBottom: spacing.xxsmall,
      paddingHorizontal: spacing.xsmall,
    },
    inputContainer: {
      flexDirection: 'row',
      padding: spacing.small,
      backgroundColor: colors.surface,
      borderTopWidth: 1,
      borderTopColor: colors.border,
    },
    input: {
      flex: 1,
      backgroundColor: colors.background,
      borderRadius: spacing.medium,
      paddingHorizontal: spacing.small,
      paddingVertical: spacing.xsmall,
      marginRight: spacing.small,
      color: colors.primaryText,
      height: 36,
    },
    sendButton: {
      backgroundColor: colors.background,
      width: 36,
      height: 36,
      borderRadius: 18,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.border,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={20} color={colors.primaryText} />
        </TouchableOpacity>
        <Text style={styles.title}>Sohbetler</Text>
      </View>
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={{paddingBottom: spacing.large}}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({animated: true})
        }>
        {messages.map((msg, index) => {
          const isCurrentUser = msg.userId === currentUser?._id;
          const previousMessage = index > 0 ? messages[index - 1] : null;
          const nextMessage =
            index < messages.length - 1 ? messages[index + 1] : null;

          const isFirstInGroup =
            !previousMessage || previousMessage.userId !== msg.userId;
          const isLastInGroup =
            !nextMessage || nextMessage.userId !== msg.userId;
          const userColor = getUserColor(msg.userId);

          return (
            <View
              key={msg.id}
              style={[
                styles.messageWrapper,
                isLastInGroup && styles.lastInGroup,
                {
                  alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
                },
              ]}>
              <View
                style={[
                  styles.messageRow,
                  {
                    flexDirection: isCurrentUser ? 'row-reverse' : 'row',
                  },
                ]}>
                {isLastInGroup ? (
                  <Image source={{uri: msg.avatar}} style={styles.avatar} />
                ) : (
                  <View
                    style={{
                      width:
                        sizes.componentSizes.avatar.small * 0.9 +
                        spacing.xsmall * 2,
                    }}
                  />
                )}
                <View style={styles.messageContent}>
                  {isFirstInGroup && (
                    <Text
                      style={[
                        styles.username,
                        {
                          color: userColor,
                          textAlign: isCurrentUser ? 'right' : 'left',
                          marginLeft: isCurrentUser ? 0 : spacing.xsmall,
                          marginRight: isCurrentUser ? spacing.xsmall : 0,
                        },
                      ]}>
                      {msg.username}
                    </Text>
                  )}
                  <View
                    style={[
                      styles.messageBubble,
                      {
                        backgroundColor: isCurrentUser
                          ? colors.primary
                          : colors.divider,
                      },
                    ]}>
                    <Text
                      style={[
                        styles.messageText,
                        {
                          color: isCurrentUser
                            ? colors.background
                            : colors.primaryText,
                        },
                      ]}>
                      {msg.message}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mesajınızı yazın..."
          placeholderTextColor={colors.tertiaryText}
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={16} color={colors.primaryText} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
