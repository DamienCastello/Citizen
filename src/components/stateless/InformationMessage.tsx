import { FontAwesome5 } from '@expo/vector-icons';
import React from "react"
import { StyleSheet, Text, View } from "react-native"

export function InformationMessage({ ...props }) {
  const type = props.type
  const title = props.title

  let color
  let icon
  let iconSize = 20
  let iconPaddingHorizontal = 0
  let marginTop = -18
  let marginBottom = 20

  if (type === "success") {
    color = s.colorSuccess
    icon = "check-circle"
  } else if (type === "error") {
    color = s.colorError
    icon = "exclamation-circle"
  } else if (type === "warning") {
    color = s.colorWarning
    icon = "exclamation-triangle"
  } else {
    color = s.colorInfo
    icon = "info"
  }

  if (title !== undefined) {
    iconSize = 30
    iconPaddingHorizontal = 6
    marginTop = 0
    marginBottom = 20
  }

  return (
    <View style={[s.container, color, { marginTop, marginBottom }]}>
      <View style={{ paddingHorizontal: 10 }}>
        <FontAwesome5
          style={[s.icon, { fontSize: iconSize, lineHeight: iconSize, paddingHorizontal: iconPaddingHorizontal }]}
          name={icon}
        ></FontAwesome5>
      </View>
      <View style={{ paddingVertical: 10, paddingRight: 15, flex: 1 }}>
        {props.title && (
          <Text textType="bold" style={s.title}>
            {props.title}
          </Text>
        )}
        <Text style={s.text}>{props.children}</Text>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    marginBottom: 20,
    width: "100%",
  },
  colorSuccess: {
    backgroundColor: "green",
  },
  colorError: {
    backgroundColor: "red",
    borderColor: "white",
    borderWidth: 1,
  },
  colorWarning: {
    backgroundColor: "yellow",
  },
  colorInfo: {
    backgroundColor: "grey",
  },

  icon: {
    color: "white",
    // fontSize: 30,
    // lineHeight: 30,
    // paddingHorizontal: 7,
  },
  title: {
    fontSize: 18,
    marginBottom: 8,
    color: "white",
  },
  text: {
    fontSize: 13,
    color: "white",
    marginBottom: 1,
  },
})
