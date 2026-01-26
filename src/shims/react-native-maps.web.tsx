import React from "react";
import { View } from "react-native";

type AnyProps = Record<string, any>;

export default function MapView(props: AnyProps) {
  return <View {...props} />;
}

export function Marker() {
  return null;
}

export const PROVIDER_GOOGLE = "google";
