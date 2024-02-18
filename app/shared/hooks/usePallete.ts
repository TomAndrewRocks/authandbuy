import tw from "@provider/tw";

export default function usePallete() {
  const colorTheme = (theme: string) => {
    const color = tw`bg-${theme}`;
    return `${color?.backgroundColor}`;
  };
  return { colorTheme };
}
