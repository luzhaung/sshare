/**
 *@desc
 *@author luzhuang<luzhuang1994@gmail.com>
 *@time 下午4:33
 */
import React from 'react';
import {AsyncStorage} from 'react-native';

export function isLogin(callback) {
    //AsyncStorage.setItem('token', '');
    AsyncStorage.getItem('token', (err, result) => {
        console.log('token : ' + result);
        if (typeof(result) === 'string') {
            callback(true, result);
        }
    });
}


export function getToken(callback) {
    AsyncStorage.getItem('token', (err, result) => {
        console.log(result);
        callback(result);
    });
}