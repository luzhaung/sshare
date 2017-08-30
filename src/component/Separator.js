/**
 *@desc
 *@author luzhuang<luzhuang1994@gmail.com>
 *@time 上午10:28
 */
import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';

 const styles = StyleSheet.create({
     line: {
         height: 5,
         backgroundColor: '#EEEEEE',
     }
 });

export function Separator () {
    return (
        <View style={styles.line}>
        </View>
    )
}
export default Separator;