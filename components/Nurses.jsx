import { View, Text, FlatList } from 'react-native'
import React from 'react'

const Nurses = ({ name }) => {
  return (
    <FlatList 
        data={name}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
            <Text className="text-3xl">{item.id}</Text>
        )}
        horizontal
    />
  )
}

export default Nurses