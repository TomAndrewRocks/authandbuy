import LayoutScreen from '@components/Layout';
import { useAuthStore } from '@contexts/useUserStore';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { Text } from 'react-native';
import { Mesh } from 'three';
import Chair from '../../../assets/chair.glb';

function Box(props: any) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = React.useRef<Mesh>(null);
  // Hold state for hovered and clicked events
  const [hovered, hover] = React.useState(false);
  const [clicked, click] = React.useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => ref.current && (ref.current.rotation.x += delta));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default function Menu() {
  const { isUserLogged } = useAuthStore();

  const [image, setImage] = React.useState<string | null>('');
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('pic', result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const parts = image?.split('/');
  const filename = parts && parts[parts.length - 1];
  const extension = filename && filename?.split('.')?.pop()?.toLowerCase();
  const shortenedName = filename && filename.substring(0, 20);

  return (
    <LayoutScreen>
      {/* <ActionButton
        onPress={pickImage}
        bgColor={theme.colors.tertiary}
        icon="camera-outline"
        title="Profile Photo"
        mode="outlined"
        textColor={theme.colors.black}
        style={{
          width: '100%',
        }}
      />
      <Text>{image && `${shortenedName}....${extension}`}</Text> */}
      <Text>{isUserLogged ? 'User Logged' : 'Not authenthicated'}</Text>
      <Canvas legacy>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </LayoutScreen>
  );
}
