import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const Hoem = () => {
  return (
    <SafeAreaView>
      <FlatList>
        data={[]}
        keyExtractor={(item) => item.$id}

      </FlatList>
    </SafeAreaView>
  )
}

export default Hoem