import { BottomSheet, Icon } from '@rneui/base';
import { theme } from '@themes/theme';
import React from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

interface SheetProps {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

export const Sheet = ({ isOpen, children, onClose }: SheetProps) => {
  const translateY = React.useRef(new Animated.Value(0)).current;

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dy: translateY }], { useNativeDriver: false }),
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dy > 100) {
          Animated.timing(translateY, {
            toValue: 500,
            duration: 300,
            useNativeDriver: false,
          }).start(() => {
            onClose();
            translateY.setValue(0);
          });
        } else {
          Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  if (Platform.OS === 'web') {
    return (
      <Modal visible={isOpen} animationType="fade" transparent onRequestClose={onClose}>
        <View style={styles.modalContainer}>
          <View style={styles.sheetContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Icon name="close" type="ionicon" color="#517fa4" />
            </TouchableOpacity>
            <View style={styles.content}>{children}</View>
          </View>
        </View>
      </Modal>
    );
  }

  return (
    <BottomSheet isVisible={isOpen} onBackdropPress={onClose}>
      <Animated.View
        style={[
          styles.sheetContainer,
          {
            transform: [{ translateY }],
          },
        ]}
        {...panResponder.panHandlers}>
        <View style={styles.content}>{children}</View>
      </Animated.View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sheetContainer: {
    backgroundColor: theme.lightColors?.white,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderRadius: Platform.OS === 'web' ? 16 : 0,
    padding: 20,
  },
  content: {
    display: 'flex',
    alignSelf: 'center',
    marginVertical: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
});
