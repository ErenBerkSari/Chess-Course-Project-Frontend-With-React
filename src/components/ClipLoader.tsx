import React, { CSSProperties, useMemo } from "react";

import { cssValue } from "../css/helpers/unitConverter";
import { LoaderSizeProps } from "../css/helpers/props";
import { createAnimation } from "../css/helpers/animation";

// Animasyon oluşturuluyor
const clip = createAnimation(
  "ClipLoader",
  "0% {transform: rotate(0deg) scale(1)} 50% {transform: rotate(180deg) scale(0.8)} 100% {transform: rotate(360deg) scale(1)}",
  "clip"
);

interface ClipLoaderProps extends LoaderSizeProps {
  loading?: boolean;
  color?: string;
  speedMultiplier?: number;
  cssOverride?: CSSProperties;
  size?: number;
}

const ClipLoader: React.FC<ClipLoaderProps> = ({
  loading = true,
  color = "#000000",
  speedMultiplier = 1,
  cssOverride = {},
  size = 35,
  ...additionalprops
}) => {
  // Stil hesaplaması useMemo ile optimize edildi
  const style: CSSProperties = useMemo(
    () => ({
      background: "transparent !important",
      width: cssValue(size),
      height: cssValue(size),
      borderRadius: "50%",
      border: "2px solid",
      borderTopColor: color,
      borderBottomColor: "transparent",
      borderLeftColor: color,
      borderRightColor: color,
      display: "inline-block",
      animation: `${clip} ${0.75 / speedMultiplier}s 0s infinite linear`,
      animationFillMode: "both",
      ...cssOverride,
    }),
    [size, color, speedMultiplier, cssOverride]
  );

  // Eğer loading false ise, hiçbir şey render edilmesin
  if (!loading) {
    return null;
  }

  return <span style={style} {...additionalprops} />;
};

export default ClipLoader;
