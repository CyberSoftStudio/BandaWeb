import {Injectable} from '@angular/core';
import axios from 'axios';
import {config} from '../config';

@Injectable()
export class UserService {
    public user: {
        auth: boolean,
        id: string,
        email: string,
        phone: string,
        name: string,
        token: string
    };
    private _config: any;
    private _axios: any;
    constructor () {
        this._userSet();
        this.user.auth = false;
        this._config = config();
        this._axios = axios;
    }
    private _userSet(data?: any) {console.dir(data);
        this.user = {
            id: data && data.id || '',
            email: data && data.email || '',
            phone: data && data.phone || '',
            auth: Boolean (data && data.token && data.token.length),
            token: data && data.token || '',
            name: data && (data.name || data.email || data.phone) || ''
        };
        return true;
    }
}
