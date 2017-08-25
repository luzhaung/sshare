import { AppRegistry } from 'react-native';
import Init from './entry/Init';

if (!__DEV__) {
    global.console = {
        info: () => {},
        warn: () => {},
        error: () => {},
        log: () => {},
    };
}

AppRegistry.registerComponent('sshare', () => Init);