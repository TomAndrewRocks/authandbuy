import { BottomSheetModal } from "@gorhom/bottom-sheet";
import useMeasures from "@hooks/useMeasures";
import React from "react";
import {
  Platform,
  StatusBar,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

import { Avatar } from "./Avatar";
import { DrawerButton } from "./Buttons/DrawerButton";
import Popup from "./Popup/Popup";

export default function Navbar() {
  const { height } = useMeasures();
  const [openWebModal, setWebModal] = React.useState(false);

  const bottomSheetModalRef = React.useRef<BottomSheetModal>(null);

  const snapPoints = React.useMemo(() => ["25%", "50%"], []);

  const handleOpenSheet = () => bottomSheetModalRef.current?.present();
  const handleCloseSheet = () => bottomSheetModalRef.current?.dismiss();

  const handleWebModal = () => {
    setWebModal(!openWebModal);
  };

  return (
    <>
      <View
        style={{
          width: "100%",
          height: Platform.OS === "web" ? 100 : height * 0.15,
          justifyContent: "space-between",
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          paddingTop: 40,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
          elevation: 5,
        }}
      >
        <StatusBar animated barStyle="light-content" />
        <DrawerButton />
        <TouchableOpacity
          onPress={() => {
            if (Platform.OS !== "web") {
              handleOpenSheet();
            } else {
              handleWebModal();
            }
          }}
        >
          <Avatar
            size="xs"
            source={{
              uri: "https://media.licdn.com/dms/image/D5603AQGsGqK8P09Q9g/profile-displayphoto-shrink_400_400/0/1699980715125?e=1712793600&v=beta&t=H5_dFziId4-hTtOssFD94ZfoG-w_Gon9dgpd0xD41DI",
            }}
          />
        </TouchableOpacity>
      </View>
      <Popup
        ref={bottomSheetModalRef}
        snapPoint={snapPoints}
        onClose={handleCloseSheet}
        isWebModalOpen={openWebModal}
        handleAction={handleWebModal}
      >
        <Text>hey</Text>
      </Popup>
    </>
  );
}
