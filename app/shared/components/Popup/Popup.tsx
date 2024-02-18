import HStack from "@components/Design/HStack";
import VStack from "@components/Design/VStack";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import useMeasures from "@hooks/useMeasures";
import React from "react";
import { Button, Modal, Platform, StyleSheet, Text, View } from "react-native";

interface PopupProps {
  snapPoint: string[];
  onClose: () => void;
  children: React.ReactNode;
  handleAction: () => void;
  isWebModalOpen: boolean;
}

const Popup: React.ForwardRefRenderFunction<BottomSheetModal, PopupProps> = (
  props,
  ref
) => {
  const { width } = useMeasures();
  const { snapPoint, onClose, children, handleAction, isWebModalOpen } = props;

  const renderBackdrop = (props: BottomSheetDefaultBackdropProps) => {
    return (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    );
  };

  if (width > 768) {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={isWebModalOpen}
        onRequestClose={handleAction}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>{children}</View>
        </View>
      </Modal>
    );
  }

  return (
    <BottomSheetModal
      animateOnMount
      ref={ref}
      index={1}
      snapPoints={snapPoint}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
    >
      <VStack style="items-center justify-center flex-1">
        {Platform.OS == "web" && (
          <HStack style="items-center justify-around w-full">
            <Text>hey</Text>
            <Button title="Close" onPress={onClose} />
          </HStack>
        )}
        {children}
      </VStack>
    </BottomSheetModal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    display: "flex",
  },
});

export default React.forwardRef(Popup);
