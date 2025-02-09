import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import PrimaryText from '@src/components/atoms/primary-text';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useToggle from '@src/hooks/useToggle';
import useUser from '@src/hooks/useUser';
import {FlashList} from '@shopify/flash-list';
import {margins, paddings, borderRadius, fontSizes} from '@src/styles/sizes';
import theme from '@src/styles/theme';

import CustomModal from '../customModal';

interface User {
  _id: string;
  isPremium: boolean;
  avatarId: string;
  userName: string;
}

export default function AddFriend() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {toggle, isToggle, close} = useToggle();
  const colors = theme.useTheme();
  const {searchUsers, sendFriendshipRequest} = useUser();

  useEffect(() => {
    if (searchTerm.length < 3) {
      setUsers([]);
      return;
    }

    setIsLoading(true);
    const time = setTimeout(() => {
      searchUsers(searchTerm).then(users => {
        setUsers(users);
        setIsLoading(false);
      });
    }, 1000);

    return () => clearTimeout(time);
  }, [searchTerm]);

  const renderItem = ({item}: {item: User}) => (
    <TouchableOpacity
      onPress={() => sendFriendshipRequest(item._id)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: paddings.medium,
        backgroundColor: colors.surface,
        marginVertical: margins.xsmall,
        borderRadius: borderRadius.small,
        borderWidth: 1,
        borderColor: colors.border,
      }}>
      <Image
        source={{uri: item.avatarId}}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          marginRight: margins.medium,
        }}
      />
      <View style={{flex: 1}}>
        <PrimaryText
          style={{
            fontSize: fontSizes.medium,
            fontWeight: '600',
            marginBottom: margins.xxsmall,
          }}>
          {item.userName}
        </PrimaryText>
        <PrimaryText
          style={{
            fontSize: fontSizes.small,
            color: colors.secondaryText,
          }}>
          {item.isPremium ? 'Premium User' : 'Standard User'}
        </PrimaryText>
      </View>
      <Ionicons name="add-circle" size={30} color={colors.primary} />
    </TouchableOpacity>
  );

  const renderEmptyComponent = () => (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: paddings.xlarge,
      }}>
      <PrimaryText
        style={{
          fontSize: fontSizes.medium,
          color: colors.secondaryText,
          textAlign: 'center',
        }}>
        {searchTerm.length < 3
          ? 'Type at least 3 characters to search'
          : 'No users found'}
      </PrimaryText>
    </View>
  );

  return (
    <View>
      <TouchableOpacity onPress={toggle}>
        <Ionicons
          name="person-add-outline"
          size={24}
          color={colors.primaryText}
          style={{paddingRight: paddings.small}}
        />
      </TouchableOpacity>
      <CustomModal visible={isToggle} onPress={close} height={'80%'}>
        <View
          style={{
            padding: paddings.medium,
            flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: colors.surface,
              borderRadius: borderRadius.medium,
              borderWidth: 1,
              borderColor: colors.border,
              paddingHorizontal: paddings.medium,
              marginBottom: margins.medium,
            }}>
            <Ionicons
              name="search"
              size={20}
              color={colors.secondaryText}
              style={{marginRight: margins.small}}
            />
            <TextInput
              style={{
                flex: 1,
                height: 45,
                color: colors.primaryText,
                fontSize: fontSizes.medium,
              }}
              placeholder="Search users..."
              placeholderTextColor={colors.secondaryText}
              value={searchTerm}
              onChangeText={setSearchTerm}
            />
            {isLoading && (
              <ActivityIndicator size="small" color={colors.primary} />
            )}
          </View>

          <FlashList
            data={users}
            renderItem={renderItem}
            estimatedItemSize={80}
            ListEmptyComponent={renderEmptyComponent}
            contentContainerStyle={{
              paddingHorizontal: paddings.small,
            }}
          />
        </View>
      </CustomModal>
    </View>
  );
}
